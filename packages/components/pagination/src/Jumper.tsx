import { computed, defineComponent, inject, toRef } from 'vue'
import { IxInput } from '@idux/components/input'
import { paginationToken } from './token'
import { useJumpToIndex } from './utils'

export default defineComponent({
  setup() {
    const { props, config, locale } = inject(paginationToken)!
    const size = computed(() => props.size ?? config.size)
    const jumpToIndex = useJumpToIndex(true)

    return {
      disabled: toRef(props, 'disabled'),
      size,
      locale,
      jumpToIndex,
    }
  },

  render() {
    const { jumpTo, page } = this.locale
    return (
      <li class="ix-pagination-jumper">
        {jumpTo}
        <IxInput disabled={this.disabled} size={this.size} onKeydown={this.jumpToIndex} />
        {page}
      </li>
    )
  },
})
