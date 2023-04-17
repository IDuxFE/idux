/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { IxIcon } from '@idux/components/icon'

import { proSearchContext } from '../../token'
import { quickSelectPanelShortcutProps } from '../../types'

export default defineComponent({
  props: quickSelectPanelShortcutProps,
  setup(props) {
    const { mergedPrefixCls, createSearchState, updateSearchState, getSearchStatesByFieldKey } =
      inject(proSearchContext)!

    const handleClick = () => {
      const fieldKey = props.searchField.key
      if (!!props.searchField.multiple || !getSearchStatesByFieldKey(fieldKey).length) {
        const state = createSearchState(props.searchField.key)
        state && updateSearchState(state.key)
      }
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-quick-select-shortcut`
      return (
        <span class={prefixCls} onClick={handleClick}>
          {props.searchField.icon && <IxIcon class={`${prefixCls}-icon`} name={props.searchField.icon} />}
          {props.searchField.label}
        </span>
      )
    }
  },
})
