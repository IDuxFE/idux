/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { NotificationComponent } from './src/types'

import Notification from './src/Notification'
import NotificationProvider from './src/NotificationProvider'

const IxNotification = Notification as unknown as NotificationComponent
const IxNotificationProvider = NotificationProvider as unknown as NotificationComponent

export { IxNotification, IxNotificationProvider }
export { useNotification } from './src/useNotification'

export type {
  NotificationInstance,
  NotificationPublicProps as NotificationProps,
  NotificationType,
  NotificationPlacement,
  NotificationRef,
  NotificationProviderRef,
} from './src/types'
