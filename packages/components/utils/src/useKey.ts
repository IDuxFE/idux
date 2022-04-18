/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ComputedRef, computed, getCurrentInstance } from 'vue'

import { isString } from 'lodash-es'

import { Logger, type VKey } from '@idux/cdk/utils'

export function useKey(): VKey {
  const { vnode, uid } = getCurrentInstance()!
  return vnode.key ?? uid
}

export type GetKeyFn = (data: any) => VKey

export function useGetKey(
  props: { getKey?: string | ((data: any) => VKey) },
  config: { getKey: string | ((data: any) => VKey) },
  location: string,
): ComputedRef<GetKeyFn> {
  return computed(() => {
    const { getKey = config.getKey } = props
    if (isString(getKey)) {
      return (data: unknown) => {
        const key = (data as any)[getKey]
        if (__DEV__ && key === undefined) {
          Logger.warn(location, 'Each item in dataSource should have a unique `key` prop.')
        }
        return key
      }
    }
    return getKey
  })
}
