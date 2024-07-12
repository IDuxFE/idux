/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndSortableReorderInfo } from '@idux/cdk/dnd'

import { computed, defineComponent, inject, shallowRef, watch } from 'vue'

import { isNil, isString } from 'lodash-es'

import { VKey, useState } from '@idux/cdk/utils'
import { IxCol, IxRow } from '@idux/components/grid'
import { IxIcon } from '@idux/components/icon'
import { InputInstance, IxInput } from '@idux/components/input'
import { IxSelectPanel, SelectData } from '@idux/components/select'

import { tabsToken } from '../tokens'
import { moreSelectPaneProps } from '../types'

export default defineComponent({
  props: moreSelectPaneProps,
  setup(props, { slots }) {
    const {
      props: tabsProps,
      mergedPrefixCls,
      mergedDndSortable,
      selectedKey,
      handleTabClose,
      setSelectedKey,
    } = inject(tabsToken)!

    const [searchValue, setSearchValue] = useState('')
    const searchInputRef = shallowRef<InputInstance>()

    const filteredDataSource = computed(() => {
      return props.dataSource.filter(data => {
        return String(data.label).indexOf(searchValue.value) !== -1
      })
    })

    const handleInput = (evt: Event) => {
      const inputValue = (evt.target as HTMLInputElement).value
      setSearchValue(inputValue)
    }

    const handleClear = () => {
      setSearchValue('')
    }

    const handleClose = (evt: Event, key: VKey, disabled: boolean) => {
      if (!disabled) {
        evt.stopPropagation()
        handleTabClose(key)
      }
    }

    const handleSelectChange = (data: SelectData) => {
      setSelectedKey(data.key as VKey)
    }

    const handleSortReorder = (reorderInfo: DndSortableReorderInfo) => {
      if (!props.onSortReorder) {
        return
      }

      if (filteredDataSource.value.length === props.dataSource.length) {
        props.onSortReorder(reorderInfo)
      } else {
        const { sourceIndex, targetIndex, ...rest } = reorderInfo
        const sourceKey = filteredDataSource.value[sourceIndex].key!
        const targetKey = filteredDataSource.value[targetIndex].key!

        const mergedSourceIndex = props.dataSource.findIndex(data => data.key === sourceKey)
        const mergedTargetIndex = props.dataSource.findIndex(data => data.key === targetKey)

        props.onSortReorder({
          sourceIndex: mergedSourceIndex,
          targetIndex: mergedTargetIndex,
          ...rest,
        })
      }
    }

    const optionLabelRender = (data: SelectData) => {
      const { key, label, disabled, customTitle } = data
      const titleSlot =
        (isString(customTitle) ? slots[customTitle] : customTitle) ?? slots.allTabsPanelLabel ?? slots.title

      return (
        <IxRow>
          <IxCol flex="auto">
            {titleSlot?.({ key, disabled, selected: false, title: label, overflowed: true }) ?? label}
          </IxCol>
          {tabsProps.closable && (
            <IxCol flex="none">
              <IxIcon
                class={`${mergedPrefixCls.value}-nav-close-icon`}
                name="close"
                onClick={evt => handleClose(evt, key as VKey, disabled)}
              ></IxIcon>
            </IxCol>
          )}
        </IxRow>
      )
    }

    watch(
      () => props.visible,
      visible => {
        if (visible) {
          setSearchValue('')
          setTimeout(() => {
            searchInputRef.value?.focus?.()
          })
        }
      },
      {
        flush: 'post',
        immediate: true,
      },
    )

    return () => {
      return (
        <div>
          <IxInput
            autofocus
            ref={searchInputRef}
            size="sm"
            suffix="search"
            clearable
            value={searchValue.value}
            onInput={handleInput}
            onClear={handleClear}
          />
          <IxSelectPanel
            v-slots={{
              optionLabel: optionLabelRender,
            }}
            selectedKeys={!isNil(selectedKey.value) ? [selectedKey.value] : undefined}
            dataSource={filteredDataSource.value}
            dndSortable={mergedDndSortable.value}
            onDndSortReorder={handleSortReorder}
            onOptionClick={handleSelectChange}
            _virtualScrollHeight={props._virtualScrollHeight}
            _onDragStart={props._onDragStart}
            _onDrop={props._onDrop}
          />
        </div>
      )
    }
  },
})
