/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputNumberComponent } from './src/types'

import InputNumber from './src/InputNumber'

const IxInputNumber = InputNumber as unknown as InputNumberComponent

export { IxInputNumber }

export type { InputNumberInstance, InputNumberComponent, InputNumberPublicProps as InputNumberProps } from './src/types'
