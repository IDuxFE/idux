/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CSSProperties, Slot } from 'vue'

import { computed, defineComponent, normalizeClass, ref } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { inputProps } from './types'

export default defineComponent({
  inheritAttrs: false,
  props: inputProps,
  setup(props, { attrs, slots, expose }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-input`)
    const inputRef = ref<HTMLInputElement>()
    const getInputElement = () => inputRef.value
    expose({ getInputElement })

    const classes = computed(() => {
      const { borderless, clearable, disabled, focused, size, addonAfter, addonBefore, prefix, suffix } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-clearable`]: clearable,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-with-addon-after`]: addonAfter || slots.addonAfter,
        [`${prefixCls}-with-addon-before`]: addonBefore || slots.addonBefore,
        [`${prefixCls}-with-prefix`]: prefix || slots.prefix,
        [`${prefixCls}-with-suffix`]: suffix || slots.suffix,
      })
    })

    return () => {
      const { clearable, clearIcon, clearVisible, disabled, addonAfter, addonBefore, prefix, suffix, onClear } = props
      const prefixCls = mergedPrefixCls.value

      const addonBeforeNode = renderAddon(slots.addonBefore, addonBefore, `${prefixCls}-addon`)
      const addonAfterNode = renderAddon(slots.addonAfter, addonAfter, `${prefixCls}-addon`)
      const prefixNode = renderIcon(slots.prefix, prefix, `${prefixCls}-prefix`)
      const suffixNode = renderIcon(slots.suffix, suffix, `${prefixCls}-suffix`)
      const clearNode = clearable && (
        <span class={`${prefixCls}-clear${clearVisible ? ' visible' : ''}`} onClick={onClear}>
          {slots.clearIcon ? slots.clearIcon() : <IxIcon name={clearIcon} />}
        </span>
      )

      if (!(addonBeforeNode || addonAfterNode || prefixNode || suffixNode || clearNode)) {
        return <input ref={inputRef} class={classes.value} disabled={disabled} {...attrs} />
      }

      const { class: className, style, ...rest } = attrs
      const classNames = normalizeClass([classes.value, className])
      const inputNode = <input ref={inputRef} class={`${prefixCls}-inner`} disabled={disabled} {...rest} />

      if (!(addonBeforeNode || addonAfterNode)) {
        return (
          <span class={classNames} style={style as CSSProperties}>
            {prefixNode}
            {inputNode}
            {suffixNode}
            {clearNode}
          </span>
        )
      }

      if (!(prefixNode || suffixNode || clearNode)) {
        return (
          <span class={classNames} style={style as CSSProperties}>
            {addonBeforeNode}
            {inputNode}
            {addonAfterNode}
          </span>
        )
      }

      return (
        <span class={classNames} style={style as CSSProperties}>
          {addonBeforeNode}
          <span class={`${prefixCls}-wrapper`}>
            {prefixNode}
            {inputNode}
            {suffixNode}
            {clearNode}
          </span>
          {addonAfterNode}
        </span>
      )
    }
  },
})

function renderAddon(slot: Slot | undefined, prop: string | undefined, cls: string) {
  if (!(slot || prop)) {
    return undefined
  }
  return <span class={cls}>{slot ? slot() : prop}</span>
}

function renderIcon(slot: Slot | undefined, prop: string | undefined, cls: string) {
  if (!(slot || prop)) {
    return undefined
  }
  return <span class={cls}>{slot ? slot() : <IxIcon name={prop} />}</span>
}
