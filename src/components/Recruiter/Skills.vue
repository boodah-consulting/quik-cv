<template>
  <div id="skills">
    <div class="text-h6 col row text-weight-bolder">Skills</div>
    <div id="skills-list" class="flex row wrap justify-between">
      <SkillEntry v-for="skill in this.sortedSkills" :key="skill" :skill="skill" />
    </div>
  </div>
</template>

<style>
#skills-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>

<script>
import SkillEntry from '@recruiter/Skill.vue'

/**
 *
 * Component used to display the skills section
 *
 * Usage:
 *   <SkillsComponent :skills="this.cv.skills" />
 *
 * @module SkillsComponent
 *
 */
export default {
  name: 'SkillsComponent',
  props: {
    skills: {
      type: Object,
      required: true
    }
  },
  components: {
    SkillEntry,
  },
  computed: {
    sortedSkills() {
      const skills = Object.keys(this.skills).map(key => {
        return { type: key, skills: this.skills[key] }
      })

      return skills
    }
  }

}
</script>
