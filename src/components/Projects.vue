<template>
  <div class="col-4">
    <div id="projects" >
      <div class="text-h6 col row text-centre text-weight-bolder">
        Projects
      </div>
      <ul>
        <ProjectEntry
           v-for="project in projects"
           :key="project.id"
           :project="project"
         />
      </ul>
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
