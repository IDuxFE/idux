/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeTypes, computed, defineComponent, normalizeClass, provide } from 'vue'

import { ɵInput } from '@idux/components/_private/input'
import { useGlobalConfig } from '@idux/components/config'

import { useItems } from './composables/useItems'
import { useJumpToIndex } from './composables/useJumpTo'
import { usePages } from './composables/usePages'
import Item from './contents/Item'
import Jumper from './contents/Jumper'
import Sizes from './contents/Sizes'
import Total from './contents/Total'
import { paginationToken } from './token'
import { paginationProps } from './types'

export default defineComponent({
  name: 'IxPagination',
  props: paginationProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-pagination`)
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('pagination')

    const showTotal = computed(() => props.showTotal ?? config.showTotal)
    const simple = computed(() => props.simple ?? config.simple)
    const size = computed(() => props.size ?? config.size)
    const showQuickJumper = computed(() => props.showQuickJumper ?? config.showQuickJumper)
    const showSizeChanger = computed(() => props.showSizeChanger ?? config.showSizeChanger)

    const { activeIndex, activeSize, lastIndex, changePageIndex, changePageSize } = usePages(props, config)
    const items = useItems(activeIndex, lastIndex)
    const jumpToIndex = useJumpToIndex(activeIndex, changePageIndex, simple)

    provide(paginationToken, {
      props,
      slots,
      config,
      locale,
      mergedPrefixCls,
      size,
      activeIndex,
      activeSize,
      lastIndex,
      changePageIndex,
      changePageSize,
      jumpToIndex,
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-simple`]: simple.value,
        [`${prefixCls}-${size.value}`]: true,
      })
    })

    return () => {
      const prefixCls = mergedPrefixCls.value

      const children: VNodeTypes[] = showTotal.value ? [<Total />] : []

      if (simple.value) {
        const _activeIndex = activeIndex.value
        const _lastIndex = lastIndex.value
        children.push(<Item disabled={_activeIndex === 1} type="prev" />)
        children.push(
          <li class={`${prefixCls}-item`}>
            <ɵInput
              disabled={props.disabled}
              size={size.value}
              value={_activeIndex.toString()}
              onKeydown={jumpToIndex}
            />
            <span class={`${prefixCls}-item-slash`}>/</span>
            <span>{_lastIndex}</span>
          </li>,
        )
        children.push(<Item disabled={_activeIndex === _lastIndex} type="next" />)
      } else {
        items.value.forEach(item => children.push(<Item key={item.type + '-' + item.index} {...item} />))
        showSizeChanger.value && children.push(<Sizes />)
        showQuickJumper.value && children.push(<Jumper />)
      }

      return <ul class={classes.value}>{children}</ul>
    }
  },
})
