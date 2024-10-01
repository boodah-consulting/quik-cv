<template>
  <li class="skill q-px-sm">{{ skill }}</li>
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
    skill: String,
  },
}
</script>
