<script setup lang="ts">
import { ButtonProps } from '~~/components/Button/index.vue'
import useUsersStore from '~~/store/users'
import useNotificationsStore from '~~/store/notifications'
import { publicUrls } from '~~/endpoints'
import { ApiError } from '~~/@types'

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
const usersStore = useUsersStore()

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

/*****************
 ** State: forms **
 *****************/

const formSubmissionState = ref<ButtonProps['loadingState']>('initial')

/*****************
 ** State: data **
 *****************/

const user = reactive({
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  birthDate: '',
  streetAddress: '',
  zipCode: '',
  zipPlace: '',
  subscribedToNewsletter: false,
  allowPersonalization: false,
  allowThirdPartyPersonalization: false,
  password: '',
  password2: '',
})

const months = [
  { val: '01', text: 'Januar' },
  { val: '02', text: 'Februar' },
  { val: '03', text: 'Mars' },
  { val: '04', text: 'April' },
  { val: '05', text: 'Mai' },
  { val: '06', text: 'Juni' },
  { val: '07', text: 'Juli' },
  { val: '08', text: 'August' },
  { val: '09', text: 'September' },
  { val: '10', text: 'Oktober' },
  { val: '11', text: 'November' },
  { val: '12', text: 'Desember' },
]

const birthDateDay = ref<string>('1')
const birthDateMonth = ref<string>('01')
const birthDateYear = ref<string>('2022')

const birthDateYearRange = computed(() => {
  const year = new Date().getFullYear()

  return Array.from({ length: year - 1900 }, (_value, index) => 1901 + index).sort((a, b) => b - a)
})

const birthDate = computed(
  () => `${birthDateYear.value}-${birthDateMonth.value}-${birthDateDay.value}`
)

const createAccount = async () => {
  formSubmissionState.value = 'loading'

  user.birthDate = birthDate.value

  try {
    await performPost(publicUrls.users.create(), user).then(async () => {
      formSubmissionState.value = 'success'

      notificationsStore.create({
        title: 'Konto opprettet',
        text: 'Kontoen din ble opprettet.',
        type: 'success',
      })

      if (process.client) {
        const fetchedUser = await usersStore.logIn({ email: user.email, password: user.password })

        if (fetchedUser) {
          notificationsStore.create({
            title: 'Logget inn',
            text: 'Du er nå logget inn.',
            type: 'success',
          })
        }
      }

      router.push({ name: 'index' })
    })
  } catch (e) {
    formSubmissionState.value = 'error'

    error.value = e.data

    notificationsStore.create({
      title: 'Noe gikk galt',
      text: errorMessage.value,
      type: 'danger',
    })
  }
}
</script>

