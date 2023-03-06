/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type Ref,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

import { type VKey, callEmit, useState } from '@idux/cdk/utils'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxSelectPanel, type SelectData, type SelectPanelInstance } from '@idux/components/select'

import PanelFooter from './PanelFooter'
import { proSearchContext } from '../token'
import { type ProSearchSelectPanelProps, type SelectPanelData, proSearchSelectPanelProps } from '../types'
import { filterDataSource, matchRule } from '../utils/selectData'

export default defineComponent({
  props: proSearchSelectPanelProps,
  setup(props, { slots }) {
    const { locale, mergedPrefixCls } = inject(proSearchContext)!
    const [activeValue, setActiveValue] = useState<VKey | undefined>(undefined)
    const partiallySelected = computed(() => props.value && props.value.length > 0 && !props.allSelected)
    const filteredDataSource = computed(() => {
      const { dataSource, searchValue, searchFn } = props
      if (!searchValue) {
        return dataSource
      }

      const trimedSearchValue = searchValue?.trim() ?? ''
      const mergedSearchFn = searchFn
        ? (option: SelectPanelData) => searchFn(option, trimedSearchValue)
        : (option: SelectPanelData) => matchRule(option.label, trimedSearchValue)

      return filterDataSource(dataSource ?? [], mergedSearchFn)
    })

    watch(
      () => props.value,
      value => {
        const key = value?.[value.length - 1]
        key && setActiveValue(key)
      },
      { immediate: true },
    )
    watch(
      () => props.searchValue,
      searchValue => {
        callEmit(props.onSearch, searchValue ?? '')
      },
    )
    onUnmounted(() => {
      if (props.searchValue) {
        callEmit(props.onSearch, '')
      }
    })

    const panelRef = ref<SelectPanelInstance>()
    const changeSelected = (key: VKey) => {
      const multiple = !!props.multiple
      const currValue = props.value ?? []
      const targetIndex = currValue.findIndex(item => item === key)
      const isSelected = targetIndex > -1

      if (!multiple) {
        callEmit(props.onChange, [key])
        return
      }
      if (isSelected) {
        callEmit(
          props.onChange,
          currValue.filter((_, index) => targetIndex !== index),
        )
        return
      }

      callEmit(props.onChange, [...currValue, key])
    }
    const handleOptionClick = (option: SelectData) => {
      changeSelected(option.key!)
    }
    const handleConfirm = () => {
      callEmit(props.onConfirm)
    }
    const handleCancel = () => {
      callEmit(props.onCancel)
    }
    const handleSelectAllClick = () => {
      callEmit(props.onSelectAllClick)
    }

    const handleKeyDown = useOnKeyDown(props, panelRef, activeValue, changeSelected, handleConfirm)

    onMounted(() => {
      props.setOnKeyDown?.(handleKeyDown)
    })
    onBeforeUnmount(() => {
      props.setOnKeyDown?.(undefined)
    })

    const renderSelectAll = () => {
      if (!props.multiple || !props.showSelectAll) {
        return
      }

      const prefixCls = `${mergedPrefixCls.value}-select-panel-select-all-option`
      return (
        <div
          class={prefixCls}
          title={locale.selectAll}
          aria-label={locale.selectAll}
          aria-selected={props.allSelected}
          onClick={handleSelectAllClick}
        >
          <IxCheckbox checked={props.allSelected} indeterminate={partiallySelected.value} />
          <span class={`${prefixCls}-label`}>{locale.selectAll}</span>
        </div>
      )
    }
    const renderFooter = () => {
      if (!props.multiple) {
        return
      }

      return (
        <PanelFooter
          prefixCls={mergedPrefixCls.value}
          locale={locale}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-select-panel`
      const panelProps = {
        activeValue: activeValue.value,
        dataSource: filteredDataSource.value,
        multiple: props.multiple,
        getKey: 'key',
        labelKey: 'label',
        selectedKeys: props.value,
        onOptionClick: handleOptionClick,
        'onUpdate:activeValue': setActiveValue,
      }
      return (
        <div class={prefixCls} tabindex={-1} onMousedown={evt => evt.preventDefault()}>
          {renderSelectAll()}
          <IxSelectPanel ref={panelRef} class={`${prefixCls}-inner`} v-slots={slots} {...panelProps} />
          {renderFooter()}
        </div>
      )
    }
  },
})

function useOnKeyDown(
  props: ProSearchSelectPanelProps,
  panelRef: Ref<SelectPanelInstance | undefined>,
  activeValue: ComputedRef<VKey | undefined>,
  changeSelected: (key: VKey) => void,
  handleConfirm: () => void,
) {
  return function (evt: KeyboardEvent) {
    if (!panelRef.value) {
      return true
    }

    switch (evt.key) {
      case 'ArrowUp':
        evt.preventDefault()
        panelRef.value.changeActiveIndex(-1)
        break
      case 'ArrowDown':
        evt.preventDefault()
        panelRef.value.changeActiveIndex(1)
        break
      case 'Enter': {
        if (!props.dataSource || props.dataSource.length <= 0) {
          return true
        }

        evt.preventDefault()

        if (!props.multiple || evt.ctrlKey) {
          activeValue.value && changeSelected(activeValue.value)
        } else if ((props.value && props.value.length > 0) || !activeValue.value) {
          handleConfirm()
        }

        return false
      }
      default:
        break
    }

    return true
  }
}
