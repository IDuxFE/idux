import { computed, ComputedRef, inject } from 'vue'
import { RadioProps, RadioGroupConfig, radioModeConfig } from './types'
import type { InjectionKey } from 'vue'
import isEmpty from 'lodash/isEmpty'
export const getRadioAttrs = (
  props: RadioProps,
  isGroup: ComputedRef<boolean>,
  radioGroup: RadioGroupConfig,
): Record<string, ComputedRef> => {
  const isDisabled = computed(() => {
    return isGroup.value ? radioGroup.disabled : props.disabled
  })
  return {
    isDisabled,
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export const radioGroupKey: InjectionKey<RadioGroupConfig> = 'IxRadioGroup' as any

export const radioMode = (): radioModeConfig => {
  const radioGroup = inject(radioGroupKey, {} as RadioGroupConfig)
  const isGroup = computed(() => !isEmpty(radioGroup))
  return {
    isGroup,
    radioGroup,
  }
}
