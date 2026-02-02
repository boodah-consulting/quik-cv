<template>
  <div class="col-6">
    <div class="text-h6 col row text-weight-bolder">Experience</div>
    <div class="q-px-xs q-mx-md">
      <JobEntry v-for="job in jobs" :key="job.id" :job="job" />
    </div>
  </div>
</template>

<script>
import JobEntry from './JobEntry.vue'

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
