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
    const { mergedPrefixCls, commonOverlayProps, activeSegment, searchStates } = context
    const overlayRef = ref<ɵOverlayInstance>()
    const inputRef = ref<HTMLInputElement>()
    const measureSpanRef = ref<HTMLSpanElement>()
    const [overlayOpened, _setOverlayOpened] = useState(false)
    const setOverlayOpened = (opened: boolean) => {
      if (overlayOpened.value === opened) {
        return
      }

      _setOverlayOpened(opened)
      props.segment.onVisibleChange?.(opened)
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
          inputRef.value?.focus()
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
        (active, preActive) => {
          if (active) {
            nextTick(() => inputRef.value?.focus())
            setOverlayOpened(true)
            nextTick(() => {
              if (!props.value && props.segment.defaultValue) {
                handleSegmentChange(props.segment.name, props.segment.defaultValue)
                handleSegmentConfirm(props.segment.name, false)
              }
            })
          } else if (preActive) {
            nextTick(() => inputRef.value?.blur())
            setOverlayOpened(false)
          }
        },
        { immediate: true },
      )
      watch(
        inputStyle,
        style => {
          inputRef.value &&
            Object.entries(style).forEach(([key, value]) => {
              inputRef.value!.style[key as keyof typeof style] = value ?? ''
            })
        },
        { immediate: true },
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
      setOverlayOpened(false)
      handleSegmentCancel(props.segment.name)
    }

    const {
      handleInput,
      handleCompositionStart,
      handleCompositionEnd,
      handleClick,
      handleFocus,
      handleKeyDown,
      setPanelOnKeyDown,
    } = useInputEvents(props, context, handleSegmentInput, setOverlayOpened, handleConfirm)

    const overlayProps = useOverlayAttrs(props, mergedPrefixCls, commonOverlayProps, overlayOpened)

    const renderTrigger = () => (
      <input
        ref={inputRef}
        class={inputClasses.value}
        value={props.input ?? ''}
        disabled={props.disabled}
        onInput={handleInput}
        onCompositionstart={handleCompositionStart}
        onCompositionend={handleCompositionEnd}
        onFocus={handleFocus}
        onClick={handleClick}
        onKeydown={handleKeyDown}
      ></input>
    )

    /* eslint-disable indent */
    const renderContent = () =>
      overlayOpened.value
        ? props.segment.panelRenderer?.({
            input: props.input ?? '',
            value: props.value,
            cancel: handleCancel,
            ok: handleConfirm,
            setValue: handleChange,
            setOnKeyDown: setPanelOnKeyDown,
          })
        : undefined
    /* eslint-enable indent */

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
            {props.input ?? ''}
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
  handleClick: (evt: Event) => void
  handleFocus: () => void
  handleKeyDown: (evt: KeyboardEvent) => void
  setPanelOnKeyDown: (onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void
}

function useInputEvents(
  props: SegmentProps,
  context: ProSearchContext,
  handleSegmentInput: (name: string, input: string) => void,
  setOverlayOpened: (opened: boolean) => void,
  confirm: () => void,
): InputEventHandlers {
  const { searchStates, removeSearchState, setActiveSegment, changeActive } = context
  const [panelOnKeyDown, setPanelOnKeyDown] = useState<((evt: KeyboardEvent) => boolean) | undefined>(undefined)

  const isComposing = ref(false)

  function setCurrentAsActive() {
    setActiveSegment({
      itemKey: props.itemKey,
      name: props.segment.name,
    })
  }
  function removePreviousState() {
    const currentStateIndex = searchStates.value.findIndex(state => state.key === props.itemKey)
    const previousState = searchStates.value[currentStateIndex - 1]

    if (previousState.key) {
      removeSearchState(previousState.key)
    }
  }

  const handleInput = (evt: Event) => {
    if (!isComposing.value) {
      handleSegmentInput(props.segment.name, (evt.target as HTMLInputElement).value)
    }

    setOverlayOpened(true)
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
  const handleFocus = () => {
    setOverlayOpened(true)
    setCurrentAsActive()
  }
  const handleClick = (evt: Event) => {
    evt.stopPropagation()

    setOverlayOpened(true)
    setCurrentAsActive()
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
      default:
        break
    }
  }

  return {
    handleInput,
    handleCompositionStart,
    handleCompositionEnd,
    handleFocus,
    handleClick,
    handleKeyDown,
    setPanelOnKeyDown,
  }
}
