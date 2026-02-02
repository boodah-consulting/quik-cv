<template>
  <q-page>
    <ContactInformation v-if="audienceData" :data="audienceData" />
    <div class="q-px-xs q-py-xs row flex" v-if="audienceData">
      <span id="caption" class="col-12 text-small text-center" v-html="summaryHtml">
      </span>
      <span id="caption" class="col-12 text-small text-center" v-html="highlightsHtml" v-if="audienceData.highlights">
      </span>
      <div class="row">
        <div class="col-8 left-hand-side">
          <JobsComponent :jobs="audienceData.jobs" />
        </div>
        <section class="col-4 right-hand-side">
          <SkillsComponent :skills="audienceData.skills" />
          <ProjectsComponent :projects="audienceData.projects" />
        </section>
      </div>
    </div>
    <div class="row justify-center" v-else-if="loading">
      <div class="col-8 text-center q-pt-xl">
        <q-spinner size="2em" color="primary" />
        <p class="q-mt-md text-grey">Loading CV...</p>
      </div>
    </div>
    <div class="row justify-center" v-else>
      <div class="col-8 text-center q-pt-xl">
        <p class="text-negative">Unable to load CV</p>
        <q-btn flat color="primary" label="Select Profile" @click="changeProfile" />
      </div>
    </div>
  </q-page>
</template>

<style></style>

<script>
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { useProfileService } from '@/composables/useProfileService'

import JobsComponent from '@/components/Recruiter/Jobs.vue'
import ProjectsComponent from '@/components/Recruiter/Projects.vue'
import SkillsComponent from '@/components/Recruiter/Skills.vue'
import ContactInformation from '@/components/ContactInformation.vue'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

export default {
  name: 'CVPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const {
      loading,
      selectAudience,
      audienceData
    } = useProfileService()

    const profileName = computed(() => route.params.profile)
    const audienceType = computed(() => route.params.audience)

    const summaryHtml = computed(() => {
      return audienceData.value ? md.render(audienceData.value.summary) : ''
    })

    const highlightsHtml = computed(() => {
      return audienceData.value && audienceData.value.highlights 
        ? md.render(audienceData.value.highlights) 
        : ''
    })

    const changeProfile = () => {
      router.push({ name: 'ProfileSelection' })
    }

    const loadData = async () => {
      if (profileName.value && audienceType.value) {
        await selectAudience(audienceType.value, profileName.value)
      }
    }

    watch(() => route.params, () => {
      loadData()
    })

    onMounted(() => {
      loadData()
    })

    return {
      loading,
      audienceData,
      summaryHtml,
      highlightsHtml,
      changeProfile
    }
  },
  components: {
    JobsComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactInformation
  }
}
</script>