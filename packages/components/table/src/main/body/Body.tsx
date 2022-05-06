/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { VNodeChild, computed, defineComponent, inject } from 'vue'

import { convertArray } from '@idux/cdk/utils'
import { ɵEmpty } from '@idux/components/_private/empty'

import { TABLE_TOKEN } from '../../token'
import BodyRowSingle from './BodyRowSingle'
import MeasureRow from './MeasureRow'
import { renderBodyRow } from './RenderBodyRow'

export default defineComponent({
  setup(_, { slots }) {
    const {
      props,
      slots: tableSlots,
      mergedPrefixCls,
      flattedData,
      expandable,
      scrollWidth,
      scrollHeight,
      isSticky,
    } = inject(TABLE_TOKEN)!

    const showMeasure = computed(() => scrollWidth.value || scrollHeight.value || isSticky.value)

    return () => {
      const prefixCls = mergedPrefixCls.value
      const children: VNodeChild[] = []
      if (tableSlots.alert) {
        children.push(<BodyRowSingle class={`${prefixCls}-alert-row`}>{tableSlots.alert()}</BodyRowSingle>)
      }
      const data = flattedData.value
      if (data.length > 0) {
        if (slots.default) {
          children.push(...slots.default())
        } else {
          data.forEach((item, rowIndex) => {
            children.push(...convertArray(renderBodyRow(item, rowIndex, tableSlots, expandable.value)))
          })
        }
      } else {
        children.push(
          <BodyRowSingle class={`${prefixCls}-empty-row`} isEmpty>
            <ɵEmpty v-slots={tableSlots} empty={props.empty} />
          </BodyRowSingle>,
        )
      }

      return (
        <tbody>
          {showMeasure.value && <MeasureRow />}
          {children}
        </tbody>
      )
    }
  },
})
