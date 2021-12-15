/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable indent */

import type { SliderContext } from './token'
import type { SliderMarksProps, SliderProps } from './types'
import type { CSSProperties, VNode } from 'vue'

import { computed, defineComponent, inject, isVNode, normalizeStyle } from 'vue'

import { isFunction, isPlainObject, isString, isUndefined } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'

import { sliderStartDirection, sliderToken } from './token'
import { sliderMarksProps } from './types'

export default defineComponent({
  name: 'IxSliderMarks',
  props: sliderMarksProps,
  setup(props) {
    const { values, marks, max, min, prefixCls, range, reverse, vertical } = inject<SliderContext>(sliderToken)!
    const mergedPrefixCls = computed(() => `${prefixCls.value}-mark`)
    return () => {
      return (
        <div class={mergedPrefixCls.value}>
          {renderMarks(
            props,
            values.value,
            marks.value,
            max.value,
            min.value,
            mergedPrefixCls.value,
            range.value,
            reverse.value,
            vertical.value,
          )}
        </div>
      )
    }
  },
})

function renderMarks(
  props: SliderMarksProps,
  values: number[],
  marks: SliderProps['marks'],
  max: number,
  min: number,
  prefixCls: string,
  range: boolean,
  reverse: boolean,
  vertical: boolean,
) {
  if (isUndefined(marks)) {
    return
  }

  const width = max - min
  return Object.keys(marks)
    .map(parseFloat)
    .sort((a, b) => a - b)
    .map(offset => {
      const markValue = marks[offset]
      const isObj = isPlainObject(markValue)
      let markLabel: string | VNode | undefined = undefined
      if (isString(markValue) || isVNode(markValue)) {
        markLabel = markValue
      } else if (isFunction(markValue)) {
        markLabel = markValue()
      } else if (isObj) {
        markLabel = markValue.label!
      }

      if (isUndefined(markLabel)) {
        return null
      }

      const isActived = range ? !(offset < values[0] || offset > values[1]) : offset <= values[0]

      const classes = {
        [`${prefixCls}-label`]: true,
        [`${prefixCls}-label-active`]: isActived,
      }

      const style = vertical
        ? {
            marginBottom: '-50%',
            [reverse ? sliderStartDirection.ttb : sliderStartDirection.btt]: `${((offset - min) / width) * 100}%`,
          }
        : {
            transform: `translateX(${reverse ? `50%` : `-50%`})`,
            [reverse ? sliderStartDirection.rtl : sliderStartDirection.ltr]: `${((offset - min) / width) * 100}%`,
          }

      const markStyle = isObj ? normalizeStyle([style, (markValue as { style?: CSSProperties })?.style]) : style
      const handleMarkClick = (evt: MouseEvent | TouchEvent) => callEmit(props.onClickMark, evt, offset)
      return (
        <span
          key={offset}
          class={classes}
          style={markStyle}
          onMousedown={handleMarkClick}
          onTouchstart={handleMarkClick}
        >
          {markLabel}
        </span>
      )
    })
}
