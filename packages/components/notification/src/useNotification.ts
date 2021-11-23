/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { NotificationProviderRef } from './types'

import { inject } from 'vue'

import { throwError } from '@idux/cdk/utils'

import { notificationProviderToken } from './token'

export const useNotification = (): NotificationProviderRef => {
  const notificationProviderRef = inject(notificationProviderToken, null)
  if (notificationProviderRef === null) {
    return throwError('components/notification', '<IxNotificationProvider> not found.')
  }

  return notificationProviderRef
}
