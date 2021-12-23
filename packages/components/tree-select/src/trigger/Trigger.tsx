/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, watch } from 'vue'

import { FORM_TOKEN } from '@idux/components/form'

import { treeSelectToken } from '../token'
import Selector from './Selector'

const hiddenBoxStyle = { width: 0, height: 0, display: 'flex', overflow: 'hidden', opacity: 0 }

export default defineComponent({
  setup() {
    const {
      props,
      slots,
      config,
      focusMonitor,
      mergedPrefixCls,
      triggerRef,
      isDisabled,
      selectedValue,
      isFocused,
      overlayOpened,
      handleFocus,
      handleBlur,
      setOverlayOpened,
    } = inject(treeSelectToken)!
    const formContext = inject(FORM_TOKEN, null)

    const clearable = computed(() => {
      return !isDisabled.value && !props.readonly && props.clearable && selectedValue.value.length > 0
    })

    const searchable = computed(() => {
      return !isDisabled.value && !props.readonly && props.searchable
    })

    const suffix = computed(() => {
      const { suffix } = props
      if (suffix) {
        return suffix
      }
      return props.searchable === true && isFocused.value ? 'search' : config.suffix
    })

    const classes = computed(() => {
      const { multiple, readonly, size = formContext?.size.value ?? config.size } = props
      const disabled = isDisabled.value
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-clearable`]: clearable.value,
        [`${prefixCls}-readonly`]: readonly,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-readonly`]: readonly,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-opened`]: overlayOpened.value,
        [`${prefixCls}-multiple`]: multiple,
        [`${prefixCls}-single`]: !multiple,
        [`${prefixCls}-searchable`]: searchable.value === true,
        [`${prefixCls}-with-suffix`]: slots.suffix || suffix.value,
        [`${prefixCls}-${size}`]: true,
      }
    })

    const handleClick = () => {
      const currOpened = overlayOpened.value
      const notAllowedClick = isDisabled.value || props.readonly
      if (notAllowedClick || (currOpened && searchable.value)) {
        return
      }

      setOverlayOpened(!currOpened)
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
        <div ref={triggerRef} class={classes.value} onClick={handleClick}>
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
