/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LoadingBarProviderRef } from './types'

import { inject } from 'vue'

import { throwError } from '@idux/cdk/utils'

import { loadingBarProviderToken } from './token'

export const useLoadingBar = (): LoadingBarProviderRef => {
  const providerRef = inject(loadingBarProviderToken, null)
  if (providerRef === null) {
    return throwError('cbomponents/loading-bar', '<IxLoadingBarProvider> not found.')
  }
  return providerRef
}
