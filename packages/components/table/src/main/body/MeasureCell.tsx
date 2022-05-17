/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, onBeforeUnmount, ref } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'

import { tableMeasureCellProps } from '../../types'

export default defineComponent({
  props: tableMeasureCellProps,
  setup(props) {
    const cellRef = ref<HTMLTableCellElement>()

    const handleResize = (evt: ResizeObserverEntry) => {
      const { offsetWidth } = evt.target as HTMLTableCellElement
      props.changeColumnWidth(props.cellKey, offsetWidth)
    }

    useResizeObserver(cellRef, handleResize)

    onBeforeUnmount(() => {
      props.changeColumnWidth(props.cellKey, false)
    })

    return () => (
      <td ref={cellRef} style={{ padding: 0, border: 0, height: 0 }}>
        <div style={{ height: 0, overflow: 'hidden' }}>&nbsp;</div>
      </td>
    )
  },
})
