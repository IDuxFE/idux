/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onMounted } from 'vue'

import { isNil, isString } from 'lodash-es'

import { type VKey, callEmit } from '@idux/cdk/utils'

import SelectPanel from '../../panel/SelectPanel'
import { proSearchContext } from '../../token'
import { type SelectPanelData, nameSelectPanelProps } from '../../types'

export default defineComponent({
  props: nameSelectPanelProps,
  setup(props, { slots }) {
    const {
      props: proSearchProps,
      mergedPrefixCls,
      createSearchState,
      updateSearchValues,
      setActiveSegment,
      convertStateToValue,
    } = inject(proSearchContext)!

    let panelKeyDown: ((evt: KeyboardEvent) => boolean | undefined) | undefined
    const setOnKeyDown = (keydown: ((evt: KeyboardEvent) => boolean) | undefined) => {
      panelKeyDown = keydown
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (!props.overlayOpened || !panelKeyDown) {
        return true
      }

      return !!panelKeyDown(evt)
    }

    onMounted(() => {
      props.setOnKeyDown(handleKeyDown)
    })

    const handlePanelChange = (value: VKey[]) => {
      const selectedFieldKey = value[0]
      props.onChange?.(selectedFieldKey)

      const searchState = createSearchState(selectedFieldKey)

      if (!searchState) {
        return
      }

      const segmentStates = searchState.segmentStates

      updateSearchValues()
      setActiveSegment({
        itemKey: searchState.key,
        name: segmentStates.find(state => isNil(state.value))?.name ?? segmentStates[segmentStates.length - 1].name,
      })

      callEmit(proSearchProps.onItemCreate, {
        ...(convertStateToValue(searchState.key) ?? {}),
        nameInput: props.searchValue,
      })
    }

    return () => {
      const _customNameLabel = proSearchProps.customNameLabel ?? 'nameLabel'
      const customNameLabelRender = isString(_customNameLabel) ? slots[_customNameLabel] : _customNameLabel

      /* eslint-disable indent */
      const panelSlots = customNameLabelRender
        ? {
            optionLabel: (option: SelectPanelData) => {
              const searchField = proSearchProps.searchFields!.find(field => field.key === option.key)!
              return customNameLabelRender(searchField)
            },
          }
        : undefined
      /* eslint-enable indent */

      return props.dataSource.length ? (
        <SelectPanel
          class={`${mergedPrefixCls.value}-name-segment-panel`}
          v-slots={panelSlots}
          dataSource={props.dataSource}
          searchValue={props.searchValue}
          searchFn={() => true}
          multiple={false}
          onChange={handlePanelChange}
          setOnKeyDown={setOnKeyDown}
        />
      ) : null
    }
  },
})
