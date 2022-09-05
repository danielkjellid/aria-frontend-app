<script setup lang="ts">
/***************
 ** Page meta **
 ***************/

definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <Head>
      <Title>Passordet er sendt!</Title>
    </Head>
    <NuxtLayout name="auth">
      <template #heading>
        <div class="space-y-5">
          <div>
            <Text variant="title4">Instruksjoner sendt</Text>
            <Text class="mt-1" variant="body2">
              Vi har sendt deg instruksjoner på e-post om hvordan du setter et nytt passord. Den
              burde være hos deg ganske snart.
            </Text>
          </div>

          <hr />

          <Text class="mt-1" variant="body2" color="text-gray-600">
            Får du ikke e-post fra oss? Undersøk søppelpost og reklame-mappen din og forsikre deg om
            ikke er registrert hos oss med en annen e-postadresse enn den du fylte inn i feltet. Er
            du i tvil om du skrev riktig?
            <ButtonLink
              :to="{ name: 'account-reset-password' }"
              class="ml-1 font-semibold text-gray-900 underline"
            >
              Skriv inn e-posten på nytt
            </ButtonLink>
          </Text>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
