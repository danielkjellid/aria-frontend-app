<script setup lang="ts">
import { UserPasswordResetInput } from '~~/@types'
import { ButtonProps } from '~~/components/Button/index.vue'
import useNotificationsStore from '~~/store/notifications'
import { publicUrls } from '~~/endpoints'

/***************
 ** Page meta **
 ***************/

definePageMeta({
  layout: false,
})

/************
 ** Routes **
 ************/

const router = useRouter()

/***********
 ** Store **
 ***********/

const notificationsStore = useNotificationsStore()

/******************
 ** State: forms **
 ******************/

const email = ref<string>('')
const formSubmissionState = ref<ButtonProps['loadingState']>('initial')

const dispatchResetPassword = async () => {
  formSubmissionState.value = 'loading'

  await performPost(publicUrls.users.passwordReset(), {
    email: email.value,
  } as UserPasswordResetInput)
    .then(() => {
      formSubmissionState.value = 'success'

      notificationsStore.create({
        title: 'E-post med nullstilling av passord sendt!',
        text: 'Hvis kontoen eksisterer vil du motta en e-post med instruksjoner i løpet av 10 minutter.',
        type: 'success',
      })

      router.push({ name: 'account-reset-password-sent' })

      formSubmissionState.value = 'initial'
    })
    .catch(() => {
      formSubmissionState.value = 'success'

      // We don't want to give any indication if the email exists in our systems
      // or not. Therefore we show a successful message either way.
      notificationsStore.create({
        title: 'E-post med nullstilling av passord sendt!',
        text: 'Hvis kontoen eksisterer vil du motta en e-post med instruksjoner i løpet av 10 minutter.',
        type: 'success',
      })

      router.push({ name: 'account-reset-password-sent' })

      email.value = ''
      formSubmissionState.value = 'initial'
    })
}
</script>

<template>
  <div>
    <Head>
      <Title>Nullstill passordet ditt</Title>
    </Head>
    <NuxtLayout name="auth">
      <template #heading>
        <Text variant="title4">Har du glemt passordet ditt?</Text>
        <Text class="mt-1" variant="body2">
          Gi oss e-postadressen din, så sende vi deg instruksjoner for hvordan du kan sette et nytt!
        </Text>
      </template>
      <template #content>
        <form class="max-w-sm m-auto" @submit.prevent="dispatchResetPassword">
          <div class="mb-4">
            <Input id="id_email" v-model="email" label="E-post" type="email" autocomplete="email" />
          </div>
          <Button type="submit" fluid :loading-state="formSubmissionState">
            Nullstill passordet mitt
          </Button>
        </form>
      </template>
    </NuxtLayout>
  </div>
</template>
