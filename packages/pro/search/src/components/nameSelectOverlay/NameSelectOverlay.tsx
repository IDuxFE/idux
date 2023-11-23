/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, inject, onMounted, ref, watch } from 'vue'

import { useState } from '@idux/cdk/utils'
import { ɵOverlay, type ɵOverlayInstance, type ɵOverlayProps } from '@idux/components/_private/overlay'
import { useThemeToken } from '@idux/pro/theme'

import KeywordFallbackPanel from './KeywordFallbackPanel'
import NameSelectPanel from './NameSelectPanel'
import { type ProSearchContext, proSearchContext } from '../../token'
import { type NameSelectOverlayProps, type SelectPanelData, nameSelectOverlayProps } from '../../types'
import { filterDataSource, matchRule } from '../../utils/selectData'

export default defineComponent({
  props: nameSelectOverlayProps,
  setup(props, { slots, expose }) {
    const context = inject(proSearchContext)!
    const { globalHashId, hashId } = useThemeToken('proSearch')
    const { mergedPrefixCls, bindOverlayMonitor, commonOverlayProps, nameSelectActive, overlayOpened } = context

    const overlayRef = ref<ɵOverlayInstance>()

    const isActive = computed(() => nameSelectActive.value)
    const nameSelectOverlayOpened = computed(() => overlayOpened.value && nameSelectActive.value)

    const filteredData = useFilteredData(props, context, nameSelectOverlayOpened)

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

    onMounted(() => {
      bindOverlayMonitor(overlayRef, nameSelectOverlayOpened)
      watch(isActive, updateOverlay)
    })

    const overlayProps = useOverlayAttrs(
      mergedPrefixCls,
      commonOverlayProps,
      nameSelectOverlayOpened,
      globalHashId,
      hashId,
    )

    const renderContent = () => {
      return filteredData.value.length ? (
        <NameSelectPanel
          v-slots={slots}
          dataSource={filteredData.value}
          searchValue={props.searchValue}
          overlayOpened={nameSelectOverlayOpened.value}
          onChange={props.onChange}
          setOnKeyDown={props.setOnKeyDown}
        />
      ) : (
        <KeywordFallbackPanel
          searchValue={props.searchValue}
          overlayOpened={nameSelectOverlayOpened.value}
          onChange={props.onChange}
          setOnKeyDown={props.setOnKeyDown}
        />
      )
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
  globalHashId: ComputedRef<string>,
  hashId: ComputedRef<string>,
): ComputedRef<ɵOverlayProps> {
  return computed(() => ({
    ...commonOverlayProps.value,
    class: [`${mergedPrefixCls.value}-name-segment-overlay`, globalHashId.value, hashId.value],
    trigger: 'manual',
    visible: overlayOpened.value,
  }))
}

function useFilteredData(
  props: NameSelectOverlayProps,
  context: ProSearchContext,
  overlayOpened: ComputedRef<boolean>,
): ComputedRef<SelectPanelData[]> {
  const { props: proSearchProps, searchStates } = context
  const searchStatesKeys = computed(() => new Set(searchStates.value?.map(state => state.fieldKey)))
  const dataSource = computed(() => {
    const searchFields = proSearchProps.searchFields?.filter(
      field => field.multiple || !searchStatesKeys.value.has(field.key),
    )
    return searchFields?.map(field => ({ key: field.key, label: field.label })) ?? []
  })

  const [filteredDataSource, setFilteredDataSource] = useState<SelectPanelData[]>([])
  watch([dataSource, () => props.searchValue, overlayOpened], ([dataSource, searchValue, overlayOpened]) => {
    if (overlayOpened) {
      setFilteredDataSource(filterDataSource(dataSource, nameOption => matchRule(nameOption.label, searchValue)))
    }
  })

  return filteredDataSource
}
