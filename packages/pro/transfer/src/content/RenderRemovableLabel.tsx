/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferData } from '../types'
import type { Slot, VNodeChild } from 'vue'

import { IxIcon } from '@idux/components/icon'

export function renderRemovableLabel(
  record: TransferData,
  disabled: boolean,
  ellipsis: boolean,
  defaultSlot: Slot | null,
  triggerRemove: (record: TransferData) => void,
  prefixCls: string,
): VNodeChild {
  const onClick = () => {
    triggerRemove(record)
  }

  const classes = {
    [`${prefixCls}-removable-label`]: true,
    [`${prefixCls}-removable-label-with-text`]: !!defaultSlot,
    [`${prefixCls}-removable-label-ellipsis`]: !!ellipsis,
  }
  return (
    <span class={classes}>
      {defaultSlot && <span class={`${prefixCls}-removable-label-text`}>{defaultSlot()}</span>}
      {!disabled && renderRemoveIcon(prefixCls, onClick)}
    </span>
  )
}

export function renderRemoveIcon(prefixCls: string, onClick: () => void): VNodeChild {
  return <IxIcon class={`${prefixCls}-close-icon`} name="close" onClick={onClick} />
}
