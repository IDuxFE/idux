<template>
  <div :class="classes" :style="tagStyle">
    <span v-if="icon || $slots.icon" class="ix-tag-icon">
      <slot name="icon"><ix-icon :name="icon" /></slot>
    </span>
    <span class="ix-tag-content"><slot></slot></span>
    <ix-icon v-if="closeAbleFlag" name="close" class="ix-tag-close-icon" @click="onClose" />
  </div>
</template>
<script lang="ts">
import type { TagConfig } from '@idux/components/config'
import type { TagProps } from './types'

import { computed, defineComponent } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { useGlobalConfig } from '@idux/components/config'
import { isPresetColor, isStatusColor } from '@idux/components/utils'
import { tagProps } from './types'

export default defineComponent({
  name: 'IxTag',
  components: { IxIcon },
  props: tagProps,
  emits: ['close'],
  setup(props, { emit }) {
    const isPresetOrStatusColor = computed(() => {
      const color = props.color
      return isPresetColor(color) || isStatusColor(color)
    })

    const config = useGlobalConfig('tag')
    const classes = useClasses(props, config, isPresetOrStatusColor.value)
    const onClose = (evt: MouseEvent) => emit('close', evt)
    const tagStyle = computed(() => {
      return { backgroundColor: isPresetOrStatusColor.value ? undefined : props.color }
    })
    const closeAbleFlag = computed(() => {
      return props.closable ?? config.closable
    })

    return {
      classes,
      tagStyle,
      onClose,
      closeAbleFlag,
    }
  },
})

const useClasses = (props: TagProps, config: TagConfig, isPresetOrStatusColor: boolean) => {
  return computed(() => {
    const colorClass = `ix-tag-${props.color}`
    const presetFlag = isPresetOrStatusColor && (!props.checkAble || !config.checkAble)
    const checkAble = props.checkAble ?? config.checkAble
    const isRound = props.isRound ?? config.isRound

    return {
      'ix-tag': true,
      'ix-tag-round': isRound,
      [colorClass]: presetFlag,
      'ix-tag-has-color': props.color ? !presetFlag : false,
      'ix-tag-checkable': checkAble,
      'ix-tag-checkable-checked': checkAble && props.checked,
    }
  })
}
</script>
