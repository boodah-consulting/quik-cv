<template>
  <q-page>
    <ContactInformation />
    <div class="q-px-xs q-py-xs row flex">
      <span id="caption" class="col-12 text-small text-center" v-html="summaryHtml">
      </span>
      <span id="caption" class="col-12 text-small text-center" v-html="highlightsHtml">
      </span>
      <div class="row">
        <div class="col-8 left-hand-side">
          <JobsComponent :jobs="this.cv.jobs" />
        </div>
        <section class="col-4 right-hand-side">
          <SkillsComponent :skills="this.cv.skills" />
          <ProjectsComponent :projects="this.cv.projects" />
        </section>
      </div>
    </div>
  </q-page>
</template>

<style></style>

<script>

import JobsComponent from '@/components/EngineeringManager/Jobs.vue'
import ProjectsComponent from '@/components/EngineeringManager/Projects.vue'
import SkillsComponent from '@/components/EngineeringManager/Skills.vue'

import ContactInformation from '@/components/ContactInformation.vue'

import markdownit from 'markdown-it'
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})

/**
 *
 * Component used to display the CV as a one pager
 *
 * Usage:
 *   <EngineeringManagerPage />
 *
 * @module EngineeringManagerPage
 *
 */
export default {
  name: 'EngineeringManagerPage',
  props: {
    cv: {
      type: Object,
      required: true
    }
  },
  components: {
    ContactInformation,
    JobsComponent,
    ProjectsComponent,
    SkillsComponent,
  },
  computed: {
    summaryHtml() {
      return md.render(this.cv.summary)
    },
    highlightsHtml() {
      return md.render(this.cv.highlights)
    }
  }
}
</script>
