import { computed, ComputedRef, inject, Ref, ref, watch, getCurrentInstance, SetupContext } from 'vue'
import { isArray, hasSlot } from '@idux/cdk/utils'
import { useAttrs } from '@idux/components/core/utils/'
import { checkboxGroupInjectionKey, subjectInjectKey } from './checkbox'
import type { CheckboxProps, CheckboxBindings } from './types'

type CheckValue = number | string | boolean

export const setup = (props: CheckboxProps, { slots }: SetupContext): CheckboxBindings => {
  const hasDefaultSlot = computed(() => hasSlot(slots))

  const isDisabled = useDisabled()

  const { checkeValue, handleChange } = useCheckValue()

  const isChecked = useChecked(checkeValue as Ref<CheckValue>)

  const classes = useClasses(isDisabled, isChecked)

  const inputName = useName()

  const attrs = useAttrs({ keys: ['type', 'tabindex'] })

  return {
    isChecked,
    isDisabled,
    hasDefaultSlot,
    handleChange,
    classes,
    inputName,
    attrs,
  }
}

const useCheckValue = () => {
  //eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { props, emit } = getCurrentInstance()!
  const groupSubject = inject(subjectInjectKey, null)
  const checkeValue = ref(props.checked ?? props.falseValue)

  watch(
    () => props.checked,
    v => {
      checkeValue.value = v
    },
  )

  const handleChange = (e: Event) => {
    const targetChecked = (e.target as EventTarget).checked
    const targetCheckValue = targetChecked ? props.trueValue : props.falseValue
    // no value props passed
    if (props.checked === void 0) {
      checkeValue.value = targetCheckValue
    }
    emit('update:checked', targetCheckValue)
    emit('change', targetCheckValue)
    groupSubject?.dispatch((props.value ?? targetCheckValue) as string)
  }

  return {
    checkeValue,
    handleChange,
  }
}

const useChecked = (checkValue: Ref<CheckValue>) => {
  const groupProps = inject(checkboxGroupInjectionKey, {})
  //eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { props } = getCurrentInstance()!

  return computed(() => {
    const groupValue = groupProps.value
    if (groupValue && isArray(groupValue)) {
      return groupValue.includes((props.value ?? checkValue.value) as string)
    }

    return checkValue.value === props.trueValue
  })
}

const useDisabled = () => {
  const groupProps = inject(checkboxGroupInjectionKey, {})
  //eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { props } = getCurrentInstance()!
  return computed(() => {
    return !!(groupProps.disabled || props.disabled)
  })
}

const useClasses = (isDisabled: ComputedRef<boolean>, isChecked: ComputedRef<boolean>) => {
  //eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { props } = getCurrentInstance()!

  return computed(() => {
    const disabled = isDisabled.value
    const checked = isChecked.value
    const indeterminate = props.indeterminate
    return {
      'ix-checkbox-disabled': !!disabled,
      'ix-checkbox-indeterminate': !!indeterminate,
      'ix-checkbox-checked': !indeterminate && checked,
    }
  })
}

const useName = () => {
  const groupProps = inject(checkboxGroupInjectionKey, {})
  return computed(() => groupProps.name as string)
}
