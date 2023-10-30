/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, provide, ref, watch } from 'vue'

import { IxTooltip } from '@idux/components/tooltip'

import Segment from './segment/Segment'
import { useSegmentOverlayUpdate } from '../composables/useSegmentOverlayUpdate'
import { useSegmentStates } from '../composables/useSegmentStates'
import { proSearchContext, searchItemContext } from '../token'
import { searchItemProps } from '../types'
import { renderIcon } from '../utils/RenderIcon'

export default defineComponent({
  props: searchItemProps,
  setup(props, { slots }) {
    const context = inject(proSearchContext)!
    const { props: proSearchProps, mergedPrefixCls, activeSegment, setActiveSegment, removeSearchState } = context

    const itemPrefixCls = computed(() => `${mergedPrefixCls.value}-search-item`)
    const isActive = computed(() => activeSegment.value?.itemKey === props.searchItem!.key)

    const wrapperRef = ref<HTMLElement>()
    const segmentsRef = ref<HTMLElement>()

    watch(isActive, () => {
      segmentsRef.value?.scrollTo(0, 0)
    })

    const segmentStateContext = useSegmentStates(props, proSearchProps, context)
    const segmentOverlayUpdateContext = useSegmentOverlayUpdate()
    const { searchState, segmentStates } = segmentStateContext

    const classes = computed(() => {
      const prefixCls = itemPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-invalid`]: !!props?.searchItem?.error,
      })
    })

    provide(searchItemContext, {
      ...segmentStateContext,
      ...segmentOverlayUpdateContext,
    })

    const segmentRenderDatas = computed(() => {
      const searchItem = props.searchItem!

      return searchItem.resolvedSearchField.segments.map(segment => {
        const segmentState = segmentStates.value[segment.name]
        return {
          ...segment,
          input: segmentState?.input,
          value: segmentState?.value,
          selectionStart: segmentState?.selectionStart,
          segmentVisible: segment.visible ? segment.visible(searchState.value?.segmentStates ?? []) : true,
        }
      })
    })
    const searchItemName = computed(
      () => `${props.searchItem!.name}${props.searchItem!.resolvedSearchField.segments.length > 1 ? '' : ':'}`,
    )
    const searchItemTitle = computed(
      () => searchItemName.value + ' ' + segmentRenderDatas.value.map(data => data.input || data.placeholder).join(' '),
    )

    const handleNameMouseDown = (evt: MouseEvent) => {
      evt.stopPropagation()
      evt.preventDefault()

      setActiveSegment({
        itemKey: props.searchItem!.key,
        name: segmentRenderDatas.value[0].name,
      })
    }
    const handleCloseIconMouseDown = (evt: MouseEvent) => {
      evt.stopPropagation()
      evt.preventDefault()
    }
    const handleCloseIconClick = (evt: Event) => {
      evt.stopPropagation()
      removeSearchState(props.searchItem!.key)
    }

    return () => {
      const prefixCls = itemPrefixCls.value

      return (
        <IxTooltip
          class={`${prefixCls}-invalid-tooltip`}
          title={props.searchItem?.error?.message}
          placement="topStart"
          offset={[0, 15]}
        >
          <span ref={wrapperRef} class={classes.value} title={searchItemTitle.value}>
            <span class={`${prefixCls}-name`} onMousedown={handleNameMouseDown}>
              {searchItemName.value}
            </span>
            {segmentRenderDatas.value.map(segment => (
              <Segment
                key={segment.name}
                v-slots={slots}
                v-show={segment.segmentVisible}
                itemKey={props.searchItem!.key}
                input={segment.input}
                value={segment.value}
                selectionStart={segment.selectionStart}
                disabled={proSearchProps.disabled}
                segment={segment}
              />
            ))}
            {!proSearchProps.disabled && (
              <span
                class={`${prefixCls}-close-icon`}
                onMousedown={handleCloseIconMouseDown}
                onClick={handleCloseIconClick}
              >
                {renderIcon('close')}
              </span>
            )}
          </span>
        </IxTooltip>
      )
    }
  },
})
