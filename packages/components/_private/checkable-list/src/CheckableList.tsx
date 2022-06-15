/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref } from 'vue'

import { CdkVirtualScroll, type VirtualItemRenderFn, type VirtualScrollInstance } from '@idux/cdk/scroll'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import CheckableListItem from './CheckableListItem'
import { checkableListContext } from './token'
import { type CheckableListApi, type CheckableListData, checkableListProps } from './types'

export default defineComponent({
  name: 'ɵCheckableList',
  props: checkableListProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkable-list`)
    const labelKey = computed(() => props.labelKey ?? 'label')
    const virtualScrollRef = ref<VirtualScrollInstance>()

    provide(checkableListContext, {
      mergedPrefixCls,
    })

    const checkableListApi: CheckableListApi = {
      scrollTo: (...params) => virtualScrollRef.value?.scrollTo(...params),
    }

    expose(checkableListApi)

    const getKey = (item: CheckableListData) => (props.getKey?.(item) ?? item.key)!

    const handleScroll = (evt: Event) => {
      callEmit(props.onScroll, evt)
    }
    const handleScrolledBottom = () => {
      callEmit(props.onScrolledBottom)
    }
    const handleScrolledChange = (startIndex: number, endIndex: number, visibleData: unknown[]) => {
      callEmit(props.onScrolledChange, startIndex, endIndex, visibleData)
    }

    const renderListItem: VirtualItemRenderFn<CheckableListData> = ({ item, index }) => {
      const key = getKey(item)
      const onCheckChange = (checked: boolean) => {
        callEmit(props.onCheckChange, item, checked)
      }
      const onRemove = () => {
        callEmit(props.onRemove, item)
      }

      const customAdditional = props.customAdditional ? props.customAdditional({ data: item, index }) : undefined

      return (
        <CheckableListItem
          key={key}
          value={key!}
          label={item[labelKey.value] as string}
          checked={!!props.checked?.(item)}
          disabled={!!props.disabled?.(item)}
          checkable={props.checkable}
          removable={props.removable}
          v-slots={{ default: slots.label && (() => slots.label?.(item)) }}
          onCheckChange={onCheckChange}
          onRemove={onRemove}
          {...item.additional}
          {...customAdditional}
        />
      )
    }

    const renderBody = () => {
      const { dataSource, virtual, scroll } = props
      const data = dataSource ?? []

      if (data.length <= 0) {
        return
      }

      if (virtual && scroll) {
        const { height, fullHeight } = scroll
        return (
          <CdkVirtualScroll
            ref={virtualScrollRef}
            dataSource={data}
            fullHeight={fullHeight}
            getKey={getKey}
            height={height as number}
            itemHeight={32}
            itemRender={renderListItem}
            virtual
            onScroll={handleScroll}
            onScrolledBottom={handleScrolledBottom}
            onScrolledChange={handleScrolledChange}
          />
        )
      }

      return (
        <ul class={`${mergedPrefixCls.value}-inner`} onScroll={handleScroll}>
          {data.map((item, index) => renderListItem({ item, index }))}
        </ul>
      )
    }

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-virtual`]: !!props.virtual,
      })
    })

    return () => {
      return <div class={classes.value}>{renderBody()}</div>
    }
  },
})
