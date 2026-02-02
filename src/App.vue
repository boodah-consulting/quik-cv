<template>
  <q-layout view="lHh Lpr lFf">
    <ToolBar :current-page="currentPage" />
    <q-page-container>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'
import ContactInformation from '@/components/ContactInformation.vue'

export default {
  name: 'LayoutDefault',
  components: {
    ToolBar,
    ContactInformation,
  },
  computed: {
    isLandingPage() {
      return this.$route.name === 'LandingPage'
    },
    currentPage() {
      const routeName = this.$route.name
      if (routeName === 'ProfileSelection') {
        return 'Select Profile'
      }
      if (routeName === 'CVPage') {
        return this.$route.params.audience?.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      }
      return this.$route.meta?.title || routeName
    }
  }
}
</script>
