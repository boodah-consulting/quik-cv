<template>
  <div>
    <div class="text-h6 col row text-centre text-weight-bolder">Skills</div>
    <ul id="skills" class="flex row">
      <SkillEntry v-for="skill in skills" :key="skill" :skill="skill" />
    </ul>
  </div>
</template>

<style>
ul#skills {
  list-style-type: none;
}
</style>

<script>

import skills from './../data/skills.yaml'

import SkillEntry from './SkillEntry.vue'

/**
 *
 * Component used to display the skills section
 *
 * Usage:
 *   <SkillsComponent />
 *
 * @module SkillsComponent
 *
 */
export default {
  name: 'SkillsComponent',
  data: function () {
    return {
      skills,
    };
  },
  components: {
    SkillEntry,
  }
}
</script>
