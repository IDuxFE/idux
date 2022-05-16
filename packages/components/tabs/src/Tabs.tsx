/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TabProps, TabsProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { IconInstance } from '@idux/components/icon'
import type { ComputedRef, Ref, VNode } from 'vue'

import { computed, defineComponent, nextTick, normalizeClass, provide, ref, vShow, watch, withDirectives } from 'vue'

import { curry, isNil, throttle } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { addClass, callEmit, flattenNode, removeClass, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import TabNav from './TabNav'
import { useSelectedElOffset } from './composables/useOffset'
import { useNavRelatedElSize, useVisibleSize } from './composables/useSize'
import { tabsToken } from './tokens'
import { tabsProps } from './types'

export default defineComponent({
  name: 'IxTabs',
  props: tabsProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tabs`)

    const navWrapperElRef = ref<HTMLElement | null>(null)
    const navElRef = ref<HTMLElement | null>(null)
    const navBarElRef = ref<HTMLElement | null>(null)
    const navPreElRef = ref<IconInstance | null>(null)
    const selectedElRef = ref<HTMLElement | null>(null)

    const [selectedKey, setSelectedKey] = useControlledProp(props, 'selectedKey')

    const isLineType = computed(() => props.type === 'line')
    const isSegmentType = computed(() => props.type === 'segment')

    const horizontalPlacement = ['top', 'bottom']
    const isHorizontal = computed(() => horizontalPlacement.includes(props.placement))

    const { navSize, navWrapperSize, navPreNextSize, selectedElSize, syncNavRelatedElSize } = useNavRelatedElSize(
      isHorizontal,
      navWrapperElRef,
      navElRef,
      navPreElRef,
      selectedElRef,
    )

    const navOffset = ref(0)
    const { selectedElOffset } = useSelectedElOffset(isHorizontal, selectedElRef)

    const visibleSize = useVisibleSize(navWrapperSize, selectedElOffset, navOffset)
    const hasScroll = computed(() => navSize.value > navWrapperSize.value)

    // 处理存在滚动状态下，手动点击tab时nav位置偏移（在可视范围内第一个和最后一个tab没有展示完全，需要进行偏移使其展示完全；）
    const updateNavOffset = () => {
      if (visibleSize.value < selectedElSize.value) {
        // 即可视范围内最后一个tab没有展示完全
        navOffset.value += selectedElSize.value - visibleSize.value
      } else if (visibleSize.value / navWrapperSize.value > 1) {
        // 即可视范围内第一个tab没有展示完全
        navOffset.value -= visibleSize.value % navWrapperSize.value
      }
    }

    const preReached = ref(false)
    const nextReached = ref(false)

    const classes = computed(() => {
      const { type, placement, mode } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-nav-${placement}`]: placement === 'top' || type === 'line',
        [`${prefixCls}-nav-${mode}`]: type === 'segment',
      })
    })

    const curryNavPreNextClasses = curry(useNavPreNextClasses)(props, mergedPrefixCls)
    const navPreClasses = curryNavPreNextClasses('pre', preReached)
    const navNextClasses = curryNavPreNextClasses('next', nextReached)

    const handleTabClick = (key: VKey, evt: Event) => {
      callEmit(props.onTabClick, key, evt)
      setSelectedKey(key)
    }

    const updateNavBarStyle = () => {
      if (isLineType.value && navBarElRef.value) {
        const isBarDisabled = selectedElRef.value?.classList.contains(`${mergedPrefixCls.value}-nav-tab-disabled`)
        const barDisabledClassName = `${mergedPrefixCls.value}-nav-bar-disabled`
        const barOffset = selectedElOffset.value - navOffset.value + navPreNextSize.value + 'px'
        const barSize = selectedElSize.value + 'px'

        if (isHorizontal.value) {
          navBarElRef.value.style.left = barOffset
          navBarElRef.value.style.width = barSize
          navBarElRef.value.style.top = ''
          navBarElRef.value.style.height = ''
        } else {
          navBarElRef.value.style.top = barOffset
          navBarElRef.value.style.height = barSize
          navBarElRef.value.style.left = ''
          navBarElRef.value.style.width = ''
        }
        if (isBarDisabled) {
          addClass(navBarElRef.value, barDisabledClassName)
        } else {
          removeClass(navBarElRef.value, barDisabledClassName)
        }
      }
    }

    const handlePreClick = (evt: Event) => {
      if (!preReached.value) {
        callEmit(props.onPreClick, evt)
        const offset = navOffset.value < navWrapperSize.value ? 0 : navOffset.value - navWrapperSize.value
        navOffset.value = offset
      }
    }

    const handleNextClick = (evt: Event) => {
      if (!nextReached.value) {
        callEmit(props.onNextClick, evt)
        const _offset = navOffset.value + navWrapperSize.value
        let offset
        if (navSize.value - _offset < navWrapperSize.value) {
          offset = navSize.value - navWrapperSize.value
        } else {
          offset = _offset
        }
        navOffset.value = offset
      }
    }

    const judgePreNextStatus = () => {
      preReached.value = navOffset.value === 0
      nextReached.value = navSize.value - navOffset.value <= navWrapperSize.value
    }

    watch(navOffset, val => {
      if (navElRef.value) {
        navElRef.value.style.transform = `translate${isHorizontal.value ? 'X' : 'Y'}(-${val}px)`
        judgePreNextStatus()
        updateNavBarStyle()
      }
    })

    watch(selectedElRef, () => {
      if (hasScroll.value) {
        updateNavOffset()
      }
      updateNavBarStyle()
    })

    const onTabsResize = throttle(() => {
      syncNavRelatedElSize()
      if (hasScroll.value) {
        //存在滚动状态时，因为会增加前进、后退两个按钮，所以需要重新获取navWrapper宽度
        nextTick(() => {
          syncNavRelatedElSize()
          updateNavOffset()
          updateNavBarStyle()
          judgePreNextStatus()
        })
      } else {
        updateNavBarStyle()
      }
    }, 10)

    useResizeObserver(navWrapperElRef, onTabsResize)

    provide(tabsToken, {
      selectedKey,
      selectedElRef,
      mergedPrefixCls,
      handleTabClick,
    })

    return () => {
      let defaultSelectedKey: VKey = 1

      const tabVNodes = flattenTabVNodes(slots.default?.()).map((item, index) => {
        if (isNil(item.key)) {
          item.key = index + 1
        } else if (index === 0) {
          defaultSelectedKey = item.key
        }
        return item
      })

      return (
        <div class={classes.value}>
          <div
            class={`${mergedPrefixCls.value}-nav-wrapper ${
              hasScroll.value ? `${mergedPrefixCls.value}-nav-wrapper-has-scroll` : ''
            }`}
            ref={navWrapperElRef}
          >
            {hasScroll.value && (
              <IxIcon
                class={navPreClasses.value}
                name={isHorizontal.value ? 'left' : 'up'}
                onClick={handlePreClick}
                ref={navPreElRef}
              />
            )}
            <div class={`${mergedPrefixCls.value}-nav`} ref={navElRef}>
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                tabVNodes.map((vnode: any) => (
                  <TabNav
                    {...vnode.props}
                    key={vnode.key}
                    defaultSelectedKey={defaultSelectedKey}
                    v-slots={{ title: vnode.children?.title }}
                  />
                ))
              }
            </div>
            {hasScroll.value && (
              <IxIcon
                class={navNextClasses.value}
                name={isHorizontal.value ? 'right' : 'down'}
                onClick={handleNextClick}
              />
            )}
            {!isSegmentType.value && <div class={`${mergedPrefixCls.value}-nav-border`}></div>}
            {isLineType.value && <div class={`${mergedPrefixCls.value}-nav-bar`} ref={navBarElRef}></div>}
          </div>
          <div class={`${mergedPrefixCls.value}-pane-wrapper`}>
            {filterTabVNodes(props, tabVNodes, selectedKey, defaultSelectedKey)}
          </div>
        </div>
      )
    }
  },
})

