/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { IxTooltip } from '@idux/components/tooltip'

import { proTextareaContext } from '../token'
import { errorLineProps } from '../types'

export default defineComponent({
  props: errorLineProps,
  setup(props) {
    const { mergedPrefixCls } = inject(proTextareaContext)!

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-error-line`

      return (
        <div class={prefixCls}>
          {props.message && (
            <IxTooltip
              class={`${prefixCls}-tooltip`}
              title={props.message}
              visible={props.visible}
              trigger="manual"
              placement="topStart"
            >
              <div class={`${prefixCls}-trigger`}></div>
            </IxTooltip>
          )}
        </div>
      )
    }
  },
})
