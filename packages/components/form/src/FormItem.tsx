/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type Slot,
  type Slots,
  Transition,
  VNodeChild,
  computed,
  defineComponent,
  inject,
  normalizeClass,
} from 'vue'

import { isBoolean, isNumber, isString } from 'lodash-es'

import { ValidateStatus } from '@idux/cdk/forms'
import { CommonConfig, useGlobalConfig } from '@idux/components/config'
import { type ColProps, IxCol, IxRow } from '@idux/components/grid'
import { IxIcon } from '@idux/components/icon'
import { useThemeToken } from '@idux/components/theme'
import { IxTooltip, TooltipProps } from '@idux/components/tooltip'

import { useFormItem } from './composables/useFormItem'
import { formToken } from './token'
import { type FormItemProps, formItemProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxFormItem',
  props: formItemProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('form')
    registerToken(getThemeTokens)

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
    const mergedMessageTooltip = computed(() => props.messageTooltip ?? formProps?.messageTooltip)

    const { status, message } = useFormItem(props)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const currStatus = status.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
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
          {renderLabel(props, slots, labelClasses, labelColConfig, labelTooltipIcon, prefixCls, hashId.value)}
          {renderControl(
            props,
            slots,
            common,
            controlColConfig,
            controlTooltipIcon,
            status,
            message,
            mergedMessageTooltip,
            prefixCls,
            hashId.value,
          )}
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
  hashId: string,
) {
  const { label, labelFor, labelTooltip } = props
  const { label: labelSlot, labelTooltip: labelTooltipSlot } = slots
  if (!(label || labelSlot)) {
    return undefined
  }
  const tooltipNode = renderTooltip(labelTooltipSlot, labelTooltip, labelTooltipIcon.value, hashId)
  return (
    <IxCol class={classes.value} {...labelColConfig.value}>
      <label for={labelFor as string}>
        {labelSlot ? labelSlot() : label}
        {tooltipNode && <span class={`${prefixCls}-label-tooltip`}>{tooltipNode}</span>}
      </label>
    </IxCol>
  )
}

// TODO: refactor
function renderControl(
  props: FormItemProps,
  slots: Slots,
  common: CommonConfig,
  controlColConfig: ComputedRef<ColProps | undefined>,
  controlTooltipIcon: ComputedRef<string | undefined>,
  status: ComputedRef<ValidateStatus | undefined>,
  message: ComputedRef<string | undefined>,
  mergedMessageTooltip: ComputedRef<boolean | TooltipProps | undefined>,
  prefixCls: string,
  hashId: string,
) {
  const { controlTooltip, description } = props
  const { controlTooltip: controlTooltipSlot, description: descriptionSlot, message: messageSlot } = slots

  const tooltipNode = renderTooltip(controlTooltipSlot, controlTooltip, controlTooltipIcon.value, hashId)
  const inputNode = (
    <div class={`${prefixCls}-control-input`}>
      <div class={`${prefixCls}-control-input-content`}>{slots.default && slots.default()}</div>
      {tooltipNode && <span class={`${prefixCls}-control-tooltip`}>{tooltipNode}</span>}
    </div>
  )
  const tooltipProps = convertTooltipProps(mergedMessageTooltip.value, message.value, prefixCls, hashId)
  const descriptionNode = descriptionSlot ? descriptionSlot() : description

  const children: VNodeChild[] = []
  if (tooltipProps) {
    const tooltipSlots = {
      default: () => inputNode,
      title: messageSlot,
    }
    children.push(<IxTooltip v-slots={tooltipSlots} {...tooltipProps} />)
  } else {
    children.push(inputNode)
    const messageNode = messageSlot ? messageSlot() : message.value
    if (!descriptionNode || messageNode) {
      children.push(
        <div class={`${prefixCls}-message`}>
          <Transition name={`${common.prefixCls}-fade-down`}>
            {messageNode && <div class={`${prefixCls}-message-${status.value}`}>{messageNode}</div>}
          </Transition>
        </div>,
      )
    }
  }

  if (descriptionNode) {
    children.push(<div class={`${prefixCls}-description`}>{descriptionNode}</div>)
  }

  return (
    <IxCol class={`${prefixCls}-control`} {...controlColConfig.value}>
      {children}
    </IxCol>
  )
}

function convertTooltipProps(
  messageTooltip: boolean | TooltipProps | undefined,
  title: string | undefined,
  prefixCls: string,
  hashId: string,
): (TooltipProps & { class: string[] }) | undefined {
  if (!messageTooltip) {
    return undefined
  }
  const tooltipProps: TooltipProps & { class: string[] } = {
    class: [`${prefixCls}-message-tooltip`, hashId],
    offset: [0, 6],
    placement: 'bottomStart',
    title,
  }
  return isBoolean(messageTooltip) ? tooltipProps : { ...tooltipProps, ...messageTooltip }
}

function renderTooltip(
  slot: Slot | undefined,
  tooltip: string | undefined,
  iconName: string | undefined,
  hashId: string,
) {
  if (slot) {
    return slot()
  }
  return (
    tooltip && (
      <IxTooltip class={hashId} title={tooltip}>
        <IxIcon name={iconName} />
      </IxTooltip>
    )
  )
}
