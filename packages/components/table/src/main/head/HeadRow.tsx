/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { TABLE_TOKEN } from '../../token'
import { tableHeadRowProps } from '../../types'
import HeadCell from './HeadCell'

export default defineComponent({
  props: tableHeadRowProps,
  setup(props) {
    const { props: tableProps } = inject(TABLE_TOKEN)!

    return () => {
      const { columns } = props
      const customAdditionalFn = tableProps.customAdditional?.headRow
      const customAdditional = customAdditionalFn ? customAdditionalFn({ columns }) : undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Tag = (tableProps.customTag?.headRow ?? 'tr') as any
      return (
        <Tag {...customAdditional}>
          {columns
            .filter(column => column.titleColSpan !== 0)
            .map(column => (
              <HeadCell key={column.key} column={column} />
            ))}
        </Tag>
      )
    }
  },
})
