/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { TABLE_TOKEN } from '../../token'

export default defineComponent({
  setup(_, { slots }) {
    const { mergedPrefixCls } = inject(TABLE_TOKEN)!

    return () => {
      return <tbody class={`${mergedPrefixCls.value}-tbody`}>{slots.default?.()}</tbody>
    }
  },
})
