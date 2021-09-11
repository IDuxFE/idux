import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxDropdown } from '@idux/components/dropdown'
import { IxIcon } from '@idux/components/icon'
import { IxMenu, IxMenuItem } from '@idux/components/menu'
import { TABLE_TOKEN } from '../../token'

export default defineComponent({
  setup() {
    const {
      paginatedMap,
      selectable,
      currentPageRowKeys,
      currentPageAllSelected,
      currentPageSomeSelected,
      handleHeadSelectChange,
      mergedSelectableOptions,
    } = inject(TABLE_TOKEN)!

    const disabled = computed(() => {
      const dataCount = paginatedMap.value.size
      return dataCount === 0 || dataCount === currentPageRowKeys.value.disabledRowKeys.length
    })

    return () => {
      const { multiple } = selectable.value!
      if (!multiple) {
        return undefined
      }
      const children: VNodeTypes[] = []
      const checked = currentPageAllSelected.value
      const indeterminate = currentPageSomeSelected.value
      const checkboxProps = { checked, indeterminate, disabled: disabled.value, onChange: handleHeadSelectChange }
      children.push(<IxCheckbox {...checkboxProps}></IxCheckbox>)
      const options = mergedSelectableOptions.value
      if (options) {
        const trigger = <IxIcon name="down" class="ix-dropdown-trigger"></IxIcon>
        const content = (
          <IxMenu>
            {options.map(option => (
              <IxMenuItem {...option}></IxMenuItem>
            ))}
          </IxMenu>
        )
        const slots = { default: () => trigger, overlay: () => content }
        children.push(<IxDropdown v-slots={slots}></IxDropdown>)
      }
      return children
    }
  },
})
