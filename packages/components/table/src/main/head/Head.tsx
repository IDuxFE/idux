/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, defineComponent, inject } from 'vue'

import { renderHeaderCells } from './RenderHeaderCells'
import { renderHeaderRow } from './RenderHeaderRow'
import { TABLE_TOKEN } from '../../token'

export default defineComponent({
  setup(_, { slots }) {
    const { props: tableProps, mergedRows, mergedPrefixCls } = inject(TABLE_TOKEN)!

    return () => {
      let children: VNodeChild

      const { rows } = mergedRows.value
      const customAdditionalFn = tableProps.customAdditional?.head
      const customAdditional = customAdditionalFn ? customAdditionalFn({ rows }) : undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Tag = (tableProps.customTag?.head ?? 'thead') as any

      if (slots.default) {
        children = slots.default()
      } else {
        children = rows.map((columns, rowIndex) => {
          const cells = renderHeaderCells(columns)
          return renderHeaderRow(columns, rowIndex, cells)
        })
      }

      return (
        <Tag class={`${mergedPrefixCls.value}-thead`} {...customAdditional}>
          {children}
        </Tag>
      )
    }
  },
})
