/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CascaderComponent } from './src/types'

import Cascader from './src/Cascader'

const IxCascader = Cascader as unknown as CascaderComponent

export { IxCascader }

export type {
  CascaderInstance,
  CascaderComponent,
  CascaderPublicProps as CascaderProps,
  CascaderData,
  CascaderExpandTrigger,
  CascaderSearchFn,
  CascaderStrategy,
} from './src/types'
