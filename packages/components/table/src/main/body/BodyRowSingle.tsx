import { computed, defineComponent, inject } from 'vue'
import { tableToken } from '../../token'

export default defineComponent({
  setup(_, { slots }) {
    const { flattedColumns, bodyRowTag, bodyColTag } = inject(tableToken)!
    const columnCount = computed(() => flattedColumns.value.length)
    return () => {
      const BodyRowTag = bodyRowTag.value as any
      const BodyColTag = bodyColTag.value as any
      return (
        <BodyRowTag>
          <BodyColTag colSpan={columnCount.value}>{slots.default?.()}</BodyColTag>
        </BodyRowTag>
      )
    }
  },
})
