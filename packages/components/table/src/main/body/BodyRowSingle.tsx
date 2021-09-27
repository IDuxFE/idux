import { computed, defineComponent, inject } from 'vue'
import { TABLE_TOKEN } from '../../token'

export default defineComponent({
  setup(_, { slots }) {
    const { flattedColumns, bodyRowTag, bodyColTag } = inject(TABLE_TOKEN)!
    const columnCount = computed(() => flattedColumns.value.length)
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const BodyRowTag = bodyRowTag.value as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const BodyColTag = bodyColTag.value as any
      return (
        <BodyRowTag>
          <BodyColTag colSpan={columnCount.value}>{slots.default?.()}</BodyColTag>
        </BodyRowTag>
      )
    }
  },
})
