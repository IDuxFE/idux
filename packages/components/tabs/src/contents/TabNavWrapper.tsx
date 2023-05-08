/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, shallowRef, watch } from 'vue'

import { isString } from 'lodash-es'

import { callEmit, convertCssPixel, useState } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { IxPopover } from '@idux/components/popover'
import { SelectData } from '@idux/components/select'

import MoreSelectPane from './MoreSelectPane'
import TabNav from './TabNav'
import { useSizeObservable } from '../composables/useSizeObservable'
import { tabsToken } from '../tokens'

export default defineComponent({
  props: { selectedKey: { type: [Number, String, Symbol] } },
  setup(props, { slots }) {
    const {
      props: tabsProps,
      mergedPrefixCls,
      mergedDataSource,
      isHorizontal,
      closedKeys,
      navAttrMap,
    } = inject(tabsToken)!

    const wrapperRef = shallowRef<HTMLElement>()
    const navRef = shallowRef<HTMLElement>()
    const operationsRef = shallowRef<HTMLElement>()
    const selectedNavRef = shallowRef<HTMLElement>()
    const addBtnRef = shallowRef<HTMLElement>()

    const {
      selectedNavSize,
      navOffset,
      wrapperSize,
      operationsSize,
      selectedNavOffset,
      hasScroll,
      firstShow,
      lastShow,
    } = useSizeObservable(
      tabsProps,
      wrapperRef,
      navRef,
      selectedNavRef,
      addBtnRef,
      operationsRef,
      isHorizontal,
      navAttrMap,
      closedKeys,
    )

    const allNavDataSource = computed(() => {
      const currClosedKeys = closedKeys.value
      return mergedDataSource.value.filter(data => !currClosedKeys.includes(data.key))
    })

    const moreNavDataSource = computed(() => {
      return allNavDataSource.value.reduce((acc: SelectData[], data) => {
        const attr = navAttrMap.get(data.key)
        if (
          attr &&
          // 将没有展示完全的 nav 全部放入到moreSelectPane中
          (attr.offset < navOffset.value ||
            wrapperSize.value - operationsSize.value - (attr.offset - navOffset.value) < attr.size)
        ) {
          acc.push({
            key: data.key,
            label: data.title,
            disabled: data.disabled,
          })
        }
        return acc
      }, [])
    })

    const [moreSelectPaneVisible, setMoreSelectPaneVisible] = useState(false)

    watch(moreNavDataSource, dataSource => {
      if (dataSource.length === 0) {
        setMoreSelectPaneVisible(false)
      }
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-nav-wrapper`]: true,
        [`${prefixCls}-nav-wrapper-has-scroll`]: hasScroll.value,
      })
    })

    const navStyle = computed(() => {
      return `transform: translate${isHorizontal.value ? 'X' : 'Y'}(-${navOffset.value}px)`
    })

    const navBarStyle = computed(() => {
      const size = convertCssPixel(selectedNavSize.value)
      const offset = convertCssPixel(selectedNavOffset.value - navOffset.value)
      if (isHorizontal.value) {
        return { width: size, left: offset }
      } else {
        return { height: size, top: offset }
      }
    })

    const handleSelectedNavChange = (element: HTMLElement) => {
      selectedNavRef.value = element
    }

    const handleAdd = () => callEmit(tabsProps.onAdd)

    return () => {
      const { selectedKey } = props
      const { addable, type } = tabsProps

      return (
        <div class={classes.value} ref={wrapperRef}>
          <div
            class={[
              `${mergedPrefixCls.value}-nav`,
              firstShow.value ? `${mergedPrefixCls.value}-nav-first-show` : '',
              lastShow.value ? `${mergedPrefixCls.value}-nav-last-show` : '',
            ]}
          >
            <div ref={navRef} style={navStyle.value} class={`${mergedPrefixCls.value}-nav-list`}>
              {allNavDataSource.value.map(data => {
                const { key, content, customContent, customTitle = 'title', ...navProps } = data
                const titleSlot = isString(customTitle) ? slots[customTitle] : customTitle
                return (
                  <TabNav
                    {...navProps}
                    key={key}
                    selected={selectedKey === key}
                    onSelected={handleSelectedNavChange}
                    v-slots={{ title: titleSlot }}
                  />
                )
              })}
              {addable && (
                <div
                  ref={addBtnRef}
                  class={[
                    `${mergedPrefixCls.value}-nav-tab-add`,
                    hasScroll.value && `${mergedPrefixCls.value}-nav-tab-add-hidden`,
                  ]}
                  onClick={handleAdd}
                >
                  <IxIcon name="plus" class={`${mergedPrefixCls.value}-nav-add-icon`}></IxIcon>
                </div>
              )}
            </div>
          </div>
          <div
            ref={operationsRef}
            class={[
              `${mergedPrefixCls.value}-nav-operations`,
              !hasScroll.value && `${mergedPrefixCls.value}-nav-operations-hidden`,
            ]}
          >
            <IxPopover
              trigger="hover"
              placement="bottomStart"
              visible={moreSelectPaneVisible.value}
              {...{
                'onUpdate:visible': setMoreSelectPaneVisible,
              }}
              class={`${mergedPrefixCls.value}-nav-operations-popover`}
              v-slots={{
                content: () => (
                  <MoreSelectPane visible={moreSelectPaneVisible.value} dataSource={moreNavDataSource.value} />
                ),
              }}
            >
              <IxButton icon="more" mode="text" shape="square"></IxButton>
            </IxPopover>
            {addable && <IxButton icon="plus" mode="text" shape="square" onClick={handleAdd}></IxButton>}
          </div>
          {type !== 'segment' && <div class={`${mergedPrefixCls.value}-nav-border`}></div>}
          {type === 'line' && <div class={`${mergedPrefixCls.value}-nav-bar`} style={navBarStyle.value}></div>}
        </div>
      )
    }
  },
})
