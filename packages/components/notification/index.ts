/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { NotificationComponent, NotificationProviderComponent } from './src/types'

import Notification from './src/Notification'
import NotificationProvider from './src/NotificationProvider'

const IxNotification = Notification as unknown as NotificationComponent
const IxNotificationProvider = NotificationProvider as unknown as NotificationProviderComponent

export { IxNotification, IxNotificationProvider }
export { useNotification } from './src/useNotification'

export type {
  NotificationInstance,
  NotificationComponent,
  NotificationPublicProps as NotificationProps,
  NotificationType,
  NotificationPlacement,
  NotificationRef,
  NotificationProviderRef,
  NotificationProviderComponent,
} from './src/types'
