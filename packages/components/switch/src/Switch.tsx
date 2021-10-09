/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, computed, defineComponent, onMounted, ref } from 'vue'

import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import { useFormItemRegister } from '@idux/components/form'
import { IxIcon } from '@idux/components/icon'

import { SwitchProps, switchProps } from './types'

export default defineComponent({
  name: 'IxSwitch',
  props: switchProps,
  setup(props) {
    const { switchRef, focus, blur } = useElement()
    const { isChecked, isDisabled, handleClick, handleBlur, handleMouseup } = useSwitch(props, blur)
    const isSmallSize = computed(() => props.size === 'small')
    const classes = useClasses(props, isChecked, isDisabled, isSmallSize)

    onMounted(() => {
      props.autofocus && focus()
    })

    return {
      isChecked,
      isDisabled,
      classes,
      switchRef,
      handleClick,
      handleBlur,
      handleMouseup,
      focus,
      blur,
    }
  },
  render() {
    const { loading, checkedChildren, unCheckedChildren, isChecked, classes, handleClick, handleBlur, handleMouseup } =
      this
    const checkedChild = this.$slots.checkedChildren ? this.$slots.checkedChildren() : checkedChildren
    const unCheckedChild = this.$slots.unCheckedChildren ? this.$slots.unCheckedChildren() : unCheckedChildren
    return (
      <button
        ref="switchRef"
        type="button"
        class={classes}
        onClick={handleClick}
        onMouseup={handleMouseup}
        onBlur={handleBlur}
      >
        {loading && (
          <div class="ix-switch-loading-icon">
            <IxIcon name="loading" />
          </div>
        )}
        <div class="ix-switch-inner">{isChecked ? checkedChild : unCheckedChild}</div>
      </button>
    )
  },
})

const useSwitch = (props: SwitchProps, blur: () => void) => {
  const { accessor } = useValueAccessor<boolean>({ valueKey: 'checked' })
  useFormItemRegister()
  const isChecked = computed(() => accessor.value)
  const isDisabled = computed(() => props.disabled ?? accessor.disabled)

  const handleClick = () => {
    if (isDisabled.value || props.loading) {
      return
    }
    callEmit(props.onChange, !isChecked.value)
    accessor.setValue(!isChecked.value)
  }

  const handleBlur = (evt: FocusEvent) => {
    callEmit(props.onBlur, evt)
    accessor.markAsBlurred()
  }

  const handleMouseup = () => {
    blur()
  }

  return { isChecked, isDisabled, handleClick, handleBlur, handleMouseup }
}

const useClasses = (
  props: SwitchProps,
  isChecked: ComputedRef<boolean>,
  isDisabled: ComputedRef<boolean>,
  isSmallSize: ComputedRef<boolean>,
) => {
  return computed(() => {
    return {
      'ix-switch': true,
      'ix-switch-loading': props.loading,
      'ix-switch-checked': isChecked.value,
      'ix-switch-disabled': isDisabled.value,
      'ix-switch-small': isSmallSize.value,
    }
  })
}

const useElement = () => {
  const switchRef = ref<HTMLButtonElement>()
  const focus = (options?: FocusOptions) => switchRef.value?.focus(options)
  const blur = () => switchRef.value?.blur()
  return { switchRef, focus, blur }
}
