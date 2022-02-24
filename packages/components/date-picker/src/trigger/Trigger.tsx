/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { FORM_TOKEN } from '@idux/components/form'
import { IxIcon } from '@idux/components/icon'

import { datePickerToken } from '../token'

export default defineComponent({
  setup() {
    const {
      props,
      slots,
      locale,
      config,
      mergedPrefixCls,
      accessor,
      format,
      focusMonitor,
      inputRef,
      inputValue,
      isFocused,
      handleFocus,
      handleBlur,
      handleInput,
      handleClear,
      overlayOpened,
      setOverlayOpened,
    } = inject(datePickerToken)!
    const formContext = inject(FORM_TOKEN, null)

    const placeholder = computed(() => props.placeholder ?? locale.datePicker[`${props.type}Placeholder`])
    const inputSize = computed(() => Math.max(10, format.value.length) + 2)
    const allowInput = computed(() => props.allowInput ?? config.allowInput)
    const clearable = computed(() => !accessor.disabled.value && props.clearable && inputValue.value.length > 0)

    const suffix = computed(() => props.suffix ?? config.suffix)

    const classes = computed(() => {
      const { borderless = config.borderless, size = formContext?.size.value ?? config.size } = props
      const disabled = accessor.disabled.value
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-clearable`]: clearable.value,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-opened`]: overlayOpened.value,
        [`${prefixCls}-with-suffix`]: slots.suffix || suffix.value,
        [`${prefixCls}-${size}`]: true,
      })
    })

    const handleClick = () => {
      const currOpened = overlayOpened.value
      if (currOpened || accessor.disabled.value) {
        return
      }

      setOverlayOpened(!currOpened)
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
      switch (evt.code) {
        case 'Enter':
          evt.preventDefault()
          break
        case 'Escape':
          evt.preventDefault()
          setOverlayOpened(false)
          break
      }
    }

    const triggerRef = ref<HTMLElement>()
    onMounted(() => {
      watch(focusMonitor.monitor(triggerRef.value!, true), evt => {
        const { origin, event } = evt
        if (event) {
          if (origin) {
            handleFocus(event)
          } else {
            handleBlur(event)
          }
        }
      })
    })

    onBeforeUnmount(() => focusMonitor.stopMonitoring(triggerRef.value!))

    return () => {
      const { readonly } = props
      const prefixCls = mergedPrefixCls.value

      return (
        <div ref={triggerRef} class={classes.value} onClick={handleClick} onKeydown={handleKeyDown}>
          <div class={`${prefixCls}-input`}>
            <input
              ref={inputRef}
              class={`${prefixCls}-input-inner`}
              autocomplete="off"
              disabled={accessor.disabled.value}
              placeholder={placeholder.value}
              readonly={readonly || allowInput.value !== true}
              size={inputSize.value}
              value={inputValue.value}
              onInput={handleInput}
            />
            <span class={`${prefixCls}-suffix`}>
              <IxIcon name={suffix.value}></IxIcon>
            </span>
            {clearable.value && (
              <span class={`${prefixCls}-clear`} onClick={handleClear}>
                <IxIcon name="close-circle" />
              </span>
            )}
          </div>
        </div>
      )
    }
  },
})
