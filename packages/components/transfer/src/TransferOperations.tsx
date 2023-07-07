/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNode, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { IxButton } from '@idux/components/button'

import { TRANSFER_OPERATIONS_TOKEN, transferContext } from './token'
import { convertToSlotParams } from './utils'

export default defineComponent({
  setup() {
    const { slots, props: transferProps, mergedPrefixCls } = inject(transferContext)!
    const transferOperationsContext = inject(TRANSFER_OPERATIONS_TOKEN)!
    const { appendDisabled, removeDisabled, triggerAppend, triggerRemove } = transferOperationsContext

    const handleTransferRightClick = () => {
      triggerAppend()
    }
    const handleTransferLeftClick = () => {
      triggerRemove()
    }

    const renderBtn = (prefixCls: string, icon: string | VNode, disabled: boolean, onClick: () => void) => {
      if (isString(icon)) {
        return <IxButton class={`${prefixCls}-btn`} icon={icon} disabled={disabled} onClick={onClick} />
      }

      return <IxButton class={`${prefixCls}-btn`} v-slos={{ icon: () => icon }} disabled={disabled} onClick={onClick} />
    }

    const renderOperations = (prefixCls: string) => {
      if (slots.operations) {
        return slots.operations(convertToSlotParams(transferOperationsContext))
      }

      if (transferProps.mode === 'immediate') {
        return
      }

      return (
        <div class={`${prefixCls}-inner`}>
          {renderBtn(prefixCls, 'double-right', appendDisabled.value, handleTransferRightClick)}
          {renderBtn(prefixCls, 'double-left', removeDisabled.value, handleTransferLeftClick)}
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-operations`

      return <div class={prefixCls}>{renderOperations(prefixCls)}</div>
    }
  },
})
