/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

export const waveProps = {} as const

export interface WaveBindings {
  play: () => void
}

export type WaveProps = ExtractInnerPropTypes<typeof waveProps>
export type WavePublicProps = ExtractPublicPropTypes<typeof waveProps>
export type WaveComponent = DefineComponent<Omit<HTMLAttributes, keyof WavePublicProps> & WavePublicProps>
export type WaveInstance = InstanceType<DefineComponent<WaveProps, WaveBindings>>
