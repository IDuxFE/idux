/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, shallowRef, watch } from 'vue'

import { isString } from 'lodash-es'

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
    const { props: tabsProps, mergedPrefixCls, handleTabClose, setSelectedKey } = inject(tabsToken)!

    const [searchValue, setSearchValue] = useState('')
    const searchInputRef = shallowRef<InputInstance>()

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

    const optionLabelRender = (data: SelectData) => {
      const { key, label, disabled, customTitle } = data
      const titleSlot = isString(customTitle) ? slots[customTitle] : customTitle

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
      const mergedDataSource = props.dataSource.filter(data => {
        return String(data.label).indexOf(searchValue.value) !== -1
      })
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
            dataSource={mergedDataSource}
            onOptionClick={handleSelectChange}
            _virtualScrollHeight={props._virtualScrollHeight}
          />
        </div>
      )
    }
  },
})
