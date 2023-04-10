/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchPanelFooterProps } from '../types'

import { type FunctionalComponent } from 'vue'

import { IxButton } from '@idux/components/button'

const PanelFooter: FunctionalComponent<ProSearchPanelFooterProps> = (props, { slots }) => {
  const { prefixCls, locale, onConfirm, onCancel } = props

  return (
    <div class={`${prefixCls}-panel-footer`}>
      {slots.default?.() ?? [
        slots.prepend?.(),
        <IxButton mode="primary" size="xs" onClick={onConfirm}>
          {locale!.ok}
        </IxButton>,
        <IxButton size="xs" onClick={onCancel}>
          {locale!.cancel}
        </IxButton>,
      ]}
    </div>
  )
}

export default PanelFooter
