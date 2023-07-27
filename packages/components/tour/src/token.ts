/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ActiveStateContext } from './composables/useActiveState'
import type { MaskContext } from './composables/useMask'
import type { MergedTourProps } from './composables/useMergedProps'
import type { StepChangeContext } from './composables/useStepChange'
import type { VisibleContext } from './composables/useVisible'
import type { ResolvedTourStep } from './types'
import type { TourLocale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey } from 'vue'

export interface TourContext extends ActiveStateContext, MaskContext, VisibleContext, StepChangeContext {
  mergedPrefixCls: ComputedRef<string>
  mergedProps: ComputedRef<MergedTourProps>
  locale: TourLocale
  activeStep: ComputedRef<ResolvedTourStep | undefined>
}

export const tourToken: InjectionKey<TourContext> = Symbol('tourToken')
