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
import { defineComponent } from 'vue'

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
    name: 'brown',
    english: 'Brown',
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
    name: 'bud',
    english: 'Bud',
  },
  {
    name: 'green',
    english: 'Green',
  },
  {
    name: 'turquoise',
    english: 'Turquoise',
  },
  {
    name: 'cyan',
    english: 'Cyan',
  },
  {
    name: 'glacier',
    english: 'Glacier',
  },
  {
    name: 'blue',
    english: 'Blue',
  },
  {
    name: 'indigo',
    english: 'Indigo',
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
    name: 'graphite',
    english: 'Graphite',
  },
  {
    name: 'grey',
    english: 'Grey',
  },
]

export default defineComponent({
  name: 'GlobalColors',
  setup() {
    const { copy } = useClipboard()
    return { colors, levels, copy }
  },
})
</script>

<style lang="less">
@global-color-levels: l50, l40, l30, l20, l10, d10, d20, d30, d40;

.global-color-level(@color, @i: length(@global-color-levels)) when (@i > 0) {
  .global-color-level(@color, @i - 1);
  @level: extract(@global-color-levels, @i);
  @color-name: 'color-@{color}-@{level}';
  .global-color-@{color}-@{level} {
    background-color: @@color-name;
    color: @color-black;
    & when (@i > 5) {
      color: @color-white;
    }
  }
}

.global-color-classes(@i: length(@preset-colors)) when (@i > 0) {
  .global-color-classes(@i - 1);
  @color: extract(@preset-colors, @i);
  @color-name: 'color-@{color}';
  .global-color-@{color} {
    color: @color-white;
    background-color: @@color-name;
  }
  .global-color-level(@color);
}

.global-color-classes();

.global-color-grey {
  color: @color-white;
  background-color: @color-grey;
}
.global-color-level(grey);

.global-color-graphite {
  color: @color-white;
  background-color: @color-graphite;
}
.global-color-level(graphite);

.global-color {
  .global-color-row {
    width: 100%;
    display: flex;
    margin: 16px;
    .global-color-col {
      position: relative;
      flex: 1;
      margin: 0 8px;
      padding: 8px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
