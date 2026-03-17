<template>
  <section class="experience row q-mb-md">
    <div class="col-8">
      <span class="job-title">
        {{ job.company }}
      </span>
      <span class="text-weight-bolder">
        -
      </span>
      <span class="job-position">
        {{ job.position }}
      </span>
    </div>
    <div class="col job-dates text-subtitle2 text-right">
      <span class="job-start-date">
        {{ job.start_date }}
      </span>
      -
      <span class="job-end-date">
        {{ job.end_date }}
      </span>
    </div>
    <span v-html="jobDescriptionHtml" class="col-12 job-description"> </span>
  </section>
</template>

<script>
import markdownit from 'markdown-it'
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})

export default {
  name: 'JobEntry',
  props: {
    job: {
      type: Object,
      required: true
    },
  },
  computed: {
    jobDescriptionHtml() {
      return md.render(this.job.description)
    }
  }
}
</script>
