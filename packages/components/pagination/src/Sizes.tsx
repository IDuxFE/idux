import { computed, defineComponent, inject } from 'vue'
import { IxSelect } from '@idux/components/select'
import { paginationToken } from './token'

export default defineComponent({
  setup() {
    const { props, config, locale, activeSize, onPageSizeChange } = inject(paginationToken)!

    const size = computed(() => props.size ?? config.size)
    const pageSizes = computed(() => props.pageSizes ?? config.pageSizes)

    const sizeOptions = computed(() => {
      return pageSizes.value.map(size => {
        return {
          value: size,
          label: `${size} ${locale.value.itemsPerPage}`,
        }
      })
    })

    return () => {
      return (
        <li class="ix-pagination-sizes">
          <IxSelect
            disabled={props.disabled}
            options={sizeOptions.value}
            size={size.value}
            value={activeSize.value}
            onChange={onPageSizeChange}
          />
        </li>
      )
    }
  },
})
