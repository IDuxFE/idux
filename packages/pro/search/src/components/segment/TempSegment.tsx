/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { NameSelectOverlayInstance, SegmentInputInstance } from '../../types'

import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue'

import { useState } from '@idux/cdk/utils'

import SegmentInput from './SegmentInput'
import { proSearchContext } from '../../token'
import NameSelectOverlay from '../nameSelectOverlay/NameSelectOverlay'

export default defineComponent({
  setup(_, { slots }) {
    const context = inject(proSearchContext)!
    const {
      mergedPrefixCls,
      enableQuickSelect,
      nameSelectActive,
      quickSelectActive,
      searchStates,
      tempSegmentInputRef,
      removeSearchState,
      setNameSelectActive,
      setQuickSelectActive,
      setTempActive,
      setOverlayOpened,
    } = context

    const overlayRef = ref<NameSelectOverlayInstance>()
    const segmentInputRef = ref<SegmentInputInstance>()

    const [input, _setInput] = useState('')

    const setInput = (input: string) => {
      _setInput(input)
      if (!enableQuickSelect.value || (!nameSelectActive.value && !quickSelectActive.value)) {
        return
      }

      if (input) {
        setNameSelectActive()
      } else {
        setQuickSelectActive()
      }
    }

    const isActive = computed(() => nameSelectActive.value || quickSelectActive.value)

    const nameInputStyle = computed(() => {
      if (isActive.value) {
        return undefined
      }

      return {
        opacity: 0,
        width: 0,
        height: 0,
        overflow: 'hidden',
        visibility: 'hidden',
      }
    })

    const updateOverlay = () => {
      overlayRef.value?.updateOverlay()
    }

    onMounted(() => {
      tempSegmentInputRef.value = segmentInputRef.value?.getInputElement()
      watch(() => searchStates.value.length, updateOverlay)
      watch(isActive, active => {
        if (!active) {
          setInput('')
        }
      })
    })

    let panelKeyDown: (evt: KeyboardEvent) => boolean | undefined = () => true
    const setOnKeyDown = (keydown: ((evt: KeyboardEvent) => boolean) | undefined) => {
      if (!keydown) {
        panelKeyDown = () => true
      } else {
        panelKeyDown = keydown
      }
    }
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (!panelKeyDown(evt)) {
        return
      }

      switch (evt.key) {
        case 'Enter':
          evt.preventDefault()
          setOverlayOpened(true)

          break
        case 'Backspace':
          if (!input.value) {
            evt.preventDefault()
            const lastSearchState = searchStates.value[searchStates.value.length - 1]

            if (lastSearchState) {
              removeSearchState(lastSearchState.key)
            }
          }
          break
        case 'Escape':
          setOverlayOpened(false)
          break
        default:
          setOverlayOpened(true)
      }
    }

    const handleMouseDown = () => {
      setTempActive()
    }
    const handleInput = (input: string) => {
      setInput(input)
    }
    const handleChange = () => {
      setInput('')
    }

    const renderTrigger = () => (
      <SegmentInput
        ref={segmentInputRef}
        class={`${mergedPrefixCls.value}-temp-segment-input`}
        style={nameInputStyle.value}
        value={input.value}
        ellipsis={false}
        ariaLabel="searchbox-input"
        onMousedown={handleMouseDown}
        onInput={handleInput}
        onKeydown={handleKeyDown}
        onWidthChange={updateOverlay}
      ></SegmentInput>
    )

    return () => (
      <NameSelectOverlay
        ref={overlayRef}
        v-slots={{ ...slots, default: renderTrigger }}
        onChange={handleChange}
        setOnKeyDown={setOnKeyDown}
        searchValue={input.value}
      />
    )
  },
})
