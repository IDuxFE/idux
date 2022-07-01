/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

export type ResultStatus = 'success' | 'error' | 'info' | 'warning'

export const resultProps = {
  icon: [String, Object] as PropType<string | VNode>,
  status: String as PropType<ResultStatus>,
  subtitle: String,
  title: String,
}

export type ResultProps = ExtractInnerPropTypes<typeof resultProps>
export type ResultPublicProps = ExtractPublicPropTypes<typeof resultProps>
export type ResultComponent = DefineComponent<Omit<HTMLAttributes, keyof ResultPublicProps> & ResultPublicProps>
export type ResultInstance = InstanceType<DefineComponent<ResultProps>>
