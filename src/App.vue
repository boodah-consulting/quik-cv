<template>
  <q-layout view="lHh Lpr lFf">
    <ToolBar />
    <q-page-container>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'

export default {
  name: 'LayoutDefault',
  components: {
    ToolBar,
  }
}
</script>
