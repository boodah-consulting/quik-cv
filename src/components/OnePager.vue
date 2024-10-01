<template>
  <q-page class="q-px-xs q-py-xs row flex">
    <span id="caption" class="col-12 text-small text-center">
      {{ captions.heading }}
    </span>
    <div class="row">
      <div class="col-8 left-hand-side">
        <ExperienceComponent />
      </div>
      <section class="col-4 right-hand-side">
        <SkillsComponent />
        <ProjectsComponent />
      </section>
    </div>
  </q-page>
</template>

<style></style>

<script>

import captions from './../data/captions.yaml'

import ExperienceComponent from './Experience.vue'
import ProjectsComponent from './Projects.vue'
import SkillsComponent from './Skills.vue'

/**
 *
 * Component used to display the CV as a one pager
 *
 * Usage:
 *   <OnePager />
 *
 * @module OnePager
 *
 */
export default {
  name: 'OnePager',
  data: function () {
    return {
      captions,
    };
  },
  components: {
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
  }
}
</script>
