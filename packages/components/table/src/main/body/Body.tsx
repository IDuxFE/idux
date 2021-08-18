import { defineComponent, inject, VNodeTypes } from 'vue'
import { isString } from 'lodash-es'
import { IxEmpty } from '@idux/components/empty'
import { tableToken } from '../../token'
import BodyRow from './BodyRow'
import BodyRowSingle from './BodyRowSingle'

export default defineComponent({
  setup() {
    const { props, slots, flattedDataSource, bodyTag } = inject(tableToken)!
    return () => {
      const data = flattedDataSource.value
      let children: VNodeTypes[] = []
      if (slots.alert) {
        const alertNode = slots.alert()
        children.push(<BodyRowSingle>{alertNode}</BodyRowSingle>)
      }

      if (data.length > 0) {
        data.forEach((item, index) => children.push(<BodyRow {...item} key={item.rowKey} index={index} />))
      } else {
        const emptyProps = isString(props.empty) ? { description: props.empty } : props.empty
        children.push(
          <BodyRowSingle>
            <IxEmpty {...emptyProps}></IxEmpty>
          </BodyRowSingle>,
        )
      }

      const BodyTag = bodyTag.value as any
      return <BodyTag class="ix-table-tbody">{children}</BodyTag>
    }
  },
})
