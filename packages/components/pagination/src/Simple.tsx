import { computed, defineComponent, inject, ref, watchEffect } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxInput } from '@idux/components/input'
import Item from './Item'
import { paginationToken } from './token'
import { useJumpToIndex } from './utils'

export default defineComponent({
  setup() {
    const { prefixCls } = useGlobalConfig('common')

    const { props, config, activeIndex, activeSize } = inject(paginationToken)!
    const size = computed(() => props.size ?? config.size)
    const lastIndex = ref(0)
    const isFirstIndex = ref(false)
    const isLastIndex = ref(false)

    watchEffect(() => {
      const _lastIndex = Math.ceil(props.total / activeSize.value)
      lastIndex.value = _lastIndex
      isFirstIndex.value = activeIndex.value === 1
      isLastIndex.value = activeIndex.value === _lastIndex
    })

    const jumpToIndex = useJumpToIndex(false)

    return () => {
      return (
        <>
          <Item disabled={isFirstIndex.value} type="prev" />
          <li class={`${prefixCls}-pagination-item`}>
            <IxInput
              disabled={props.disabled}
              size={size.value}
              value={activeIndex.value.toString()}
              onKeydown={jumpToIndex}
            />
            <span class={`${prefixCls}-pagination-item-slash`}>/</span>
            <span>{lastIndex.value}</span>
          </li>
          <Item disabled={isLastIndex.value} type="next" />
        </>
      )
    }
  },
})
