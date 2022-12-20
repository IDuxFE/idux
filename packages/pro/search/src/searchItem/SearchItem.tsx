/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, provide, watch } from 'vue'

import { tempSearchStateKey } from '../composables/useSearchStates'
import { useSegmentOverlayUpdate } from '../composables/useSegmentOverlayUpdate'
import { useSegmentStates } from '../composables/useSegmentStates'
import { proSearchContext, searchItemContext } from '../token'
import { searchItemProps } from '../types'
import SearchItemTag from './SearchItemTag'
import Segment from './Segment'

export default defineComponent({
  props: searchItemProps,
  setup(props) {
    const context = inject(proSearchContext)!
    const { props: proSearchProps, mergedPrefixCls, activeSegment } = context

    const prefixCls = computed(() => `${mergedPrefixCls.value}-search-item`)
    const segmentStateContext = useSegmentStates(props, proSearchProps, context)
    const segmentOverlayUpdateContext = useSegmentOverlayUpdate()
    const { segmentStates, initSegmentStates } = segmentStateContext

    provide(searchItemContext, {
      ...segmentStateContext,
      ...segmentOverlayUpdateContext,
    })

    const segmentRenderDatas = computed(() => {
      const searchItem = props.searchItem!

      return searchItem.segments.map(segment => {
        const segmentState = segmentStates.value[segment.name]
        return {
          ...segment,
          input: segmentState.input,
          value: segmentState.value,
        }
      })
    })

    const isActive = computed(() => activeSegment.value?.itemKey === props.searchItem!.key)
    watch(isActive, active => {
      if (!active) {
        initSegmentStates()
      }
    })

    const classes = computed(() => {
      return normalizeClass({
        [prefixCls.value]: true,
        [`${prefixCls.value}-invalid`]: !!props.searchItem?.error,
      })
    })

    return () => {
      if (!isActive.value || proSearchProps.disabled) {
        return props.searchItem?.key !== tempSearchStateKey ? (
          <SearchItemTag
            itemKey={props.searchItem!.key}
            segments={segmentRenderDatas.value}
            error={props.searchItem!.error}
          />
        ) : undefined
      }

      return (
        <span class={classes.value} onMousedown={evt => evt.preventDefault()}>
          {segmentRenderDatas.value.map(segment => (
            <Segment
              key={segment.name}
              itemKey={props.searchItem!.key}
              input={segment.input}
              value={segment.value}
              disabled={segment.name === 'name' && props.searchItem!.key !== tempSearchStateKey}
              segment={segment}
            />
          ))}
        </span>
      )
    }
  },
})
