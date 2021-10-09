/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ButtonComponent, ButtonGroupComponent } from './src/types'

import Button from './src/Button'
import ButtonGroup from './src/ButtonGroup'

const IxButton = Button as unknown as ButtonComponent
const IxButtonGroup = ButtonGroup as ButtonGroupComponent

export { IxButton, IxButtonGroup }

export type {
  ButtonInstance,
  ButtonPublicProps as ButtonProps,
  ButtonMode,
  ButtonShape,
  ButtonSize,
  ButtonGroupInstance,
  ButtonGroupPublicProps as ButtonGroupProps,
} from './src/types'
