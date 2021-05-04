import { Ref, computed, ComputedRef } from 'vue'
import { CollapsePanelProps } from './types'

export const useCollapseClasses = (
  props: CollapsePanelProps,
  borderless: Ref<boolean>,
  isActive: Ref<boolean>,
): ComputedRef<Record<string, boolean>> => {
  return computed(() => {
    const disabled = props.disabled

    return {
      'ix-collapse-panel-disabled': disabled,
      'ix-collapse-panel-active': isActive.value,
      'ix-collapse-panel-borderless': borderless.value,
    }
  })
}

export const useCollapseHeaderClasses = (
  props: CollapsePanelProps,
  borderless: Ref<boolean>,
  isActive: Ref<boolean>,
): ComputedRef<Record<string, boolean>> => {
  return computed(() => {
    const disabled = props.disabled

    return {
      'ix-collapse-panel-header-disabled': disabled,
      'ix-collapse-panel-header-inactive': !isActive.value,
      'ix-collapse-panel-header-borderless': borderless.value,
    }
  })
}
