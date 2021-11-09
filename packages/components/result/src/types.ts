/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type ResultStatus = 'success' | 'error' | 'info' | 'warning'

export const resultProps = {
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  status: IxPropTypes.oneOf<ResultStatus>(['success', 'error', 'info', 'warning']),
  subtitle: IxPropTypes.string,
  title: IxPropTypes.string,
}

export type ResultProps = IxInnerPropTypes<typeof resultProps>
export type ResultPublicProps = IxPublicPropTypes<typeof resultProps>
export type ResultComponent = DefineComponent<Omit<HTMLAttributes, keyof ResultPublicProps> & ResultPublicProps>
export type ResultInstance = InstanceType<DefineComponent<ResultProps>>
