import { ref, onMounted } from 'vue'
import yaml from 'js-yaml'

export function useProfileService() {
  const profiles = ref([])
  const selectedProfile = ref(null)
  const selectedAudience = ref(null)
  const audienceData = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const loadProfiles = async () => {
    loading.value = true
    error.value = null
    
    try {
      const manifestResponse = await fetch('/profiles/manifest.json')
      if (!manifestResponse.ok) {
        throw new Error('Failed to load profiles manifest')
      }
      
      const manifest = await manifestResponse.json()
      
      profiles.value = manifest.profiles.map(profile => ({
        name: profile.name,
        audiences: profile.audiences.map(audience => ({
          type: audience,
          title: audience.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
        }))
      }))
    } catch (err) {
      error.value = `Failed to load profiles: ${err.message}`
      console.error('Profile service error:', err)
    } finally {
      loading.value = false
    }
  }

  const loadAudienceData = async (profileName, audienceType) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/profiles/${profileName}/${audienceType}.yaml`)
      if (!response.ok) {
        throw new Error('Failed to load CV data')
      }
      
      const yamlContent = await response.text()
      audienceData.value = yaml.load(yamlContent)
      return audienceData.value
    } catch (err) {
      error.value = `Failed to load CV data: ${err.message}`
      console.error('Audience data error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const selectProfile = (profileName) => {
    const profile = profiles.value.find(p => p.name === profileName)
    if (profile) {
      selectedProfile.value = profile
      selectedAudience.value = null
      audienceData.value = null
    }
  }

  const selectAudience = async (audienceType, profileName = null) => {
    if (selectedProfile.value) {
      const audience = selectedProfile.value.audiences.find(a => a.type === audienceType)
      if (audience) {
        selectedAudience.value = audience
        await loadAudienceData(selectedProfile.value.name, audienceType)
        return audience
      }
    } else if (profileName) {
      selectedAudience.value = { type: audienceType, title: audienceType }
      await loadAudienceData(profileName, audienceType)
      return selectedAudience.value
    }
    return null
  }

  const resetSelection = () => {
    selectedProfile.value = null
    selectedAudience.value = null
    audienceData.value = null
  }

  const getProfileByName = (profileName) => {
    return profiles.value.find(p => p.name === profileName) || null
  }

  onMounted(() => {
    loadProfiles()
  })

  return {
    profiles,
    selectedProfile,
    selectedAudience,
    audienceData,
    loading,
    error,
    selectProfile,
    selectAudience,
    loadAudienceData,
    resetSelection,
    getProfileByName
  }
}