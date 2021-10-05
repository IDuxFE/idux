import { computed, defineComponent, inject } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxInput } from '@idux/components/input'
import { paginationToken } from './token'
import { useJumpToIndex } from './utils'

export default defineComponent({
  setup() {
    const { prefixCls } = useGlobalConfig('common')

    const { props, config, locale } = inject(paginationToken)!
    const size = computed(() => props.size ?? config.size)
    const jumpToIndex = useJumpToIndex(true)

    return () => {
      const { disabled } = props
      const { jumpTo, page } = locale.value
      return (
        <li class={`${prefixCls}-pagination-jumper`}>
          {jumpTo}
          <IxInput disabled={disabled} size={size.value} onKeydown={jumpToIndex} />
          {page}
        </li>
      )
    }
  },
})
