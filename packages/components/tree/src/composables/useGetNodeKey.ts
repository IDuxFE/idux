/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeNode, TreeProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { TreeConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

export type GetNodeKey = (rawNode: TreeNode) => VKey

/**
 * @deprecated please use `useGetKey` instead
 */
export function useGetNodeKey(props: TreeProps, config: TreeConfig): ComputedRef<GetNodeKey> {
  return computed(() => {
    const nodeKey = props.nodeKey ?? props.getKey ?? config.nodeKey ?? config.getKey
    if (isString(nodeKey)) {
      return (rawNode: TreeNode) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const key = (rawNode as any)[nodeKey]
        if (__DEV__ && key === undefined) {
          Logger.warn('components/tree', 'Each node in tree should have a unique `key` prop.')
        }
        return key
      }
    }
    return nodeKey
  })
}
