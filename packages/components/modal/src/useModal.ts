/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ModalProviderRef } from './types'

import { inject } from 'vue'

import { throwError } from '@idux/cdk/utils'

import { modalProviderToken } from './token'

export const useModal = (): ModalProviderRef => {
  const modalProviderRef = inject(modalProviderToken, null)
  if (modalProviderRef === null) {
    return throwError('components/modal', '<IxModalProvider> not found.')
  }
  return modalProviderRef
}
