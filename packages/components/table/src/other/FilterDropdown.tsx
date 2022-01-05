/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { IxCheckbox, IxCheckboxGroup } from '@idux/components/checkbox'

import { TABLE_TOKEN } from '../token'
import { tableFilterPanelProps } from '../types'

export default defineComponent({
  props: tableFilterPanelProps,
  setup(props) {
    const { mergedPrefixCls } = inject(TABLE_TOKEN)!

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-filter-dropdown`
      const {
        filterable: { filters, filterBy, onChange },
      } = props

      return (
        <div class={prefixCls}>
          <IxCheckboxGroup class={`${prefixCls}-group`} value={filterBy} onChange={onChange}>
            {filters.map(filter => (
              <div class={`${prefixCls}-item-wrapper`}>
                <IxCheckbox class={`${prefixCls}-item`} value={filter.value} size="sm">
                  {filter.text}
                </IxCheckbox>
              </div>
            ))}
          </IxCheckboxGroup>
        </div>
      )
    }
  },
})
