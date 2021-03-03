<template>
  <div :class="classes" :style="tagStyle">
    <span v-if="icon || $slots.icon" class="ix-tag-icon">
      <slot name="icon"><ix-icon :name="icon" /></slot>
    </span>
    <span class="ix-tag-content"><slot></slot></span>
    <ix-icon v-if="closable" name="close" class="ix-tag-close-icon" @click="onClose" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { TagOriginalProps } from './types'
import { isPresetColor, isStatusColor } from '@idux/components/utils'
import { PropTypes } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxTag',
  components: { IxIcon },
  props: {
    closable: PropTypes.bool,
    icon: PropTypes.string,
    color: PropTypes.string,
    checked: PropTypes.bool,
    checkAble: PropTypes.bool,
    isRound: PropTypes.bool,
  },
  emits: ['close'],
  setup(props: TagOriginalProps, { emit }) {
    const _isPresetColor = (): boolean => {
      const color = props.color
      return isPresetColor(color as string) || isStatusColor(color as string)
    }

    const classes = useClasses(props, _isPresetColor())
    const onClose = (evt: MouseEvent) => emit('close', evt)

    const tagStyle = computed(() => {
      const color = props.color
      const isPresetOrStatus = isPresetColor(color) || isStatusColor(color)
      return { backgroundColor: isPresetOrStatus ? undefined : color }
    })

    return {
      classes,
      tagStyle,
      onClose,
    }
  },
})

const useClasses = (props: TagOriginalProps, isPresetColor: boolean) => {
  return computed(() => {
    const colorClass = `ix-tag-${props.color}`
    const presetFlag = isPresetColor && !props.checkAble
    return {
      'ix-tag': true,
      'ix-tag-round': props.isRound,
      [colorClass]: presetFlag,
      'ix-tag-has-color': props.color ? !presetFlag : false,
      'ix-tag-checkable': props.checkAble,
      'ix-tag-checkable-checked': props.checkAble && props.checked,
    }
  })
}
</script>
