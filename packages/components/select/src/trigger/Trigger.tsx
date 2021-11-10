/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, watch } from 'vue'

import { FORM_TOKEN } from '@idux/components/form'

import { selectToken } from '../token'
import Selector from './Selector'

const hiddenBoxStyle = { width: 0, height: 0, display: 'flex', overflow: 'hidden', opacity: 0 }

export default defineComponent({
  setup() {
    const {
      props,
      slots,
      config,
      mergedPrefixCls,
      focusMonitor,
      triggerRef,
      isDisabled,
      selectedValue,
      isFocused,
      handleFocus,
      handleBlur,
      overlayOpened,
      changeOverlayOpened,
      activeIndex,
      activeOption,
      changeActive,
      changeSelected,
    } = inject(selectToken)!
    const formContext = inject(FORM_TOKEN, null)

    const clearable = computed(() => {
      return !isDisabled.value && props.clearable && selectedValue.value.length > 0
    })

    const searchable = computed(() => {
      return !isDisabled.value && props.searchable
    })

    const suffix = computed(() => {
      const { suffix } = props
      if (suffix) {
        return suffix
      }
      return props.searchable && isFocused.value ? 'search' : config.suffix
    })

    const classes = computed(() => {
      const { borderless = config.borderless, multiple, size = formContext?.size.value ?? config.size } = props
      const disabled = isDisabled.value
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-clearable`]: clearable.value,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-opened`]: overlayOpened.value,
        [`${prefixCls}-multiple`]: multiple,
        [`${prefixCls}-single`]: !multiple,
        [`${prefixCls}-searchable`]: searchable.value,
        [`${prefixCls}-with-suffix`]: slots.suffix || suffix.value,
        [`${prefixCls}-${size}`]: true,
      }
    })

    const handleClick = () => {
      const currOpened = overlayOpened.value
      if ((currOpened && searchable.value) || isDisabled.value) {
        return
      }

      changeOverlayOpened(!currOpened)
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
      switch (evt.code) {
        case 'ArrowUp':
          evt.preventDefault()
          changeActive(activeIndex.value - 1, -1)
          break
        case 'ArrowDown':
          evt.preventDefault()
          changeActive(activeIndex.value + 1, 1)
          break
        case 'Enter':
          evt.preventDefault()
          changeSelected(activeOption.value?.value)
          break
        case 'Escape':
          evt.preventDefault()
          changeOverlayOpened(false)
          break
      }
    }

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
      return (
        <div ref={triggerRef} class={classes.value} onClick={handleClick} onKeydown={handleKeyDown}>
          {isFocused.value && !overlayOpened.value && (
            <span style={hiddenBoxStyle} aria-live="polite">
              {selectedValue.value.join(', ')}
            </span>
          )}
          <Selector clearable={clearable.value} suffix={suffix.value}></Selector>
        </div>
      )
    }
  },
})
