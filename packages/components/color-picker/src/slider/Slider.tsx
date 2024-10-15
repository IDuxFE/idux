/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, type PropType, computed, defineComponent, inject, shallowRef } from 'vue'

import { isNaN } from 'lodash-es'

import { CdkDndMovable } from '@idux/cdk/dnd'
import { convertElement, useState } from '@idux/cdk/utils'
import { useElementSize } from '@idux/components/utils'

import { colorPickerPanelToken } from '../token'

export default defineComponent({
  props: {
    value: Object as PropType<{ x: number; y: number }>,
    trackStyle: Object as PropType<CSSProperties>,
    handleStyle: Object as PropType<CSSProperties>,
    boundaryWithoutHandle: Boolean,
    xIsCircle: Boolean,
    yIsCircle: Boolean,
    onChange: Function as PropType<(value: { x: number; y: number }) => void>,
  },
  setup(props) {
    const { mergedPrefixCls } = inject(colorPickerPanelToken)!

    const [xInSecondHalf, setXInSecondHalf] = useState(false)
    const [yInSecondHalf, setYInSecondHalf] = useState(false)
    const [offsetBuffer, setOffsetBuffer] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)

    const trackRef = shallowRef<HTMLElement>()
    const handleRef = shallowRef<HTMLElement>()

    const trackSize = useElementSize(trackRef)
    const handleSize = useElementSize(handleRef)

    const availableTrackWidth = computed(() =>
      Math.max(props.boundaryWithoutHandle ? trackSize.value.width : trackSize.value.width - handleSize.value.width, 0),
    )
    const availableTrackHeight = computed(() =>
      Math.max(
        props.boundaryWithoutHandle ? trackSize.value.height : trackSize.value.height - handleSize.value.height,
        0,
      ),
    )

    const offset = computed(() => {
      let xPercent = keepPercentInRange(props.value?.x)
      let yPercent = keepPercentInRange(props.value?.y)

      if (xPercent === 0 && xInSecondHalf.value && props.xIsCircle) {
        xPercent = 1
      }
      if (yPercent === 0 && yInSecondHalf.value && props.yIsCircle) {
        yPercent = 1
      }

      const xOffset = xPercent * availableTrackWidth.value
      const yOffset = yPercent * availableTrackHeight.value

      return {
        x: xOffset,
        y: yOffset,
      }
    })

    const updateHandleOffset = (newOffset: { x: number; y: number }) => {
      const width = availableTrackWidth.value
      const height = availableTrackHeight.value

      const xPercent = Number(keepPercentInRange(newOffset.x / width).toFixed(2))
      const yPercent = Number(keepPercentInRange(newOffset.y / height).toFixed(2))

      setXInSecondHalf(xPercent > 0.5)
      setYInSecondHalf(yPercent > 0.5)

      props.onChange?.({ x: xPercent, y: yPercent })
      setOffsetBuffer(newOffset)
    }

    const handleOffsetChange = (newOffset: { x: number; y: number }) => {
      if (!isDragging.value) {
        return
      }

      updateHandleOffset(newOffset)
    }
    const handleDragStart = () => {
      setOffsetBuffer({ ...offset.value })
      setIsDragging(true)
    }
    const handleDragEnd = () => {
      setIsDragging(false)
    }

    const handleTrackMousedown = (evt: MouseEvent) => {
      const trackEl = convertElement(trackRef.value)
      if (!trackEl) {
        return
      }

      const { clientX, clientY } = evt
      const { x, y } = trackEl.getBoundingClientRect()
      const newOffset = { x: clientX - x, y: clientY - y }

      updateHandleOffset(newOffset)
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-slider`

      return (
        <div
          ref={trackRef}
          class={`${prefixCls}-track`}
          style={props.trackStyle}
          tabindex={-1}
          onMousedown={handleTrackMousedown}
        >
          <CdkDndMovable
            ref={handleRef}
            class={`${prefixCls}-handle`}
            style={props.boundaryWithoutHandle ? { width: 0, height: 0 } : undefined}
            tabindex={-1}
            mode="immediate"
            offset={isDragging.value ? offsetBuffer.value : offset.value}
            boundary={trackRef.value}
            dropTargets={[handleRef.value]}
            onOffsetChange={handleOffsetChange}
            onDragStart={handleDragStart}
            onDrop={handleDragEnd}
          >
            <div class={`${prefixCls}-handle-inner`} style={props.handleStyle}></div>
          </CdkDndMovable>
        </div>
      )
    }
  },
})

function keepPercentInRange(precent: number | undefined): number {
  const value = Math.min(1, Math.max(0, precent ?? 0))

  return isNaN(value) ? 0 : value
}
