<script setup lang="ts">
import { TokensObtainInput, TokensObtainOutput } from '~~/@types/generated/dist'
import { ButtonProps } from '~~/components/Button/index.vue'

definePageMeta({
  layout: false,
})

const email = ref('')
const password = ref<string>('')

const formSubmissionState = ref<ButtonProps['loadingState']>('initial')

const logIn = async () => {
  formSubmissionState.value = 'loading'

  try {
    const data = await performPost<TokensObtainOutput>('auth/tokens/obtain/', {
      email: email.value,
      password: password.value,
    } as TokensObtainInput)

    formSubmissionState.value = 'success'

    if (process.browser) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    }
  } catch (error) {
    formSubmissionState.value = 'error'
    console.log(error)
  } finally {
    // formSubmissionState.value = 'initial'
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
            <Input id="id_email" v-model.trim="email" label="E-post" :value="email" type="email" />
          </div>
          <div class="mt-5">
            <Input
              id="id_email"
              v-model.trim="password"
              label="Passord"
              :value="password"
              type="password"
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
