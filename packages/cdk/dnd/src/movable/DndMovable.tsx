/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Teleport, computed, defineComponent, provide, shallowRef, toRef } from 'vue'

import { isNil } from 'lodash-es'

import { callEmit, convertCssPixel, useControlledProp, useState } from '@idux/cdk/utils'

import { useDndMovable } from '../composables/useDndMovable'
import { defaultMovableStrategy } from '../consts'
import { dndMovableToken } from '../tokens'
import { dndMovableProps } from '../types'

export default defineComponent({
  name: 'DndMovable',
  props: dndMovableProps,
  setup(props, { slots, expose }) {
    const [previewState, setPreviewState] = useState<{ container: HTMLElement } | null>(null)
    const [offsetProp, setOffsetProp] = useControlledProp(props, 'offset')

    const elementRef = shallowRef<HTMLElement>()
    const dragHandleRef = shallowRef<HTMLElement>()

    const mergedDragHandle = computed(() => props.dragHandle ?? dragHandleRef.value)

    const setDragHandle = (dragHandle: HTMLElement | undefined) => {
      dragHandleRef.value = dragHandle
    }

    const previewMount = (state: { container: HTMLElement }) => {
      setPreviewState(state)
    }
    const previewUnmount = () => {
      setPreviewState(null)
    }

    const mergedStrategy = computed(() => props.strategy ?? defaultMovableStrategy)
    const mergedPreview = computed(() => {
      if (isNil(props.preview) || props.preview === 'native') {
        return true
      }

      if (props.preview === false) {
        return false
      }

      if (props.preview === true) {
        return {
          mount: previewMount,
          unmount: previewUnmount,
        }
      }

      return {
        offset: props.preview.offset,
        mount: previewMount,
        unmount: previewUnmount,
      }
    })

    provide(dndMovableToken, {
      setDragHandle,
    })

    const { init, position, offset } = useDndMovable({
      offset: offsetProp,
      mode: toRef(props, 'mode'),
      strategy: mergedStrategy,
      canDrag: toRef(props, 'canDrag'),
      boundary: toRef(props, 'boundary'),
      draggableElement: elementRef,
      dropTargets: toRef(props, 'dropTargets'),
      dragHandle: mergedDragHandle,
      preview: mergedPreview,
      allowedAxis: toRef(props, 'allowedAxis'),
      onDragStart(args) {
        callEmit(props.onDragStart, args)
      },
      onDrag(args) {
        callEmit(props.onDrag, args)
      },
      onDragEnter(args) {
        callEmit(props.onDragEnter, args)
      },
      onDragLeave(args) {
        callEmit(props.onDragLeave, args)
      },
      onDrop(args) {
        callEmit(props.onDrop, args)
      },
      onDropOfTarget(args) {
        callEmit(props.onDropOfTarget, args)
      },
      onOffsetChange(newOffset, oldOffset) {
        callEmit(props.onOffsetChange, newOffset, oldOffset)
        setOffsetProp(newOffset)
      },
    })

    expose({
      init,
    })

    const draggableElementStyle = computed(() => {
      const strategy = mergedStrategy.value

      if (strategy === 'fixed' || strategy === 'absolute') {
        if (!position.value) {
          return
        }

        return {
          position: strategy,
          top: convertCssPixel(position.value.y),
          left: convertCssPixel(position.value.x),
        }
      }

      if (!offset.value) {
        return
      }

      return {
        transform: `translate(${convertCssPixel(offset.value.x)}, ${convertCssPixel(offset.value.y)})`,
      }
    })

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Tag = (props.tag as any) ?? 'div'
      const preview = previewState.value

      const contentNodes = [
        slots.default?.(),
        preview && <Teleport to={preview?.container}>{slots.preview?.(preview)}</Teleport>,
      ]

      return (
        <Tag ref={elementRef} class="cdk-dnd-movable" style={draggableElementStyle.value}>
          {contentNodes}
        </Tag>
      )
    }
  },
})
