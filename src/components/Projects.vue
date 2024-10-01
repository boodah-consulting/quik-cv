<template>
  <div class="col-4">
    <div>
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

<style></style>

<script>
import projects from './../data/projects.yaml'

import ProjectEntry from './ProjectEntry.vue'

/**
 *
 * Component used to display the projects section
 *
 * Usage:
 *   <ProjectsComponent />
 *
 * @module ProjectsComponent
 *
 */
export default {
  name: 'ProjectsComponent',
  data: function () {
    return {
      projects
    };
  },
  components: {
    ProjectEntry,
  }
}
</script>
