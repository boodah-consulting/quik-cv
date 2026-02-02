<template>
  <div id="toolbar" class="toolbar-container">
    <q-toolbar
      class="bg-primary text-white shadow-2"
      :class="{ 'floating-toolbar': isScrolled }"
    >
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-separator dark vertical inset />
      <q-space />
      <q-breadcrumbs active-color="white" style="font-size: 16px">
        <q-breadcrumbs-el icon="home" label="Home" :to="{ path: '/' }" />
        <q-breadcrumbs-el :label="currentPage" v-if="isLandingPage === false" />
      </q-breadcrumbs>

      <q-space />

      <q-btn-dropdown stretch flat icon="account_circle">
        <q-list>
          <q-item-label header>Profiles</q-item-label>
          <q-item
            v-for="item in items"
            :key="item.path"
            clickable
            v-close-popup
            @click="$router.push(item.path)"
            tabindex="0"
          >
            <q-item-section avatar>
              <q-avatar icon="account_circle" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </div>
</template>

<style scoped>
.toolbar-container {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.floating-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
}

.fixed-toolbar {
  position: sticky;
  top: 0;
  width: 100%;
}
</style>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Component used to display contact information and manage toolbar floating behavior
 *
 * Usage:
 *   <Toolbar :items="items" :current-page="currentPage" />
 *
 * @module ToolBar
 */
export default {
  name: 'ToolBar',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    currentPage: {
      type: String,
      required: false,
    },
    isLandingPage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup() {
    const isScrolled = ref(false)

    const handleScroll = () => {
      // Add floating effect when scrolled past 50 pixels
      isScrolled.value = window.scrollY > 50
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled
    }
  }
}
</script>
