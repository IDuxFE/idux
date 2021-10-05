<template>
  <div :class="classes" :style="tagStyle">
    <span v-if="icon || $slots.icon" :class="`${prefixCls}-tag-icon`">
      <slot name="icon"><IxIcon :name="icon" /></slot>
    </span>
    <span :class="`${prefixCls}-tag-content`"><slot></slot></span>
    <IxIcon v-if="closeAbleFlag" name="close" :class="`${prefixCls}-tag-close-icon`" @click="onClose" />
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

    const { prefixCls } = useGlobalConfig('common')
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
      prefixCls,
      classes,
      tagStyle,
      onClose,
      closeAbleFlag,
    }
  },
})

const useClasses = (props: TagProps, config: TagConfig, isPresetOrStatusColor: boolean) => {
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    const colorClass = `${prefixCls}-tag-${props.color}`
    const presetFlag = isPresetOrStatusColor && (!props.checkAble || !config.checkAble)
    const checkAble = props.checkAble ?? config.checkAble
    const isRound = props.isRound ?? config.isRound

    return {
      [`${prefixCls}-tag`]: true,
      [`${prefixCls}-tag-round`]: isRound,
      [colorClass]: presetFlag,
      [`${prefixCls}-tag-has-color`]: props.color ? !presetFlag : false,
      [`${prefixCls}-tag-checkable`]: checkAble,
      [`${prefixCls}-tag-checkable-checked`]: checkAble && props.checked,
    }
  })
}
</script>
