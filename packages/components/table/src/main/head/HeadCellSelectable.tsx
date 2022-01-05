/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DropdownProps } from '@idux/components/dropdown'

import { computed, defineComponent, inject } from 'vue'

import { useState } from '@idux/cdk/utils'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxDropdown } from '@idux/components/dropdown'
import { IxIcon } from '@idux/components/icon'
import { IxMenu, IxMenuItem } from '@idux/components/menu'

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
      mergedSelectableOptions,
    } = inject(TABLE_TOKEN)!

    const disabled = computed(() => {
      const dataCount = paginatedMap.value.size
      return dataCount === 0 || dataCount === currentPageRowKeys.value.disabledRowKeys.length
    })
    const [visible, setVisible] = useState(false)
    const prefixCls = computed(() => `${mergedPrefixCls.value}-selectable`)
    const triggerClasses = computed(() => {
      return {
        [`${prefixCls.value}-trigger`]: true,
        [`${prefixCls.value}-trigger--open`]: visible.value,
      }
    })

    const renderOverlay = () => {
      const options = mergedSelectableOptions.value
      if (!options) {
        return null
      }

      return (
        <IxMenu>
          {options.map(option => (
            <IxMenuItem {...option}></IxMenuItem>
          ))}
        </IxMenu>
      )
    }
    const renderTrigger = () => <IxIcon name="down" class={triggerClasses.value}></IxIcon>
    const renderDropDown = () => {
      if (!mergedSelectableOptions.value) {
        return null
      }

      const dropdownProps: DropdownProps = {
        'onUpdate:visible': setVisible,
        trigger: 'click',
      }

      return <IxDropdown {...dropdownProps} v-slots={{ default: renderTrigger, overlay: renderOverlay }} />
    }

    return () => {
      const { multiple } = selectable.value!

      if (!multiple) {
        return undefined
      }

      return (
        <div class={`${prefixCls.value}`}>
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
