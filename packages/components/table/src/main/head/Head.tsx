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
    const { mergedRows } = inject(TABLE_TOKEN)!

    return () => {
      return (
        <thead>
          {mergedRows.value.map((columns, rowIndex) => (
            <HeadRow key={rowIndex} columns={columns} />
          ))}
        </thead>
      )
    }
  },
})
