/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AlertComponent } from './src/types'

import Alert from './src/Alert'

const IxAlert = Alert as unknown as AlertComponent

export { IxAlert }

export type {
  AlertInstance,
  AlertComponent,
  AlertPublicProps as AlertProps,
  AlertType,
  AlertPagination,
} from './src/types'

export { getThemeTokens as getAlertThemeTokens } from './theme'
export type { AlertThemeTokens } from './theme'
