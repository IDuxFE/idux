import { computed, defineComponent, inject } from 'vue'
import { TABLE_TOKEN } from '../../token'

export default defineComponent({
  setup(_, { slots }) {
    const { flattedColumns, bodyRowTag, bodyColTag } = inject(TABLE_TOKEN)!
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
