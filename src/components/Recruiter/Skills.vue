<template>
  <div>
    <div class="text-h6 col row text-centre text-weight-bolder">Skills</div>
    <ul id="skills" class="flex row">
      <SkillEntry v-for="skill in this.sortedSkills" :key="skill" :skill="skill" />
    </ul>
  </div>
</template>

<style>
ul#skills {
  list-style-type: none;
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
