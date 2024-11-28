/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RangeShortcutOptions } from '../types'
import type { VKey } from '@idux/cdk/utils'

import { type PropType, defineComponent } from 'vue'

export default defineComponent({
  props: {
    prefixCls: String,
    selectedShortcut: [String, Number, Symbol] as PropType<VKey>,
    shortcuts: Array as PropType<RangeShortcutOptions[]>,
    onChange: Function as PropType<(shortcut: RangeShortcutOptions) => void>,
  },
  setup(props) {
    return () => {
      const prefixCls = `${props.prefixCls}-shortcuts`

      const handleShortcutClick = (evt: MouseEvent, shortcut: RangeShortcutOptions) => {
        shortcut.onClick?.(evt)
        props.onChange?.(shortcut)
      }

      return (
        <ul class={prefixCls}>
          {props.shortcuts?.map(shortcut => (
            <li
              key={shortcut.key}
              class={[
                `${prefixCls}-item`,
                props.selectedShortcut === shortcut.key ? `${prefixCls}-item-selected` : undefined,
              ]}
              onClick={evt => handleShortcutClick(evt, shortcut)}
            >
              <span class={`${prefixCls}-item-label`}>{shortcut.label}</span>
            </li>
          ))}
        </ul>
      )
    }
  },
})
