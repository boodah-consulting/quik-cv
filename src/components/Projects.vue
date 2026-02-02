<template>
  <div id="projects">
    <div class="text-h6 col row text-weight-bolder">Projects</div>
    <div id="projects-list" class="flex row wrap justify-between">
      <ProjectEntry v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<script>
import ProjectEntry from './ProjectEntry.vue'

export default {
  name: 'ProjectsComponent',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  components: {
    ProjectEntry,
  }
}
</script>
