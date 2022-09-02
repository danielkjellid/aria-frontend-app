<script setup lang="ts">
import { UserAccountVerificationConfirmInput } from '~~/@types'
import useNotificationsStore from '~~/store/notifications'
import useUsersStore from '~~/store/users'
import { publicUrls } from '~~/endpoints'

/************
 ** Routes **
 ************/

definePageMeta({
  layout: false,
})

const router = useRouter()

/***********
 ** Store **
 ***********/

const notificationsStore = useNotificationsStore()
const usersStore = useUsersStore()

/***********
 ** State **
 ***********/

const uid = useSlug('uid')
const token = useSlug('token')

const verifyEmail = async () => {
  const payload: UserAccountVerificationConfirmInput = { uid, token }

  try {
    await performPost(publicUrls.users.verifyConfirm(), payload)

    if (usersStore.currentUserLoggedIn) {
      usersStore.currentUser.hasConfirmedEmail = true
    }

    notificationsStore.create({
      title: 'Kontoen din ble bekreftet',
      type: 'success',
    })
  } catch (error) {
    const { data } = error

    notificationsStore.create({
      title: 'Noe gikk galt',
      text: data.message ? data.message : null,
      type: 'danger',
    })
  }
}

/***********
 ** Hooks **
 ***********/

onMounted(() => {
  verifyEmail()
  return router.push({ name: 'index' })
})
</script>

<template>
  <div />
</template>
