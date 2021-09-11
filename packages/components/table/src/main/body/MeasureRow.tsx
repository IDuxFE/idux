import { defineComponent, inject } from 'vue'
import { tableBodyToken, TABLE_TOKEN } from '../../token'
import MeasureCell from './MeasureCell'

export default defineComponent({
  setup() {
    const { flattedColumns } = inject(TABLE_TOKEN)!
    const { changeColumnWidth } = inject(tableBodyToken)!
    return () => {
      const children = flattedColumns.value.map(column => {
        const { key } = column
        const cellProps = { key, cellKey: key, changeColumnWidth }
        return <MeasureCell {...cellProps}></MeasureCell>
      })
      return (
        <tr class="ix-table-measure-row" style={{ fontSize: 0, height: 0 }} aria-hidden={true}>
          {children}
        </tr>
      )
    }
  },
})
