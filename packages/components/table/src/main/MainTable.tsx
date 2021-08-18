import { computed, defineComponent, inject } from 'vue'
import { TableConfig } from '@idux/components/config'
import { tableToken } from '../token'
import { TableProps } from '../types'
import ColGroup from './ColGroup'
import Head from './head/Head'
import Body from './body/Body'

export default defineComponent({
  setup() {
    const { props, config, slots, tableTag } = inject(tableToken)!
    const classes = useClasses(props, config)
    return () => {
      const TableTag = tableTag.value as any

      return (
        <div class={classes.value}>
          {slots.header?.()}
          <div class="ix-table-main-wrapper">
            <div class="ix-table-main-content">
              <TableTag>
                <ColGroup></ColGroup>
                <Head></Head>
                <Body></Body>
              </TableTag>
            </div>
          </div>
          {slots.footer?.()}
        </div>
      )
    }
  },
})

function useClasses(props: TableProps, config: TableConfig) {
  return computed(() => {
    const boderless = props.borderless ?? config.borderless
    const size = props.size ?? config.size
    return {
      'ix-table-main': true,
      'ix-table-boderless': boderless,
      [`ix-table-${size}`]: true,
    }
  })
}
