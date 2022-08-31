import {
  TokenBlacklistInput,
  TokensObtainInput,
  TokensObtainOutput,
  UserRequestOutput,
} from '~~/@types/generated/dist'

import { defineStore } from 'pinia'
import endpoints from '~~/endpoints'
import performGet from '~~/composables/performGet'
import performPost from '~~/composables/performPost'

const useUsersStore = defineStore('users', {
  state: () => ({
    currentUser: null,
  }),
  actions: {
    async logIn(payload: TokensObtainInput) {
      try {
        const tokens = await performPost<TokensObtainOutput>(endpoints.obtainTokens(), payload)

        if (tokens && process.client) {
          localStorage.setItem('accessToken', tokens.accessToken)
          localStorage.setItem('refreshToken', tokens.refreshToken)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.fetchCurrentUser()
      }
    },
    async logOut() {
      const refreshToken = process.client ? localStorage.getItem('refreshToken') : null

      if (refreshToken) {
        try {
          await performPost(endpoints.blacklistTokens(), {
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
          this.currentUser = await performGet<UserRequestOutput>(endpoints.requestUser())
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
