<template>
  <div class="global-color">
    <div v-for="(color, index) in colors" :key="index" class="global-color-row">
      <span
        v-for="level in levels"
        :key="level"
        class="global-color-col"
        :class="'global-color-' + color.name + (level ? '-' + level : '')"
        @click="copy(color.name + (level ? '-' + level : ''))"
      >
        {{ color.name }}{{ level ? '-' + level : '' }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useClipboard } from '@idux/cdk/clipboard'

const levels = ['l50', 'l40', 'l30', 'l20', 'l10', '', 'd10', 'd20', 'd30', 'd40']

const colors = [
  {
    name: 'red',
    english: 'Red',
  },
  {
    name: 'orange',
    english: 'Orange',
  },
  {
    name: 'gold',
    english: 'Gold',
  },
  {
    name: 'yellow',
    english: 'Yellow',
  },
  {
    name: 'canary',
    english: 'Canary',
  },
  {
    name: 'prasinous',
    english: 'Prasinous',
  },
  {
    name: 'verdant',
    english: 'Verdant',
  },
  {
    name: 'green',
    english: 'Green',
  },
  {
    name: 'cyan',
    english: 'Cyan',
  },
  {
    name: 'sky',
    english: 'Sky',
  },
  {
    name: 'blue',
    english: 'Blue',
  },
  {
    name: 'admiral',
    english: 'Admiral',
  },
  {
    name: 'purple',
    english: 'Purple',
  },
  {
    name: 'magenta',
    english: 'Magenta',
  },
  {
    name: 'lime',
    english: 'Lime',
  },
  {
    name: 'grey',
    english: 'Grey',
  },
]

export default defineComponent({
  name: 'GlobalColors',
  setup() {
    const language = inject('language')

    const { copy } = useClipboard()
    return { language, colors, levels, copy }
  },
})
</script>
