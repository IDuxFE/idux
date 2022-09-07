/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Teleport, computed, defineComponent, ref, watch } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

import { type PortalTargetType, portalProps } from './types'

export default defineComponent({
  name: 'CdkPortal',
  props: portalProps,
  setup(props, { slots }) {
    const loaded = ref(props.load)
    watch(
      () => props.load,
      load => {
        if (!loaded.value) {
          loaded.value = load
        }
      },
    )

    const elementRef = computed(() => convertTargetElement(props.target))

    return () => {
      if (!loaded.value) {
        return null
      }

      return (
        <Teleport to={elementRef.value} disabled={props.disabled}>
          {slots.default && slots.default()}
        </Teleport>
      )
    }
  },
})

function convertTargetElement(target: PortalTargetType) {
  const elementOrSelector = isFunction(target) ? target() : target

  if (!isString(elementOrSelector)) {
    return elementOrSelector
  }

  return getTargetElement(elementOrSelector)
}

function getTargetElement(selector: string) {
  let element = document.querySelector(selector)
  if (element) {
    return element
  }

  const selectorType = selector.startsWith('.') ? 'class' : selector.startsWith('#') ? 'id' : undefined
  // TODO: 临时兼容性处理
  // 如果不是 class 或者 id 选择器，就尝试添加 class 前缀再查找一次
  if (!selectorType) {
    __DEV__ && Logger.warn('cdk/portal', 'the selector of target supports only simple id or class')
    element = document.querySelector(`.${selector}`)
    if (element) {
      return element
    }
  }

  const attrName = selectorType || 'class'
  const attrValue = selectorType ? selector.substring(1) : selector
  return createDivElement(attrName, attrValue)
}

function createDivElement(attrName: string, attrValue: string) {
  const element = document.createElement('div')
  element.setAttribute(attrName, attrValue)
  document.body.appendChild(element)
  return element
}
