import type { TagConfig } from '@idux/components/config'
import type { TagProps } from './types'

import { computed, defineComponent, ComputedRef, Slots } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { useGlobalConfig } from '@idux/components/config'
import { isPresetColor, isStatusColor } from '@idux/components/utils'
import { tagProps } from './types'
import { callEmit } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxTag',
  props: tagProps,
  setup(props, { slots }) {
    const isPresetOrStatusColor = computed(() => {
      const color = props.color
      return isPresetColor(color) || isStatusColor(color)
    })

    const config = useGlobalConfig('tag')

    const classes = useClasses(props, config, isPresetOrStatusColor)
    const tagStyle = useStyle(props, isPresetOrStatusColor)

    const prefixIcon = usePrefixIcon(props, slots)
    const suffixIcon = useSuffixIcon(props, config)

    return () => {
      return (
        <div class={classes.value} style={tagStyle.value}>
          {prefixIcon}
          <span class="ix-tag-content">{slots.default?.()}</span>
          {suffixIcon}
        </div>
      )
    }
  },
})

function useClasses(props: TagProps, config: TagConfig, isPresetOrStatusColor: ComputedRef<boolean>) {
  return computed(() => {
    const colorClass = `ix-tag-${props.color}`
    const presetFlag = isPresetOrStatusColor.value && (!props.checkable || !config.checkable)
    const checkable = props.checkable ?? config.checkable
    const shapeClass = `ix-tag-${props.shape ?? config.shape}`

    return {
      'ix-tag': true,
      [shapeClass]: true,
      [colorClass]: presetFlag,
      'ix-tag-has-color': props.color ? !presetFlag : false,
      'ix-tag-checkable': checkable,
      'ix-tag-checkable-checked': checkable && props.checked,
    }
  })
}

function useStyle(props: TagProps, isPresetOrStatusColor: ComputedRef<boolean>) {
  return computed(() => {
    return { backgroundColor: isPresetOrStatusColor.value ? undefined : props.color }
  })
}

function usePrefixIcon(props: TagProps, slots: Slots) {
  const icon = props.icon

  // slot first
  const iconSlot = slots.icon?.() ?? (icon ? <IxIcon name={icon}></IxIcon> : null)
  return iconSlot ? <span class="ix-tag-icon">{iconSlot}</span> : null
}

function useSuffixIcon(props: TagProps, _config: TagConfig) {
  const closeAble = computed(() => {
    return props.closable
  })
  const onClose = (event: MouseEvent) => {
    callEmit(props['onClose'], event)
    event.stopPropagation()
  }
  if (closeAble.value) {
    return <IxIcon name="close" class="ix-tag-close-icon" onClick={onClose} />
  }
  return null
}
