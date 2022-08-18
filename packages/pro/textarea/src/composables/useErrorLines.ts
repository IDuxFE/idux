/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTextareaProps } from '../types'
import type { ɵBoxSizingData } from '@idux/components/textarea'
import type { ComputedRef } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface ErrorLinesContext {
  visibleErrIndex: ComputedRef<number>
  setvisibleErrIndex: (errIndex: number) => void
  handleTextareaMouseMove: (evt: MouseEvent) => void
  handleTextareaMouseLeave: (evt: MouseEvent) => void
}

export function useErrorLines(
  props: ProTextareaProps,
  lineHeight: ComputedRef<number>,
  sizingData: ComputedRef<ɵBoxSizingData>,
): ErrorLinesContext {
  const [visibleErrIndex, setvisibleErrIndex] = useState<number>(-1)

  const handleTextareaMouseMove = (evt: MouseEvent) => {
    const currentHoverlineIdx = Math.floor((evt.offsetY - sizingData.value.paddingTop) / lineHeight.value)
    const currentHoverErrIdx = props.errors?.find(error => error.index === currentHoverlineIdx)?.index

    setvisibleErrIndex(currentHoverErrIdx ?? -1)
  }
  const handleTextareaMouseLeave = (_: MouseEvent) => {
    setvisibleErrIndex(-1)
  }

  return {
    visibleErrIndex,
    setvisibleErrIndex,
    handleTextareaMouseMove,
    handleTextareaMouseLeave,
  }
}
