/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TourProps } from '../types'
import type { TourConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

export type MergedTourProps = Omit<TourProps, Exclude<keyof TourConfig, 'overlayContainer'>> &
  Required<Pick<TourProps, Exclude<keyof TourConfig, 'overlayContainer'>>>

export function useMergedProps(props: TourProps, config: TourConfig): ComputedRef<MergedTourProps> {
  return computed(() => ({
    ...props,
    animatable: props.animatable ?? config.animatable,
    gap: props.gap ?? config.gap,
    offset: props.offset ?? config.offset,
    overlayContainer: props.overlayContainer ?? config.overlayContainer,
    placement: props.placement ?? config.placement,
    showArrow: props.showArrow ?? config.showArrow,
    scrollIntoViewOptions: props.scrollIntoViewOptions ?? config.scrollIntoViewOptions,
    closeOnClick: props.closeOnClick ?? config.closeOnClick,
    closeOnEsc: props.closeOnEsc ?? config.closeOnEsc,
  }))
}
