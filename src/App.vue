<template>
  <q-layout view="lHh Lpr lFf">
    <ContactInformation />

    <q-page-container>
      <OnePager />
    </q-page-container>
  </q-layout>
</template>

<script>
import ContactInformation from './components/ContactInformation.vue'
import OnePager from './components/OnePager.vue'

export default {
  name: 'LayoutDefault',

  components: {
    ContactInformation,
    OnePager
  },

}
</script>
