<template>
  <div class="text-center">
    <div class="text-h6 row text-weight-bolder q-mb-sm text-center">Highlights</div>
    <div class="highlights-container justify-center">
      <HighlightEntry v-for="(highlight, index) in highlightsList" :key="index" :highlight="highlight" :is-first="index === 0" />
    </div>
  </div>
</template>

<style>
.highlights-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}
</style>

<script>
import HighlightEntry from './HighlightEntry.vue'

export default {
  name: 'HighlightsComponent',
  components: {
    HighlightEntry,
  },
  props: {
    highlights: {
      type: [String, Array],
      required: true
    }
  },
  computed: {
    highlightsList() {
      if (Array.isArray(this.highlights)) {
        return this.highlights
      }

      if (typeof this.highlights === 'string') {
        return this.highlights
          .split('\n')
          .map(line => line.replace(/^-\s*/, '').trim())
          .filter(line => line.length > 0)
      }

      return []
    }
  }
}
</script>
