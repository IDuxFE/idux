/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, defineComponent, normalizeClass, provide, ref } from 'vue'

import { isString } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { callEmit } from '@idux/cdk/utils'
import { ɵOverflow } from '@idux/components/_private/overflow'
import { useGlobalConfig } from '@idux/components/config'
import { useFormSize } from '@idux/components/form'
import { IxIcon } from '@idux/components/icon'

import { useInputState } from './composables/useInputState'
import Input from './contents/Input'
import Item from './contents/Item'
import { selectorToken } from './token'
import { selectorProps } from './types'

const hiddenBoxStyle = { width: 0, height: 0, display: 'flex', overflow: 'hidden', opacity: 0 }

export default defineComponent({
  name: 'ɵSelector',
  props: selectorProps,
  setup(props, { expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-selector`)
    const mergedClearable = computed(() => {
      return !props.disabled && !props.readonly && props.clearable && props.value.length > 0
    })
    const mergedClearIcon = computed(() => props.clearIcon ?? props.config.clearIcon)
    const mergedSearchable = computed(() => {
      return !props.disabled && !props.readonly && props.searchable === true
    })
    const mergedSize = useFormSize(props, props.config)
    const mergedSuffix = computed(() => {
      return props.suffix ?? (mergedSearchable.value && isFocused.value ? 'search' : props.config.suffix)
    })
    const showPlaceholder = computed(() => {
      return props.value.length === 0 && !isComposing.value && !inputValue.value
    })

    const {
      mirrorRef,
      inputRef,
      inputValue,
      isComposing,
      isFocused,
      blur,
      focus,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      clearInput,
    } = useInputState(props, mergedSearchable)

    const getBoundingClientRect = () => elementRef.value?.getBoundingClientRect()

    expose({ focus, blur, clearInput, getBoundingClientRect })

    const classes = computed(() => {
      const config = props.config
      const { allowInput, className, borderless = config.borderless, multiple } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [className]: true,
        [prefixCls]: true,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-clearable`]: mergedClearable.value,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-multiple`]: multiple,
        [`${prefixCls}-opened`]: props.opened,
        [`${prefixCls}-readonly`]: props.readonly,
        [`${prefixCls}-single`]: !multiple,
        [`${prefixCls}-searchable`]: mergedSearchable.value,
        [`${prefixCls}-allow-input`]: allowInput,
        [`${prefixCls}-${mergedSize.value}`]: true,
      })
    })

    const handleClick = () => {
      const { allowInput, disabled, opened, readonly, onOpenedChange } = props
      if (disabled || readonly || (opened && (mergedSearchable.value || allowInput))) {
        return
      }

      callEmit(onOpenedChange, !opened)
    }
    const handleContentMouseDown = (evt: MouseEvent) => {
      if (evt.target instanceof HTMLInputElement) {
        return
      }

      const { disabled, readonly } = props
      if (disabled || readonly || isFocused.value) {
        evt.preventDefault()
      }
    }
    const handleSuffixMouseDown = (evt: MouseEvent) => {
      evt.preventDefault()
    }
    const handleSuffixClick = (evt: MouseEvent) => {
      const { disabled, readonly, opened, onOpenedChange } = props
      if (disabled || readonly) {
        return
      }

      evt.stopPropagation()
      callEmit(onOpenedChange, !opened)
    }

    const handleClear = (evt: MouseEvent) => {
      const { disabled, readonly } = props
      if (disabled || readonly) {
        return
      }
      evt.stopPropagation()
      callEmit(props.onClear, evt)
    }

    provide(selectorToken, {
      props,
      mergedPrefixCls,
      mergedSearchable,
      mirrorRef,
      inputRef,
      inputValue,
      isComposing,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
    })

    const elementRef = ref<HTMLDivElement>()
    const handleResize = () => callEmit(props.onResize, elementRef.value!.getBoundingClientRect())
    useResizeObserver(elementRef, handleResize)

    return () => {
      const { multiple, disabled, readonly, opened, value, dataSource, maxLabel } = props
      const prefixCls = mergedPrefixCls.value
      const itemPrefixCls = `${prefixCls}-item`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const renderItem = (item: any) => {
        const { key, label, value, rawData } = item
        const _disabled = disabled || item.disabled
        const removable = multiple && !_disabled && !readonly
        const itemProps = {
          key,
          disabled: _disabled,
          prefixCls: itemPrefixCls,
          removable,
          value: value ?? key,
          label,
          onRemove: props.onItemRemove,
        }

        const slotOrName = slots.selectedLabel || slots.label || rawData.customLabel || props.defaultLabelSlotName
        const selectedLabelRender = isString(slotOrName) ? slots[slotOrName] : slotOrName
        const labelNode = selectedLabelRender ? selectedLabelRender(rawData) : label
        return <Item {...itemProps}>{labelNode}</Item>
      }

      const children: VNodeChild[] = []
      if (multiple) {
        const renderRest = (rest: unknown[]) => {
          const key = '__IDUX_SELECT_MAX_ITEM'
          const itemProps = {
            key,
            prefixCls: itemPrefixCls,
            removable: false,
          }
          const overflowedLabelSlot = slots.overflowedLabel || slots.maxLabel
          const labelNode = overflowedLabelSlot ? overflowedLabelSlot(rest) : `+ ${rest.length} ...`
          return <Item {...itemProps}>{labelNode}</Item>
        }
        const overflowSlot = {
          item: renderItem,
          rest: renderRest,
          suffix: () => <Input />,
        }
        children.push(
          <ɵOverflow
            v-slots={overflowSlot}
            prefixCls={prefixCls}
            dataSource={dataSource}
            getKey={item => item.key}
            maxLabel={maxLabel}
          />,
        )
      } else {
        if (value.length > 0 && !isComposing.value && !inputValue.value) {
          dataSource.forEach(item => children.push(renderItem(item)))
        }
        children.push(<Input />)
      }

      if (showPlaceholder.value) {
        const placeholderNode = slots.placeholder ? slots.placeholder() : props.placeholder
        children.push(
          <div key="__placeholder" class={`${prefixCls}-placeholder`}>
            {placeholderNode}
          </div>,
        )
      }

      const suffixProps = {
        name: mergedSuffix.value,
        rotate: !mergedSearchable.value && opened ? 180 : 0,
      }
      const suffixNode = slots.suffix ? slots.suffix(suffixProps) : <IxIcon {...suffixProps} />
      suffixNode &&
        children.push(
          <div
            key="__suffix"
            class={`${prefixCls}-suffix`}
            onClick={handleSuffixClick}
            onMousedown={handleSuffixMouseDown}
          >
            {suffixNode}
          </div>,
        )

      if (mergedClearable.value) {
        children.push(
          <div key="__clear" class={`${prefixCls}-clear`} onClick={handleClear}>
            {slots.clearIcon ? slots.clearIcon() : <IxIcon name={mergedClearIcon.value} />}
          </div>,
        )
      }

      return (
        <div ref={elementRef} class={classes.value} onClick={handleClick}>
          {isFocused.value && !opened && (
            <span style={hiddenBoxStyle} aria-live="polite">
              {value.join(', ')}
            </span>
          )}
          <div class={`${prefixCls}-content`} onMousedown={handleContentMouseDown}>
            {children}
          </div>
        </div>
      )
    }
  },
})
