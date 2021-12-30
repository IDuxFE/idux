/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FormItemProps } from './types'
import type { AbstractControl, ValidateErrors, ValidateStatus } from '@idux/cdk/forms'
import type { ColProps } from '@idux/components/grid'
import type { Locale } from '@idux/components/i18n'
import type { ComputedRef, Ref, Slots, WatchStopHandle } from 'vue'

import { computed, defineComponent, inject, provide, shallowRef, watch, watchEffect } from 'vue'

import { isFunction, isNumber, isString } from 'lodash-es'

import { useValueControl } from '@idux/cdk/forms'
import { VKey } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxCol, IxRow } from '@idux/components/grid'
import { getLocale } from '@idux/components/i18n'
import { IxIcon } from '@idux/components/icon'
import { IxTooltip } from '@idux/components/tooltip'

import { FORM_ITEM_TOKEN, formToken } from './token'
import { formItemProps } from './types'

export default defineComponent({
  name: 'IxFormItem',
  props: formItemProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-form-item`)

    const formContext = inject(formToken, null)

    const labelColConfig = computed(() => normalizeColConfig(props.labelCol ?? formContext?.labelCol.value))
    const controlColConfig = computed(() => normalizeColConfig(props.controlCol ?? formContext?.controlCol.value))
    const hasFeedback = computed(() => props.hasFeedback ?? !!formContext?.hasFeedback.value)

    const { status, statusIcon, message } = useControlStatus(props)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const currStatus = status.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-has-feedback`]: hasFeedback.value && !!currStatus,
        [`${prefixCls}-has-message`]: !!message.value,
        [`${prefixCls}-${currStatus}`]: !!currStatus,
      }
    })

    const labelClasses = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { colonless = formContext?.colonless.value, labelAlign = formContext?.labelAlign.value, required } = props
      return {
        [`${prefixCls}-label`]: true,
        [`${prefixCls}-label-colonless`]: colonless,
        [`${prefixCls}-label-required`]: required,
        [`${prefixCls}-label-start`]: labelAlign === 'start',
      }
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <IxRow class={classes.value}>
          {renderLabel(props, slots, labelClasses, labelColConfig, prefixCls)}
          {renderControl(props, slots, controlColConfig, hasFeedback, statusIcon, message, prefixCls)}
        </IxRow>
      )
    }
  },
})

function renderLabel(
  props: FormItemProps,
  slots: Slots,
  classes: ComputedRef<Record<string, unknown>>,
  labelColConfig: ComputedRef<ColProps | undefined>,
  prefixCls: string,
) {
  const { label, labelFor, labelTooltip } = props
  const { label: labelSlot, labelTooltip: labelTooltipSlot } = slots
  if (!(label || labelSlot || labelTooltip || labelTooltipSlot)) {
    return undefined
  }

  const tooltipNode =
    labelTooltipSlot?.() ??
    (labelTooltip && (
      <IxTooltip title={labelTooltip}>
        <IxIcon name="question-circle" />
      </IxTooltip>
    ))

  return (
    <IxCol class={classes.value} {...labelColConfig.value}>
      <label for={labelFor}>
        {labelSlot?.() ?? label}
        {tooltipNode && <span class={`${prefixCls}-label-tooltip`}>{tooltipNode}</span>}
      </label>
    </IxCol>
  )
}

function renderControl(
  props: FormItemProps,
  slots: Slots,
  controlColConfig: ComputedRef<ColProps | undefined>,
  hasFeedback: ComputedRef<boolean>,
  statusIcon: ComputedRef<string | undefined>,
  message: ComputedRef<string | undefined>,
  prefixCls: string,
) {
  const { extra } = props
  const { extra: extraSlot } = slots
  const statusNode = hasFeedback.value && statusIcon.value && (
    <span class={`${prefixCls}-status-icon`}>
      <IxIcon name={statusIcon.value} />
    </span>
  )
  const messageNode = message.value && <div class={`${prefixCls}-message`}>{message.value}</div>
  const extraNode = extraSlot?.() ?? extra
  const extraWrapper = extraNode && <div class={`${prefixCls}-extra`}>{extraNode}</div>
  return (
    <IxCol class={`${prefixCls}-control`} {...controlColConfig.value}>
      <div class={`${prefixCls}-control-input`}>
        <div class={`${prefixCls}-control-input-content`}>{slots.default?.()}</div>
        {statusNode}
      </div>
      {messageNode}
      {extraWrapper}
    </IxCol>
  )
}

function normalizeColConfig(col: string | number | ColProps | undefined) {
  return isNumber(col) || isString(col) ? { span: col } : col
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

  const selfControl = useValueControl()

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

const iconTypeMap = {
  invalid: 'close-circle-filled',
  validating: 'loading',
  valid: 'check-circle-filled',
} as const

function useControlStatus(props: FormItemProps) {
  const control = useControl()

  const status = useStatus(props, control)
  const message = useMessage(props, control, status)
  const statusIcon = computed(() => {
    const currStatus = status.value
    return currStatus ? iconTypeMap[currStatus] : undefined
  })

  return { status, statusIcon, message }
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

function useMessage(
  props: FormItemProps,
  control: Ref<AbstractControl | undefined>,
  status: ComputedRef<ValidateStatus | undefined>,
) {
  const locale = getLocale()
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
    const currControl = control.value
    return getMessageByError(currControl, currControl?.errors.value, locale)
  })
}

function getMessageByError(
  control: AbstractControl | undefined,
  error: ValidateErrors | undefined,
  locale: ComputedRef<Locale>,
) {
  if (!error) {
    return undefined
  }

  for (const key in error) {
    const { message, ...rest } = error[key]
    if (message) {
      if (isString(message)) {
        return message
      }

      if (isFunction(message)) {
        return message(rest, control!)
      }

      const currMessage = message[locale.value.type]
      if (isString(currMessage)) {
        return currMessage
      }
      return currMessage(rest, control!)
    }
  }

  return undefined
}
