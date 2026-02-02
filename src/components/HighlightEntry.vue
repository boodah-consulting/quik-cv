<template>
  <li class="highlight">{{ highlight }}</li>
</template>

<style></style>

<script>
export default {
  name: 'HighlightEntry',
  props: {
    highlight: {
      type: String,
      required: true
    }
  }
}
</script>