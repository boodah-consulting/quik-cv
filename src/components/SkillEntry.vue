<template>
  <div class="skill q-px-sm"><b>{{ type }}</b>: {{ list }}</div>
</template>

<script>
export default {
  name: 'SkillEntry',
  props: {
    skill: {
      required: true
    },
  },
  computed: {
    type() {
      return this.skill.type
    },
    list() {
      if (!this.skill.skills) {
        return ''
      }
      return this.skill.skills.join(', ')
    }
  }
}
</script>
