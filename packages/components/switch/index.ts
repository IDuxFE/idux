/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SwitchComponent } from './src/types'

import Switch from './src/Switch'

const IxSwitch = Switch as unknown as SwitchComponent

export { IxSwitch }

export type { SwitchInstance, SwitchPublicProps as SwitchProps } from './src/types'
