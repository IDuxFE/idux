/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DropdownProps } from '@idux/components/dropdown'

import { computed, defineComponent, inject } from 'vue'

import { isArray } from 'lodash-es'

import { IxDropdown } from '@idux/components/dropdown'
import { IxIcon } from '@idux/components/icon'

import FilterDropdown from '../../other/FilterDropdown'
import { TABLE_TOKEN } from '../../token'
import { tableHeadCellFilterableTriggerProps } from '../../types'

export default defineComponent({
  props: tableHeadCellFilterableTriggerProps,
  setup(props) {
    const { mergedPrefixCls } = inject(TABLE_TOKEN)!
    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-filterable-trigger`
      const { filterable } = props

      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: isArray(filterable.filterBy) && filterable.filterBy.length > 0,
      }
    })

    const renderTrigger = () => (
      <span class={classes.value} onClick={evt => evt.stopPropagation()}>
        <IxIcon name="filter-filled" />
      </span>
    )
    const renderDropDown = () => <FilterDropdown filterable={props.filterable} />

    return () => {
      const { filterable } = props
      if (!filterable || filterable.filters.length <= 0) {
        return null
      }

      const dropdownProps: DropdownProps = {
        trigger: 'click',
        placement: 'bottomStart',
      }

      return <IxDropdown {...dropdownProps} v-slots={{ default: renderTrigger, overlay: renderDropDown }} />
    }
  },
})
