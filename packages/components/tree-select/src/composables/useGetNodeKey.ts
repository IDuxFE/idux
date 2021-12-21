/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeSelectNode, TreeSelectProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { TreeSelectConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

export type GetNodeKey = (rawNode: TreeSelectNode) => VKey

export function useGetNodeKey(props: TreeSelectProps, config: TreeSelectConfig): ComputedRef<GetNodeKey> {
  return computed(() => {
    const nodeKey = props.nodeKey ?? config.nodeKey
    if (isString(nodeKey)) {
      return (rawNode: TreeSelectNode) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const key = (rawNode as any)[nodeKey]
        if (__DEV__ && key === undefined) {
          Logger.warn('components/treeSelect', 'Each data in dataSource should have a unique `key` prop.')
        }
        return key
      }
    }
    return nodeKey
  })
}
