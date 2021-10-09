/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import { offResize, onResize } from '@idux/cdk/utils'

import { tableMeasureCellProps } from '../../types'

export default defineComponent({
  props: tableMeasureCellProps,
  setup(props) {
    const cellRef = ref<HTMLTableCellElement>()

    const handleResize = (evt: ResizeObserverEntry) => {
      const { offsetWidth } = evt.target as HTMLTableCellElement
      props.changeColumnWidth(props.cellKey, offsetWidth)
    }

    onMounted(() => {
      const element = cellRef.value!
      props.changeColumnWidth(props.cellKey, element.offsetWidth)
      onResize(element, handleResize)
    })

    onBeforeUnmount(() => {
      props.changeColumnWidth(props.cellKey, false)
      offResize(cellRef.value, handleResize)
    })

    return () => (
      <td ref={cellRef} style={{ padding: 0, border: 0, height: 0 }}>
        <div style={{ height: 0, overflow: 'hidden' }}>&nbsp;</div>
      </td>
    )
  },
})
