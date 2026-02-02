<template>
  <li class="project-description q-pa-sm">
    <div class="q-mb-sm">
      <a target="_" v-bind:href="project.url">
        {{ project.name }}
      </a>
      <div v-html="description"></div>
      <div v-if="key_achievements && key_achievements.length > 0">
        <span class="text-weight-bolder">Key Achievements:</span>
        <ul v-for="item in key_achievements" :key="item">
          <li>{{ item }}</li>
        </ul>
      </div>
      <div v-if="technologies && technologies.length > 0">
        <span class="text-weight-bolder">Technologies</span>
        <ul v-for="item in technologies" :key="item">
          <li>{{ item }}</li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
import markdownit from 'markdown-it'

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})

export default {
  name: 'ProjectEntry',
  props: {
    project: {
      type: Object,
      required: true
    },
  },
  computed: {
    projectUrl() {
      return this.project.url
    },
    description() {
      return md.render(this.project.description)
    },
    key_achievements() {
      return this.project.key_achievements
    },
    technologies() {
      return this.project.technologies
    }
  }
}
</script>
