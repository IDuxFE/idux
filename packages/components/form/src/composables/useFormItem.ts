/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type Ref,
  type WatchStopHandle,
  computed,
  provide,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'

import { isFunction, isObject, isString } from 'lodash-es'

import { type AbstractControl, type ValidateStatus, useControl as useSelfControl } from '@idux/cdk/forms'
import { Logger, type VKey } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { type Locale } from '@idux/components/locales'

import { FORM_ITEM_TOKEN } from '../token'
import { type FormItemProps, type FormProps } from '../types'

export function useFormItem(
  props: FormItemProps,
  formProps: FormProps | undefined,
): {
  status: ComputedRef<ValidateStatus | undefined>
  statusIcon: ComputedRef<string | undefined>
  message: ComputedRef<string | undefined>
} {
  const control = useControl()

  const status = useStatus(props, control)
  const statusIcon = useStatusIcon(props, formProps, status)
  const message = useMessage(props, control, status)

  return { status, statusIcon, message }
}

function useControl() {
  const firstChildControl = shallowRef<AbstractControl>()
  let firstChildKey: VKey | undefined
  let firstChildWatchStop: WatchStopHandle | undefined

  const registerControl = (key: VKey, control: Ref<AbstractControl | undefined>) => {
    if (!firstChildWatchStop) {
      firstChildKey = key
      firstChildWatchStop = watchEffect(() => (firstChildControl.value = control.value))
    }
  }
  const unregisterControl = (key: VKey) => {
    if (key === firstChildKey) {
      if (firstChildWatchStop) {
        firstChildWatchStop()
        firstChildWatchStop = undefined
      }
      firstChildControl.value = undefined
    }
  }

  provide(FORM_ITEM_TOKEN, { registerControl, unregisterControl })

  const selfControl = useSelfControl()

  const control = shallowRef<AbstractControl>()

  watch(
    [selfControl, firstChildControl],
    ([self, child]) => {
      const target = self ?? child
      if (control.value !== target) {
        control.value = target
      }
    },
    { immediate: true },
  )

  return control
}

function useStatus(props: FormItemProps, control: Ref<AbstractControl | undefined>) {
  return computed(() => {
    if (props.status) {
      return props.status
    }
    const currControl = control.value
    if (!currControl) {
      return undefined
    }
    const { trigger, dirty, blurred } = currControl
    if ((trigger === 'change' && dirty.value) || (trigger === 'blur' && blurred.value)) {
      return currControl.status.value
    }
    return undefined
  })
}

const defaultIconMap = {
  invalid: 'close-circle-filled',
  validating: 'loading',
  valid: 'check-circle-filled',
} as const

function useStatusIcon(
  props: FormItemProps,
  formProps: FormProps | undefined,
  status: ComputedRef<ValidateStatus | undefined>,
) {
  return computed(() => {
    const currStatus = status.value
    if (!currStatus) {
      return undefined
    }

    const icon = props.hasFeedback ?? props.statusIcon ?? formProps?.hasFeedback ?? formProps?.statusIcon
    if (__DEV__ && (props.hasFeedback || formProps?.hasFeedback)) {
      Logger.warn('components/form', '`hasFeedback` was deprecated.')
    }
    if (__DEV__ && (props.statusIcon || formProps?.statusIcon)) {
      Logger.warn('components/form', '`statusIcon` was deprecated.')
    }
    if (!icon) {
      return undefined
    }

    const iconMap = isObject(icon) ? { ...defaultIconMap, ...icon } : defaultIconMap
    return iconMap[currStatus]
  })
}

function useMessage(
  props: FormItemProps,
  control: Ref<AbstractControl | undefined>,
  status: ComputedRef<ValidateStatus | undefined>,
) {
  const locale = useGlobalConfig('locale')
  const messages = computed(() => {
    const message = props.message
    return isString(message) || isFunction(message) ? { invalid: message } : message || {}
  })
  return computed(() => {
    const currStatus = status.value
    if (!currStatus) {
      return undefined
    }

    const currMessage = messages.value[currStatus]
    if (currMessage) {
      return isString(currMessage) ? currMessage : currMessage(control.value!)
    }

    return getMessage(control, locale)
  })
}

function getMessage(control: Ref<AbstractControl | undefined>, locale: Locale) {
  const currControl = control.value
  if (!currControl) {
    return undefined
  }

  const error = currControl.errors.value
  for (const key in error) {
    const { message, ...rest } = error[key]
    if (message) {
      if (isString(message)) {
        return message
      }

      if (isFunction(message)) {
        return message(rest, currControl)
      }

      const currMessage = message[locale.type]
      if (isString(currMessage)) {
        return currMessage
      }
      return currMessage(rest, currControl)
    }
  }
  return undefined
}
