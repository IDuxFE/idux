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
  ref,
  watch,
} from 'vue'

import { type VKey, useState } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxSelectPanel, type SelectData, type SelectPanelInstance } from '@idux/components/select'

import { proSearchContext } from '../token'
import { SearchSelectPanelProps, searchSelectPanelProps } from '../types'
import { findDataSourceItem } from '../utils/selectData'

export default defineComponent({
  props: searchSelectPanelProps,
  setup(props) {
    const { locale, mergedPrefixCls } = inject(proSearchContext)!
    const [activeValue, setActiveValue] = useState<VKey | undefined>(undefined)
    const partiallySelected = computed(() => props.value && props.value.length > 0 && !props.allSelected)

    watch(
      () => props.value,
      value => {
        const key = value?.[value.length - 1]
        key && setActiveValue(key)
      },
    )
    watch(
      () => props.dataSource,
      dataSource => {
        if (activeValue.value && findDataSourceItem(dataSource!, option => option.key === activeValue.value)) {
          return
        }

        const firstItem = dataSource?.[0]
        if (!firstItem) {
          setActiveValue(undefined)
          return
        }

        if (firstItem.children && firstItem.children.length > 0) {
          setActiveValue(firstItem.children[0].key)
        } else {
          setActiveValue(firstItem.key)
        }
      },
    )

    const panelRef = ref<SelectPanelInstance>()
    const changeSelected = (key: VKey) => {
      const multiple = !!props.multiple
      const currValue = props.value ?? []
      const targetIndex = currValue.findIndex(item => item === key)
      const isSelected = targetIndex > -1

      if (!multiple) {
        props.onChange?.([key])
        return
      }
      if (isSelected) {
        props.onChange?.(currValue.filter((_, index) => targetIndex !== index))
        return
      }

      props.onChange?.([...currValue, key])
    }
    const handleOptionClick = (option: SelectData) => {
      changeSelected(option.key!)
    }
    const handleConfirm = () => {
      props.onConfirm?.()
    }
    const handleCancel = () => {
      props.onCancel?.()
    }
    const handleSelectAllChange = () => {
      props.onSelectAll?.(!props.allSelected)
    }

    const handleKeyDown = useOnKeyDown(props, panelRef, activeValue, changeSelected, handleConfirm)

    onMounted(() => {
      props.setOnKeyDown?.(handleKeyDown)
    })
    onBeforeUnmount(() => {
      props.setOnKeyDown?.(undefined)
    })

    const renderSelectAll = () => {
      if (!props.multiple) {
        return
      }

      const prefixCls = `${mergedPrefixCls.value}-select-panel-select-all-option`
      return (
        <div
          class={prefixCls}
          title={locale.selectAll}
          aria-label={locale.selectAll}
          aria-selected={props.allSelected}
          onClick={handleSelectAllChange}
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
        <div class={`${mergedPrefixCls.value}-select-panel-footer`}>
          <IxButton mode="primary" size="xs" onClick={handleConfirm}>
            {locale.ok}
          </IxButton>
          <IxButton size="xs" onClick={handleCancel}>
            {locale.cancel}
          </IxButton>
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-select-panel`
      const panelProps = {
        activeValue: activeValue.value,
        dataSource: props.dataSource,
        multiple: props.multiple,
        getKey: 'key',
        labelKey: 'label',
        selectedKeys: props.value,
        onOptionClick: handleOptionClick as <K = VKey>(option: SelectData<K>) => void,
        'onUpdate:activeValue': setActiveValue as <K = VKey>(value: K) => void,
      }
      return (
        <div class={prefixCls} tabindex={-1} onMousedown={evt => evt.preventDefault()}>
          {renderSelectAll()}
          <IxSelectPanel ref={panelRef} class={`${prefixCls}-inner`} {...panelProps} />
          {renderFooter()}
        </div>
      )
    }
  },
})

function useOnKeyDown(
  props: SearchSelectPanelProps,
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
