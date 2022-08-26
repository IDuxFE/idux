/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ClickOutsideComponent } from './src/types'

import ClickOutside from './src/ClickOutside'

const CdkClickOutside = ClickOutside as unknown as ClickOutsideComponent

export { CdkClickOutside }

export * from './src/useClickOutside'
export * from './src/vClickOutside'

export type {
  ClickOutsideInstance,
  ClickOutsideComponent,
  ClickOutsidePublicProps as ClickOutsideProps,
  ClickOutsideDirective,
  ClickOutsideOptions,
  ClickOutsideHandler,
  ClickOutsideBinding,
} from './src/types'
