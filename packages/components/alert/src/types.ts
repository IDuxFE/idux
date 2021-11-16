/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

type AlertType = 'success' | 'info' | 'warning' | 'error'

export const alertIconMap = {
  success: 'check-circle',
  error: 'info-circle',
  info: 'bulb',
  warning: 'exclamation-circle',
}

export const alertProps = {
  type: IxPropTypes.oneOf<AlertType>(['success', 'info', 'warning', 'error']).def('info'),
  closable: IxPropTypes.bool.def(false),
  closeIcon: IxPropTypes.string.def('close'),
  icon: IxPropTypes.string,
  title: IxPropTypes.string,
  description: IxPropTypes.string,
  showPagination: IxPropTypes.bool.def(false),
  onBeforeClose: IxPropTypes.emit<() => void | boolean | Promise<boolean>>(),
  onClose: IxPropTypes.emit<() => void>(),
}

export type AlertProps = IxInnerPropTypes<typeof alertProps>
export type AlertPublicProps = IxPublicPropTypes<typeof alertProps>
export type AlertComponent = DefineComponent<Omit<HTMLAttributes, keyof AlertPublicProps> & AlertPublicProps>
export type AlertInstance = InstanceType<DefineComponent<AlertProps>>
