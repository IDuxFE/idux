/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ListGridProps } from './types'

import { computed, defineComponent, inject } from 'vue'

import { IxCol } from '@idux/components/grid'

import { listToken } from './token'
import { listItemProps } from './types'

export default defineComponent({
  name: 'IxListItem',
  props: listItemProps,
  setup(props, { slots }) {
    const { props: listProps, mergedPrefixCls } = inject(listToken)!
    const classPrefix = computed(() => `${mergedPrefixCls.value}-item`)
    const getGrid = <T, K extends keyof T>(grid: T, dim: K) => {
      const v = grid[dim]
      if (typeof v === 'number') {
        return Math.floor(24 / v)
      }
      return undefined
    }

    const useGrid = (grid: ListGridProps) => {
      const defaultSpan = getGrid(grid, 'column')
      return {
        xs: getGrid(grid, 'xs') || defaultSpan,
        sm: getGrid(grid, 'sm') || defaultSpan,
        md: getGrid(grid, 'md') || defaultSpan,
        ld: getGrid(grid, 'lg') || defaultSpan,
        xl: getGrid(grid, 'xl') || defaultSpan,
      }
    }

    return () => {
      const grid = listProps.grid && useGrid(listProps.grid)
      const title = props.title ?? slots.title?.()
      const content = props.content ?? slots.default?.()
      const extra = slots.extra?.()
      const renderContent = (
        <>
          {title && <div class={`${classPrefix.value}-title`}>{title}</div>}
          <div class={`${classPrefix.value}-content`}>{content}</div>
          {extra && <div class={`${classPrefix.value}-extra`}>{extra}</div>}
        </>
      )
      return grid ? <IxCol {...grid}>{renderContent}</IxCol> : <div class={`${classPrefix.value}`}>{renderContent}</div>
    }
  },
})
