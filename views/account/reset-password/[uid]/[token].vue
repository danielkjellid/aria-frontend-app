<script setup lang="ts">
import { UserPasswordResetConfirmInput, ApiError } from '~~/@types'
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

/*******************
 ** State: errors **
 *******************/

const error = ref<ApiError | null>(null)
const errorMessage = computed(() => (error.value.message ? error.value.message : null))

const clearError = () => {
  if (error.value) {
    error.value = null
    formSubmissionState.value = 'initial'
  }
}

/***********
 ** Store **
 ***********/

const notificationsStore = useNotificationsStore()

/******************
 ** State: forms **
 ******************/

const uid = useSlug('uid')
const token = useSlug('token')
const newPassword1 = ref<string>('')
const newPassword2 = ref<string>('')

const formSubmissionState = ref<ButtonProps['loadingState']>('initial')

const setNewPassword = async () => {
  formSubmissionState.value = 'loading'

  const payload: UserPasswordResetConfirmInput = {
    uid,
    token,
    newPassword: newPassword1.value,
    newPassword2: newPassword2.value,
  }

  try {
    await performPost(publicUrls.users.passwordResetConfirm(), payload)

    formSubmissionState.value = 'success'

    notificationsStore.create({
      title: 'Nytt passord satt!',
      text: 'Du kan nå logge inn med det nye passordet ditt.',
      type: 'success',
    })

    router.push({ name: 'account-log-in' })

    formSubmissionState.value = 'initial'
  } catch (e) {
    formSubmissionState.value = 'error'

    error.value = e.data

    notificationsStore.create({
      title: 'Noe gikk galt',
      text: errorMessage.value,
      type: 'danger',
    })

    newPassword1.value = ''
    newPassword2.value = ''
  }
}
</script>

<template>
  <div>
    <Head>
      <Title>Lag nytt passord</Title>
    </Head>
    <NuxtLayout name="auth">
      <template #heading>
        <Text variant="title4">Skriv inn det nye passordet ditt</Text>
        <Text class="mt-1" variant="body2">
          For sikkerhets skyld ber vi deg skrive inn det nye passordet ditt to ganger, slik at vi
          kan dobbelsjekke at du har skrevet det riktig.
        </Text>
      </template>
      <template #content>
        <form class="max-w-sm m-auto" @submit.prevent="setNewPassword">
          <div>
            <Input
              id="id_password1"
              v-model="newPassword1"
              label="Nytt passord"
              type="password"
              autocomplete="new-password"
              :error="$parseApiError('newPassword', error)"
              @input="clearError"
            />
          </div>
          <div class="mt-5 mb-4">
            <Input
              id="id_password2"
              v-model="newPassword2"
              label="Bekreft nytt passord"
              type="password"
              autocomplete="new-password"
              :error="$parseApiError('newPassword2', error)"
              @input="clearError"
            />
          </div>
          <Button type="submit" fluid :loading-state="formSubmissionState">
            Sett nytt passord
          </Button>
        </form>
      </template>
    </NuxtLayout>
  </div>
</template>
