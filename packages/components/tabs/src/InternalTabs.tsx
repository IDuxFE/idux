/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TabProps, TabsProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { IconInstance } from '@idux/components/icon'
import type { CSSProperties, ComputedRef, PropType, Ref, VNode } from 'vue'

import { computed, defineComponent, normalizeClass, provide, ref, vShow, watch, withDirectives } from 'vue'

import { curry, isNil } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { addClass, callEmit, removeClass, useControlledProp, useState } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import TabNav from './TabNav'
import { useSelectedElOffset } from './composables/useOffset'
import { useNavRelatedElSize, useSelectedElVisibleSize } from './composables/useSize'
import { tabsToken } from './tokens'
import { tabsProps } from './types'

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

export default defineComponent({
  props: {
    ...tabsProps,
    tabs: { type: Array as PropType<VNode[]>, default: undefined },
  },
  setup(props) {
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

    const [navOffset, setNavOffset] = useState(0)
    const [barStyle, setBarStyle] = useState<CSSProperties>({})
    const {
      navSize,
      navWrapperSize,
      navPreNextSize,
      selectedElSize,
      setNavElSize,
      setSelectedElSize,
      setNavPreNextElSize,
    } = useNavRelatedElSize(isHorizontal, navWrapperElRef, navElRef, navPreElRef, selectedElRef)
    const { selectedElOffset, setSelectedElOffset } = useSelectedElOffset(isHorizontal, navPreNextSize, selectedElRef)

    const hasScroll = computed(() => {
      return navSize.value > navWrapperSize.value
    })

    watch(
      hasScroll,
      () => {
        setNavPreNextElSize()
        updateNavBarStyle()
        updateSelectedOffset()
      },
      {
        flush: 'post',
      },
    )

    const selectedElVisibleSize = useSelectedElVisibleSize(navWrapperSize, selectedElOffset, navOffset)

    // 处理存在滚动状态下，滚动到被选中的tab，并修正其位置
    const updateSelectedOffset = () => {
      if (hasScroll.value) {
        const size = selectedElVisibleSize.value / navWrapperSize.value
        const inVisibleRange = size < 2
        if (inVisibleRange) {
          // 可视范围内需要处理展示不全的问题，需要修正
          if (selectedElVisibleSize.value < selectedElSize.value) {
            // 即可视范围内最后一个tab没有展示完全
            setNavOffset(navOffset.value + selectedElSize.value - selectedElVisibleSize.value + navPreNextSize.value)
          } else if (selectedElVisibleSize.value / navWrapperSize.value > 1) {
            // 即可视范围内第一个tab没有展示完全
            setNavOffset(
              navOffset.value - ((selectedElVisibleSize.value % navWrapperSize.value) + navPreNextSize.value),
            )
          }
        } else {
          setNavOffset(selectedElOffset.value - navPreNextSize.value)
        }
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

    const navWrapperClass = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-nav-wrapper`]: true,
        [`${prefixCls}-nav-wrapper-has-scroll`]: hasScroll.value,
      })
    })

    const curryNavPreNextClasses = curry(useNavPreNextClasses)(props, mergedPrefixCls)
    const navPreClasses = curryNavPreNextClasses('pre', preReached)
    const navNextClasses = curryNavPreNextClasses('next', nextReached)

    const handleTabClick = async (key: VKey, evt: Event) => {
      const leaveResult = callEmit(props.onBeforeLeave, key, selectedKey.value)
      const result = await leaveResult
      if (result !== false) {
        callEmit(props.onTabClick, key, evt)
        // 处理当前被选中元素再次被点击，需要修正其位置
        if (key === selectedKey.value) {
          updateSelectedOffset()
        }
        setSelectedKey(key)
      }
    }

    const updateNavBarStyle = () => {
      if (isLineType.value && navBarElRef.value) {
        const isBarDisabled = selectedElRef.value?.classList.contains(`${mergedPrefixCls.value}-nav-tab-disabled`)
        const barDisabledClassName = `${mergedPrefixCls.value}-nav-bar-disabled`
        const barOffset = selectedElOffset.value - navOffset.value + 'px'
        const barSize = selectedElSize.value + 'px'

        setBarStyle({
          width: isHorizontal.value ? barSize : '',
          left: isHorizontal.value ? barOffset : '',
          top: isHorizontal.value ? '' : barOffset,
          height: isHorizontal.value ? '' : barSize,
        })
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
        const mergedOffset = navOffset.value + navPreNextSize.value
        const offset = mergedOffset < navWrapperSize.value ? 0 : mergedOffset - navWrapperSize.value
        setNavOffset(offset)
      }
    }

    const handleNextClick = (evt: Event) => {
      if (!nextReached.value) {
        callEmit(props.onNextClick, evt)
        const mergedNavSize = navSize.value! + navPreNextSize.value * 2
        const _offset = navOffset.value + navWrapperSize.value
        let offset
        if (mergedNavSize - _offset < navWrapperSize.value) {
          offset = mergedNavSize - navWrapperSize.value
        } else {
          offset = _offset
        }
        setNavOffset(offset)
      }
    }

    const judgePreNextStatus = () => {
      preReached.value = navOffset.value === 0
      nextReached.value = navSize.value - navOffset.value <= navWrapperSize.value
    }

    const update = () => {
      setNavElSize()
      setNavPreNextElSize()
      setSelectedElSize()
      setSelectedElOffset()
      updateNavBarStyle()
      judgePreNextStatus()
    }

    watch(
      navOffset,
      val => {
        if (navElRef.value) {
          navElRef.value.style.transform = `translate${isHorizontal.value ? 'X' : 'Y'}(-${val}px)`
          judgePreNextStatus()
          updateNavBarStyle()
        }
      },
      {
        flush: 'post',
      },
    )

    let isAddTabs = false

    watch(
      () => props.tabs,
      (val = [], oldVal = []) => {
        update()
        isAddTabs = val.length > oldVal.length
      },
      {
        flush: 'post',
      },
    )

    watch(
      navSize,
      (currentSize, oldSize) => {
        let offset = navOffset.value
        if (currentSize < oldSize && !isAddTabs) {
          offset += currentSize - oldSize
          setNavOffset(offset > 0 ? offset : 0)
        }
      },
      {
        flush: 'post',
      },
    )

    watch(selectedKey, val => {
      const hasSelectedKey = props.tabs?.find(item => {
        return val === item.key
      })
      if (!hasSelectedKey) {
        selectedElRef.value = null
      }
    })

    watch(
      selectedElRef,
      () => {
        setSelectedElSize()
        setSelectedElOffset()
        setSelectedElOffset()
        updateSelectedOffset()
        updateNavBarStyle()
      },
      {
        flush: 'post',
      },
    )

    useResizeObserver(navWrapperElRef, update)

    provide(tabsToken, {
      selectedKey,
      selectedElRef,
      mergedPrefixCls,
      handleTabClick,
    })

    return () => {
      let defaultSelectedKey: VKey = 1

      const tabVNodes =
        props.tabs?.map((item, index) => {
          if (isNil(item.key)) {
            item.key = index + 1
          } else if (index === 0) {
            defaultSelectedKey = item.key as VKey
          }
          return item
        }) ?? []

      return (
        <div class={classes.value}>
          <div class={navWrapperClass.value} ref={navWrapperElRef}>
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
            {isLineType.value && (
              <div class={`${mergedPrefixCls.value}-nav-bar`} ref={navBarElRef} style={barStyle.value}></div>
            )}
          </div>
          <div class={`${mergedPrefixCls.value}-pane-wrapper`}>
            {filterTabVNodes(props, tabVNodes, selectedKey, defaultSelectedKey)}
          </div>
        </div>
      )
    }
  },
})
