/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeSelectComponent } from './src/types'

import TreeSelect from './src/TreeSelect'

const IxTreeSelect = TreeSelect as unknown as TreeSelectComponent

export { IxTreeSelect }

export type { TreeSelectInstance, TreeSelectPublicProps as TreeSelectProps, TreeSelectNode } from './src/types'
