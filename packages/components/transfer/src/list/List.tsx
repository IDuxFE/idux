/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, normalizeStyle, provide, ref } from 'vue'

import { CdkVirtualScroll, type VirtualItemRenderFn, type VirtualScrollInstance } from '@idux/cdk/scroll'
import { callEmit, convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { transferListContext } from '../token'
import { type TransferData, type TransferListApi, transferListProps } from '../types'
import ListItem from './ListItem'

export default defineComponent({
  name: 'IxTransferList',
  props: transferListProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-transfer-list`)
    const labelKey = computed(() => props.labelKey ?? 'label')
    const virtualScrollRef = ref<VirtualScrollInstance>()

    provide(transferListContext, {
      mergedPrefixCls,
    })

    const transferListApi: TransferListApi = {
      scrollTo: option => virtualScrollRef.value?.scrollTo(option),
    }

    expose(transferListApi)

    const getKey = (item: TransferData) => (props.getKey?.(item) ?? item.key)!

    const handleScroll = (evt: Event) => {
      callEmit(props.onScroll, evt)
    }
    const handleScrolledBottom = () => {
      callEmit(props.onScrolledBottom)
    }
    const handleScrolledChange = (startIndex: number, endIndex: number, visibleData: unknown[]) => {
      callEmit(props.onScrolledChange, startIndex, endIndex, visibleData)
    }

    const renderListItem: VirtualItemRenderFn<TransferData> = ({ item, index }) => {
      const key = getKey(item)
      const onCheckChange = (checked: boolean) => {
        callEmit(props.onCheckChange, item, checked)
      }
      const onRemove = () => {
        callEmit(props.onRemove, item)
      }

      const customAdditional = props.customAdditional ? props.customAdditional({ data: item, index }) : undefined

      return (
        <ListItem
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
          {...(item.additional ?? {})}
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

      if (virtual) {
        return (
          <CdkVirtualScroll
            ref={virtualScrollRef}
            dataSource={data}
            fullHeight={!!scroll?.fullHeight}
            getKey={getKey}
            height={(scroll?.height as number) ?? '100%'}
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
        <ul class={`${mergedPrefixCls.value}-inner`}>{data.map((item, index) => renderListItem({ item, index }))}</ul>
      )
    }

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-virtual`]: !!props.virtual,
      })
    })
    const style = computed(() => {
      const scroll = props.scroll

      return (
        scroll &&
        normalizeStyle({
          [scroll.fullHeight ? 'height' : 'maxHeight']: convertCssPixel(scroll.height),
        })
      )
    })

    return () => {
      return (
        <div class={classes.value} style={style.value} onScroll={handleScroll}>
          {renderBody()}
        </div>
      )
    }
  },
})
