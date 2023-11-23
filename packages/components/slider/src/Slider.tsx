/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SliderContext } from './token'
import type { SliderProps } from './types'
import type { Ref } from 'vue'

import { computed, defineComponent, provide, toRefs } from 'vue'

import { isUndefined } from 'lodash-es'

import { NoopFunction } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import IxSliderMarks from './Marks'
import IxSliderSteps from './Steps'
import IxSliderThumb from './Thumb'
import { sliderToken } from './token'
import { sliderProps } from './types'
import { useSlider } from './useSlider'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxSlider',
  props: sliderProps,
  setup(props, { expose }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('slider')
    registerToken(getThemeTokens)

    const {
      direction,
      isDisabled,
      isDragging,
      valuesRef,
      railRef,
      setThumbRefs,
      handleMouseDown,
      handleMouseUp,
      handleKeyDown,
      handleMarkClick,
      focus,
      blur,
    } = useSlider(props)
    const { trackStyle } = useTrack(props, valuesRef, direction)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-slider`)
    const thumbs = computed(() => valuesRef.value.slice(0, props.range ? 2 : 1))
    const thumbTransformOfStyle = computed(() => {
      if (props.vertical) {
        return props.reverse ? `translateY(-50%)` : `translateY(50%)`
      }
      return props.reverse ? `translateX(50%)` : `translateX(-50%)`
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-vertical`]: props.vertical,
        [`${prefixCls}-with-marks`]: !isUndefined(props.marks),
      }
    })

    provide<SliderContext>(sliderToken, {
      ...toRefs(props),
      direction,
      dragging: isDragging,
      values: valuesRef,
      disabled: isDisabled,
      prefixCls: mergedPrefixCls,
    })

    expose({ focus, blur })

    return () => {
      return (
        <div
          class={classes.value}
          onMousedown={isDisabled.value ? NoopFunction : handleMouseDown}
          onTouchstart={isDisabled.value ? NoopFunction : handleMouseDown}
          onMouseup={isDisabled.value ? NoopFunction : handleMouseUp}
          onKeydown={isDisabled.value ? NoopFunction : handleKeyDown}
        >
          <div ref={railRef} class={`${mergedPrefixCls.value}-rail`}></div>
          <div class={`${mergedPrefixCls.value}-track`} style={trackStyle.value}></div>
          <IxSliderSteps />
          {thumbs.value.map((val, index) => {
            const position = ((val - props.min) / (props.max - props.min)) * 100
            return (
              <IxSliderThumb
                ref={setThumbRefs(index)}
                value={val}
                role="slider"
                tabindex={isDisabled.value ? -1 : 0}
                aria-label="Slider"
                aria-valuemin={props.min}
                aria-valuemax={props.max}
                aria-valuenow={val}
                aria-readonly={isDisabled.value}
                aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                style={{
                  transform: thumbTransformOfStyle.value,
                  [direction.value]: `${position}%`,
                }}
              />
            )
          })}
          <IxSliderMarks onClickMark={isDisabled.value ? NoopFunction : handleMarkClick} />
        </div>
      )
    }
  },
})

function useTrack(props: SliderProps, values: Ref<number[]>, direction: Ref<string>) {
  const maxValue = computed(() => Math.max(...values.value))
  const minValue = computed(() => Math.min(...values.value))
  const trackStyle = computed(() => {
    return {
      [direction.value]: props.range ? `${((minValue.value - props.min) / (props.max - props.min)) * 100}%` : '0%',
      [props.vertical ? 'height' : 'width']: props.range
        ? `${((maxValue.value - minValue.value) / (props.max - props.min)) * 100}%`
        : `${((+values.value[0] - props.min) / (props.max - props.min)) * 100}%`,
    }
  })

  return { trackStyle }
}
