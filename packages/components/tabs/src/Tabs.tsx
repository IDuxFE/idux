/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TabProps, TabsProps } from './types'
import type { Ref } from 'vue'

import {
  ComputedRef,
  VNode,
  WritableComputedRef,
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  vShow,
  watch,
  withDirectives,
} from 'vue'

import { throttle } from 'lodash-es'

import { addClass, callEmit, flattenNode, offResize, onResize, removeClass, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import TabNav from './TabNav'
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
    const [selectedKey, setSelectedKey] = useControlledProp(props, 'selectedKey')
    const isLineType = computed(() => props.type === 'line')
    const isSegmentType = computed(() => props.type === 'segment')
    const hasScroll = ref(false)
    const navWrapperWidth = ref(0)
    const navWidth = ref(0)
    const navWrapperHeight = ref(0)
    const navHeight = ref(0)
    const navOffset = ref(0)
    const preReached = ref(false)
    const nextReached = ref(false)
    const horizontalPlacement = ['top']

    const classes = useClasses(props, mergedPrefixCls)
    const navPreClasses = useNavPreNextClasses(props, 'pre', preReached, mergedPrefixCls)
    const navNextClasses = useNavPreNextClasses(props, 'next', nextReached, mergedPrefixCls)

    const isHorizontal = computed(() => horizontalPlacement.includes(props.placement))

    const getSelectedNavTabEl = () => {
      return navElRef.value?.querySelector(`[data-key="${selectedKey.value}"]`)
    }

    const getSelectedNavTabElAttr = () => {
      const el = getSelectedNavTabEl()
      return {
        w: Number(el?.offsetWidth ?? 0),
        h: Number(el?.offsetHeight ?? 0),
        l: Number(el?.offsetLeft ?? 0),
        t: Number(el?.offsetTop ?? 0),
      }
    }

    const navSize = computed(() => {
      if (isHorizontal.value) {
        return navWidth.value
      } else {
        return navHeight.value
      }
    })

    const navWrapperSize = computed(() => {
      if (isHorizontal.value) {
        return navWrapperWidth.value
      } else {
        return navWrapperHeight.value
      }
    })

    const selectedNavTabElSize = computed(() => {
      if (isHorizontal.value) {
        return getSelectedNavTabElAttr().w
      } else {
        return getSelectedNavTabElAttr().h
      }
    })

    const selectedNavTabElOffset = computed(() => {
      if (isHorizontal.value) {
        return getSelectedNavTabElAttr().l
      } else {
        return getSelectedNavTabElAttr().t
      }
    })

    const navPreNextSize = computed(() => {
      if (isHorizontal.value) {
        return Number(navWrapperElRef.value?.querySelector(`.${mergedPrefixCls.value}-nav-pre`)?.offsetWidth ?? 0)
      } else {
        return Number(navWrapperElRef.value?.querySelector(`.${mergedPrefixCls.value}-nav-pre`)?.offsetHeight ?? 0)
      }
    })

    const visibleSize = computed(() => {
      return navWrapperSize.value - (selectedNavTabElOffset.value - navOffset.value)
    })

    const handleTabClick = (key: string | number, evt: Event) => {
      callEmit(props.onTabClick, key, evt)
      setSelectedKey(key)
      updateNavOffset()
      updateNavBarStyle()
    }

    // 处理存在滚动状态下，手动点击tab时nav位置偏移（在可视范围内第一个和最后一个tab没有展示完全，需要进行偏移使其展示完全；）
    const updateNavOffset = () => {
      if (hasScroll.value) {
        if (visibleSize.value < selectedNavTabElSize.value) {
          // 即可视范围内最后一个tab没有展示完全
          navOffset.value += selectedNavTabElSize.value - visibleSize.value
        } else if (visibleSize.value / navWrapperSize.value > 1) {
          // 即可视范围内第一个tab没有展示完全
          navOffset.value -= visibleSize.value % navWrapperSize.value
        }
      }
    }

    const updateNavBarStyle = () => {
      if (isLineType.value && navBarElRef.value) {
        const isBarDisabled = getSelectedNavTabEl()?.classList.contains(`${mergedPrefixCls.value}-nav-tab-disabled`)
        const barDisabledClassName = `${mergedPrefixCls.value}-nav-bar-disabled`
        const barOffset = selectedNavTabElOffset.value - navOffset.value + navPreNextSize.value + 'px'
        const barSize = selectedNavTabElSize.value + 'px'

        if (isHorizontal.value) {
          navBarElRef.value.style.left = barOffset
          navBarElRef.value.style.width = barSize
        } else {
          navBarElRef.value.style.top = barOffset
          navBarElRef.value.style.height = barSize
        }
        if (isBarDisabled) {
          addClass(navBarElRef.value, barDisabledClassName)
        } else {
          removeClass(navBarElRef.value, barDisabledClassName)
        }
      }
    }

    const useScroll = () => {
      if (navElRef.value && navWrapperElRef.value) {
        if (isHorizontal.value) {
          navWrapperWidth.value = navWrapperElRef.value.offsetWidth
          navWidth.value = navElRef.value.offsetWidth
          hasScroll.value = navWidth.value > navWrapperWidth.value
        } else {
          navWrapperHeight.value = navWrapperElRef.value.offsetHeight
          navHeight.value = navElRef.value.offsetHeight
          hasScroll.value = navHeight.value > navWrapperHeight.value
        }
        if (hasScroll.value) {
          nextTick(() => {
            // 存在滚动状态时，因为会增加前进、后退两个按钮，所以需要重新获取navWrapper宽度
            if (navWrapperElRef.value) {
              if (isHorizontal.value) {
                navWrapperWidth.value -= navPreNextSize.value * 2
              } else {
                navWrapperHeight.value -= navPreNextSize.value * 2
              }
            }
            updateNavOffset()
            updateNavBarStyle()
            judgePreNextStatus()
          })
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
        const offset = navOffset.value + navWrapperSize.value
        navOffset.value = offset
      }
    }

    const judgePreNextStatus = () => {
      preReached.value = navOffset.value === 0
      nextReached.value = navSize.value - navOffset.value <= navWrapperSize.value
    }

    watch(navOffset, val => {
      if (navElRef.value) {
        navElRef.value.style.transform = `translate${props.placement === 'start' ? 'Y' : 'X'}(-${val}px)`
        judgePreNextStatus()
        updateNavBarStyle()
      }
    })

    const onTabsResize = throttle(() => {
      useScroll()
      if (!hasScroll.value) {
        updateNavBarStyle()
      }
    }, 10)

    onMounted(() => {
      onResize(navWrapperElRef.value as unknown as Element, onTabsResize)
    })

    onBeforeUnmount(() => {
      offResize(navWrapperElRef.value as unknown as Element, onTabsResize)
    })

    provide(tabsToken, {
      selectedKey,
      mergedPrefixCls,
      handleTabClick,
    })

    return () => {
      const tabPaneVNodes = flattenNode(slots.default?.(), { key: '__IDUX_TAB' })
      return (
        <div class={classes.value}>
          <div
            class={`${mergedPrefixCls.value}-nav-wrapper ${
              hasScroll.value ? `${mergedPrefixCls.value}-nav-wrapper-has-scroll` : ''
            }`}
            ref={navWrapperElRef}
          >
            {hasScroll.value && (
              <IxIcon class={navPreClasses.value} name={isHorizontal.value ? 'left' : 'up'} onClick={handlePreClick} />
            )}
            <div class={`${mergedPrefixCls.value}-nav`} ref={navElRef}>
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                tabPaneVNodes.map((vnode: any) => (
                  <TabNav {...vnode.props} v-slots={{ title: vnode.children?.title }} />
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
          <div class={`${mergedPrefixCls.value}-pane-wrapper`}>{filterTabPanes(props, tabPaneVNodes, selectedKey)}</div>
        </div>
      )
    }
  },
})

function useClasses(props: TabsProps, mergedPrefixCls: ComputedRef<string>) {
  return computed(() => {
    const { type, placement, mode } = props
    const prefixCls = mergedPrefixCls.value
    return {
      [prefixCls]: true,
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-nav-${placement}`]: type === 'line',
      [`${prefixCls}-nav-${mode}`]: type === 'segment',
    }
  })
}

function useNavPreNextClasses(
  props: TabsProps,
  type: 'pre' | 'next',
  disabled: Ref<boolean>,
  mergedPrefixCls: ComputedRef<string>,
) {
  return computed(() => {
    const { placement } = props
    const prefixCls = mergedPrefixCls.value
    return {
      [`${prefixCls}-nav-${type}`]: true,
      [`${prefixCls}-nav-${type}-disabled`]: disabled.value,
      [`${prefixCls}-nav-${type}-${placement}`]: true,
    }
  })
}

function filterTabPanes(
  props: TabsProps,
  tabPaneVNodes: VNode[],
  selectedKey: WritableComputedRef<string | number | undefined>,
): VNode[] {
  const rendertabPaneVNodes: VNode[] = []
  tabPaneVNodes.forEach(vNode => {
    const { key } = vNode
    const { forceRender } = vNode.props as TabProps
    const useVShow = forceRender ?? props.forceRender === true
    const show = selectedKey.value === key
    if (vNode.key !== undefined) {
      vNode.key = key!
    }
    if (useVShow) {
      rendertabPaneVNodes.push(withDirectives(vNode, [[vShow, show]]))
    } else if (show) {
      rendertabPaneVNodes.push(vNode)
    }
  })
  return rendertabPaneVNodes
}
