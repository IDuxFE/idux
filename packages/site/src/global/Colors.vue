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

const levels = ['l50', 'l40', 'l30', 'l20', 'l10', '', 'd10', 'd20', 'd30', 'd40', 'd50']

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
    const { copy } = useClipboard()
    return { colors, levels, copy }
  },
})
</script>

<style lang="less">
@global-color-levels: l50, l40, l30, l20, l10, d10, d20, d30, d40, d50;

.global-color-level(@color, @i: length(@global-color-levels)) when (@i > 0) {
  .global-color-level(@color, @i - 1);
  @level: extract(@global-color-levels, @i);
  @color-level: '@{color}-@{level}';
  .global-color-@{color}-@{level} {
    background-color: @@color-level;
    color: @black;
    & when (@i > 5) {
      color: @white;
    }
  }
}

.global-color-classes(@i: length(@preset-colors)) when (@i > 0) {
  .global-color-classes(@i - 1);
  @color: extract(@preset-colors, @i);
  .global-color-@{color} {
    color: @white;
    background-color: @@color;
  }
  .global-color-level(@color);
}

.global-color-classes();

.global-color-grey {
  color: @white;
  background-color: @grey;
}
.global-color-level(grey);

.global-color-lime {
  color: @white;
  background-color: @lime;
}
.global-color-level(lime);

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
