/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { selectToken } from '../token'
import { optionGroupProps } from '../types'

export default defineComponent({
  props: optionGroupProps,
  setup(props) {
    const { mergedPrefixCls } = inject(selectToken)!
    return () => {
      const { label, rawOption } = props
      const prefixCls = `${mergedPrefixCls.value}-option-group`
      return (
        <div class={prefixCls} {...rawOption.additional} aria-label={label}>
          <span class={`${prefixCls}-label`}>{rawOption.slots?.default?.(rawOption) ?? label}</span>
        </div>
      )
    }
  },
})
