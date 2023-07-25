/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type Ref,
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

import { convertArray, useState } from '@idux/cdk/utils'
import { ɵOverlay, type ɵOverlayInstance, type ɵOverlayProps } from '@idux/components/_private/overlay'

import { type ProSearchContext, proSearchContext, searchItemContext } from '../../token'
import { type SegmentInputInstance, type SegmentProps, segmentProps } from '../../types'
import SegmentInput from '../segment/SegmentInput'

export default defineComponent({
  props: segmentProps,
  setup(props: SegmentProps, { slots }) {
    const context = inject(proSearchContext)!
    const {
      mergedPrefixCls,
      bindOverlayMonitor,
      getSearchStateByKey,
      commonOverlayProps,
      focused,
      activeSegment,
      searchStates,
      overlayOpened: _overlayOpened,
      setOverlayOpened,
    } = context
    const overlayRef = ref<ɵOverlayInstance>()
    const segmentInputRef = ref<SegmentInputInstance>()
    const contentNodeEmpty = ref(false)

    const {
      triggerOverlayUpdate,
      registerOverlayUpdate,
      unregisterOverlayUpdate,

      changeActiveAndSelect,
      handleSegmentInput,
      handleSegmentChange,
      handleSegmentSelect,
      handleSegmentConfirm,
      handleSegmentCancel,
    } = inject(searchItemContext)!

    const isActive = computed(
      () => activeSegment.value?.itemKey === props.itemKey && activeSegment.value.name === props.segment.name,
    )
    const overlayOpened = computed(
      () => focused.value && isActive.value && _overlayOpened.value && !contentNodeEmpty.value,
    )
    const searchState = computed(() => getSearchStateByKey(props.itemKey))

    const inputClasses = computed(() => convertArray(props.segment.inputClassName))

    const updateOverlay = () => {
      nextTick(() => {
        if (isActive.value) {
          overlayRef.value?.updatePopper()
        }
      })
    }
    const updateSelectionStart = (selectionStart: number) => {
      const inputEl = segmentInputRef.value?.getInputElement()
      if (inputEl && selectionStart !== inputEl.selectionStart) {
        inputEl.setSelectionRange(selectionStart, selectionStart)
      }
    }

    watch(() => searchStates.value.length, triggerOverlayUpdate)

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-segment`

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: !!props.disabled,
      })
    })

    onMounted(() => {
      bindOverlayMonitor(overlayRef, overlayOpened)
      watch(
        isActive,
        active => {
          nextTick(() => {
            if (active) {
              segmentInputRef.value?.getInputElement().focus()
            }

            updateSelectionStart(
              (props.selectionStart ?? -1) === -1 ? (active ? props.input?.length ?? 0 : 0) : props.selectionStart ?? 0,
            )
          })
        },
        { immediate: true },
      )
      watch(
        () => props.selectionStart,
        selectionStart => {
          updateSelectionStart(selectionStart ?? 0)
        },
        {
          immediate: true,
        },
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

    const { handleInput, handleFocus, handleKeyDown, handleMouseDown, setPanelOnKeyDown } = useInputEvents(
      props,
      context,
      segmentInputRef,
      overlayOpened,
      handleSegmentInput,
      handleSegmentSelect,
      setOverlayOpened,
      changeActiveAndSelect,
      handleConfirm,
    )

    const overlayProps = useOverlayAttrs(props, mergedPrefixCls, commonOverlayProps, overlayOpened)

    const renderTrigger = () => (
      <SegmentInput
        ref={segmentInputRef}
        class={inputClasses.value}
        value={props.input ?? ''}
        disabled={props.disabled}
        placeholder={props.segment.placeholder}
        onInput={handleInput}
        onFocus={handleFocus}
        onKeydown={handleKeyDown}
        onMousedown={handleMouseDown}
        onWidthChange={triggerOverlayUpdate}
      ></SegmentInput>
    )

    const renderContent = () => {
      const contentNode = props.segment.panelRenderer?.({
        slots,
        input: props.input ?? '',
        value: props.value,
        states: searchState.value?.segmentStates ?? [],
        renderLocation: 'individual',
        cancel: handleCancel,
        ok: handleConfirm,
        setValue: handleChange,
        setOnKeyDown: setPanelOnKeyDown,
      })

      contentNodeEmpty.value = !contentNode
      return contentNode
    }

    return () => {
      const { panelRenderer } = props.segment

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
        </span>
      )
    }
  },
})

function useOverlayAttrs(
  props: SegmentProps,
  mergedPrefixCls: ComputedRef<string>,
  commonOverlayProps: ComputedRef<ɵOverlayProps>,
  overlayOpened: ComputedRef<boolean>,
): ComputedRef<ɵOverlayProps> {
  return computed(() => ({
    ...commonOverlayProps.value,
    class: normalizeClass([`${mergedPrefixCls.value}-segment-overlay`, ...(props.segment.containerClassName ?? [])]),
    trigger: 'manual',
    visible: overlayOpened.value,
    disabled: props.disabled,
  }))
}

interface InputEventHandlers {
  handleInput: (input: string) => void
  handleFocus: (evt: FocusEvent) => void
  handleKeyDown: (evt: KeyboardEvent) => void
  handleMouseDown: (evt: MouseEvent) => void
  setPanelOnKeyDown: (onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void
}

function useInputEvents(
  props: SegmentProps,
  context: ProSearchContext,
  segmentInputRef: Ref<SegmentInputInstance | undefined>,
  overlayOpened: ComputedRef<boolean>,
  handleSegmentInput: (name: string, input: string) => void,
  handleSegmentSelect: (name: string, selectionStart: number | undefined | null) => void,
  setOverlayOpened: (overlayOpened: boolean) => void,
  changeActiveAndSelect: (offset: number, selectionStart: number | 'start' | 'end') => void,
  confirm: () => void,
): InputEventHandlers {
  const { setActiveSegment } = context
  const [panelOnKeyDown, setPanelOnKeyDown] = useState<((evt: KeyboardEvent) => boolean) | undefined>(undefined)

  function setCurrentActive() {
    setActiveSegment({
      itemKey: props.itemKey,
      name: props.segment.name,
    })
  }
  function getInputElement() {
    return segmentInputRef.value?.getInputElement()
  }
  function setSelectionStart() {
    setTimeout(() => {
      handleSegmentSelect(props.segment.name, getInputElement()?.selectionStart)
    })
  }

  const handleInput = (input: string) => {
    handleSegmentInput(props.segment.name, input)
    setCurrentActive()
    setOverlayOpened(true)
    setSelectionStart()
  }
  const handleFocus = (evt: FocusEvent) => {
    evt.stopPropagation()
    setCurrentActive()
    setOverlayOpened(true)
    setSelectionStart()
  }
  const handleMouseDown = (evt: MouseEvent) => {
    evt.stopImmediatePropagation()
    setSelectionStart()
  }

  const handleKeyDown = (evt: KeyboardEvent) => {
    evt.stopPropagation()
    if (overlayOpened.value && panelOnKeyDown.value && !panelOnKeyDown.value(evt)) {
      return
    }

    switch (evt.key) {
      case 'Enter':
        evt.preventDefault()
        if (props.input || overlayOpened.value || !props.segment.panelRenderer) {
          confirm()
        } else {
          setOverlayOpened(true)
        }

        break
      case 'Backspace':
        if (props.selectionStart === 0) {
          evt.preventDefault()

          changeActiveAndSelect(-1, 'end')
        }
        break
      case 'Escape':
        setOverlayOpened(false)
        break
      case 'ArrowLeft':
        if ((getInputElement()?.selectionStart ?? 0) <= 0) {
          evt.preventDefault()
          changeActiveAndSelect(-1, 'end')
        } else {
          setSelectionStart()
          setOverlayOpened(true)
        }
        break
      case 'ArrowRight':
        if ((getInputElement()?.selectionStart ?? 0) >= (props.input?.length ?? 0)) {
          evt.preventDefault()
          changeActiveAndSelect(1, 'start')
        } else {
          setSelectionStart()
          setOverlayOpened(true)
        }
        break
      default:
        setSelectionStart()
        setOverlayOpened(true)
        break
    }
  }

  return {
    handleInput,
    handleFocus,
    handleKeyDown,
    handleMouseDown,
    setPanelOnKeyDown,
  }
}
