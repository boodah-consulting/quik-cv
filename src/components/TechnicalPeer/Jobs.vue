<template>
  <div class="col-6">
    <div class="text-h6 col row text-weight-bolder">Experience</div>
    <div class="q-px-xs q-mx-md">
      <JobEntry v-for="job in jobs" :key="job.id" :job="job" />
    </div>
  </div>
</template>

<style></style>

<script>
import JobEntry from '@technical-peer/Job.vue'

/**
 *
 * Component used to display the experience section
 *
 * Usage:
 *   <ExperienceComponent :jobs="this.cv.projects" />
 *
 * @module ExperienceComponent
 *
 */
export default {
  name: 'JobsComponent',
  props: {
    jobs: {
      type: Array,
      required: true
    }
  },
  components: {
    JobEntry,
  }
}
</script>
