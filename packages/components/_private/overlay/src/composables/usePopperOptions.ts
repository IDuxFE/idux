/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverlayProps } from '../types'
import type { PopperPlacement, PopperTrigger } from '@idux/cdk/popper'

import { type ComputedRef, type Ref, watch } from 'vue'

import { useState } from '@idux/cdk/utils'

export function usePopperOptions(
  props: OverlayProps,
  arrowRef: Ref<HTMLElement | undefined>,
): {
  options: {
    allowEnter: ComputedRef<boolean | undefined>
    autoAdjust: ComputedRef<boolean | undefined>
    delay: ComputedRef<number | [number | null, number | null] | undefined>
    disabled: ComputedRef<boolean | undefined>
    offset: ComputedRef<[number, number] | undefined>
    placement: ComputedRef<PopperPlacement | undefined>
    trigger: ComputedRef<PopperTrigger>
  }
  update: () => void
} {
  const [allowEnter, setAllowEnter] = useState(props.allowEnter)
  const [autoAdjust, setAutoAdjust] = useState(props.autoAdjust)
  const [delay, setDelay] = useState(props.delay)
  const [disabled, setDisabled] = useState(props.disabled)
  const [offset, setOffset] = useState(props.offset)
  const [placement, setPlacement] = useState(props.placement)
  const [trigger, setTrigger] = useState<PopperTrigger>(props.trigger ?? 'hover')

  const options = {
    allowEnter,
    autoAdjust,
    delay,
    disabled,
    offset,
    placement,
    trigger,
  }

  const updateOptions = () => {
    const { allowEnter, autoAdjust, delay, disabled, offset, placement, trigger } = props

    let _offset: [number, number] | undefined
    if (!arrowRef.value) {
      _offset = offset
    } else {
      const { offsetHeight, offsetWidth } = arrowRef.value
      _offset = offset ? [...offset] : [0, 0]
      _offset[1] += [offsetWidth, offsetHeight][1] / 2
    }

    setAllowEnter(allowEnter)
    setAutoAdjust(autoAdjust)
    setDelay(delay)
    setDisabled(disabled)
    setOffset(_offset)
    setPlacement(placement)
    setTrigger(trigger ?? 'hover')
  }

  watch(props, updateOptions, { immediate: true, deep: true })
  watch(arrowRef, updateOptions)

  return {
    options,
    update: updateOptions,
  }
}
