/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { TABLE_TOKEN } from '../../token'
import HeadRow from './HeadRow'

export default defineComponent({
  setup() {
    const { mergedRows, headTag } = inject(TABLE_TOKEN)!

    return () => {
      const children = mergedRows.value.map((columns, rowIndex) => <HeadRow key={rowIndex} columns={columns} />)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const HeadTag = headTag.value as any
      return <HeadTag>{children}</HeadTag>
    }
  },
})
