/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MessageProviderRef } from './types'

import { inject } from 'vue'

import { throwError } from '@idux/cdk/utils'

import { messageProviderToken } from './token'

export const useMessage = (): MessageProviderRef => {
  const modalProviderRef = inject(messageProviderToken, null)
  if (modalProviderRef === null) {
    return throwError('components/message', '<IxMessageProvider> not found.')
  }
  return modalProviderRef
}
