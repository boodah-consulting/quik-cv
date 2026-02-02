<template>
  <div class="skill q-px-sm"><b>{{ type }}</b>: {{ list }}</div>
</template>

<style></style>

<script>
/**
 *
 * Component used to display a single skill
 *
 * Usage:
 *   <SkillEntry />
 *
 * @module SkillEntry
 *
 */
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
  },
  methods: {
  },
  mounted() {
  }
}
</script>