<template>
  <div>
    <Head>
      <Title>Opprett konto</Title>
    </Head>
    <NuxtLayout name="auth">
      <template #tabs>
        <Tabs>
          <TabsItem :to="{ name: 'account-log-in' }">Logg inn</TabsItem>
          <TabsItem to="#" active>Opprett konto</TabsItem>
        </Tabs>
      </template>
      <template #heading>
        <Text variant="title4">Kom i gang med å handle!</Text>
        <Text class="mt-1" variant="body2">
          Har du allerede en konto?
          <ButtonLink :to="{ name: 'account-log-in' }">Logg inn her</ButtonLink>
        </Text>
      </template>
      <template #content>
        <form class="max-w-sm m-auto space-y-5" @submit.prevent="createAccount">
          <div
            class="sm:flex sm:items-center sm:justify-between sm:w-full sm:space-x-5 sm:space-y-0 space-y-5"
          >
            <div class="sm:w-1/2">
              <Input
                id="id_first_name"
                v-model="user.firstName"
                label="Fornavn"
                autocomplete="given-name"
                :error="$parseApiError('firstName', error)"
                :model-value="user.firstName"
                @input="clearError"
              />
            </div>
            <div class="sm:w-1/2">
              <Input
                id="id_last_name"
                v-model="user.lastName"
                label="Etternavn"
                autocomplete="family-name"
                :model-value="user.lastName"
                :error="$parseApiError('lastName', error)"
                @input="clearError"
              />
            </div>
          </div>

          <div
            class="sm:flex sm:items-end sm:justify-between sm:w-full sm:space-x-5 sm:space-y-0 space-y-5"
          >
            <div class="sm:w-1/3">
              <Select
                id="id_birth_day"
                v-model="birthDateDay"
                label="Fødselsdag"
                autocomplete="bday-day"
                :model-value="birthDateDay"
                :error="$parseApiError('birthDay', error)"
                @input="clearError"
              >
                <option v-for="i in 31" :key="i" :value="i" :selected="i == 1">
                  {{ i }}
                </option>
              </Select>
            </div>
            <div class="sm:w-1/3 sm:mt-0 mt-5">
              <Select
                id="id_birth_month"
                v-model="birthDateMonth"
                label="Fødselsmåned"
                autocomplete="bday-month"
                :error="$parseApiError('birthDay', error)"
                @input="clearError"
              >
                <option
                  v-for="month in months"
                  :key="month.val"
                  :value="month.val"
                  :selected="month.val == '01'"
                >
                  {{ month.text }}
                </option>
              </Select>
            </div>
            <div class="sm:w-1/3 sm:mt-0 mt-5">
              <Select
                id="id_birth_year"
                v-model="birthDateYear"
                label="Fødselsår"
                autocomplete="bday-year"
                :error="$parseApiError('birthDay', error)"
                @input="clearError"
              >
                <option
                  v-for="year in birthDateYearRange"
                  :key="year"
                  :value="year"
                  :selected="year == 2021"
                >
                  {{ year }}
                </option>
              </Select>
            </div>
          </div>

          <div>
            <Input
              id="id_phone_number"
              v-model="user.phoneNumber"
              type="tel"
              label="Mobilnummer"
              autocomplete="tel"
              :model-value="user.phoneNumber"
              :error="$parseApiError('phoneNumber', error)"
              @input="clearError"
            />
          </div>

          <div>
            <Input
              id="id_email"
              v-model="user.email"
              type="email"
              autocomplete="email"
              label="E-post"
              :model-value="user.email"
              :error="$parseApiError('email', error)"
              @input="clearError"
            />
          </div>

          <div>
            <Input
              id="id_password"
              v-model="user.password"
              type="password"
              label="Passord"
              autocomplete="new-password"
              :model-value="user.password"
              :error="$parseApiError('password', error)"
              @input="clearError"
            />
          </div>

          <div>
            <Input
              id="id_password2"
              v-model="user.password2"
              type="password"
              label="Gjenta passord"
              autocomplete="new-password"
              :model-value="user.password2"
              :error="$parseApiError('password2', error)"
              @input="clearError"
            />
          </div>

          <div>
            <Input
              id="id_street_address"
              v-model="user.streetAddress"
              label="Gateadresse"
              autocomplete="street-address"
              :model-value="user.streetAddress"
              :error="$parseApiError('streetAddress', error)"
              @input="clearError"
            />
          </div>

          <div
            class="sm:flex sm:items-center sm:justify-between sm:w-full sm:space-y-0 sm:space-x-5 space-x-0 space-y-5"
          >
            <div class="sm:w-1/2">
              <Input
                id="id_zip_code"
                v-model="user.zipCode"
                label="Postkode"
                autocomplete="postal-code"
                :model-value="user.zipCode"
                :error="$parseApiError('zipCode', error)"
                @input="clearError"
              />
            </div>
            <div class="sm:w-1/2">
              <Input
                id="id_zip_place"
                v-model="user.zipPlace"
                label="Poststed"
                :model-value="user.zipPlace"
                :error="$parseApiError('zipPlace', error)"
                @input="clearError"
              />
            </div>
          </div>

          <div class="space-y-5">
            <Checkbox
              id="id_subscribed_to_newsletter"
              v-model="user.subscribedToNewsletter"
              :checked="user.subscribedToNewsletter"
              label="Jeg ønsker nyheter på e-post"
            />
            <Checkbox
              id="id_allow_personalization"
              v-model="user.allowPersonalization"
              :checked="user.allowPersonalization"
              label="Jeg ønsker en personalisert handleoppelvelse og kommunikasjon"
            />
            <Checkbox
              id="id_allow_third_party_personalization"
              v-model="user.allowThirdPartyPersonalization"
              :checked="user.allowThirdPartyPersonalization"
              label="Jeg ønsker personlig markedsføring i andre kanaler"
            />
          </div>

          <Button type="submit" class="mt-5" fluid :loading-state="formSubmissionState">
            Opprett konto
          </Button>
        </form>
      </template>
    </NuxtLayout>
  </div>
</template>
