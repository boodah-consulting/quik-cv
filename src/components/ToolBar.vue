<template>
  <div id="toolbar" class="toolbar-container">
    <q-toolbar
      class="bg-primary text-white shadow-2"
      :class="{ 'floating-toolbar': isScrolled }"
    >
    <q-btn 
      flat 
      round 
      :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" 
      @click="toggleDarkMode"
      class="q-mr-sm"
    >
      <q-tooltip>{{ $q.dark.isActive ? 'Light Mode' : 'Dark Mode' }}</q-tooltip>
    </q-btn>

    <q-separator dark vertical inset class="q-mr-sm" />

    <q-space />

    <q-breadcrumbs active-color="#CE4479" style="font-size: 16px" class="justify-center">
        <q-breadcrumbs-el icon="home" label="Home" :to="{ name: 'LandingPage' }" />
        <q-breadcrumbs-el 
          :label="currentProfile" 
          v-if="currentProfile" 
        />
      </q-breadcrumbs>

      <q-space />

      <q-btn-dropdown stretch flat icon="account_circle">
        <q-list>
          <q-item-label header>Select CV</q-item-label>
          <template v-for="profile in profiles" :key="profile.name">
            <q-expansion-item
              :label="formatProfileName(profile.name)"
              icon="folder"
              color="primary"
              header-class="text-primary text-weight-bold"
            >
              <q-item
                v-for="audience in profile.audiences"
                :key="audience.type"
                clickable
                v-close-popup
                @click="handleAudienceSelect(profile.name, audience.type)"
                tabindex="0"
                class="q-pl-lg"
              >
                <q-item-section>
                  <q-item-label>{{ audience.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </template>
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
import { useQuasar } from 'quasar'
import { useProfileService } from '@/composables/useProfileService'

export default {
  name: 'ToolBar',
  props: {},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const isScrolled = ref(false)
    
    const {
      profiles,
      selectedProfile,
      selectProfile,
      selectAudience
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
      router.push({ name: 'LandingPage' })
    }

    const handleAudienceSelect = async (profileName, audienceType) => {
      selectProfile(profileName)
      await selectAudience(audienceType)
      router.push({
        name: 'CVPage',
        params: {
          profile: profileName,
          audience: audienceType
        }
      })
    }

    const toggleDarkMode = () => {
      $q.dark.toggle()
      localStorage.setItem('darkMode', $q.dark.isActive)
    }

    onMounted(() => {
      const savedDarkMode = localStorage.getItem('darkMode')
      if (savedDarkMode !== null) {
        $q.dark.set(savedDarkMode === 'true')
      }
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
      selectProfileAndNavigate,
      handleAudienceSelect,
      toggleDarkMode,
      $q
    }
  }
}
</script>
