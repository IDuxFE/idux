/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type VNodeChild, computed, defineComponent, inject, onMounted, ref, watch } from 'vue'

import { isString } from 'lodash-es'

import { type VKey, callEmit, convertArray, useState } from '@idux/cdk/utils'
import { ɵOverlay, type ɵOverlayInstance, type ɵOverlayProps } from '@idux/components/_private/overlay'

import SelectPanel from '../panel/SelectPanel'
import { proSearchContext } from '../token'
import { type SearchField, type SelectPanelData, nameSelectOverlayProps } from '../types'
import { filterDataSource, matchRule } from '../utils/selectData'

export default defineComponent({
  props: nameSelectOverlayProps,
  setup(props, { slots, expose }) {
    const context = inject(proSearchContext)!
    const {
      props: proSearchProps,
      mergedPrefixCls,
      bindOverlayMonitor,
      commonOverlayProps,
      nameSelectActive,
      overlayOpened,
      searchStates,
      setActiveSegment,
      createSearchState,
      convertStateToValue,
      updateSearchState,
    } = context

    const overlayRef = ref<ɵOverlayInstance>()

    const [selectedFieldKey, setSelectedFieldKey] = useState<VKey | undefined>(undefined)

    const searchStatesKeys = computed(() => new Set(searchStates.value?.map(state => state.fieldKey)))
    const dataSource = computed(() => {
      const searchFields = proSearchProps.searchFields?.filter(
        field => field.key === props.selectedFieldKey || field.multiple || !searchStatesKeys.value.has(field.key),
      )
      return searchFields?.map(field => ({ key: field.key, label: field.label })) ?? []
    })
    const filteredDataSource = computed(() =>
      filterDataSource(dataSource.value, nameOption => matchRule(nameOption.label, props.searchValue)),
    )
    const isActive = computed(() => nameSelectActive.value)
    const nameSelectOverlayOpened = computed(() => overlayOpened.value && nameSelectActive.value)

    const updateOverlay = () => {
      setTimeout(() => {
        if (isActive.value) {
          overlayRef.value?.updatePopper()
        }
      })
    }

    expose({
      updateOverlay,
    })

    const handlePanelChange = (value: VKey[]) => {
      setSelectedFieldKey(value[0])
      props.onChange?.(value[0])

      handleConfirm()
    }
    const handleConfirm = () => {
      if (!selectedFieldKey.value) {
        return
      }

      const searchState = createSearchState(selectedFieldKey.value)

      if (!searchState) {
        return
      }

      updateSearchState(searchState.key)
      setActiveSegment({
        itemKey: searchState.key,
        name: searchState.segmentValues[0].name,
      })

      callEmit(proSearchProps.onItemCreate, {
        ...(convertStateToValue(searchState.key) ?? {}),
        nameInput: props.searchValue,
      })

      setSelectedFieldKey(undefined)
    }
    let panelKeyDown: ((evt: KeyboardEvent) => boolean | undefined) | undefined
    const setOnKeyDown = (keydown: ((evt: KeyboardEvent) => boolean) | undefined) => {
      panelKeyDown = keydown
    }
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (!selectedFieldKey.value && evt.key === 'Enter') {
        callEmit(proSearchProps.onItemCreate, {
          name: undefined,
          nameInput: props.searchValue,
        })
        props.onChange?.(undefined)
      }

      if (!overlayOpened.value || !panelKeyDown) {
        return true
      }

      return !!panelKeyDown(evt)
    }

    onMounted(() => {
      bindOverlayMonitor(overlayRef, nameSelectOverlayOpened)
      props.setOnKeyDown(handleKeyDown)
      watch(isActive, active => {
        if (!active) {
          props.onChange?.(undefined)
        }

        updateOverlay()
      })
    })

    const renderNameLabel = (key: VKey, renderer: (searchField: SearchField) => VNodeChild) => {
      const searchField = proSearchProps.searchFields!.find(field => field.key === key)!
      return renderer(searchField)
    }

    const _customNameLabel = proSearchProps.customNameLabel ?? 'nameLabel'
    const customNameLabelRender = isString(_customNameLabel) ? slots[_customNameLabel] : _customNameLabel
    const panelSlots = {
      optionLabel: customNameLabelRender
        ? (option: SelectPanelData) => renderNameLabel(option.key, customNameLabelRender)
        : undefined,
    }
    const overlayProps = useOverlayAttrs(mergedPrefixCls, commonOverlayProps, nameSelectOverlayOpened)

    const renderContent = () => {
      return filteredDataSource.value.length ? (
        <SelectPanel
          class={`${mergedPrefixCls.value}-name-segment-panel`}
          v-slots={panelSlots}
          value={convertArray(selectedFieldKey.value)}
          dataSource={filteredDataSource.value}
          searchValue={props.searchValue}
          searchFn={() => true}
          multiple={false}
          onChange={handlePanelChange}
          setOnKeyDown={setOnKeyDown}
        />
      ) : null
    }

    return () => (
      <ɵOverlay
        ref={overlayRef}
        v-slots={{ default: slots.default, content: renderContent }}
        {...overlayProps.value}
      ></ɵOverlay>
    )
  },
})

function useOverlayAttrs(
  mergedPrefixCls: ComputedRef<string>,
  commonOverlayProps: ComputedRef<ɵOverlayProps>,
  overlayOpened: ComputedRef<boolean>,
): ComputedRef<ɵOverlayProps> {
  return computed(() => ({
    ...commonOverlayProps.value,
    class: `${mergedPrefixCls.value}-name-segment-overlay`,
    trigger: 'manual',
    visible: overlayOpened.value,
  }))
}
