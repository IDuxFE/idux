/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, provide } from 'vue'

import SearchItemTag from './SearchItemTag'
import Segment from './Segment'
import { tempSearchStateKey } from '../composables/useSearchStates'
import { useSegmentOverlayUpdate } from '../composables/useSegmentOverlayUpdate'
import { useSegmentStates } from '../composables/useSegmentStates'
import { proSearchContext, searchItemContext } from '../token'
import { searchItemProps } from '../types'

export default defineComponent({
  props: searchItemProps,
  setup(props) {
    const context = inject(proSearchContext)!
    const { props: proSearchProps, mergedPrefixCls, activeSegment } = context

    const isActive = computed(() => activeSegment.value?.itemKey === props.searchItem!.key)
    const itemVisible = computed(() => isActive.value && !proSearchProps.disabled)

    const segmentStateContext = useSegmentStates(props, proSearchProps, context, isActive)
    const segmentOverlayUpdateContext = useSegmentOverlayUpdate()
    const { segmentStates } = segmentStateContext

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
          input: segmentState?.input,
          value: segmentState?.value,
        }
      })
    })

    return () => (
      <>
        {!itemVisible.value && props.searchItem?.key !== tempSearchStateKey && (
          <SearchItemTag
            itemKey={props.searchItem!.key}
            segments={segmentRenderDatas.value}
            error={props.searchItem!.error}
          />
        )}
        <span
          v-show={itemVisible.value}
          class={`${mergedPrefixCls.value}-search-item`}
          onMousedown={evt => evt.preventDefault()}
        >
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
      </>
    )
  },
})
