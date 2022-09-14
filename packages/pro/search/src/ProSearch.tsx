/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, nextTick, normalizeClass, provide, watch, withDirectives } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { vClickOutside } from '@idux/cdk/click-outside'
import { callEmit } from '@idux/cdk/utils'
import { ɵOverflow } from '@idux/components/_private/overflow'
import { useDateConfig } from '@idux/components/config'
import { useGlobalConfig } from '@idux/pro/config'

import { useActiveSegment } from './composables/useActiveSegment'
import { useCommonOverlayProps } from './composables/useCommonOverlayProps'
import { useSearchItems } from './composables/useSearchItem'
import { useSearchItemErrors } from './composables/useSearchItemErrors'
import { tempSearchStateKey, useSearchStates } from './composables/useSearchStates'
import { useSearchValues } from './composables/useSearchValues'
import SearchItemComp from './searchItem/SearchItem'
import { proSearchContext } from './token'
import { type SearchItem, proSearchProps } from './types'
import { renderIcon } from './utils/RenderIcon'

export default defineComponent({
  name: 'IxProSearch',
  props: proSearchProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('search')
    const dateConfig = useDateConfig()
    const mergedPrefixCls = computed(() => `${common.prefixCls}-search`)

    const { searchValues, searchValueEmpty, setSearchValues } = useSearchValues(props)
    const searchStateContext = useSearchStates(props, dateConfig, searchValues, setSearchValues)
    const errors = useSearchItemErrors(props, searchValues)
    const searchItems = useSearchItems(
      props,
      slots,
      mergedPrefixCls,
      searchStateContext.searchStates,
      errors,
      dateConfig,
    )
    const activeSegmentContext = useActiveSegment(props, searchItems, searchStateContext.tempSearchStateAvailable)
    const commonOverlayProps = useCommonOverlayProps(mergedPrefixCls, props, config)

    const { initSearchStates, updateSearchState, clearSearchState, tempSearchState } = searchStateContext
    const { activeSegment, setInactive, setTempActive } = activeSegmentContext

    watch(
      () => props.value,
      () => {
        nextTick(initSearchStates)
      },
      { immediate: true, deep: true },
    )

    const placeholder = computed(() => props.placeholder ?? locale.search.placeholder)
    const clearable = computed(() => props.clearable ?? config.clearable)
    const clearIcon = computed(() => props.clearIcon ?? config.clearIcon)
    const searchIcon = computed(() => props.searchIcon ?? config.searchIcon)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-focused`]: !!activeSegment.value,
        [`${prefixCls}-disabled`]: !!props.disabled,
      })
    })

    let previousActiveSegmentName: string | undefined
    const setTempSegmentActive = () => {
      let name = previousActiveSegmentName

      if (!name) {
        name = tempSearchState.segmentValues[0]?.name ?? 'name'
        for (let idx = tempSearchState.segmentValues.length - 1; idx > -1; idx--) {
          if (tempSearchState.segmentValues[idx].value) {
            name = tempSearchState.segmentValues[idx].name
            break
          }
        }
      }

      setTempActive(name)
    }

    const handleProSearchClick = (evt: Event) => {
      evt.preventDefault()
      setTempSegmentActive()
    }

    const getContainerEl = () => {
      const containerProp = commonOverlayProps.value.container
      const container = isFunction(containerProp) ? containerProp() : containerProp

      return isString(container) ? document.querySelector(container) : container
    }
    const handleClickOutside = (evt: MouseEvent) => {
      if (!activeSegment.value) {
        previousActiveSegmentName = undefined
        return
      }

      const paths = evt.composedPath()
      const container = getContainerEl()

      if (container && paths.includes(container)) {
        return
      }

      const { itemKey, name } = activeSegment.value

      if (itemKey === tempSearchStateKey) {
        previousActiveSegmentName = name
      } else {
        previousActiveSegmentName = undefined
        updateSearchState(itemKey)
      }

      setInactive()
    }
    const handleSearchBtnClick = () => {
      callEmit(props.onSearch, searchValues.value)
    }

    provide(proSearchContext, {
      props,
      slots,
      locale: locale.search,
      mergedPrefixCls,
      commonOverlayProps,

      ...searchStateContext,
      ...activeSegmentContext,
    })

    return () => {
      const prefixCls = mergedPrefixCls.value

      const overfloweSlots = {
        item: (item: SearchItem) => <SearchItemComp key={item.key} tagOnly={true} searchItem={item} />,
        rest: (rest: SearchItem[]) => (
          <span class={`${prefixCls}-search-item ${prefixCls}-search-item-tag`}>
            {slots.overflowedLabel?.(rest) ?? `+ ${rest.length}`}
          </span>
        ),
      }

      return (
        <div class={classes.value}>
          <div class={`${prefixCls}-input-container`}>
            {withDirectives(
              <div class={`${prefixCls}-input-content`} onClick={handleProSearchClick}>
                <ɵOverflow
                  v-show={!activeSegment.value}
                  v-slots={overfloweSlots}
                  prefixCls={prefixCls}
                  dataSource={searchItems.value}
                  getKey={item => item.key}
                  maxLabel={props.maxLabel}
                />
                <div class={`${prefixCls}-search-item-container`} v-show={activeSegment.value}>
                  {searchItems.value?.map(item => (
                    <SearchItemComp key={item.key} searchItem={item} />
                  ))}
                </div>
                {searchValueEmpty.value && !activeSegment.value && (
                  <span class={`${prefixCls}-placeholder`}>{placeholder.value}</span>
                )}
              </div>,
              [[vClickOutside, handleClickOutside]],
            )}
            {!searchValueEmpty.value && clearable.value && !props.disabled && (
              <div class={`${prefixCls}-clear-icon`} onClick={clearSearchState}>
                {renderIcon(clearIcon.value, slots.clearIcon)}
              </div>
            )}
          </div>
          <div class={`${prefixCls}-search-button`} onClick={handleSearchBtnClick}>
            {renderIcon(searchIcon.value, slots.searchIcon)}
          </div>
        </div>
      )
    }
  },
})
