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
import { computed, defineComponent } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { TagProps } from './types'
import { isPresetColor, isStatusColor } from '@idux/components/utils'
import { PropTypes } from '@idux/cdk/utils'
import { TagConfig, useGlobalConfig } from '@idux/components/config'

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
  setup(props: TagProps, { emit }) {
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
