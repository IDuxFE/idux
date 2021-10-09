/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputProps } from './types'
import type { InputConfig } from '@idux/components/config'
import type { ComputedRef, Ref, Slot, Slots, StyleValue, VNodeTypes } from 'vue'

import { computed, defineComponent, normalizeClass } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { inputProps } from './types'
import { useCommonBindings } from './useCommonBindings'

export default defineComponent({
  name: 'IxInput',
  props: inputProps,
  setup(props, { slots, expose, attrs }) {
    const config = useGlobalConfig('input')

    const {
      elementRef,

      isDisabled,
      clearIcon,
      clearHidden,
      isClearable,
      isFocused,

      focus,
      blur,

      handlerInput,
      handlerCompositionStart,
      handlerCompositionEnd,
      handlerFocus,
      handlerBlur,
      handlerClear,
    } = useCommonBindings(props, config)

    expose({ focus, blur })

    const classes = useClasses(props, slots, config, isFocused, isDisabled)

    return () => {
      const addonBefore = renderAddon(slots.addonBefore, props.addonBefore)
      const addonAfter = renderAddon(slots.addonAfter, props.addonAfter)
      const prefix = renderPrefix(slots.prefix, props.prefix)
      const suffix = renderSuffix(props, slots, isClearable.value, clearIcon.value, clearHidden.value, handlerClear)
      const { class: className, style, ...rest } = attrs
      return (
        <span class={normalizeClass([classes.value, className])} style={style as StyleValue}>
          {addonBefore}
          <span class="ix-input-wrapper">
            {prefix}
            <input
              {...rest}
              ref={elementRef}
              class="ix-input-inner"
              disabled={isDisabled.value}
              readonly={props.readonly}
              onInput={handlerInput}
              onCompositionstart={handlerCompositionStart}
              onCompositionend={handlerCompositionEnd}
              onFocus={handlerFocus}
              onBlur={handlerBlur}
            />
            {suffix}
          </span>
          {addonAfter}
        </span>
      )
    }
  },
})

function useClasses(
  props: InputProps,
  slots: Slots,
  config: InputConfig,
  isFocused: Ref<boolean>,
  disabled: ComputedRef<boolean>,
) {
  return computed(() => {
    const sizeClass = `ix-input-${props.size ?? config.size}`
    return {
      'ix-input': true,
      [sizeClass]: true,
      'ix-input-disabled': disabled.value,
      'ix-input-borderless': props.borderless ?? config.borderless,
      'ix-input-focused': isFocused.value,
      'ix-input-with-addon-after': props.addonAfter || slots.addonAfter,
      'ix-input-with-addon-before': props.addonBefore || slots.addonBefore,
    }
  })
}

function renderAddon(addonSlot: Slot | undefined, addon: string | undefined) {
  if (!(addonSlot || addon)) {
    return null
  }
  const child = addonSlot ? addonSlot() : addon
  return <span class="ix-input-addon">{child}</span>
}

function renderPrefix(prefixSlot: Slot | undefined, icon: string | undefined) {
  if (!(prefixSlot || icon)) {
    return null
  }
  const child = prefixSlot ? prefixSlot() : <IxIcon name={icon}></IxIcon>
  return <span class="ix-input-prefix">{child}</span>
}

function renderSuffix(
  props: InputProps,
  slots: Slots,
  isClearable: boolean,
  clearIcon: string,
  clearHidden: boolean,
  handlerClear: (evt: MouseEvent) => void,
) {
  if (!(isClearable || slots.suffix || props.suffix)) {
    return null
  }

  if (isClearable && !(slots.suffix || props.suffix)) {
    const classes = { 'ix-input-suffix': true, 'ix-input-suffix-hidden': clearHidden }
    const child = slots.clearIcon?.({ handlerClear }) ?? <IxIcon name={clearIcon} onClick={handlerClear}></IxIcon>
    return <span class={classes}>{child}</span>
  }

  let child: VNodeTypes
  if (isClearable && !clearHidden) {
    child = slots.clearIcon?.({ handlerClear }) ?? <IxIcon name={clearIcon} onClick={handlerClear}></IxIcon>
  } else {
    child = slots.suffix?.() ?? <IxIcon name={props.suffix}></IxIcon>
  }

  return <span class="ix-input-suffix">{child}</span>
}
