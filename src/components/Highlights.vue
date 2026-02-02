<template>
  <div>
    <div class="text-h6 col row text-weight-bolder">Highlights</div>
    <ul id="highlights">
      <HighlightEntry v-for="(highlight, index) in highlightsList" :key="index" :highlight="highlight" />
    </ul>
  </div>
</template>

<style>
ul#highlights {
  list-style-type: disc;
  padding-left: 1.5em;
  margin: 0;
}

ul#highlights li {
  margin-bottom: 0.25em;
  line-height: 1.4;
}
</style>

<script>
import HighlightEntry from '@/components/HighlightEntry.vue'

export default {
  name: 'HighlightsComponent',
  props: {
    highlights: {
      type: [String, Array],
      required: true
    }
  },
  components: {
    HighlightEntry,
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