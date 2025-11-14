/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, defineComponent, normalizeClass, provide, ref } from 'vue'

import { isString } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'
import { ɵOverflow } from '@idux/components/_private/overflow'
import { ɵTrigger, type ɵTriggerInstance } from '@idux/components/_private/trigger'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { useGetKey } from '@idux/components/utils'

import { useInputState } from './composables/useInputState'
import Input from './contents/Input'
import Item from './contents/Item'
import { selectorToken } from './token'
import { type SelectorData, selectorProps } from './types'

export default defineComponent({
  name: 'IxSelector',
  props: selectorProps,
  setup(props, { expose, slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId } = useThemeToken()
    const getKey = useGetKey(props, { getKey: 'key' }, 'selector')
    const value = computed(() => {
      return props.dataSource?.map(data => getKey.value(data)) ?? []
    })

    const triggerRef = ref<ɵTriggerInstance>()

    const mergedPrefixCls = computed(() => `${common.prefixCls}-selector`)
    const mergedClearable = computed(() => {
      return !props.disabled && !props.readonly && props.clearable && value.value.length > 0
    })
    const mergedSearchable = computed(() => {
      return !props.disabled && !props.readonly && props.allowInput === 'searchable'
    })
    const mergedSuffix = computed(() => {
      return props.suffix ?? (mergedSearchable.value && props.focused ? 'search' : 'down')
    })
    const mergedSuffixRotate = computed(() => {
      return !mergedSearchable.value ? props.suffixRotate : undefined
    })
    const showPlaceholder = computed(() => {
      return !props.dataSource?.length && !isComposing.value && !inputValue.value
    })
    const mergedLabelKey = computed(() => {
      return props.labelKey ?? 'label'
    })

    const {
      mirrorRef,
      inputRef,
      inputValue,
      isComposing,
      mergedFocused,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      clearInput,
      handleEnterDown,
      handleBlur,
      handleFocus,
    } = useInputState(props, mergedSearchable)

    const focus = (options?: FocusOptions) => {
      if (inputRef.value) {
        inputRef.value.focus(options)
      } else {
        triggerRef.value?.focus(options)
      }
    }
    const blur = () => {
      if (inputRef.value) {
        inputRef.value.blur()
      } else {
        triggerRef.value?.blur()
      }
    }

    expose({ focus, blur, clearInput })

    const classes = computed(() => {
      const { allowInput, borderless, multiple, opened, size, status } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [prefixCls]: true,
        [`${prefixCls}-${size}`]: !!size,
        [`${prefixCls}-${status}`]: !!status,
        [`${prefixCls}-allow-input`]: allowInput,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-clearable`]: mergedClearable.value,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-focused`]: mergedFocused.value,
        [`${prefixCls}-multiple`]: multiple,
        [`${prefixCls}-opened`]: opened,
        [`${prefixCls}-readonly`]: props.readonly,
        [`${prefixCls}-searchable`]: mergedSearchable.value,
        [`${prefixCls}-single`]: !multiple,
      })
    })

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
      mergedFocused,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      handleEnterDown,
    })

    return () => {
      const {
        borderless,
        clearable,
        clearIcon,
        multiple,
        disabled,
        focused,
        readonly,
        dataSource,
        maxLabel,
        size,
        status,
      } = props
      const prefixCls = mergedPrefixCls.value
      const itemPrefixCls = `${prefixCls}-item`

      const renderItem = (item: SelectorData) => {
        const { value, rawData } = item
        const key = getKey.value(item)
        const label = item[mergedLabelKey.value]
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

        const selectedItemSlot = slots.selectedItem
        if (selectedItemSlot) {
          return selectedItemSlot(itemProps)
        }
        const slotOrName = slots.selectedLabel || slots.label || item?.customLabel || rawData?.customLabel
        const selectedLabelRender = isString(slotOrName) ? slots[slotOrName] : slotOrName
        const labelNode = selectedLabelRender ? selectedLabelRender(rawData ?? item) : label
        return <Item {...itemProps}>{labelNode}</Item>
      }

      const children: VNodeChild[] = []

      if (showPlaceholder.value) {
        const placeholderNode = slots.placeholder ? slots.placeholder() : props.placeholder
        children.push(
          <div key="__placeholder" class={`${prefixCls}-placeholder`}>
            {placeholderNode}
          </div>,
        )
      }

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
            getKey={getKey.value}
            maxLabel={maxLabel}
          />,
        )
      } else {
        if (dataSource?.length && !isComposing.value && !inputValue.value) {
          dataSource.forEach(item => children.push(renderItem(item)))
        }
        children.push(<Input />)
      }

      return (
        <ɵTrigger
          ref={triggerRef}
          aria-label="selector"
          class={classes.value}
          borderless={borderless}
          clearable={clearable}
          clearIcon={clearIcon}
          disabled={disabled}
          focused={focused}
          monitorFocus={props.monitorFocus}
          paddingless={multiple}
          readonly={readonly}
          size={size}
          status={status}
          suffix={mergedSuffix.value}
          suffixRotate={mergedSuffixRotate.value}
          value={value.value}
          onClear={handleClear}
          onFocus={handleFocus}
          onBlur={handleBlur}
          v-slots={{
            suffix: slots.suffix,
            clearIcon: slots.clearIcon,
          }}
        >
          <div class={`${prefixCls}-content`}>{children}</div>
        </ɵTrigger>
      )
    }
  },
})
