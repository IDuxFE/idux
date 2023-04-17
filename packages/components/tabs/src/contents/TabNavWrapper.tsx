/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, defineComponent, inject, normalizeClass, shallowRef } from 'vue'

import { isString } from 'lodash-es'

import { callEmit, convertCssPixel } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

import TabNav from './TabNav'
import { useSizeObservable } from '../composables/useSizeObservable'
import { tabsToken } from '../tokens'
import { TabsProps } from '../types'

export default defineComponent({
  props: { selectedKey: { type: [Number, String, Symbol] } },
  setup(props, { slots }) {
    const { props: tabsProps, mergedPrefixCls, mergedDataSource, isHorizontal, closedKeys } = inject(tabsToken)!

    const wrapperRef = shallowRef<HTMLElement>()
    const prevNextRef = shallowRef<HTMLElement>()
    const navRef = shallowRef<HTMLElement>()
    const selectedNavRef = shallowRef<HTMLElement>()

    const {
      wrapperSize,
      prevNextSize,
      navSize,
      selectedNavSize,
      navOffset,
      selectedNavOffset,
      hasScroll,
      calcPrevOffset,
      calcNextOffset,
    } = useSizeObservable(wrapperRef, prevNextRef, navRef, selectedNavRef, isHorizontal)

    const prevNavDisabled = computed(() => navOffset.value === 0)
    const nextNavDisabled = computed(() => navSize.value - navOffset.value <= wrapperSize.value)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-nav-wrapper`]: true,
        [`${prefixCls}-nav-wrapper-has-scroll`]: hasScroll.value,
      })
    })

    const preClasses = usePreNextClasses(tabsProps, mergedPrefixCls, 'pre', prevNavDisabled)
    const nextClasses = usePreNextClasses(tabsProps, mergedPrefixCls, 'next', nextNavDisabled)

    const navStyle = computed(() => {
      return `transform: translate${isHorizontal.value ? 'X' : 'Y'}(-${navOffset.value}px)`
    })

    const navBarStyle = computed(() => {
      const size = convertCssPixel(selectedNavSize.value)
      const offset = convertCssPixel(prevNextSize.value + selectedNavOffset.value - navOffset.value)
      if (isHorizontal.value) {
        return { width: size, left: offset }
      } else {
        return { height: size, top: offset }
      }
    })

    const handlePrevClick = (evt: Event) => {
      if (!prevNavDisabled.value) {
        callEmit(tabsProps.onPreClick, evt)
        calcPrevOffset()
      }
    }

    const handleNextClick = (evt: Event) => {
      if (!nextNavDisabled.value) {
        callEmit(tabsProps.onNextClick, evt)
        calcNextOffset()
      }
    }

    const handleSelectedNavChange = (element: HTMLElement) => {
      selectedNavRef.value = element
    }

    const handleAdd = () => callEmit(tabsProps.onAdd)

    return () => {
      const { selectedKey } = props
      const { addable, type } = tabsProps
      const dataSource = mergedDataSource.value
      const currClosedKeys = closedKeys.value
      return (
        <div class={classes.value} ref={wrapperRef}>
          {hasScroll.value && (
            <IxIcon
              ref={prevNextRef}
              class={preClasses.value}
              name={isHorizontal.value ? 'left' : 'up'}
              onClick={handlePrevClick}
            />
          )}
          <div ref={navRef} class={`${mergedPrefixCls.value}-nav`} style={navStyle.value}>
            {dataSource.map(data => {
              const { key, content, customContent, customTitle = 'title', ...navProps } = data
              const titleSlot = isString(customTitle) ? slots[customTitle] : customTitle
              return (
                <TabNav
                  {...navProps}
                  key={key}
                  closed={currClosedKeys.includes(key)}
                  selected={selectedKey === key}
                  onSelected={handleSelectedNavChange}
                  v-slots={{ title: titleSlot }}
                />
              )
            })}
            {addable && (
              <div class={`${mergedPrefixCls.value}-nav-tab`} onClick={handleAdd}>
                <span class={`${mergedPrefixCls.value}-nav-add-icon`}>
                  <IxIcon name="plus"></IxIcon>
                </span>
              </div>
            )}
          </div>
          {hasScroll.value && (
            <IxIcon class={nextClasses.value} name={isHorizontal.value ? 'right' : 'down'} onClick={handleNextClick} />
          )}
          {type !== 'segment' && <div class={`${mergedPrefixCls.value}-nav-border`}></div>}
          {type === 'line' && <div class={`${mergedPrefixCls.value}-nav-bar`} style={navBarStyle.value}></div>}
        </div>
      )
    }
  },
})

function usePreNextClasses(
  tabsProps: TabsProps,
  mergedPrefixCls: ComputedRef<string>,
  type: 'pre' | 'next',
  disabled: Ref<boolean>,
) {
  return computed(() => {
    const { placement } = tabsProps
    const prefixCls = mergedPrefixCls.value
    return normalizeClass({
      [`${prefixCls}-nav-${type}`]: true,
      [`${prefixCls}-nav-${type}-disabled`]: disabled.value,
      [`${prefixCls}-nav-${type}-${placement}`]: true,
    })
  })
}
