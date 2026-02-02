<template>
  <q-layout view="lHh Lpr lFf">
    <ToolBar :items="items" :current-page="currentPage" />
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
  created() {
    this.$router.options.routes.forEach(route => {
      if (route.name && route.name !== 'LandingPage') {
        this.items.push({
          name: route.name,
          path: route.path,
          title: route.meta?.title || route.name
        })
      }
    })
  }
  , data() {
    return {
      items: []
    }
  },
  computed: {
    isLandingPage() {
      return this.$route.name === 'LandingPage'
    },
    currentPage() {
      return this.items.find(item => item.path === this.$route.path)?.title
    }
  }
}
</script>
