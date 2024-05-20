/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Transition, computed, defineComponent, inject, normalizeClass, shallowRef, watch } from 'vue'

import { isString } from 'lodash-es'

import { convertCssPixel } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { IxPopover } from '@idux/components/popover'

import AddBtn from './AddBtn'
import MoreSelectPane from './MoreSelectPane'
import TabNav from './TabNav'
import { useNavListScroll } from '../composables/useNavListScroll'
import { useSelectedNav } from '../composables/useSelectedNav'
import { tabsToken } from '../tokens'

export default defineComponent({
  props: { selectedKey: { type: [Number, String, Symbol] } },
  setup(props, { slots }) {
    const {
      common,
      props: tabsProps,
      config,
      locale,
      mergedPrefixCls,
      mergedDataSource,
      allTabsPanelVisible,
      isHorizontal,
      closedKeys,
      navAttrs,
      setAllTabsPanelVisible,
    } = inject(tabsToken)!

    const navListRef = shallowRef<HTMLElement>()
    const navListInnerRef = shallowRef<HTMLElement>()
    const operationsRef = shallowRef<HTMLElement>()
    const selectedNavRef = shallowRef<HTMLElement>()

    const { selectedNavSize, selectedNavOffset } = useSelectedNav(
      tabsProps,
      selectedNavRef,
      isHorizontal,
      closedKeys,
      navAttrs,
    )
    const { hasScroll, scrolledStart, scrolledEnd, pre, next } = useNavListScroll(
      navListRef,
      navListInnerRef,
      isHorizontal,
      selectedNavSize,
      selectedNavOffset,
      navAttrs,
      closedKeys,
    )

    const showAllTabs = computed(() => hasScroll.value && (tabsProps.showAllTabsPanel ?? config.showAllTabsPanel))

    const allNavDataSource = computed(() => {
      const currClosedKeys = closedKeys.value
      return mergedDataSource.value.filter(data => !currClosedKeys.includes(data.key))
    })

    const moreNavDataSource = computed(() => {
      return allNavDataSource.value.map(item => ({
        key: item.key,
        label: item.title,
        disabled: item.disabled,
        customTitle: item.customTitle,
      }))
    })

    watch(hasScroll, _hasScroll => {
      if (!_hasScroll) {
        setAllTabsPanelVisible(false)
      }
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-nav-wrapper`]: true,
        [`${prefixCls}-nav-wrapper-has-scroll`]: hasScroll.value,
      })
    })

    const navBarStyle = computed(() => {
      const size = convertCssPixel(selectedNavSize.value)
      const offset = convertCssPixel(selectedNavOffset.value)
      if (isHorizontal.value) {
        return { width: size, left: offset }
      } else {
        return { height: size, top: offset }
      }
    })

    const popoverPlacement = computed(() => {
      const { placement } = tabsProps

      switch (placement) {
        case 'top':
          return 'bottomEnd'
        case 'bottom':
          return 'topStart'
        case 'start':
          return 'rightEnd'
        case 'end':
          return 'leftEnd'
        default:
          return 'bottomStart'
      }
    })

    const handleSelectedNavChange = (element: HTMLElement) => {
      selectedNavRef.value = element
    }
    const handleMouseenter = () => {
      setAllTabsPanelVisible(true)
    }
    const handleMouseleave = () => {
      setAllTabsPanelVisible(false)
    }

    return () => {
      const { selectedKey } = props
      const { addable, type } = tabsProps
      const prefixCls = mergedPrefixCls.value

      return (
        <div class={classes.value}>
          <div class={`${prefixCls}-nav`}>
            <Transition appear name={`${common}-fade`}>
              {hasScroll.value && !scrolledStart.value && (
                <button class={`${prefixCls}-nav-pre-btn`} onClick={pre}>
                  <span class={`${prefixCls}-nav-btn-trigger`}>
                    <IxIcon name={isHorizontal.value ? 'left' : 'up'} />
                  </span>
                </button>
              )}
            </Transition>
            <div ref={navListRef} class={`${prefixCls}-nav-list`}>
              <div ref={navListInnerRef} class={`${prefixCls}-nav-list-inner`}>
                {allNavDataSource.value.map(data => {
                  const { key, content, customContent, customTitle = 'title', ...navProps } = data
                  const titleSlot = isString(customTitle) ? slots[customTitle] : customTitle
                  return (
                    <TabNav
                      {...navProps}
                      onSelected={handleSelectedNavChange}
                      key={key}
                      selected={selectedKey === key}
                      v-slots={{ title: titleSlot }}
                    />
                  )
                })}
                {addable && !hasScroll.value && <AddBtn v-slots={slots} />}
                {isHorizontal.value && hasScroll.value && <div class={`${prefixCls}-nav-list-gap-filler`}></div>}
                {type === 'line' && <div class={`${prefixCls}-nav-bar`} style={navBarStyle.value}></div>}
              </div>
            </div>
            <Transition appear name={`${common}-fade`}>
              {hasScroll.value && !scrolledEnd.value && (
                <button class={`${prefixCls}-nav-next-btn`} onClick={next}>
                  <span class={`${prefixCls}-nav-btn-trigger`}>
                    <IxIcon name={isHorizontal.value ? 'right' : 'down'} />
                  </span>
                </button>
              )}
            </Transition>
          </div>
          <div
            ref={operationsRef}
            class={[`${prefixCls}-nav-operations`, !hasScroll.value && `${prefixCls}-nav-operations-hidden`]}
          >
            {showAllTabs.value && (
              <span class={`${prefixCls}-nav-operations-item`}>
                <IxPopover
                  trigger="manual"
                  placement={popoverPlacement.value}
                  showArrow={false}
                  visible={allTabsPanelVisible.value}
                  props={{ 'onUpdate:visible': setAllTabsPanelVisible }}
                  class={`${prefixCls}-nav-operations-popover`}
                  onMouseenter={handleMouseenter}
                  onMouseleave={handleMouseleave}
                  v-slots={{
                    content: () => {
                      return (
                        <MoreSelectPane
                          visible={allTabsPanelVisible.value}
                          dataSource={moreNavDataSource.value}
                          v-slots={slots}
                        />
                      )
                    },
                  }}
                >
                  <IxButton
                    icon="more"
                    mode="text"
                    shape={isHorizontal.value ? undefined : 'square'}
                    onMouseenter={handleMouseenter}
                    onMouseleave={handleMouseleave}
                  >
                    {isHorizontal.value ? locale.allTabs : ''}
                  </IxButton>
                </IxPopover>
              </span>
            )}
            {addable && (
              <span class={`${prefixCls}-nav-operations-item`}>
                <AddBtn v-slots={slots} />
              </span>
            )}
          </div>
          {type !== 'segment' && <div class={`${prefixCls}-nav-border`}></div>}
        </div>
      )
    }
  },
})
