/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Slot, type Slots, computed, defineComponent, inject, normalizeClass } from 'vue'

import { isNumber, isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { type ColProps, IxCol, IxRow } from '@idux/components/grid'
import { IxIcon } from '@idux/components/icon'
import { IxTooltip } from '@idux/components/tooltip'

import { useFormItem } from './composables/useFormItem'
import { formToken } from './token'
import { type FormItemProps, formItemProps } from './types'

export default defineComponent({
  name: 'IxFormItem',
  props: formItemProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-form-item`)
    const { props: formProps, config } = inject(formToken, null) || {}

    const colonless = computed(() => props.colonless ?? formProps?.colonless ?? config?.colonless)
    const labelAlign = computed(() => props.labelAlign ?? formProps?.labelAlign ?? config?.labelAlign)
    const labelColConfig = computed(() => normalizeColConfig(props.labelCol ?? formProps?.labelCol))
    const labelTooltipIcon = computed(
      () => props.labelTooltipIcon ?? formProps?.labelTooltipIcon ?? config?.labelTooltipIcon,
    )
    const controlColConfig = computed(() => normalizeColConfig(props.controlCol ?? formProps?.controlCol))
    const controlTooltipIcon = computed(
      () => props.controlTooltipIcon ?? formProps?.controlTooltipIcon ?? config?.controlTooltipIcon,
    )
    const { status, statusIcon, message } = useFormItem(props, formProps)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const currStatus = status.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-with-message`]: !!message.value,
        [`${prefixCls}-with-status-icon`]: !!statusIcon.value,
        [`${prefixCls}-${currStatus}`]: !!currStatus,
      })
    })

    const labelClasses = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-label`]: true,
        [`${prefixCls}-label-colon`]: !colonless.value,
        [`${prefixCls}-label-required`]: props.required,
        [`${prefixCls}-label-start`]: labelAlign.value === 'start',
      })
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <IxRow class={classes.value}>
          {renderLabel(props, slots, labelClasses, labelColConfig, labelTooltipIcon, prefixCls)}
          {renderControl(props, slots, controlColConfig, controlTooltipIcon, statusIcon, message, prefixCls)}
        </IxRow>
      )
    }
  },
})

function normalizeColConfig(col: string | number | ColProps | undefined) {
  return isNumber(col) || isString(col) ? { span: col } : col
}

function renderLabel(
  props: FormItemProps,
  slots: Slots,
  classes: ComputedRef<string>,
  labelColConfig: ComputedRef<ColProps | undefined>,
  labelTooltipIcon: ComputedRef<string | undefined>,
  prefixCls: string,
) {
  const { label, labelFor, labelTooltip } = props
  const { label: labelSlot, labelTooltip: labelTooltipSlot } = slots
  if (!(label || labelSlot)) {
    return undefined
  }
  const tooltipNode = renderTooltip(labelTooltipSlot, labelTooltip, labelTooltipIcon.value)
  return (
    <IxCol class={classes.value} {...labelColConfig.value}>
      <label for={labelFor}>
        {labelSlot ? labelSlot() : label}
        {tooltipNode && <span class={`${prefixCls}-label-tooltip`}>{tooltipNode}</span>}
      </label>
    </IxCol>
  )
}

function renderControl(
  props: FormItemProps,
  slots: Slots,
  controlColConfig: ComputedRef<ColProps | undefined>,
  controlTooltipIcon: ComputedRef<string | undefined>,
  statusIcon: ComputedRef<string | undefined>,
  message: ComputedRef<string | undefined>,
  prefixCls: string,
) {
  const { controlTooltip, description, extra, extraMessage } = props
  const {
    controlTooltip: controlTooltipSlot,
    extra: extraSlot,
    extraMessage: extraMessageSlot,
    description: descriptionSlot,
  } = slots
  if (__DEV__ && (extra || extraSlot)) {
    Logger.warn('components/form', '`extra` was deprecated, please use `description` instead.')
  }
  if (__DEV__ && (extraMessage || extraMessageSlot)) {
    Logger.warn('components/form', '`extraMessage` was deprecated, please use `description` instead.')
  }
  const statusNode = statusIcon.value && (
    <span class={`${prefixCls}-status-icon`}>
      <IxIcon name={statusIcon.value} />
    </span>
  )
  const messageNode = message.value && <div class={`${prefixCls}-message`}>{message.value}</div>
  const _descriptionSlot = extraSlot || extraMessageSlot || descriptionSlot
  const descriptionNode = _descriptionSlot ? _descriptionSlot() : extra || extraMessage || description
  const descriptionWrapper = descriptionNode && <div class={`${prefixCls}-description`}>{descriptionNode}</div>
  const tooltipNode = renderTooltip(controlTooltipSlot, controlTooltip, controlTooltipIcon.value)
  return (
    <IxCol class={`${prefixCls}-control`} {...controlColConfig.value}>
      <div class={`${prefixCls}-control-input`}>
        <div class={`${prefixCls}-control-input-content`}>{slots.default && slots.default()}</div>
        {statusNode}
        {tooltipNode && <span class={`${prefixCls}-control-tooltip`}>{tooltipNode}</span>}
      </div>
      {messageNode}
      {descriptionWrapper}
    </IxCol>
  )
}

function renderTooltip(slot: Slot | undefined, tooltip: string | undefined, iconName: string | undefined) {
  if (slot) {
    return slot()
  }
  return (
    tooltip && (
      <IxTooltip title={tooltip}>
        <IxIcon name={iconName} />
      </IxTooltip>
    )
  )
}
