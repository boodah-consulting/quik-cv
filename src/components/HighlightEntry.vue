<template>
  <div class="highlight-chip q-mr-xs">
    {{ highlight }}
  </div>
</template>

<style>
.highlight-chip {
  display: inline-block;
  padding: 2px 4px;
  font-size: 0.85rem;
  line-height: 1.3;
  color: black !important;
}

body.body--dark .highlight-chip {
  color: white !important;
}

@media print {
  .body--dark .highlight-chip {
    color: white !important;
  }
}
</style>

<script>
export default {
  name: 'HighlightEntry',
  props: {
    highlight: {
      type: String,
      required: true
    },
  }
}
</script>
