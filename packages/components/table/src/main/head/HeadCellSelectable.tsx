/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { useState } from '@idux/cdk/utils'
import { IxCheckbox } from '@idux/components/checkbox'
import { type DropdownProps, IxDropdown } from '@idux/components/dropdown'
import { IxIcon } from '@idux/components/icon'
import { IxMenu } from '@idux/components/menu'

import { TABLE_TOKEN } from '../../token'

export default defineComponent({
  setup() {
    const {
      mergedPrefixCls,
      paginatedMap,
      selectable,
      currentPageRowKeys,
      currentPageAllSelected,
      currentPageSomeSelected,
      handleHeadSelectChange,
      mergedSelectableMenus,
      handleSelectableMenuClick,
    } = inject(TABLE_TOKEN)!

    const disabled = computed(() => {
      const dataCount = paginatedMap.value.size
      return dataCount === 0 || dataCount === currentPageRowKeys.value.disabledRowKeys.length
    })

    const [visible, setVisible] = useState(false)
    const dropdownProps: DropdownProps = {
      'onUpdate:visible': setVisible,
      trigger: 'click',
    }
    const renderOverlay = () => <IxMenu dataSource={mergedSelectableMenus.value} onClick={handleSelectableMenuClick} />
    const renderTrigger = () => (
      <IxIcon class={`${mergedPrefixCls.value}-selectable-trigger`} name="down" rotate={visible.value ? 180 : 0} />
    )
    const renderDropDown = () => {
      if (mergedSelectableMenus.value.length === 0) {
        return
      }

      return <IxDropdown {...dropdownProps} v-slots={{ default: renderTrigger, overlay: renderOverlay }} />
    }

    return () => {
      const { multiple } = selectable.value!

      if (!multiple) {
        return
      }

      return (
        <div class={`${mergedPrefixCls.value}-selectable`}>
          <IxCheckbox
            checked={currentPageAllSelected.value}
            indeterminate={currentPageSomeSelected.value}
            disabled={disabled.value}
            onChange={handleHeadSelectChange}
          />
          {renderDropDown()}
        </div>
      )
    }
  },
})
