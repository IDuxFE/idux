/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type Ref,
  type WatchStopHandle,
  computed,
  defineComponent,
  inject,
  nextTick,
  normalizeClass,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { convertArray, convertCssPixel, useState } from '@idux/cdk/utils'
import { ɵOverlay, type ɵOverlayInstance, type ɵOverlayProps } from '@idux/components/_private/overlay'

import { tempSearchStateKey } from '../composables/useSearchStates'
import { type ProSearchContext, proSearchContext, searchItemContext } from '../token'
import { type SegmentProps, segmentProps } from '../types'

export default defineComponent({
  props: segmentProps,
  setup(props: SegmentProps) {
    const context = inject(proSearchContext)!
    const { mergedPrefixCls, commonOverlayProps, activeSegment, searchStates, setActiveSegment } = context
    const overlayRef = ref<ɵOverlayInstance>()
    const segmentInputRef = ref<HTMLInputElement>()
    const measureSpanRef = ref<HTMLSpanElement>()

    function setCurrentAsActive(overlayOpened: boolean) {
      setActiveSegment({
        itemKey: props.itemKey,
        name: props.segment.name,
        overlayOpened,
      })
    }

    const {
      triggerOverlayUpdate,
      registerOverlayUpdate,
      unregisterOverlayUpdate,

      handleSegmentInput,
      handleSegmentChange,
      handleSegmentConfirm,
      handleSegmentCancel,
    } = inject(searchItemContext)!

    const isActive = computed(
      () => activeSegment.value?.itemKey === props.itemKey && activeSegment.value.name === props.segment.name,
    )
    const overlayOpened = computed(() => isActive.value && !!activeSegment.value?.overlayOpened)

    const inputWidth = useInputWidth(measureSpanRef)
    const inputStyle = computed(() => ({
      minWidth: props.disabled ? '0' : undefined,
      width: convertCssPixel(inputWidth.value),
    }))
    const inputClasses = computed(() => [
      `${mergedPrefixCls.value}-segment-input`,
      ...convertArray(props.segment.inputClassName),
    ])

    const updateOverlay = () => {
      nextTick(() => {
        if (isActive.value) {
          overlayRef.value?.updatePopper()
        }
      })
    }
    watch([inputStyle, () => searchStates.value.length], triggerOverlayUpdate)

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-segment`

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: !!props.disabled,
      })
    })

    let stopActiveSegmentWatch: WatchStopHandle
    onMounted(() => {
      stopActiveSegmentWatch = watch(
        isActive,
        active => {
          nextTick(() => {
            if (active) {
              segmentInputRef.value?.focus()
              if (!props.value && props.segment.defaultValue) {
                handleSegmentChange(props.segment.name, props.segment.defaultValue)
                handleSegmentConfirm(props.segment.name, false)
              }
            }
          })
        },
        { immediate: true },
      )
      watch(
        inputStyle,
        style => {
          segmentInputRef.value &&
            Object.entries(style).forEach(([key, value]) => {
              segmentInputRef.value!.style[key as keyof typeof style] = value ?? ''
            })
        },
        { immediate: true },
      )
      watch(
        overlayOpened,
        (opened, preOpened) => {
          if (!!opened !== !!preOpened) {
            props.segment.onVisibleChange?.(opened)
          }
        },
        { immediate: true, flush: 'post' },
      )
      registerOverlayUpdate(updateOverlay)
    })
    onBeforeUnmount(() => {
      stopActiveSegmentWatch?.()
      unregisterOverlayUpdate(updateOverlay)
    })

    const handleChange = (value: unknown) => {
      handleSegmentChange(props.segment.name, value)
    }
    const handleConfirm = () => {
      handleSegmentConfirm(props.segment.name, true)
    }
    const handleCancel = () => {
      setCurrentAsActive(false)
      handleSegmentCancel(props.segment.name)
    }

    const {
      handleInput,
      handleCompositionStart,
      handleCompositionEnd,
      handleMouseDown,
      handleKeyDown,
      setPanelOnKeyDown,
    } = useInputEvents(props, context, handleSegmentInput, setCurrentAsActive, handleConfirm)

    const overlayProps = useOverlayAttrs(props, mergedPrefixCls, commonOverlayProps, overlayOpened)

    const renderTrigger = () => (
      <input
        ref={segmentInputRef}
        class={inputClasses.value}
        value={props.input ?? ''}
        disabled={props.disabled}
        title={props.segment.placeholder}
        placeholder={props.segment.placeholder}
        onInput={handleInput}
        onCompositionstart={handleCompositionStart}
        onCompositionend={handleCompositionEnd}
        onMousedown={handleMouseDown}
        onKeydown={handleKeyDown}
      ></input>
    )

    const renderContent = () => {
      if (!overlayOpened.value) {
        return
      }

      const renderedContent = props.segment.panelRenderer?.({
        input: props.input ?? '',
        value: props.value,
        cancel: handleCancel,
        ok: handleConfirm,
        setValue: handleChange,
        setOnKeyDown: setPanelOnKeyDown,
      })

      if (!renderedContent && isActive.value) {
        setCurrentAsActive(false)
      }

      return renderedContent
    }

    return () => {
      const { panelRenderer } = props.segment
      const prefixCls = `${mergedPrefixCls.value}-segment`

      return (
        <span class={classes.value}>
          {panelRenderer ? (
            <ɵOverlay
              ref={overlayRef}
              v-slots={{ default: renderTrigger, content: renderContent }}
              tabindex={-1}
              {...overlayProps.value}
            />
          ) : (
            renderTrigger()
          )}
          <span class={`${prefixCls}-measure-span`} ref={measureSpanRef}>
            {props.input || props.segment.placeholder || ''}
          </span>
        </span>
      )
    }
  },
})

function useInputWidth(measureSpanRef: Ref<HTMLSpanElement | undefined>): ComputedRef<number> {
  const [spanWidth, setSpanWidth] = useState(0)

  useResizeObserver(measureSpanRef, ({ contentRect }) => {
    setSpanWidth(contentRect.width)
  })

  return spanWidth
}

function useOverlayAttrs(
  props: SegmentProps,
  mergedPrefixCls: ComputedRef<string>,
  commonOverlayProps: ComputedRef<ɵOverlayProps>,
  overlayOpened: ComputedRef<boolean>,
): ComputedRef<ɵOverlayProps> {
  return computed(() => ({
    ...commonOverlayProps.value,
    class: `${mergedPrefixCls.value}-segment-overlay`,
    trigger: 'manual',
    visible: overlayOpened.value,
    disabled: props.disabled,
  }))
}

interface InputEventHandlers {
  handleInput: (evt: Event) => void
  handleCompositionStart: () => void
  handleCompositionEnd: (evt: CompositionEvent) => void
  handleMouseDown: (evt: MouseEvent) => void
  handleKeyDown: (evt: KeyboardEvent) => void
  setPanelOnKeyDown: (onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void
}

function useInputEvents(
  props: SegmentProps,
  context: ProSearchContext,
  handleSegmentInput: (name: string, input: string) => void,
  setCurrentAsActive: (overlayOpened: boolean) => void,
  confirm: () => void,
): InputEventHandlers {
  const { searchStates, removeSearchState, changeActive } = context
  const [panelOnKeyDown, setPanelOnKeyDown] = useState<((evt: KeyboardEvent) => boolean) | undefined>(undefined)

  const isComposing = ref(false)

  function removePreviousState() {
    const currentStateIndex = searchStates.value.findIndex(state => state.key === props.itemKey)
    const previousState = searchStates.value[currentStateIndex - 1]

    if (previousState?.key) {
      removeSearchState(previousState.key)
    }
  }

  const handleInput = (evt: Event) => {
    if (!isComposing.value) {
      handleSegmentInput(props.segment.name, (evt.target as HTMLInputElement).value)
    }

    setCurrentAsActive(true)
  }
  const handleCompositionStart = () => {
    isComposing.value = true
  }
  const handleCompositionEnd = (evt: CompositionEvent) => {
    if (isComposing.value) {
      isComposing.value = false
      handleInput(evt)
    }
  }
  const handleMouseDown = (evt: Event) => {
    evt.stopPropagation()
    setCurrentAsActive(true)
  }
  const handleKeyDown = (evt: KeyboardEvent) => {
    const paneKeyDownRes = panelOnKeyDown.value?.(evt) ?? true
    if (!paneKeyDownRes) {
      return
    }

    switch (evt.key) {
      case 'Enter':
        evt.preventDefault()
        confirm()
        break
      case 'Backspace':
        if (!props.input) {
          evt.preventDefault()
          if (props.itemKey === tempSearchStateKey && props.segment.name === 'name') {
            removePreviousState()
            break
          }

          changeActive(-1, true)
        }
        break
      case 'Escape':
        setCurrentAsActive(false)
        break
      default:
        setCurrentAsActive(true)
        break
    }
  }

  return {
    handleInput,
    handleCompositionStart,
    handleCompositionEnd,
    handleMouseDown,
    handleKeyDown,
    setPanelOnKeyDown,
  }
}
