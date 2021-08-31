import type { ComputedRef } from 'vue'
import type { TableColumnMergedSelectable } from '../../composables/useColumns'

import { computed, defineComponent, inject } from 'vue'
import { IxCheckbox } from '@idux/components/checkbox'
import { tableToken } from '../../token'

export default defineComponent({
  setup() {
    const {
      headColTag,
      paginatedMap,
      selectable,
      currentPageRowKeys,
      currentPageAllSelected,
      currentPageSomeSelected,
      handleHeadSelectChange,
    } = inject(tableToken)!
    const classes = useClasses(selectable)
    const disabled = computed(() => {
      const dataCount = paginatedMap.value.size
      return dataCount === 0 || dataCount === currentPageRowKeys.value.disabledRowKeys.length
    })

    return () => {
      const { additional } = selectable.value!
      const children = renderChildren(
        selectable,
        currentPageAllSelected,
        currentPageSomeSelected,
        disabled,
        handleHeadSelectChange,
      )
      const HeadColTag = headColTag.value as any
      return (
        <HeadColTag class={classes.value} {...additional}>
          {children}
        </HeadColTag>
      )
    }
  },
})

function useClasses(selectable: ComputedRef<TableColumnMergedSelectable | undefined>) {
  return computed(() => {
    const { align } = selectable.value!
    const prefixCls = 'ix-table'
    return {
      [`${prefixCls}-cell`]: true,
      [`${prefixCls}-align-${align}`]: true,
      [`${prefixCls}-selectable`]: true,
    }
  })
}

function renderChildren(
  selectable: ComputedRef<TableColumnMergedSelectable | undefined>,
  currentPageAllSelected: ComputedRef<boolean>,
  currentPageSomeSelected: ComputedRef<boolean>,
  disabled: ComputedRef<boolean>,
  onChange: () => void,
) {
  const { multiple } = selectable.value!
  if (!multiple) {
    return null
  }
  const checked = currentPageAllSelected.value
  const indeterminate = currentPageSomeSelected.value
  const checkboxProps = { control: null, checked, indeterminate, disabled: disabled.value, onChange }
  return <IxCheckbox {...checkboxProps}></IxCheckbox>
}
