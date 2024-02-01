/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FlattenedOption } from '../composables/useOptions'

import { computed, defineComponent, inject, normalizeClass, provide, ref } from 'vue'

import {
  CdkVirtualScroll,
  type VirtualRowRenderFn,
  type VirtualScrollInstance,
  type VirtualScrollToFn,
} from '@idux/cdk/scroll'
import { callEmit } from '@idux/cdk/utils'
import { ɵEmpty } from '@idux/components/_private/empty'
import { type SelectConfig, useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import ListBox from './ListBox'
import Option from './Option'
import OptionGroup from './OptionGroup'
import { getThemeTokens } from '../../theme'
import { usePanelGetOptionKey } from '../composables/useGetOptionKey'
import { useFlattenedOptions } from '../composables/useOptions'
import { usePanelActiveState } from '../composables/usePanelActiveState'
import { useSelectedState } from '../composables/usePanelSelectedState'
import { SELECT_PANEL_DATA_TOKEN, selectPanelContext } from '../token'
import { type SelectPanelProps, selectPanelProps } from '../types'

export default defineComponent({
  name: 'IxSelectPanel',
  props: selectPanelProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('select')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-select`)
    const config = useGlobalConfig('select')
    const locale = useGlobalConfig('locale')

    const flattenedOptions = useSelectPanelData(props, config)

    const selectedStateContext = useSelectedState(props, locale)

    const virtualScrollRef = ref<VirtualScrollInstance>()
    const scrollTo: VirtualScrollToFn = options => virtualScrollRef.value?.scrollTo(options)

    const activeStateContext = usePanelActiveState(props, flattenedOptions, selectedStateContext.selectedKeys, scrollTo)

    expose({
      scrollTo,
      changeActiveIndex: activeStateContext.changeActiveIndex,
    })

    provide(selectPanelContext, {
      props,
      mergedPrefixCls,
      flattenedOptions,
      ...selectedStateContext,
      ...activeStateContext,
    })

    const panelClasses = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-panel`

      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-multiple`]: !!props.multiple,
      })
    })

    const handleScrolledChange = (startIndex: number, endIndex: number, visibleOptions: FlattenedOption[]) => {
      const { onScrolledChange } = props
      if (onScrolledChange) {
        callEmit(
          onScrolledChange,
          startIndex,
          endIndex,
          visibleOptions.map(item => item.rawData),
        )
      }
    }

    // to prevent triggering selector blur when clicking on the panel
    const handlePanelMouseDown = (evt: MouseEvent) => {
      evt.preventDefault()
    }

    return () => {
      const { _virtualScrollHeight, virtualItemHeight, virtualScrollMode, virtual, onScroll, onScrolledBottom } = props
      const options = flattenedOptions.value
      const children = [<ListBox v-slots={slots} />]

      if (options.length > 0) {
        const rowRender: VirtualRowRenderFn<FlattenedOption> = ({ item, index }) => {
          const { type, key, ...rest } = item
          return type === 'group' ? (
            <OptionGroup v-slots={slots} index={index} {...rest} />
          ) : (
            <Option v-slots={slots} index={index} optionKey={key} {...rest} />
          )
        }

        children.push(
          <CdkVirtualScroll
            ref={virtualScrollRef}
            dataSource={options}
            getKey="key"
            height={_virtualScrollHeight}
            rowHeight={virtualItemHeight}
            scrollMode={virtual ? virtualScrollMode : undefined}
            rowRender={rowRender}
            virtual={virtual}
            onScroll={onScroll}
            onScrolledBottom={onScrolledBottom}
            onScrolledChange={handleScrolledChange}
          />,
        )
      } else {
        children.push(<ɵEmpty v-slots={slots} empty={props.empty} />)
      }

      return (
        <div class={panelClasses.value} onMousedown={handlePanelMouseDown}>
          {children}
        </div>
      )
    }
  },
})

function useSelectPanelData(props: SelectPanelProps, config: SelectConfig) {
  const dataContext = inject(SELECT_PANEL_DATA_TOKEN, null)

  if (dataContext) {
    return dataContext.flattenedOptions
  }

  const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
  const mergedLabelKey = computed(() => props.labelKey ?? config.labelKey)
  const getKey = usePanelGetOptionKey(props, config)

  const flattenedOptions = useFlattenedOptions(
    computed(() => props.dataSource),
    mergedChildrenKey,
    getKey,
    mergedLabelKey,
  )

  return flattenedOptions
}
