/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, onMounted } from 'vue'

import { isNil, isObject, toString } from 'lodash-es'

import { type VKey, callEmit } from '@idux/cdk/utils'

import SelectPanel from '../../panel/SelectPanel'
import { proSearchContext } from '../../token'
import { type SelectPanelData, keywordFallbackPanelProps } from '../../types'

export default defineComponent({
  props: keywordFallbackPanelProps,
  setup(props) {
    const {
      props: proSearchProps,
      locale,
      mergedPrefixCls,
      fieldKeyMap,
      searchStates,
      createSearchState,
      convertStateToValue,
      updateSearchValues,
      setActiveSegment,
      setTempActive,
      setOverlayOpened,
      updateSegmentValue,
      validateSearchState,
      getCacheData,
      setCacheData,
    } = inject(proSearchContext)!

    const searchStatesKeys = computed(() => new Set(searchStates.value?.map(state => state.fieldKey)))
    const keywordFallbackFields = computed(() => {
      const searchFields = proSearchProps.searchFields?.filter(
        field => field.multiple || !searchStatesKeys.value.has(field.key),
      )
      return searchFields?.filter(field => !!field.keywordFallback) ?? []
    })
    const keywordFallbackPanelData = computed(() =>
      keywordFallbackFields.value.map(field => ({
        key: field.key,
        label: field.label,
      })),
    )

    let panelKeyDown: ((evt: KeyboardEvent) => boolean | undefined) | undefined
    const setOnKeyDown = (keydown: ((evt: KeyboardEvent) => boolean) | undefined) => {
      panelKeyDown = keydown
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (!keywordFallbackPanelData.value.length && evt.key === 'Enter') {
        callEmit(proSearchProps.onItemCreate, {
          name: undefined,
          nameInput: props.searchValue,
        })
        props.onChange?.(undefined)
        return false
      }

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

      const searchField = fieldKeyMap.value.get(selectedFieldKey)!
      const searchState = createSearchState(selectedFieldKey)
      const hasOperators = searchField.operators && searchField.operators.length > 0
      const valueSegment = hasOperators ? searchField.segments[1] : searchField.segments[0]

      if (!searchState) {
        return
      }

      let searchValue: unknown
      if (isObject(searchField.keywordFallback) && searchField.keywordFallback.parse) {
        searchValue = searchField.keywordFallback.parse(props.searchValue)
      } else {
        searchValue = valueSegment.parse(
          props.searchValue,
          [],
          dataKey => getCacheData(searchState.key, valueSegment.name, dataKey),
          (dataKey, data) => setCacheData(searchState.key, valueSegment.name, dataKey, data),
        )
      }

      updateSegmentValue(searchState.key, valueSegment.name, searchValue)

      const segmentStates = searchState.segmentStates

      updateSearchValues()

      if (validateSearchState(searchState.key)) {
        setTempActive()
        setOverlayOpened(false)
      } else {
        setActiveSegment({
          itemKey: searchState.key,
          name: segmentStates.find(state => isNil(state.value))?.name ?? segmentStates[segmentStates.length - 1].name,
        })
      }

      callEmit(proSearchProps.onItemCreate, {
        ...(convertStateToValue(searchState.key) ?? {}),
        nameInput: props.searchValue,
      })
    }

    return () => {
      const panelSlots = {
        optionLabel: (option: SelectPanelData) =>
          locale.keywordFallbackLabel.replace('${0}', toString(option.label)).replace('${1}', props.searchValue),
      }

      return keywordFallbackPanelData.value.length ? (
        <SelectPanel
          class={`${mergedPrefixCls.value}-name-segment-panel`}
          v-slots={panelSlots}
          dataSource={keywordFallbackPanelData.value}
          multiple={false}
          onChange={handlePanelChange}
          setOnKeyDown={setOnKeyDown}
        />
      ) : null
    }
  },
})
