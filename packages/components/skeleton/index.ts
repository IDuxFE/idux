/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SkeletonComponent } from './src/types'

import Skeleton from './src/Skeleton'

const IxSkeleton = Skeleton as unknown as SkeletonComponent

export { IxSkeleton }

export type { SkeletonInstance, SkeletonPublicProps as SkeletonProps } from './src/types'
