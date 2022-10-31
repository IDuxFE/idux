/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Slots, VNodeChild, computed, defineComponent, inject, normalizeClass } from 'vue'

import { isSymbol } from 'lodash-es'

import { NoopFunction, type VKey } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { IxProgress } from '@idux/components/progress'
import { convertStringVNode, useKey } from '@idux/components/utils'

import { stepperItemKey, stepperToken } from './token'
import { type StepperItemProps, type StepperProps, type StepperStatus, stepperItemProps } from './types'

export default defineComponent({
  name: 'IxStepperItem',
  props: stepperItemProps,
  [stepperItemKey]: true,
  setup(props, { slots }) {
    const key = useKey()
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-stepper-item`)
    // stepsContext must exist
    const { props: parentProps, activeKey, setActiveKey } = inject(stepperToken)!
    const isActive = computed(() => activeKey.value === key)
    const status = computed(() => {
      if (props.status) {
        return props.status
      }
      if (isActive.value) {
        return parentProps.status
      }
      const currActiveKey = activeKey.value
      if (!currActiveKey || isSymbol(currActiveKey) || isSymbol(key)) {
        return 'wait'
      }
      return currActiveKey > key ? 'finish' : 'wait'
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { disabled, icon } = props
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${status.value}`]: true,
        [`${prefixCls}-active`]: isActive.value,
        [`${prefixCls}-clickable`]: parentProps.clickable && !disabled,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-with-icon`]: icon || !!slots.icon,
      })
    })

    const onClick = () => {
      if (isActive.value) {
        return
      }
      setActiveKey(key)
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const clickable = parentProps.clickable && !props.disabled
      const iconNode = renderIcon(props, slots, parentProps, status, key)
      const titleNode = convertStringVNode(slots, props, 'title')
      const descriptionNode = convertStringVNode(slots, props, 'description')
      return (
        <div
          class={classes.value}
          role={clickable ? 'button' : undefined}
          tabindex={clickable ? 0 : undefined}
          onClick={clickable ? onClick : undefined}
        >
          <div class={`${prefixCls}-tail`}></div>
          <div class={`${prefixCls}-icon`}>{iconNode}</div>
          <div class={`${prefixCls}-content`}>
            <div class={`${prefixCls}-title`}>{titleNode}</div>
            {descriptionNode && <div class={`${prefixCls}-description`}>{descriptionNode}</div>}
          </div>
        </div>
      )
    }
  },
})

const statusIcons: Partial<Record<StepperStatus, string>> = {
  finish: 'success',
  error: 'info',
}

function renderIcon(
  props: StepperItemProps,
  slots: Slots,
  parentProps: StepperProps,
  status: ComputedRef<StepperStatus>,
  key: VKey,
) {
  const currStatus = status.value
  let node: VNodeChild
  if (slots.icon) {
    node = slots.icon({ key, status: currStatus })
  } else {
    const { icon = statusIcons[currStatus] } = props
    if (icon) {
      node = <IxIcon name={icon} />
    } else {
      node = <span>{key}</span>
    }
  }

  if (currStatus === 'process' && parentProps.percent != null) {
    const width = parentProps.size === 'sm' ? 32 : 40
    return [
      <IxProgress type="circle" percent={parentProps.percent} width={width} strokeWidth={4} format={NoopFunction} />,
      node,
    ]
  }

  return node
}
