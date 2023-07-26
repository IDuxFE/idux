/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  computed,
  defineComponent,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onMounted,
  provide,
  ref,
  toRef,
  watch,
} from 'vue'

import { callEmit, convertCssPixel } from '@idux/cdk/utils'
import { ɵOverflow } from '@idux/components/_private/overflow'
import { ɵOverlay, type ɵOverlayInstance } from '@idux/components/_private/overlay'
import { useGlobalConfig as useComponentGlobalConfig, useDateConfig } from '@idux/components/config'
import { useZIndex } from '@idux/components/utils'
import { useGlobalConfig } from '@idux/pro/config'

import SearchItemComp from './components/SearchItem'
import QuickSelectPanel from './components/quickSelect/QuickSelectPanel'
import NameSelectSegment from './components/segment/TempSegment'
import { useActiveSegment } from './composables/useActiveSegment'
import { useCommonOverlayProps } from './composables/useCommonOverlayProps'
import { useControl } from './composables/useControl'
import { useElementWidthMeasure } from './composables/useElementWidthMeasure'
import { useFocusedState } from './composables/useFocusedState'
import { useResolvedSearchFields } from './composables/useResolvedSearchFields'
import { useSearchItems } from './composables/useSearchItem'
import { useSearchItemErrors } from './composables/useSearchItemErrors'
import { useSearchStates } from './composables/useSearchStates'
import { useSearchValues } from './composables/useSearchValues'
import { proSearchContext } from './token'
import { type SearchItem, proSearchProps } from './types'
import { renderIcon } from './utils/RenderIcon'

export default defineComponent({
  name: 'IxProSearch',
  inheritAttrs: false,
  props: proSearchProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const componentCommon = useComponentGlobalConfig('common')
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('search')
    const dateConfig = useDateConfig()
    const mergedPrefixCls = computed(() => `${common.prefixCls}-search`)
    const enableQuickSelect = computed(
      () => !!props.searchFields?.some(field => !!field.quickSelect && !field.multiple),
    )

    const quickSelectOverlayOpened = computed(() => quickSelectActive.value && overlayOpened.value)

    const elementRef = ref<HTMLElement | undefined>()
    const quickSelectOverlayRef = ref<ɵOverlayInstance>()
    const tempSegmentInputRef = ref<HTMLInputElement>()

    const searchValueContext = useSearchValues(props)
    const { searchValues } = searchValueContext
    const resolvedSearchFieldsContext = useResolvedSearchFields(props, mergedPrefixCls, dateConfig)
    const { fieldKeyMap } = resolvedSearchFieldsContext
    const searchStateContext = useSearchStates(props, fieldKeyMap, searchValueContext)
    const { searchStates, initSearchStates, clearSearchState, updateSearchValues, isSegmentVisible } =
      searchStateContext

    const searchStateEmpty = computed(() => !searchStates.value || searchStates.value.length <= 0)

    const errors = useSearchItemErrors(props, searchValues)
    const searchItems = useSearchItems(fieldKeyMap, searchStateContext.searchStates, errors)
    const elementWidth = useElementWidthMeasure(elementRef)

    const activeSegmentContext = useActiveSegment(
      props,
      tempSegmentInputRef,
      searchItems,
      enableQuickSelect,
      isSegmentVisible,
    )
    const commonOverlayProps = useCommonOverlayProps(props, config, componentCommon, mergedPrefixCls)
    const focusStateContext = useFocusedState(props)
    const { focused, bindMonitor, bindOverlayMonitor, focusVia, blurVia } = focusStateContext
    const focus = () => {
      focusVia(elementRef, 'program')
    }
    const blur = () => {
      blurVia(elementRef)
    }

    onMounted(() => {
      bindMonitor(elementRef)
      bindOverlayMonitor(quickSelectOverlayRef, quickSelectOverlayOpened)
    })

    useControl(elementRef, activeSegmentContext, searchStateContext, focusStateContext)

    const currentZIndex = useZIndex(toRef(props, 'zIndex'), toRef(componentCommon, 'overlayZIndex'), focused)
    const { isActive, overlayOpened, quickSelectActive, setTempActive, setOverlayOpened } = activeSegmentContext

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

    const allItems = computed(() => [...searchItems.value, 'name-select' as const])

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

    expose({ focus, blur })

    const handleSearchBtnClick = () => {
      updateSearchValues()
      callEmit(props.onSearch, searchValues.value)

      setTempActive()
      setOverlayOpened(false)
    }
    const handleClearBtnClick = () => {
      clearSearchState()
    }
    const handleSearchBtnMouseDown = (evt: MouseEvent) => {
      evt.preventDefault()
      evt.stopImmediatePropagation()
    }
    const handleClearBtnMouseDown = (evt: MouseEvent) => {
      evt.preventDefault()
      evt.stopImmediatePropagation()
    }

    provide(proSearchContext, {
      props,
      locale: locale.search,
      elementRef,
      tempSegmentInputRef,
      mergedPrefixCls,
      enableQuickSelect,
      commonOverlayProps,

      ...focusStateContext,
      ...searchStateContext,
      ...resolvedSearchFieldsContext,
      ...activeSegmentContext,
    })

    return () => {
      const prefixCls = mergedPrefixCls.value

      const overflowSlots = {
        item: (item: SearchItem | 'name-select') => {
          if (item === 'name-select') {
            return <NameSelectSegment key="__NAME_SELECT__" v-slots={slots} />
          }

          return <SearchItemComp key={item.key} searchItem={item} v-slots={slots} />
        },
        rest: (rest: SearchItem[]) => (
          <span class={`${prefixCls}-search-item ${prefixCls}-search-item-tag`}>
            {slots.overflowedLabel?.(rest) ?? `+ ${rest.length}`}
          </span>
        ),
      }

      const quickSelectOverlaySlots = {
        default: () => (
          <div class={`${prefixCls}-input-container`} style={containerStyle.value}>
            <div class={`${prefixCls}-input-content`}>
              <ɵOverflow
                v-show={isActive.value || searchItems.value.length}
                v-slots={overflowSlots}
                prefixCls={prefixCls}
                dataSource={allItems.value}
                getKey={item => item.key ?? 'name-select'}
                maxLabel={focused.value ? Number.MAX_SAFE_INTEGER : props.maxLabel}
              />
              {searchStateEmpty.value && !isActive.value && (
                <span class={`${prefixCls}-placeholder`}>{placeholder.value}</span>
              )}
            </div>
            {!searchStateEmpty.value && clearable.value && !props.disabled && (
              <div
                class={`${prefixCls}-clear-icon`}
                onMousedown={handleClearBtnMouseDown}
                onClick={handleClearBtnClick}
              >
                {renderIcon(clearIcon.value, slots.clearIcon)}
              </div>
            )}
          </div>
        ),
        content: () => <QuickSelectPanel v-slots={slots} />,
      }

      const quickSelectOverlayProps = {
        ...commonOverlayProps.value,
        class: `${mergedPrefixCls.value}-quick-select-overlay ${componentCommon.prefixCls}-scroll-min`,
        style: {
          width: convertCssPixel(elementWidth.value),
        },
        offset: [0, 4] as [number, number],
        trigger: 'manual' as const,
        visible: quickSelectOverlayOpened.value,
      }

      return (
        <div ref={elementRef} class={classes.value} {...attrs} tabindex={(attrs.tabIndex as number) ?? 0}>
          <ɵOverlay
            ref={quickSelectOverlayRef}
            v-slots={quickSelectOverlaySlots}
            {...quickSelectOverlayProps}
            tabindex={-1}
          ></ɵOverlay>
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