function useNavPreNextClasses(
  props: TabsProps,
  mergedPrefixCls: ComputedRef<string>,
  type: 'pre' | 'next',
  disabled: Ref<boolean>,
) {
  return computed(() => {
    const { placement } = props
    const prefixCls = mergedPrefixCls.value
    return normalizeClass({
      [`${prefixCls}-nav-${type}`]: true,
      [`${prefixCls}-nav-${type}-disabled`]: disabled.value,
      [`${prefixCls}-nav-${type}-${placement}`]: true,
    })
  })
}

function flattenTabVNodes(tabVNodes: VNode[] | undefined): VNode[] {
  return flattenNode(tabVNodes, { key: '__IDUX_TAB' })
}

function filterTabVNodes(
  props: TabsProps,
  tabVNodes: VNode[],
  selectedKey: ComputedRef<VKey | undefined>,
  defaultSelectedKey: VKey | undefined,
): VNode[] {
  const renderTabVNodes: VNode[] = []
  tabVNodes.forEach(vNode => {
    const { key } = vNode
    const { forceRender, disabled } = vNode.props as TabProps
    const _disabled = !isNil(disabled)
    const useVShow = forceRender ?? props.forceRender
    const show = (selectedKey.value ?? defaultSelectedKey) === key && !_disabled
    if (useVShow) {
      renderTabVNodes.push(withDirectives(vNode, [[vShow, show]]))
    } else if (show) {
      renderTabVNodes.push(vNode)
    }
  })
  return renderTabVNodes
}
