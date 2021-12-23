/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputComponent } from './src/types'

import Input from './src/Input'

const IxInput = Input as unknown as InputComponent

export { IxInput }

export type { InputInstance, InputComponent, InputPublicProps as InputProps } from './src/types'

export { commonProps as ɵCommonProps } from './src/types'
export { useInput as ɵUseInput } from './src/useInput'
