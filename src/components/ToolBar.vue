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
        <q-breadcrumbs-el 
          :label="currentPage" 
          v-if="isLandingPage === false && currentPage" 
        />
        <q-breadcrumbs-el 
          :label="currentProfile" 
          v-if="currentProfile" 
        />
      </q-breadcrumbs>

      <q-space />

      <q-btn-dropdown stretch flat icon="account_circle">
        <q-list>
          <q-item-label header>Quick Actions</q-item-label>
          <q-item
            clickable
            v-close-popup
            @click="$router.push({ name: 'ProfileSelection' })"
            tabindex="0"
          >
            <q-item-section avatar>
              <q-avatar icon="folder" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Select Profile</q-item-label>
            </q-item-section>
          </q-item>

          <q-item 
            v-if="selectedProfile" 
            clickable 
            v-close-popup
            @click="$router.push({ name: 'LandingPage' })"
          >
            <q-item-section avatar>
              <q-avatar icon="home" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator v-if="profiles.length > 0" />

          <q-item-label header v-if="profiles.length > 0">Available Profiles</q-item-label>
          <q-item
            v-for="profile in profiles"
            :key="profile.name"
            clickable
            v-close-popup
            @click="selectProfileAndNavigate(profile.name)"
            tabindex="0"
          >
            <q-item-section avatar>
              <q-avatar icon="person" color="accent" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ formatProfileName(profile.name) }}</q-item-label>
              <q-item-label caption>
                {{ profile.audiences.length }} audience types
              </q-item-label>
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProfileService } from '@/composables/useProfileService'

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
    const router = useRouter()
    const route = useRoute()
    const isScrolled = ref(false)
    
    const {
      profiles,
      selectedProfile,
      selectProfile
    } = useProfileService()

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    const formatProfileName = (name) => {
      return name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }

    const currentProfile = computed(() => {
      if (route.params.profile) {
        return formatProfileName(route.params.profile)
      }
      return null
    })

    const selectProfileAndNavigate = (profileName) => {
      selectProfile(profileName)
      router.push({ name: 'ProfileSelection' })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled,
      profiles,
      selectedProfile,
      currentProfile,
      formatProfileName,
      selectProfileAndNavigate
    }
  }
}
</script>
