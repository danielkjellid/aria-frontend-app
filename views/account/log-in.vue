<script setup lang="ts">
import { TokensObtainInput, TokensObtainOutput } from '~~/@types/generated/dist'
import { ButtonProps } from '~~/components/Button/index.vue'
import useNotificationsStore from '~~/store/notifications'
import useUsersStore from '~~/store/users'
import { publicUrls } from '~~/endpoints'

/************
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

const logIn = async () => {
  formSubmissionState.value = 'loading'

  try {
    const data = await performPost<TokensObtainOutput>(publicUrls.auth.obtainTokens(), {
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
        <Text class="mt-1" variant="body2">
          Har du ikke en konto? <ButtonLink to="/">Lag en her</ButtonLink>
        </Text>
      </template>
      <template #content>
        <form class="max-w-sm m-auto" @submit.prevent="logIn">
          <div>
            <Input
              id="id_email"
              v-model="email"
              label="E-post"
              type="email"
              autocomplete="email"
              :model-value="email"
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
              autocomplete="current-password"
              :model-value="password"
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
