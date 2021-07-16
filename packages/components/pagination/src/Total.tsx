import { computed, defineComponent, inject, toRef } from 'vue'
import { paginationToken } from './token'

export default defineComponent({
  setup() {
    const { props, slots, config, locale, activeIndex, activeSize } = inject(paginationToken)!

    const total = toRef(props, 'total')
    const totalRender = computed(() => slots.total ?? props.totalRender ?? config.totalRender)

    const range = computed(() => {
      const currIndex = activeIndex.value
      const currSize = activeSize.value
      const firstIndex = (currIndex - 1) * currSize + 1
      const lastIndex = Math.min(currIndex * currSize, total.value)
      return [firstIndex, lastIndex] as [number, number]
    })

    return { locale, range, total, totalRender }
  },
  render() {
    const { locale, total, range, totalRender } = this
    const { totalPrefix, totalSuffix } = locale
    const child = totalRender ? totalRender({ total, range }) : `${totalPrefix} ${total} ${totalSuffix}`
    return <li class="ix-pagination-total">{child}</li>
  },
})
