/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, nextTick, normalizeClass, normalizeStyle, provide, ref, toRef, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵOverflow } from '@idux/components/_private/overflow'
import { useGlobalConfig as useComponentGlobalConfig, useDateConfig } from '@idux/components/config'
import { useZIndex } from '@idux/components/utils'
import { useGlobalConfig } from '@idux/pro/config'

import { useActiveSegment } from './composables/useActiveSegment'
import { useCommonOverlayProps } from './composables/useCommonOverlayProps'
import { useFocusedState } from './composables/useFocusedState'
import { useSearchItems } from './composables/useSearchItem'
import { useSearchItemErrors } from './composables/useSearchItemErrors'
import { tempSearchStateKey, useSearchStates } from './composables/useSearchStates'
import { useSearchTrigger } from './composables/useSearchTrigger'
import { useSearchValues } from './composables/useSearchValues'
import SearchItemComp from './searchItem/SearchItem'
import SearchItemTagComp from './searchItem/SearchItemTag'
import { proSearchContext } from './token'
import { type SearchItem, proSearchProps } from './types'
import { renderIcon } from './utils/RenderIcon'

export default defineComponent({
  name: 'IxProSearch',
  props: proSearchProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const componentCommon = useComponentGlobalConfig('common')
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
    const searchTriggerContext = useSearchTrigger()
    const elementRef = ref<HTMLElement | undefined>()

    const activeSegmentContext = useActiveSegment(
      props,
      elementRef,
      searchItems,
      searchStateContext.tempSearchStateAvailable,
    )
    const commonOverlayProps = useCommonOverlayProps(props, config, mergedPrefixCls)
    const { focused, focus, blur } = useFocusedState(
      props,
      elementRef,
      commonOverlayProps,
      searchStateContext,
      activeSegmentContext,
    )

    const currentZIndex = useZIndex(toRef(props, 'zIndex'), toRef(componentCommon, 'overlayZIndex'), focused)

    const { initSearchStates, clearSearchState, getSearchStateByKey } = searchStateContext
    const { activeSegment } = activeSegmentContext

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
        [`${prefixCls}-focused`]: focused.value,
        [`${prefixCls}-disabled`]: !!props.disabled,
      })
    })
    const containerStyle = computed(() =>
      normalizeStyle({
        zIndex: currentZIndex.value,
      }),
    )
    const searchItemContainerStyle = computed(() => {
      if (!focused.value) {
        return normalizeStyle({
          height: 0,
          width: 0,
          opacity: 0,
          overflow: 'hidden',
        })
      }

      return undefined
    })

    expose({ focus, blur })

    const { onSearchTrigger, triggerSearch } = searchTriggerContext
    onSearchTrigger(() => {
      callEmit(props.onSearch, searchValues.value)
    }, 'post')

    const handleSearchBtnClick = () => {
      triggerSearch()
    }
    const handleClearBtnClick = () => {
      clearSearchState()
    }
    const handleSearchBtnMouseDown = (evt: MouseEvent) => {
      evt.preventDefault()
    }
    const handleClearBtnMouseDown = (evt: MouseEvent) => {
      evt.preventDefault()
    }

    provide(proSearchContext, {
      props,
      slots,
      locale: locale.search,
      mergedPrefixCls,
      commonOverlayProps,
      focused,

      ...searchStateContext,
      ...activeSegmentContext,
      ...searchTriggerContext,
    })

    return () => {
      const prefixCls = mergedPrefixCls.value

      const overflowSlots = {
        item: (item: SearchItem) => {
          const searchState = getSearchStateByKey(item.key)!

          const tagSegments = item.segments.map(segment => {
            const segmentValue = searchState.segmentValues.find(sv => sv.name === segment.name)!
            return {
              name: segment.name,
              input: segment.format(segmentValue?.value),
            }
          })

          return <SearchItemTagComp key={item.key} itemKey={item.key} segments={tagSegments} error={item.error} />
        },
        rest: (rest: SearchItem[]) => (
          <span class={`${prefixCls}-search-item ${prefixCls}-search-item-tag`}>
            {slots.overflowedLabel?.(rest) ?? `+ ${rest.length}`}
          </span>
        ),
      }

      return (
        <div ref={elementRef} class={classes.value} tabindex={(attrs.tabIndex as number) ?? 0}>
          <div class={`${prefixCls}-input-container`} style={containerStyle.value}>
            <div class={`${prefixCls}-input-content`}>
              <ɵOverflow
                v-show={!focused.value}
                v-slots={overflowSlots}
                prefixCls={prefixCls}
                dataSource={searchItems.value.filter(item => item.key !== tempSearchStateKey)}
                getKey={item => item.key}
                maxLabel={props.maxLabel}
              />
              <div class={`${prefixCls}-search-item-container`} style={searchItemContainerStyle.value}>
                {searchItems.value?.map(item => (
                  <SearchItemComp key={item.key} searchItem={item} />
                ))}
              </div>
              {searchValueEmpty.value && !activeSegment.value && (
                <span class={`${prefixCls}-placeholder`}>{placeholder.value}</span>
              )}
            </div>
            {!searchValueEmpty.value && clearable.value && !props.disabled && (
              <div
                class={`${prefixCls}-clear-icon`}
                onMousedown={handleClearBtnMouseDown}
                onClick={handleClearBtnClick}
              >
                {renderIcon(clearIcon.value, slots.clearIcon)}
              </div>
            )}
          </div>
          <div
            class={`${prefixCls}-search-button`}
            onMousedown={handleSearchBtnMouseDown}
            onClick={handleSearchBtnClick}
          >
            {renderIcon(searchIcon.value, slots.searchIcon)}
          </div>
        </div>
      )
    }
  },
})
