/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, VNode, computed, defineComponent, nextTick, normalizeStyle, provide, ref } from 'vue'

import { CdkPortal, type PortalTargetType } from '@idux/cdk/portal'
import { useResizeObserver } from '@idux/cdk/resize'
import { addClass, convertArray, convertCssPixel, removeClass } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { convertTarget } from '@idux/components/utils'

import IxSpin from './Spin'
import { SPIN_PROVIDER_TOKEN } from './token'
import { type SpinMergedOptions, type SpinOptions, SpinRef, SpinRefUpdateOptions, spinProviderProps } from './types'

const BASE_ZINDEX = 2000

export default defineComponent({
  name: 'IxSpinProvider',
  inheritAttrs: false,
  props: spinProviderProps,
  setup(_, { expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-spin`)

    const { spins, open, update, destroy, destroyAll } = useSpin(mergedPrefixCls)

    const apis = { open, update, destroy, destroyAll }

    provide(SPIN_PROVIDER_TOKEN, apis)
    expose(apis)

    return () => {
      const children: VNode[] = []

      spins.value.forEach((spinOptions, index) => {
        const { spinning, target, width, height, isFullScreen, hasScroll, tip, zIndex } = spinOptions
        const BaseZindex = zIndex ?? BASE_ZINDEX + index
        const style = normalizeStyle({
          width: !isFullScreen && hasScroll ? convertCssPixel(width) : null,
          height: !isFullScreen && hasScroll ? convertCssPixel(height) : null,
          position: isFullScreen ? 'fixed' : '',
          zIndex: BaseZindex,
        })
        spinning &&
          children.push(
            <CdkPortal target={target}>
              <IxSpin style={style} tip={tip} />
            </CdkPortal>,
          )
      })

      return (
        <>
          {children}
          {slots.default?.()}
        </>
      )
    }
  },
})

function useSpin(mergedPrefixCls: ComputedRef<string>) {
  const spins = ref<SpinMergedOptions[]>([])

  const _convertTarget = (target: PortalTargetType) => {
    const targetElement = convertTarget(target)
    return targetElement === window ? null : (targetElement as HTMLElement)
  }

  const elementHasScroll = (element: HTMLElement) => {
    return element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth
  }

  const deleteClass = (targetElement: HTMLElement) => {
    removeClass(targetElement, [
      `${mergedPrefixCls.value}-target-container`,
      `${mergedPrefixCls.value}-target-container-relative`,
      `${mergedPrefixCls.value}-target-container-has-scroll`,
    ])
  }

  const getCurrIndex = (target: PortalTargetType) => {
    return spins.value.findIndex(spin => spin.target === target)
  }

  const add = (item: SpinMergedOptions) => {
    const target = item.target
    const currIndex = getCurrIndex(target)
    if (currIndex !== -1) {
      spins.value.splice(currIndex, 1, item)
    }

    spins.value.push(item)
  }

  const update = (options: SpinOptions) => {
    const { target = 'body' } = options
    const currIndex = getCurrIndex(target)
    if (currIndex !== -1) {
      const newItem = { ...spins.value[currIndex], ...options }
      spins.value.splice(currIndex, 1, newItem)
    }
  }

  const destroy = (target: PortalTargetType | PortalTargetType[] = 'body') => {
    const targets = convertArray(target)
    targets.forEach(target => {
      const currIndex = getCurrIndex(target)
      if (currIndex !== -1) {
        const item = spins.value.splice(currIndex, 1)[0]
        const targetElement = _convertTarget(item.target)
        targetElement && deleteClass(targetElement)
        item.stopResizeWatch?.()
      }
    })
  }

  const destroyAll = () => {
    destroy(spins.value.map(item => item.target))
    spins.value = []
  }

  const open = (options: SpinOptions): SpinRef => {
    const { target = 'body', ...reset } = options

    if (getCurrIndex(target) === -1) {
      const targetElement = convertTarget(target) as HTMLElement
      const hasScroll = elementHasScroll(targetElement)
      const isFullScreen = targetElement === document.body
      const staticPosition = getComputedStyle(targetElement).position === 'static'

      addClass(
        targetElement,
        [
          `${mergedPrefixCls.value}-target-container`,
          staticPosition ? `${mergedPrefixCls.value}-target-container-relative` : '',
        ].filter(Boolean),
      )

      let stopResizeWatch: (() => void) | undefined

      if (!isFullScreen) {
        stopResizeWatch = useResizeObserver(targetElement, () => {
          // 由于spin是传送到target内部，为了不影响target的真实宽高判断
          // 为了兼容scroll和resize同时存在时spin依然能遮住target区域
          // 所以每次resize时需要把spin宽高置为0，再nextTick中再判断是否出现滚轮
          const currIndex = getCurrIndex(target)
          spins.value[currIndex].width = 0
          spins.value[currIndex].height = 0
          nextTick(() => {
            const hasScroll = elementHasScroll(targetElement)
            spins.value[currIndex].hasScroll = hasScroll
            const hasScrollClsName = `${mergedPrefixCls.value}-target-container-has-scroll`
            if (hasScroll) {
              addClass(targetElement, hasScrollClsName)
              spins.value[currIndex].width = targetElement.scrollWidth
              spins.value[currIndex].height = targetElement.scrollHeight
            } else {
              removeClass(targetElement, hasScrollClsName)
            }
          })
        })
      }

      add({
        spinning: true,
        target,
        hasScroll,
        isFullScreen: targetElement === document.body,
        staticPosition,
        width: targetElement.scrollWidth,
        height: targetElement.scrollHeight,
        stopResizeWatch,
        ...reset,
      })
    }

    const ref = {
      target,
      update: (options: SpinRefUpdateOptions) =>
        update({
          target,
          ...options,
        }),
      destroy: () => destroy(target),
    }
    return ref
  }

  return {
    spins,
    open,
    update,
    destroy,
    destroyAll,
  }
}
