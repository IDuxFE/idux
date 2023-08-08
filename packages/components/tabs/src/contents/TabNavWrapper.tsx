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

import { useSizeObservable } from '../composables/useSizeObservable'
import { tabsToken } from '../tokens'
import MoreSelectPane from './MoreSelectPane'
import TabNav from './TabNav'

export default defineComponent({
  props: { selectedKey: { type: [Number, String, Symbol] } },
  setup(props, { slots }) {
    const {
      props: tabsProps,
      mergedPrefixCls,
      mergedDataSource,
      isHorizontal,
      closedKeys,
      navAttrs,
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
      navAttrs,
      closedKeys,
    )

    const allNavDataSource = computed(() => {
      const currClosedKeys = closedKeys.value
      return mergedDataSource.value.filter(data => !currClosedKeys.includes(data.key))
    })

    const moreNavDataSource = computed(() => {
      // TODO: 性能优化
      return allNavDataSource.value.reduce((acc: SelectData[], data) => {
        const attr = navAttrs[data.key]
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
      const prefixCls = mergedPrefixCls.value

      return (
        <div class={classes.value} ref={wrapperRef}>
          <div
            class={[
              `${prefixCls}-nav`,
              firstShow.value ? `${prefixCls}-nav-first-show` : '',
              lastShow.value ? `${prefixCls}-nav-last-show` : '',
            ]}
          >
            <div ref={navRef} style={navStyle.value} class={`${prefixCls}-nav-list`}>
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
                <button
                  ref={addBtnRef}
                  class={[`${prefixCls}-nav-tab-add`, hasScroll.value && `${prefixCls}-nav-tab-add-hidden`]}
                  onClick={handleAdd}
                >
                  {slots.addIcon ? slots.addIcon() : <IxIcon name="plus" class={`${prefixCls}-nav-add-icon`} />}
                </button>
              )}
            </div>
          </div>
          <div
            ref={operationsRef}
            class={[`${prefixCls}-nav-operations`, !hasScroll.value && `${prefixCls}-nav-operations-hidden`]}
          >
            <IxPopover
              trigger="hover"
              placement="bottomStart"
              visible={moreSelectPaneVisible.value}
              {...{
                'onUpdate:visible': setMoreSelectPaneVisible,
              }}
              class={`${prefixCls}-nav-operations-popover`}
              v-slots={{
                content: () => {
                  return <MoreSelectPane visible={moreSelectPaneVisible.value} dataSource={moreNavDataSource.value} />
                },
              }}
            >
              <IxButton icon="more" mode="text" shape="square"></IxButton>
            </IxPopover>
            {addable && (
              <IxButton v-slots={{ icon: slots.addIcon }} icon="plus" mode="text" shape="square" onClick={handleAdd} />
            )}
          </div>
          {type !== 'segment' && <div class={`${prefixCls}-nav-border`}></div>}
          {type === 'line' && <div class={`${prefixCls}-nav-bar`} style={navBarStyle.value}></div>}
        </div>
      )
    }
  },
})
