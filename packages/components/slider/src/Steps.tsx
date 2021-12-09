/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SliderContext } from './token'
import type { SliderProps } from './types'

import { defineComponent, inject } from 'vue'

import { sliderStartDirection, sliderToken } from './token'

export default defineComponent({
  name: 'IxSliderSteps',
  setup() {
    const { values, dots, marks, max, min, prefixCls, range, reverse, step, vertical } =
      inject<SliderContext>(sliderToken)!

    return () => {
      return (
        <div class={`${prefixCls.value}-step`}>
          {renderDots(
            values.value,
            dots.value,
            marks.value,
            max.value,
            min.value,
            prefixCls.value,
            range.value,
            reverse.value,
            step.value,
            vertical.value,
          )}
        </div>
      )
    }
  },
})

function renderDots(
  values: number[],
  dots: boolean,
  marks: SliderProps['marks'],
  max: number,
  min: number,
  prefixCls: string,
  range: boolean,
  reverse: boolean,
  step: number | null,
  vertical: boolean,
) {
  const width = max - min
  return getOffsets(dots, marks, max, min, step).map(offset => {
    const pos = `${(Math.abs(offset - min) / width) * 100}%`
    const isActived = range ? !(offset < values[0] || offset > values[1]) : offset <= values[0]
    const style = vertical
      ? { [reverse ? sliderStartDirection.ttb : sliderStartDirection.btt]: pos }
      : { [reverse ? sliderStartDirection.rtl : sliderStartDirection.ltr]: pos }

    const classes = {
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-active`]: isActived,
      [`${prefixCls}-dot-reverse`]: reverse,
    }

    return <span key={offset} class={classes} style={style} />
  })
}

function getOffsets(dots: boolean, marks: SliderProps['marks'], max: number, min: number, step: number | null) {
  const points = Object.keys(marks ?? {})
    .map(parseFloat)
    .sort((a, b) => a - b)

  if (dots && step) {
    for (let i = min; i <= max; i += step) {
      if (points.indexOf(i) === -1) {
        points.push(i)
      }
    }
  }

  return points
}
