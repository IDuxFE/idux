/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable vue/no-ref-as-operand */

import { type ComputedRef, type Ref, computed, defineComponent, inject, normalizeClass, ref } from 'vue'

import { isNil } from 'lodash-es'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { callEmit, useKey } from '@idux/cdk/utils'
import { ɵWave, type ɵWaveInstance } from '@idux/components/_private/wave'
import { useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN, useFormElement, useFormItemRegister } from '@idux/components/form'
import { useThemeToken } from '@idux/components/theme'
import { convertStringVNode } from '@idux/components/utils'

import { type RadioGroupContext, radioGroupToken } from './token'
import { type RadioProps, radioProps } from './types'
import { getThemeTokens } from '../theme'

const buttonSizeMap = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
}

export default defineComponent({
  name: 'IxRadio',
  inheritAttrs: false,
  props: radioProps,
  setup(props, { attrs, expose, slots }) {
    const key = useKey()
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('radio')
    const { hashId: buttonHashId } = useThemeToken('button')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-radio`)
    const config = useGlobalConfig('radio')

    const { elementRef, focus, blur } = useFormElement<HTMLInputElement>()
    const waveRef = ref<ɵWaveInstance>()
    expose({ focus, blur })

    const formContext = inject(FORM_TOKEN, null)
    const radioGroup = inject(radioGroupToken, null)
    const mergedName = computed(() => (attrs.name as string) ?? radioGroup?.props.name)
    const mergedValue = computed(() => {
      const { value } = props
      if (!isNil(value)) {
        return value
      }
      // 当在 group 中使用时，不传 value 就使用 key 作为 value
      return radioGroup ? key : undefined
    })
    const isButtoned = computed(() => props.buttoned ?? radioGroup?.props.buttoned)
    const size = computed(() => props.size ?? radioGroup?.props.size ?? formContext?.size.value ?? config.size)
    const mergedWaveless = computed(() => props.waveless ?? config.waveless)
    const mode = computed(() => props.mode ?? radioGroup?.props.mode ?? 'default')
    const { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus } = useRadio(
      props,
      radioGroup,
      elementRef,
      mergedValue,
      waveRef,
      mergedWaveless,
    )
    const classes = computed(() => {
      const buttoned = isButtoned.value
      const checked = isChecked.value
      const isPrimary = buttoned && checked && mode.value === 'primary'
      const prefixCls = mergedPrefixCls.value
      const commonPrefixCls = common.prefixCls
      const classes = {
        [globalHashId.value]: !!globalHashId.value,
        [buttonHashId.value]: !!buttonHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-checked`]: isChecked.value,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-${size.value}`]: buttoned,
        [`${commonPrefixCls}-button`]: buttoned,
        [`${commonPrefixCls}-button-default`]: buttoned && !isPrimary,
        [`${commonPrefixCls}-button-primary`]: isPrimary,
        [`${commonPrefixCls}-button-disabled`]: buttoned && isDisabled.value,
        [`${commonPrefixCls}-button-${buttonSizeMap[size.value]}`]: buttoned,
      }
      return normalizeClass([classes, attrs.class])
    })

    return () => {
      const { autofocus, label } = props
      const { class: className, style, type, tabindex, ...restAttrs } = attrs
      const prefixCls = mergedPrefixCls.value
      const labelNode = convertStringVNode(slots.default, label)
      return (
        <label
          class={classes.value}
          style={style as string}
          role="radio"
          aria-checked={isChecked.value}
          aria-disabled={isDisabled.value}
        >
          <span class={`${prefixCls}-input`}>
            <input
              ref={elementRef}
              type="radio"
              class={`${prefixCls}-input-inner`}
              aria-hidden
              autofocus={autofocus}
              checked={isChecked.value}
              disabled={isDisabled.value}
              name={mergedName.value}
              value={mergedValue.value}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              {...restAttrs}
            />
            {!isButtoned.value && (
              <span class={`${prefixCls}-input-box`} tabindex={tabindex as number}>
                {!mergedWaveless.value && <ɵWave ref={waveRef} />}
              </span>
            )}
          </span>
          {isButtoned.value && !mergedWaveless.value && <ɵWave ref={waveRef} />}
          {labelNode && <span class={`${prefixCls}-label`}>{labelNode}</span>}
        </label>
      )
    }
  },
})

const useRadio = (
  props: RadioProps,
  radioGroup: RadioGroupContext | null,
  elementRef: Ref<HTMLInputElement | undefined>,
  mergedValue: ComputedRef<unknown>,
  waveRef: Ref<ɵWaveInstance | undefined>,
  mergedWaveless: ComputedRef<boolean>,
) => {
  let isChecked: ComputedRef<boolean>
  let isDisabled: ComputedRef<boolean>
  const isFocused = ref(false)

  let handleChange: (evt: Event) => void
  let handleBlur: (evt: FocusEvent) => void
  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }

  if (radioGroup) {
    const { accessor, props: groupProps } = radioGroup
    isChecked = computed(() => accessor.value === mergedValue.value)
    isDisabled = computed(() => accessor.disabled || !!props.disabled)
    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      accessor.markAsBlurred()
      callEmit(props.onBlur, evt)
    }
    handleChange = (evt: Event) => {
      if (elementRef.value) {
        const checked = (evt.target as HTMLInputElement).checked
        const value = mergedValue.value
        const oldValue = accessor.value
        accessor.setValue(value)
        // 为了保持受控模式下保持原生input状态和数据一致
        elementRef.value.checked = false
        callEmit(props.onChange, checked, !checked)
        callEmit(groupProps.onChange, value, oldValue)
        !mergedWaveless.value && waveRef.value?.play()
      }
    }
  } else {
    const { accessor, control } = useAccessorAndControl({ valueKey: 'checked' })
    useFormItemRegister(control)
    isChecked = computed(() => !!accessor.value)
    isDisabled = computed(() => accessor.disabled)
    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      accessor.markAsBlurred()
      callEmit(props.onBlur, evt)
    }
    handleChange = (evt: Event) => {
      if (elementRef.value) {
        const checked = (evt.target as HTMLInputElement).checked
        accessor.setValue(checked)
        elementRef.value.checked = false
        callEmit(props.onChange, checked, !checked)
        !mergedWaveless.value && waveRef.value?.play()
      }
    }
  }

  return { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus }
}
