/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, defineComponent, inject } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'

import { TABLE_TOKEN, tableBodyToken } from '../../token'

export default defineComponent({
  props: { isEmpty: Boolean },
  setup(props, { slots }) {
    const { bodyRowTag, bodyColTag, mergedPrefixCls, flattedColumns, hasFixed, scrollWidth, scrollBarColumn } =
      inject(TABLE_TOKEN)!
    const { mainTableWidth } = inject(tableBodyToken)!
    const columnCount = computed(() => flattedColumns.value.length)
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const BodyRowTag = bodyRowTag.value as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const BodyColTag = bodyColTag.value as any

      let children: VNodeChild = slots.default!()

      if (props.isEmpty ? scrollWidth.value : hasFixed.value) {
        const scrollBar = scrollBarColumn.value
        children = (
          <div
            class={`${mergedPrefixCls.value}-fixed-row`}
            style={{
              width: convertCssPixel(mainTableWidth.value - (scrollBar ? scrollBar.width : 0)),
              position: 'sticky',
              left: 0,
              overflow: 'hidden',
            }}
          >
            {children}
          </div>
        )
      }
      return (
        <BodyRowTag>
          <BodyColTag colSpan={columnCount.value}>{children}</BodyColTag>
        </BodyRowTag>
      )
    }
  },
})
