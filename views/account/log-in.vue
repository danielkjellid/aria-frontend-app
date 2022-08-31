<script setup lang="ts">
import { TokensObtainInput, TokensObtainOutput } from '~~/@types/generated/dist'
import { ButtonProps } from '~~/components/Button/index.vue'
import useNotificationsStore from '~~/store/notifications'
import useUsersStore from '~~/store/users'
import endpoint from '~~/endpoints'
import { storeToRefs } from 'pinia'

/***********
 ** Routes **
 ***********/

definePageMeta({
  layout: false,
})

const router = useRouter()

/***********
 ** Store **
 ***********/

const notificationsStore = useNotificationsStore()
const usersStore = useUsersStore()

/******************
 ** State: forms **
 ******************/

const email = ref<string>('')
const password = ref<string>('')

const formSubmissionState = ref<ButtonProps['loadingState']>('initial')

/*******************
 ** State: errors **
 *******************/

interface ApiErrorExtra {
  [x: string]: string
}

interface ApiError {
  message: string
  extra?: ApiErrorExtra
}

const error = ref<ApiError | null>(null)
const errorMessage = computed(() => (error.value.message ? error.value.message : null))

const clearError = () => {
  if (error.value) {
    error.value = null
    formSubmissionState.value = 'initial'
  }
}

/*****************
 ** State: auth **
 *****************/

const { currentUser } = storeToRefs(usersStore)

const logIn = async () => {
  formSubmissionState.value = 'loading'

  try {
    const data = await performPost<TokensObtainOutput>(endpoint.obtainTokens(), {
      email: email.value,
      password: password.value,
    } as TokensObtainInput)

    formSubmissionState.value = 'success'

    if (process.client) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      const user = usersStore.fetchCurrentUser()

      if (!user) {
        notificationsStore.create({
          title: 'Noe gikk galt',
          text: 'Vi har problemer med å hente brukeren din. Vennligst prøv igjen senere.',
          type: 'danger',
        })
      }

      router.push('/')

      notificationsStore.create({
        title: 'Logget inn',
        text: 'Velkommen tilbake!',
        type: 'success',
      })

      formSubmissionState.value = 'initial'
    }
  } catch (e) {
    formSubmissionState.value = 'error'

    error.value = e.data

    notificationsStore.create({
      title: 'Noe gikk galt',
      text: errorMessage.value,
      type: 'danger',
    })

    password.value = ''
  }
}

const logOut = () => {
  usersStore.logOut()

  notificationsStore.create({
    title: 'Logget ut!',
    text: 'Du er nå logget ut.',
    type: 'success',
  })

  router.push('/')
}
</script>

<template>
  <div>
    <NuxtLayout name="auth">
      <template #tabs>
        <Tabs>
          <TabsItem to="#" active>Logg inn</TabsItem>
          <TabsItem to="#">Opprett konto</TabsItem>
        </Tabs>
      </template>
      <template #heading>
        <Text variant="title4">Velkommen tilbake!</Text>
        <Text v-if="!usersStore.currentUser" class="mt-1" variant="body2">
          Har du ikke en konto? <ButtonLink to="/">Lag en her</ButtonLink>
        </Text>
        <div v-else class="mt-1">
          <Text variant="body2">
            Du er allerede logget inn som {{ currentUser.profile.fullName }}.
          </Text>
          <ButtonLink is="button" type="button" class="block mt-1" @click="logOut">
            Logg ut
          </ButtonLink>
        </div>
      </template>
      <template #content>
        <form v-if="!currentUser" class="max-w-sm m-auto" @submit.prevent="logIn">
          <div>
            <Input
              id="id_email"
              v-model="email"
              label="E-post"
              type="email"
              :error="$parseApiError('email', error)"
              @input="clearError"
            />
          </div>
          <div class="mt-5">
            <Input
              id="id_email"
              v-model="password"
              label="Passord"
              type="password"
              :error="$parseApiError('password', error)"
              @input="clearError"
            />
          </div>
          <div class="mt-4 mb-4 text-center">
            <ButtonLink to="/">Glemt passord?</ButtonLink>
          </div>
          <Button type="submit" fluid :loading-state="formSubmissionState">Logg inn</Button>
        </form>
      </template>
    </NuxtLayout>
  </div>
</template>
