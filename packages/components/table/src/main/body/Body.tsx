/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { VNodeChild, defineComponent, inject } from 'vue'

import { ɵEmpty } from '@idux/components/_private/empty'

import BodyRowSingle from './BodyRowSingle'
import { TABLE_TOKEN } from '../../token'

export default defineComponent({
  setup(_, { slots }) {
    const { props, slots: tableSlots, mergedPrefixCls, flattedData } = inject(TABLE_TOKEN)!

    return () => {
      const prefixCls = mergedPrefixCls.value
      const children: VNodeChild[] = []
      if (tableSlots.alert) {
        children.push(<BodyRowSingle class={`${prefixCls}-alert-row`}>{tableSlots.alert()}</BodyRowSingle>)
      }
      const data = flattedData.value
      if (data.length > 0) {
        slots.default && children.push(...slots.default())
      } else {
        children.push(
          <BodyRowSingle class={`${prefixCls}-empty-row`} isEmpty>
            <ɵEmpty v-slots={tableSlots} empty={props.empty} />
          </BodyRowSingle>,
        )
      }

      return <tbody class={`${mergedPrefixCls.value}-tbody`}>{children}</tbody>
    }
  },
})
