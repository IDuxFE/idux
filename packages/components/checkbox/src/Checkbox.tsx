/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable vue/no-ref-as-operand */

import { type ComputedRef, Ref, computed, defineComponent, inject, normalizeClass, ref } from 'vue'

import { isNil } from 'lodash-es'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { callEmit, useKey } from '@idux/cdk/utils'
import { ɵWave, type ɵWaveInstance } from '@idux/components/_private/wave'
import { getButtonThemeTokens } from '@idux/components/button'
import { useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN, useFormElement, useFormItemRegister } from '@idux/components/form'
import { useThemeToken } from '@idux/components/theme'
import { convertStringVNode } from '@idux/components/utils'

import { type CheckboxGroupContext, checkboxGroupToken } from './token'
import { type CheckValue, type CheckboxProps, checkboxProps } from './types'
import { getThemeTokens } from '../theme'

const buttonSizeMap = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
}

export default defineComponent({
  name: 'IxCheckbox',
  inheritAttrs: false,
  props: checkboxProps,
  setup(props, { attrs, expose, slots }) {
    const key = useKey()
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('checkbox')
    const { hashId: buttonHashId, registerToken: registerButtonToken } = useThemeToken('button')
    registerToken(getThemeTokens)
    registerButtonToken(getButtonThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox`)
    const config = useGlobalConfig('checkbox')

    const { elementRef, focus, blur } = useFormElement()
    const waveRef = ref<ɵWaveInstance>()
    expose({ focus, blur })

    const formContext = inject(FORM_TOKEN, null)
    const checkboxGroup = inject(checkboxGroupToken, null)
    const mergedName = computed(() => (attrs.name as string) ?? checkboxGroup?.props.name)
    const mergedValue = computed(() => {
      const { value } = props
      if (!isNil(value)) {
        return value
      }
      // 当在 group 中使用时，不传 value 就使用 key 作为 value
      return checkboxGroup ? key : undefined
    })
    const isButtoned = computed(() => props.buttoned ?? checkboxGroup?.props.buttoned ?? false)
    const size = computed(() => props.size ?? checkboxGroup?.props.size ?? formContext?.size.value ?? config.size)
    const mergedWaveless = computed(() => props.waveless ?? config.waveless)
    const { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus } = useCheckbox(
      props,
      checkboxGroup,
      mergedValue,
      waveRef,
      mergedWaveless,
    )
    const classes = computed(() => {
      const { indeterminate } = props
      const buttoned = isButtoned.value
      const prefixCls = mergedPrefixCls.value
      const commonPrefixCls = common.prefixCls
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [buttonHashId.value]: !!buttonHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-checked`]: !indeterminate && isChecked.value,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-indeterminate`]: indeterminate,
        [`${prefixCls}-${size.value}`]: buttoned,
        [`${commonPrefixCls}-button`]: buttoned,
        [`${commonPrefixCls}-button-default`]: buttoned,
        [`${commonPrefixCls}-button-disabled`]: buttoned && isDisabled.value,
        [`${commonPrefixCls}-button-${buttonSizeMap[size.value]}`]: buttoned,
      })
    })

    return () => {
      const { autofocus, label, indeterminate } = props
      const { class: className, style, type, tabindex, ...restAttrs } = attrs
      const prefixCls = mergedPrefixCls.value
      const checked = isChecked.value
      const labelNode = convertStringVNode(slots.default, label)
      const checkboxNode = (
        <label
          class={slots.fieldset ? classes.value : normalizeClass([classes.value, className])}
          style={slots.fieldset ? undefined : (style as string)}
        >
          <span
            class={`${prefixCls}-input`}
            role="checkbox"
            aria-checked={indeterminate ? 'mixed' : String(!!checked)}
            aria-disabled={String(!!isDisabled.value)}
          >
            <input
              ref={elementRef}
              type="checkbox"
              class={`${prefixCls}-input-inner`}
              aria-hidden
              autofocus={autofocus}
              name={mergedName.value}
              value={mergedValue.value}
              checked={checked}
              disabled={isDisabled.value}
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
          {isButtoned.value && <span class={`${prefixCls}-input-tick`} tabindex={tabindex as number} />}
          {isButtoned.value && !mergedWaveless.value && <ɵWave ref={waveRef} />}
          {labelNode && <span class={`${prefixCls}-label`}>{labelNode}</span>}
        </label>
      )

      if (slots.fieldset) {
        return (
          <div
            class={normalizeClass([
              `${prefixCls}-wrapper`,
              className,
              globalHashId.value,
              hashId.value,
              buttonHashId.value,
            ])}
            style={style as string}
          >
            {checkboxNode}
            <div class={normalizeClass([`${prefixCls}-fieldset`, !checked ? `${prefixCls}-fieldset-hidden` : ''])}>
              {slots.fieldset()}
            </div>
          </div>
        )
      }

      return checkboxNode
    }
  },
})

const useCheckbox = (
  props: CheckboxProps,
  checkboxGroup: CheckboxGroupContext | null,
  mergedValue: ComputedRef<unknown>,
  waveRef: Ref<ɵWaveInstance | undefined>,
  mergedWaveless: ComputedRef<boolean>,
) => {
  let isChecked: ComputedRef<boolean>
  let isDisabled: ComputedRef<boolean>

  let handleChange: (evt: Event) => void
  let handleBlur: (evt: FocusEvent) => void
  const isFocused = ref(false)
  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }

  if (checkboxGroup) {
    const { props: groupProps, accessor } = checkboxGroup
    isChecked = computed(() => (accessor.value || []).includes(mergedValue.value))
    isDisabled = computed(() => accessor.disabled || !!props.disabled)

    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      accessor.markAsBlurred()
      callEmit(props.onBlur, evt)
    }

    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      const { trueValue, falseValue } = props
      const value = mergedValue.value
      const checkValue = checked ? trueValue : falseValue
      const oldCheckValue = !checked ? trueValue : falseValue

      const oldValue = accessor.value || []
      const newValue = [...oldValue]
      const checkValueIndex = newValue.indexOf(value)
      if (checkValueIndex === -1) {
        newValue.push(value)
      } else {
        newValue.splice(checkValueIndex, 1)
      }

      accessor.setValue(newValue)
      callEmit(props.onChange, checkValue, oldCheckValue)
      callEmit(groupProps.onChange, newValue, oldValue)
      !mergedWaveless.value && waveRef.value?.play()
    }
  } else {
    const { accessor, control } = useAccessorAndControl<CheckValue>({ valueKey: 'checked' })
    useFormItemRegister(control)

    isChecked = computed(() => accessor.value === props.trueValue)
    isDisabled = computed(() => accessor.disabled)

    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      accessor.markAsBlurred()
      callEmit(props.onBlur, evt)
    }

    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      const { trueValue, falseValue } = props
      const newChecked = checked ? trueValue : falseValue
      const oldChecked = !checked ? trueValue : falseValue
      accessor.setValue(newChecked)
      callEmit(props.onChange, newChecked, oldChecked)
      !mergedWaveless.value && waveRef.value?.play()
    }
  }

  return { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus }
}
