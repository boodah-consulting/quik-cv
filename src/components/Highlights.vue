<template>
  <div class="q-my-md text-center">
    <div class="text-h6 row text-weight-bolder q-mb-sm text-center">Highlights</div>
    <div class="highlights-container justify-center">
      <div v-for="(highlight, index) in highlightsList" :key="index" class="highlight-chip q-my-xs q-mr-xs" :class="{ 'highlight-chip-first': index === 0 }">
        {{ highlight }}
      </div>
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

.highlight-chip {
  display: inline-block;
  padding: 4px 8px;
  background-color: rgba(var(--q-primary-rgb), 0.1);
  border-left: 3px solid var(--q-primary);
  border-radius: 2px;
  font-size: 0.85rem;
  line-height: 1.3;
  color: var(--q-dark);
}

.highlight-chip-first {
  border-left: none !important;
}
</style>

<script>
export default {
  name: 'HighlightsComponent',
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