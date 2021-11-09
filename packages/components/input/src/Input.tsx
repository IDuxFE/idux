/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputProps } from './types'
import type { Slot, Slots, StyleValue, VNodeTypes } from 'vue'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { IxIcon } from '@idux/components/icon'

import { inputProps } from './types'
import { useCommonBindings } from './useCommonBindings'

export default defineComponent({
  name: 'IxInput',
  inheritAttrs: false,
  props: inputProps,
  setup(props, { slots, expose, attrs }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-input`)
    const config = useGlobalConfig('input')
    const formContext = inject(FORM_TOKEN, null)

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

    const size = computed(() => props.size ?? formContext?.size.value ?? config.size)
    const classes = computed(() => {
      const { borderless = config.borderless, addonAfter, addonBefore } = props
      const prefixCls = mergedPrefixCls.value
      const classes = {
        [prefixCls]: true,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-${size.value}`]: true,
        [`${prefixCls}-with-addon-after`]: addonAfter || slots.addonAfter,
        [`${prefixCls}-with-addon-before`]: addonBefore || slots.addonBefore,
      }
      return normalizeClass([classes, attrs.class])
    })

    return () => {
      const { class: className, style, ...rest } = attrs
      const prefixCls = mergedPrefixCls.value
      return (
        <span class={classes.value} style={style as StyleValue}>
          {renderAddon(slots.addonBefore, props.addonBefore, prefixCls)}
          <span class={`${prefixCls}-wrapper`}>
            {renderPrefix(slots.prefix, props.prefix, prefixCls)}
            <input
              {...rest}
              ref={elementRef}
              class={`${prefixCls}-inner`}
              disabled={isDisabled.value}
              readonly={props.readonly}
              onInput={handlerInput}
              onCompositionstart={handlerCompositionStart}
              onCompositionend={handlerCompositionEnd}
              onFocus={handlerFocus}
              onBlur={handlerBlur}
            />
            {renderSuffix(props, slots, isClearable.value, clearIcon.value, clearHidden.value, handlerClear, prefixCls)}
          </span>
          {renderAddon(slots.addonAfter, props.addonAfter, prefixCls)}
        </span>
      )
    }
  },
})

function renderAddon(addonSlot: Slot | undefined, addon: string | undefined, prefixCls: string) {
  if (!(addonSlot || addon)) {
    return null
  }
  const child = addonSlot ? addonSlot() : addon
  return <span class={`${prefixCls}-addon`}>{child}</span>
}

function renderPrefix(prefixSlot: Slot | undefined, icon: string | undefined, prefixCls: string) {
  if (!(prefixSlot || icon)) {
    return null
  }
  const child = prefixSlot ? prefixSlot() : <IxIcon name={icon}></IxIcon>
  return <span class={`${prefixCls}-prefix`}>{child}</span>
}

function renderSuffix(
  props: InputProps,
  slots: Slots,
  isClearable: boolean,
  clearIcon: string,
  clearHidden: boolean,
  onClear: (evt: MouseEvent) => void,
  prefixCls: string,
) {
  if (!(isClearable || slots.suffix || props.suffix)) {
    return null
  }

  let classes = `${prefixCls}-suffix`

  if (isClearable && !(slots.suffix || props.suffix)) {
    if (clearHidden) {
      classes += ` ${prefixCls}-suffix-hidden`
    }
    const child = slots.clearIcon?.({ onClear }) ?? <IxIcon name={clearIcon} onClick={onClear}></IxIcon>
    return <span class={classes}>{child}</span>
  }

  let child: VNodeTypes
  if (isClearable && !clearHidden) {
    child = slots.clearIcon?.({ onClear }) ?? <IxIcon name={clearIcon} onClick={onClear}></IxIcon>
  } else {
    child = slots.suffix?.() ?? <IxIcon name={props.suffix}></IxIcon>
  }

  return <span class={classes}>{child}</span>
}
