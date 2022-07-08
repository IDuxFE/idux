/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type PropType, Slot, computed, defineComponent, inject, normalizeClass } from 'vue'

import { IxCheckbox } from '@idux/components/checkbox'
import { convertIconVNode, useKey } from '@idux/components/utils'

import { type MergedData } from '../composables/useDataSource'
import { cascaderToken } from '../token'
import { type CascaderData } from '../types'

export default defineComponent({
  props: {
    children: { type: Array as PropType<MergedData[]>, default: undefined },
    index: { type: Number, required: true },
    isLeaf: { type: Boolean, required: true },
    label: { type: String, required: true },
    parentKey: { type: [String, Number, Symbol], default: undefined },
    rawData: { type: Object as PropType<CascaderData>, required: true },
  },
  setup(props) {
    const key = useKey()
    const {
      props: cascaderProps,
      slots,
      mergedPrefixCls,
      mergedExpandIcon,
      mergedLabelKey,
      inputValue,
      activeKey,
      setActiveKey,
      expandedKeys,
      setOverlayOpened,
      loadingKeys,
      selectedKeys,
      selectedLimit,
      selectedLimitTitle,
      indeterminateKeys,
      handleSelect,
      handleExpand,
    } = inject(cascaderToken)!
    const isActive = computed(() => key === activeKey.value)
    const isDisabled = computed(() => props.rawData.disabled)
    const isExpanded = computed(() => expandedKeys.value.includes(key))
    const isLoading = computed(() => loadingKeys.value.includes(key))
    const isSelected = computed(() => selectedKeys.value.includes(key))
    const isIndeterminate = computed(() => indeterminateKeys.value.includes(key))

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-option`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-leaf`]: props.isLeaf,
        [`${prefixCls}-active`]: isActive.value,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-expanded`]: isExpanded.value,
        [`${prefixCls}-loading`]: isLoading.value,
        [`${prefixCls}-selected`]: isSelected.value,
      })
    })

    const handleClick = () => {
      if (props.isLeaf) {
        if (!isSelected.value && selectedLimit.value) {
          return
        }
        handleSelect(key)
        setOverlayOpened(false)
      } else {
        cascaderProps.strategy === 'off' && handleSelect(key)
        cascaderProps.expandTrigger === 'click' && handleExpand(key)
      }
    }

    const handleCheckboxClick = (evt: Event) => {
      evt.stopPropagation()
      handleSelect(key)
    }
    const handleMouseEnter = () => {
      setActiveKey(key)
      !props.isLeaf && cascaderProps.expandTrigger === 'hover' && handleExpand(key)
    }

    return () => {
      const { rawData, label } = props
      const { multiple } = cascaderProps
      const disabled = isDisabled.value
      const selected = isSelected.value
      const prefixCls = `${mergedPrefixCls.value}-option`

      const searchValue = inputValue.value
      const mergedLabel = searchValue ? label : (rawData[mergedLabelKey.value] as string)
      // 优先显示 selectedLimitTitle
      const title = (!(disabled || selected) && selectedLimitTitle.value) || mergedLabel
      const customAdditional = cascaderProps.customAdditional
        ? cascaderProps.customAdditional({ data: rawData, index: props.index })
        : undefined

      return (
        <div
          class={classes.value}
          title={title}
          onClick={disabled ? undefined : handleClick}
          onMouseenter={disabled ? undefined : handleMouseEnter}
          aria-label={label}
          aria-selected={selected}
          {...rawData.additional}
          {...customAdditional}
        >
          {multiple && (
            <IxCheckbox
              checked={selected}
              disabled={disabled || (!selected && selectedLimit.value)}
              indeterminate={isIndeterminate.value}
              onClick={handleCheckboxClick}
            />
          )}
          <span key="__label" class={`${prefixCls}-label`}>
            {renderLabel(slots.optionLabel, mergedLabel, rawData, searchValue, prefixCls)}
          </span>
          {!props.isLeaf && (
            <span key="__expand-icon" class={`${prefixCls}-expand-icon`}>
              {convertIconVNode(slots.expandIcon, isLoading.value ? 'loading' : mergedExpandIcon.value, {
                key,
                expanded: isExpanded.value,
                data: rawData,
              })}
            </span>
          )}
        </div>
      )
    }
  },
})

function renderLabel(
  labelSlot: Slot | undefined,
  label: string | undefined,
  data: CascaderData,
  searchValue: string | undefined,
  prefixCls: string,
) {
  if (labelSlot) {
    return labelSlot({ label, data, searchValue })
  }
  if (label && searchValue) {
    const startIndex = label.toUpperCase().indexOf(searchValue.toUpperCase())
    if (startIndex > -1) {
      const endIndex = startIndex + searchValue.length
      const beforeLabel = label.substring(0, startIndex)
      const afterLabel = label.substring(endIndex)
      const highlightLabel = <span class={`${prefixCls}-label-highlight`}>{label.substring(startIndex, endIndex)}</span>
      return [beforeLabel, highlightLabel, afterLabel]
    }
  }
  return label
}
