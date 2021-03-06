<template>
  <div class="ix-title" :class="classes">
    <div class="ix-title-main">
      <span v-if="prefix || $slots.prefix" class="ix-title-prefix">
        <slot name="prefix"><ix-icon :name="prefix" @click="onPrefixClick" /></slot>
      </span>
      <span v-if="title || $slots.default" class="ix-title-content">
        <slot>{{ title }}</slot>
      </span>
      <span v-if="subTitle || $slots.subTitle" class="ix-title-sub">
        <slot name="subTitle">{{ subTitle }}</slot>
      </span>
    </div>
    <div v-if="extras.length > 0 || $slots.extra" class="ix-title-extra">
      <slot name="extra">
        <ix-icon v-for="(icon, index) in extras" :key="icon + index" :name="icon" @click="onExtraClick(icon, $event)" />
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import type { TitleProps } from './types'

import { computed, defineComponent } from 'vue'
import { PropTypes, toArray, withUndefined } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

export default defineComponent({
  name: 'IxTitle',
  components: { IxIcon },
  props: {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    extra: withUndefined(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
    size: PropTypes.oneOf(['extraLarge', 'large', 'medium', 'small'] as const).def('large'),
    prefix: PropTypes.string,
  },
  emits: ['prefixClick', 'extraClick'],
  setup(props: TitleProps, { emit }) {
    const classes = useClasses(props)

    const extras = computed(() => toArray(props.extra))

    const onPrefixClick = (evt: MouseEvent) => emit('prefixClick', evt)
    const onExtraClick = (name: string, evt: MouseEvent) => emit('extraClick', name, evt)

    return { classes, extras, onPrefixClick, onExtraClick }
  },
})

const useClasses = (props: TitleProps) => {
  return computed(() => {
    const sizeClass = `ix-title-${props.size}`
    return {
      [sizeClass]: true,
    }
  })
}
</script>
