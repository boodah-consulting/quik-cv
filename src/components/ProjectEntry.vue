<template>
  <li class="project-description">
    <div>
      <a target="_" v-bind:href="project.url">
        {{ project.name }}
      </a>
      <div v-html="description"></div>
    </div>
  </li>
</template>

<style></style>

<script>
import markdownit from 'markdown-it'

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})

/**
 *
 * Component used to display a single project entry
 *
 * Usage:
 *   <ProjectEntry :project="project" />
 *
 * @param {Object} project - The project object to display
 *
 * @module ProjectEntry
 *
 */
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
    }
  }
}
</script>
