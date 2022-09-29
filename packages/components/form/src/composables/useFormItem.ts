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
import { type VKey } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { type Locale } from '@idux/components/locales'

import { FORM_ITEM_TOKEN } from '../token'
import { type FormItemProps } from '../types'
import { useFormStatus } from './public'

export function useFormItem(props: FormItemProps): {
  status: ComputedRef<ValidateStatus | undefined>
  message: ComputedRef<string | undefined>
} {
  const control = useControl()

  const status = useFormStatus(props, control)
  const message = useMessage(props, control, status)

  return { status, message }
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

function useMessage(
  props: FormItemProps,
  control: Ref<AbstractControl | undefined>,
  status: ComputedRef<ValidateStatus | undefined>,
) {
  const locale = useGlobalConfig('locale')

  return computed(() => {
    const currStatus = status.value
    if (!currStatus) {
      return undefined
    }

    const currMessage = props.message
    if (currMessage) {
      if (isFunction(currMessage)) {
        return currMessage(control.value)
      }
      if (isObject(currMessage)) {
        return currMessage[currStatus]
      }
      return currStatus === 'invalid' ? currMessage : undefined
    }

    return getMessageByControl(control, locale)
  })
}

function getMessageByControl(control: Ref<AbstractControl | undefined>, locale: Locale) {
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

      const i18nMessage = message[locale.type]
      if (i18nMessage) {
        return isFunction(i18nMessage) ? i18nMessage(rest, currControl) : i18nMessage
      }
    }
  }
  return undefined
}
