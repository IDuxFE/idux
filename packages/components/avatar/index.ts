/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AvatarComponent } from './src/types'

import Avatar from './src/Avatar'

const IxAvatar = Avatar as unknown as AvatarComponent

export { IxAvatar }

export type {
  AvatarInstance,
  AvatarComponent,
  AvatarPublicProps as AvatarProps,
  AvatarShape,
  AvatarSize,
} from './src/types'
