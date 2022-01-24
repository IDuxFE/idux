/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeTypes, computed, defineComponent, inject } from 'vue'

import { ɵEmpty } from '@idux/components/_private/empty'

import { TABLE_TOKEN } from '../../token'
import BodyRow from './BodyRow'
import BodyRowSingle from './BodyRowSingle'
import MeasureRow from './MeasureRow'

export default defineComponent({
  setup(_, { slots }) {
    const { props, slots: tableSlots, flattedData, scrollWidth, scrollHeight, isSticky, bodyTag } = inject(TABLE_TOKEN)!

    const showMeasure = computed(() => scrollWidth.value || scrollHeight.value || isSticky.value)

    return () => {
      const children: VNodeTypes[] = []
      if (tableSlots.alert) {
        children.push(<BodyRowSingle>{tableSlots.alert()}</BodyRowSingle>)
      }
      const data = flattedData.value
      if (data.length > 0) {
        if (slots.default) {
          children.push(...slots.default())
        } else {
          data.forEach((item, rowIndex) => {
            const { expanded, level, record, rowKey } = item
            const rowProps = { key: rowKey, expanded, level, record, rowData: item, rowIndex, rowKey }
            children.push(<BodyRow {...rowProps} />)
          })
        }
      } else {
        children.push(
          <BodyRowSingle>
            <ɵEmpty v-slots={tableSlots} empty={props.empty} />
          </BodyRowSingle>,
        )
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const BodyTag = bodyTag.value as any
      return (
        <BodyTag>
          {showMeasure.value && <MeasureRow />}
          {children}
        </BodyTag>
      )
    }
  },
})
