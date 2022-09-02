import {
  TokenBlacklistInput,
  TokensObtainInput,
  TokensObtainOutput,
  UserRequestOutput,
} from '~~/@types/generated/dist'

import { defaultHeaders } from '~~/composables/_api'
import { defineStore } from 'pinia'
import performGet from '~~/composables/performGet'
import performPost from '~~/composables/performPost'
import { publicUrls } from '~~/endpoints'

const useUsersStore = defineStore('users', {
  state: () => ({
    currentUser: {} as UserRequestOutput,
  }),
  actions: {
    async logIn(payload: TokensObtainInput) {
      try {
        const tokens = await performPost<TokensObtainOutput>(
          publicUrls.auth.obtainTokens(),
          payload
        )

        if (tokens && process.client) {
          localStorage.setItem('accessToken', tokens.accessToken)
          localStorage.setItem('refreshToken', tokens.refreshToken)

          defaultHeaders.Authorization = `Bearer ${tokens.accessToken}`

          this.fetchCurrentUser()
        }
      } catch (error) {
        console.log(error)
      }

      return null
    },
    async logOut() {
      const refreshToken = process.client ? localStorage.getItem('refreshToken') : null

      if (refreshToken) {
        try {
          await performPost(publicUrls.auth.blacklistTokens(), {
            refreshToken,
          } as TokenBlacklistInput).then(() => {
            this.currentUser = {}
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    async fetchCurrentUser() {
      const refreshToken = process.client ? localStorage.getItem('refreshToken') : null
      const accessToken = process.client ? localStorage.getItem('accessToken') : null

      if (refreshToken && accessToken) {
        try {
          this.currentUser = await performGet<UserRequestOutput>(publicUrls.users.requestUser())
          return this.currentUser
        } catch (error) {
          console.log(error)
        }
      }

      return null
    },
  },
})

export default useUsersStore
