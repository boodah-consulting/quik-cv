<template>
  <q-page>
    <div v-if="loading" class="row justify-center">
      <div class="col-8 text-center q-pt-xl">
        <q-spinner size="2em" color="primary" />
        <p class="q-mt-md text-grey">Loading profiles...</p>
      </div>
    </div>

    <div v-else-if="error" class="row justify-center">
      <div class="col-8 text-center q-pt-xl">
        <p class="text-negative">{{ error }}</p>
        <q-btn flat color="primary" label="Retry" @click="loadProfiles" />
      </div>
    </div>

    <div v-else-if="profiles.length === 0" class="row justify-center">
      <div class="col-8 text-center q-pt-xl">
        <p class="text-grey">No profiles available</p>
      </div>
    </div>

    <div v-else class="row justify-center q-pt-lg">
      <div class="col-10">
        <div class="text-center q-mb-xl">
          <h1 class="text-h4 q-mb-sm">Select Profile</h1>
          <p class="text-grey">Choose a CV profile to continue</p>
        </div>

        <div class="row q-col-gutter-lg justify-center">
          <div v-for="profile in profiles" :key="profile.name" class="col-12 col-sm-6 col-md-4">
            <q-card flat bordered class="profile-card cursor-pointer q-pa-md" @click="handleProfileSelect(profile.name)">
              <div class="text-center">
                <div class="text-h6 q-mb-xs">{{ formatProfileName(profile.name) }}</div>
                <div class="text-caption text-grey q-mb-md">
                  {{ profile.audiences.length }} versions
                </div>
                
                <q-separator class="q-my-md" />
                
                <div class="text-left">
                  <div v-for="audience in profile.audiences" :key="audience.type" 
                       class="q-mb-xs text-body2"
                       @click.stop="handleAudienceSelect(profile.name, audience.type)">
                    <span class="text-primary">› {{ audience.title }}</span>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.profile-card {
  transition: all 0.2s ease;
  height: 100%;
}

.profile-card:hover {
  border-color: var(--q-primary);
  background: rgba(var(--q-primary-rgb), 0.02);
}
</style>

<script>
import { useRouter } from 'vue-router'
import { useProfileService } from '@/composables/useProfileService'

export default {
  name: 'LandingPage',
  setup() {
    const router = useRouter()
    
    const {
      profiles,
      loading,
      error,
      selectProfile,
      selectAudience,
      loadProfiles
    } = useProfileService()

    const formatProfileName = (name) => {
      return name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }

    const handleProfileSelect = (profileName) => {
      selectProfile(profileName)
    }

    const handleAudienceSelect = async (profileName, audienceType) => {
      await selectAudience(audienceType)
      router.push({
        name: 'CVPage',
        params: {
          profile: profileName,
          audience: audienceType
        }
      })
    }

    return {
      profiles,
      loading,
      error,
      formatProfileName,
      handleProfileSelect,
      handleAudienceSelect,
      loadProfiles
    }
  }
}
</script>