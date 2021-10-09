/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { IxEmpty } from '@idux/components/empty'

import { TABLE_TOKEN } from '../../token'
import BodyRow from './BodyRow'
import BodyRowSingle from './BodyRowSingle'
import MeasureRow from './MeasureRow'

export default defineComponent({
  setup(_, { slots }) {
    const {
      props,
      slots: tableSlots,
      flattedData,
      scrollHorizontal,
      scrollVertical,
      isSticky,
      bodyTag,
    } = inject(TABLE_TOKEN)!

    const showMeasure = computed(() => scrollHorizontal.value || scrollVertical.value || isSticky.value)

    return () => {
      const children: VNodeTypes[] = []
      if (tableSlots.alert) {
        const alertNode = tableSlots.alert()
        children.push(<BodyRowSingle>{alertNode}</BodyRowSingle>)
      }
      const data = flattedData.value
      if (data.length > 0) {
        if (slots.default) {
          children.push(...slots.default())
        } else {
          data.forEach((item, rowIndex) => {
            const { expanded, level, record, rowKey } = item
            const rowProps = { key: rowKey, expanded, level, record, rowIndex, rowKey }
            children.push(<BodyRow {...rowProps} />)
          })
        }
      } else {
        const emptyProps = isString(props.empty) ? { description: props.empty } : props.empty
        children.push(
          <BodyRowSingle>
            <IxEmpty {...emptyProps}></IxEmpty>
          </BodyRowSingle>,
        )
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const BodyTag = bodyTag.value as any
      return (
        <BodyTag>
          {showMeasure.value ? <MeasureRow></MeasureRow> : null}
          {children}
        </BodyTag>
      )
    }
  },
})
