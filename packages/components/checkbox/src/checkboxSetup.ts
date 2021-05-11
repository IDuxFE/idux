import { computed, ComputedRef, inject, Ref, ref, watch, getCurrentInstance, SetupContext } from 'vue'
import { isArray, hasSlot } from '@idux/cdk/utils'
import { useAttrs } from '@idux/components/utils/'
import { checkboxGroupInjectionKey, subjectInjectKey } from './checkbox'
import type { CheckboxBindings, CheckboxProps } from './types'

// TODO refactor
export interface ICheckboxBindings extends CheckboxBindings {
  isChecked: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  hasDefaultSlot: ComputedRef<boolean>
  handleChange: (e: Event) => void
  handleClick: (e: Event) => void
  classes: ComputedRef<{
    'ix-checkbox-disabled': boolean
    'ix-checkbox-indeterminate': boolean
    'ix-checkbox-checked': boolean
  }>
  inputName: ComputedRef<string>
  attrs: Ref<Record<string, unknown>>
}

type CheckValue = number | string | boolean

export const setup = (props: CheckboxProps, { slots }: SetupContext): ICheckboxBindings => {
  const hasDefaultSlot = computed(() => hasSlot(slots))

  const isDisabled = useDisabled()

  const isReadonly = useReadonly()

  const { checkeValue, handleChange } = useCheckValue()

  const isChecked = useChecked(checkeValue as Ref<CheckValue>)

  const classes = useClasses(isDisabled, isChecked, isReadonly)

  const inputName = useName()

  const attrs = useAttrs({ keys: ['type', 'tabindex'] })

  const inputRef = ref(null as unknown as HTMLInputElement)

  const handleClick = (e: Event) => {
    if (isReadonly.value) {
      e.preventDefault()
    }
  }

  const focus = () => {
    if (!isReadonly.value) {
      inputRef.value.focus()
    }
  }

  const blur = () => {
    inputRef.value.blur()
  }

  return {
    isChecked,
    isDisabled,
    isReadonly,
    hasDefaultSlot,
    handleChange,
    classes,
    inputName,
    attrs,
    inputRef,
    focus,
    blur,
    handleClick,
  }
}

const useCheckValue = () => {
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
    const targetChecked = (e.target as HTMLInputElement).checked
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
  const { props } = getCurrentInstance()!
  return computed(() => {
    return !!(groupProps.disabled || props.disabled)
  })
}

const useReadonly = () => {
  const groupProps = inject(checkboxGroupInjectionKey, {})
  const { props } = getCurrentInstance()!
  return computed(() => {
    return !!(groupProps.readonly || props.readonly)
  })
}

const useClasses = (
  isDisabled: ComputedRef<boolean>,
  isChecked: ComputedRef<boolean>,
  isReadonly: ComputedRef<boolean>,
) => {
  const { props } = getCurrentInstance()!

  return computed(() => {
    const disabled = isDisabled.value
    const checked = isChecked.value
    const readonly = isReadonly.value
    const indeterminate = props.indeterminate

    return {
      'ix-checkbox-disabled': !!disabled,
      'ix-checkbox-readonly': !!readonly,
      'ix-checkbox-indeterminate': !!indeterminate,
      'ix-checkbox-checked': !indeterminate && checked,
    }
  })
}

const useName = () => {
  const groupProps = inject(checkboxGroupInjectionKey, {})
  return computed(() => groupProps.name as string)
}
