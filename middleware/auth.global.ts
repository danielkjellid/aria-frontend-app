/* eslint-disable consistent-return */
import { UserRequestOutput } from '~~/@types'
import useNotificationsStore from '~~/store/notifications'
import useUsersStore from '~~/store/users'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const usersStore = useUsersStore()
  const { currentUserLoggedIn, currentUser } = usersStore

  const notificationStore = useNotificationsStore()

  const staffRequired = to.matched.some((route) => route.meta.staffRequired)
  const authRequired = to.matched.some((route) => route.meta.authRequired)
  const permissionsRequired = to.matched.some((route) => route.meta.permissionsRequired)
  const requiredPermissions = permissionsRequired
    ? to.matched.flatMap((route) => route.meta.permissionsRequired as string)
    : []

  const getUser = async () => {
    if (currentUserLoggedIn) {
      return currentUser
    }
    const fetchedUser = await usersStore.fetchCurrentUser()
    if (fetchedUser !== null) {
      return fetchedUser
    }
    return null
  }

  const userHasRequiredPerms = (user: UserRequestOutput) => {
    if (user.isSuperuser) {
      return true
    }

    return requiredPermissions.every((perm) => user.permissions.includes(perm))
  }

  if (authRequired || staffRequired || (permissionsRequired && requiredPermissions.length)) {
    const user = await getUser()
    // All of the above, auth, staff and permissions require a user object to run
    // checks against.
    //
    // For authRequired this check is enough.
    if (user === null) {
      return navigateTo({ name: 'account-log-in', query: { next: to.path } })
    }

    // Continue checking further down the permission tree.
    if (staffRequired || (permissionsRequired && requiredPermissions.length)) {
      // Both staffRequired and permissionRequired requires the user to be staff.
      //
      // For staffRequired this check is enough.
      if (!user.isStaff && !user.isSuperuser) {
        notificationStore.create({
          title: 'Manglende tilgang',
          text: 'Du har ikke tilgang til å utføre denne handlingen.',
          type: 'danger',
        })
        return navigateTo('/')
      }

      // Continue even further down the permission tree to check a users permissions as
      // well as the checks above.
      if (permissionsRequired && requiredPermissions.length) {
        if (!userHasRequiredPerms(user)) {
          notificationStore.create({
            title: 'Manglende tilgang',
            text: 'Du har ikke tilgang til å utføre denne handlingen.',
            type: 'danger',
          })
          return navigateTo('/')
        }
      }
    }
  }
})
