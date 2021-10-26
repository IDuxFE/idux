/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerProviderRef } from './types'

import { inject } from 'vue'

import { throwError } from '@idux/cdk/utils'

import { drawerProviderToken } from './token'

export const useDrawer = (): DrawerProviderRef => {
  const drawerProviderRef = inject(drawerProviderToken, null)
  if (drawerProviderRef === null) {
    return throwError('components/drawer', '<IxDrawerProvider> not found.')
  }
  return drawerProviderRef
}
