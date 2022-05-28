/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { VNode, computed, defineComponent, normalizeStyle, onUnmounted, provide, reactive } from 'vue'

import { isObject } from 'lodash-es'

import { CdkPortal } from '@idux/cdk/portal'
import { addClass, convertCssPixel, removeClass } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { convertTarget } from '@idux/components/utils'

import IxSpin from './Spin'
import { spinProviderToken } from './token'
import { type SpinContainerOptions, type SpinProviderOptions, spinProviderProps } from './types'

export default defineComponent({
  name: 'IxSpinProvider',
  inheritAttrs: false,
  props: spinProviderProps,
  setup(_, { expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-spin-provider`)

    const spinContainersMap = reactive(new Map<HTMLElement, SpinContainerOptions>())

    const convertProviderOptions = (tip?: string, options?: SpinProviderOptions) => {
      const _options = isObject(tip) ? tip : options ?? {}

      const { tip: optionTip, target = 'body', ...reset } = _options

      const convertedTip = optionTip ?? tip

      return {
        convertedTip,
        target,
        ...reset,
      }
    }

    const elementHasScroll = (element: HTMLElement) => {
      return element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth
    }

    const open = (tip?: string, options?: SpinProviderOptions) => {
      const { convertedTip, target, ...reset } = convertProviderOptions(tip, options)
      const targetElement = convertTarget(target) as HTMLElement
      const hasScroll = elementHasScroll(targetElement)
      const isFullScreen = targetElement === document.body
      const staticPosition = getComputedStyle(targetElement).position === 'static'

      addClass(
        targetElement,
        [
          `${mergedPrefixCls.value}-position`,
          staticPosition ? `${mergedPrefixCls.value}-position-relative` : '',
          !isFullScreen && hasScroll ? `${mergedPrefixCls.value}-position-has-scroll` : '',
        ].filter(Boolean),
      ),
      spinContainersMap.set(targetElement, {
        spinning: true,
        tip: convertedTip,
        hasScroll,
        isFullScreen: targetElement === document.body,
        staticPosition,
        // 当存在滚动条且需要遮住全部除了全屏外（fixed可以解决）
        // 其余几乎无此真实场景，所以不考虑resize时动态赋值width和height，目前也没办法解决
        width: targetElement.scrollWidth,
        height: targetElement.scrollHeight,
        ...reset,
      })
    }

    const deleteContainerOptions = (container: HTMLElement) => {
      spinContainersMap.delete(container)
      removeClass(container, [
        `${mergedPrefixCls.value}-position`,
        `${mergedPrefixCls.value}-position-relative`,
        `${mergedPrefixCls.value}-position-has-scroll`,
      ])
    }

    const close = (target = 'body') => {
      const targetElement = convertTarget(target) as HTMLElement
      deleteContainerOptions(targetElement)
    }

    const update = (tip?: string, options?: SpinProviderOptions) => {
      const { convertedTip, target, ...reset } = convertProviderOptions(tip, options)

      const targetElement = convertTarget(target) as HTMLElement
      if (spinContainersMap.has(targetElement)) {
        const options = spinContainersMap.get(targetElement)
        if (options) {
          spinContainersMap.set(targetElement, {
            ...options,
            ...reset,
            spinning: true,
            tip: convertedTip,
          })
        }
      }
    }

    const closeAll = () => {
      spinContainersMap.forEach((_, container) => {
        deleteContainerOptions(container)
      })
    }

    const apis = {
      open,
      update,
      close,
      closeAll,
    }

    expose(apis)

    provide(spinProviderToken, apis)

    onUnmounted(() => {
      closeAll()
    })

    return () => {
      const children: VNode[] = []

      spinContainersMap.forEach((options, container) => {
        let BaseZindex = 2000
        const { spinning, width, height, isFullScreen, hasScroll, tip } = options
        const style = normalizeStyle({
          width: !isFullScreen && hasScroll && convertCssPixel(width),
          height: !isFullScreen && hasScroll && convertCssPixel(height),
          position: isFullScreen ? 'fixed' : '',
          zIndex: BaseZindex++,
        })
        spinning &&
          children.push(
            <CdkPortal target={container}>
              <IxSpin style={style} tip={tip} />
            </CdkPortal>,
          )
      })

      return (
        <>
          {slots.default?.()}
          {children}
        </>
      )
    }
  },
})
