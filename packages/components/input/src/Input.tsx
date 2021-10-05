import type { ComputedRef, Ref, Slot, Slots, StyleValue, VNodeTypes } from 'vue'
import type { InputConfig } from '@idux/components/config'
import type { InputProps } from './types'

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
    const { prefixCls } = useGlobalConfig('common')

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
          <span class={`${prefixCls}-input-wrapper`}>
            {prefix}
            <input
              {...rest}
              ref={elementRef}
              class={`${prefixCls}-input-inner`}
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
    const { prefixCls } = useGlobalConfig('common')
    const sizeClass = `${prefixCls}-input-${props.size ?? config.size}`
    return {
      [`${prefixCls}-input`]: true,
      [sizeClass]: true,
      [`${prefixCls}-input-disabled`]: disabled.value,
      [`${prefixCls}-input-borderless`]: props.borderless ?? config.borderless,
      [`${prefixCls}-input-focused`]: isFocused.value,
      [`${prefixCls}-input-with-addon-after`]: props.addonAfter || slots.addonAfter,
      [`${prefixCls}-input-with-addon-before`]: props.addonBefore || slots.addonBefore,
    }
  })
}

function renderAddon(addonSlot: Slot | undefined, addon: string | undefined) {
  if (!(addonSlot || addon)) {
    return null
  }
  const { prefixCls } = useGlobalConfig('common')
  const child = addonSlot ? addonSlot() : addon
  return <span class={`${prefixCls}-input-addon`}>{child}</span>
}

function renderPrefix(prefixSlot: Slot | undefined, icon: string | undefined) {
  if (!(prefixSlot || icon)) {
    return null
  }
  const { prefixCls } = useGlobalConfig('common')
  const child = prefixSlot ? prefixSlot() : <IxIcon name={icon}></IxIcon>
  return <span class={`${prefixCls}-input-prefix`}>{child}</span>
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

  const { prefixCls } = useGlobalConfig('common')

  if (isClearable && !(slots.suffix || props.suffix)) {
    const classes = { [`${prefixCls}-input-suffix`]: true, [`${prefixCls}-input-suffix-hidden`]: clearHidden }
    const child = slots.clearIcon?.({ handlerClear }) ?? <IxIcon name={clearIcon} onClick={handlerClear}></IxIcon>
    return <span class={classes}>{child}</span>
  }

  let child: VNodeTypes
  if (isClearable && !clearHidden) {
    child = slots.clearIcon?.({ handlerClear }) ?? <IxIcon name={clearIcon} onClick={handlerClear}></IxIcon>
  } else {
    child = slots.suffix?.() ?? <IxIcon name={props.suffix}></IxIcon>
  }

  return <span class={`${prefixCls}-input-suffix`}>{child}</span>
}
