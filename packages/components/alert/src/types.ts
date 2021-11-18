/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const alertProps = {
  closable: IxPropTypes.bool,
  closeIcon: IxPropTypes.string.def('close'),
  description: IxPropTypes.string,
  icon: IxPropTypes.string,
  title: IxPropTypes.oneOfType([String, IxPropTypes.arrayOf(String)]),
  pagination: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<AlertPagination>()]).def(false),
  type: IxPropTypes.oneOf<AlertType>(['success', 'info', 'warning', 'error']).def('info'),
  onBeforeClose: IxPropTypes.emit<() => void | boolean | Promise<boolean>>(),
  onClose: IxPropTypes.emit<() => void>(),
}

export type AlertProps = IxInnerPropTypes<typeof alertProps>
export type AlertPublicProps = IxPublicPropTypes<typeof alertProps>
export type AlertComponent = DefineComponent<Omit<HTMLAttributes, keyof AlertPublicProps> & AlertPublicProps>
export type AlertInstance = InstanceType<DefineComponent<AlertProps>>

export type AlertType = 'success' | 'info' | 'warning' | 'error'
export interface AlertPagination {
  pageIndex?: number
  onChange?: (pageIndex: number) => void
}
