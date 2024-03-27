/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TargetGap, TourProps } from '../types'
import type { TourConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

import { isNumber, merge } from 'lodash-es'

export type MergedTourProps = Omit<TourProps, Exclude<keyof TourConfig, 'overlayContainer'>> &
  Required<Pick<TourProps, Exclude<keyof TourConfig, 'overlayContainer' | 'gap'>> & { gap: TargetGap }>

export function useMergedProps(props: TourProps, config: TourConfig): ComputedRef<MergedTourProps> {
  return computed(() => {
    const propGap = props.gap ? (isNumber(props.gap) ? { offset: props.gap } : { ...props.gap }) : undefined
    return {
      ...props,
      animatable: props.animatable ?? config.animatable,
      gap: propGap ? merge({ ...config.gap }, propGap) : config.gap,
      offset: props.offset ?? config.offset,
      overlayContainer: props.overlayContainer ?? config.overlayContainer,
      placement: props.placement ?? config.placement,
      showArrow: props.showArrow ?? config.showArrow,
      scrollIntoViewOptions: props.scrollIntoViewOptions ?? config.scrollIntoViewOptions,
      closeOnClick: props.closeOnClick ?? config.closeOnClick,
      closeOnEsc: props.closeOnEsc ?? config.closeOnEsc,
      closable: props.closable ?? config.closable,
    }
  })
}
