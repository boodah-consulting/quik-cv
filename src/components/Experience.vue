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
import jobs from './../data/jobs.yaml'

import JobEntry from './JobEntry.vue'

/**
 *
 * Component used to display the experience section
 *
 * Usage:
 *   <ExperienceComponent />
 *
 * @module ExperienceComponent
 *
 */
export default {
  name: 'ProjectsComponent',
  data: function () {
    return {
      jobs,
    };
  },
  components: {
    JobEntry,
  }
}
</script>
