import { computed, defineComponent, inject, ref, toRef, watchEffect } from 'vue'
import { IxInput } from '@idux/components/input'
import Item from './Item'
import { paginationToken } from './token'
import { useJumpToIndex } from './utils'

export default defineComponent({
  setup() {
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

    return {
      size,
      disabled: toRef(props, 'disabled'),
      activeIndex,
      lastIndex,
      isFirstIndex,
      isLastIndex,
      jumpToIndex,
    }
  },
  render() {
    return (
      <>
        <Item disabled={this.isFirstIndex} type="prev" />
        <li class="ix-pagination-item">
          <IxInput
            disabled={this.disabled}
            size={this.size}
            value={this.activeIndex.toString()}
            onKeydown={this.jumpToIndex}
          />
          <span class="ix-pagination-item-slash">/</span>
          <span>{this.lastIndex}</span>
        </li>
        <Item disabled={this.isLastIndex} type="next" />
      </>
    )
  },
})
