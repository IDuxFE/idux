/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type Ref,
  computed,
  defineComponent,
  inject,
  normalizeClass,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
} from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { getScroll } from '@idux/cdk/scroll'
import { useEventListener } from '@idux/cdk/utils'
import { IxTooltip } from '@idux/components/tooltip'

import Segment from './segment/Segment'
import { useSegmentOverlayUpdate } from '../composables/useSegmentOverlayUpdate'
import { useSegmentStates } from '../composables/useSegmentStates'
import { proSearchContext, searchItemContext } from '../token'
import { searchItemProps } from '../types'
import { renderIcon } from '../utils/RenderIcon'
import { getBoxSizingData } from '../utils/getBoxsizingData'

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

    const segmentStateContext = useSegmentStates(props, proSearchProps, context, isActive)
    const segmentOverlayUpdateContext = useSegmentOverlayUpdate()
    const { segmentStates } = segmentStateContext

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
        }
      })
    })
    const searchItemName = computed(
      () => `${props.searchItem!.name}${props.searchItem!.resolvedSearchField.segments.length > 1 ? '' : ':'}`,
    )
    const searchItemTitle = computed(
      () => searchItemName.value + ' ' + segmentRenderDatas.value.map(data => data.input).join(' '),
    )

    const { wrapperScroll, segmentScrolls } = useSegmentsScroll(segmentsRef, segmentRenderDatas)

    // when we move cursor within input elements,
    // current cursor position will be scrolled into view,
    // so if ther start segment input and the segments wrapper is scrolled to start,
    // there is no ellipsis
    //
    // however the wrapper may not be scrolled to start because inputs may have padding and border,
    // and cursor wont be moved outside content
    // so padding and border may always be ouside the wrapper view area
    const leftSideEllipsis = computed(() => {
      const startEl = segmentScrolls.value[0]?.el
      const startElBoxSizingData = startEl && getBoxSizingData(startEl)
      const offset = startElBoxSizingData ? startElBoxSizingData.paddingLeft + startElBoxSizingData.borderLeft : 0

      return wrapperScroll.value.left > offset + 1 || (segmentScrolls.value[0]?.left ?? 0) > 1
    })
    const rightSideEllipsis = computed(() => {
      const endEl = segmentScrolls.value[1]?.el
      const endElBoxSizingData = endEl && getBoxSizingData(endEl)
      const offset = endElBoxSizingData ? endElBoxSizingData.paddingRight + endElBoxSizingData.borderRight : 0

      return wrapperScroll.value.right > offset + 1 || (segmentScrolls.value[1]?.right ?? 0) > 1
    })

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
            <span v-show={leftSideEllipsis.value} class={`${prefixCls}-ellipsis-left`} key="__ellisps_left__">
              ...
            </span>
            <span ref={segmentsRef} class={`${prefixCls}-segments`} key="__segments__">
              {segmentRenderDatas.value.map(segment => (
                <Segment
                  key={segment.name}
                  v-slots={slots}
                  itemKey={props.searchItem!.key}
                  input={segment.input}
                  value={segment.value}
                  selectionStart={segment.selectionStart}
                  disabled={proSearchProps.disabled}
                  segment={segment}
                />
              ))}
            </span>
            <span v-show={rightSideEllipsis.value} class={`${prefixCls}-ellipsis-right`} key="__ellisps_right__">
              ...
            </span>
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

interface SegmentScroll {
  el: HTMLElement | undefined
  left: number
  right: number
}
function useSegmentsScroll(
  wrapperRef: Ref<HTMLElement | undefined>,
  resetTrigger: Ref<unknown>,
): {
  wrapperScroll: Ref<SegmentScroll>
  segmentScrolls: Ref<SegmentScroll[]>
} {
  const wrapperScroll = ref<SegmentScroll>({ left: 0, right: 0, el: wrapperRef.value })
  const segmentScrolls = ref<SegmentScroll[]>([])

  const getScrolls = (el: HTMLElement) => {
    const { scrollLeft } = getScroll(el)
    return {
      el,
      left: scrollLeft,
      right: Math.max(el.scrollWidth - scrollLeft - el.offsetWidth, 0),
    }
  }

  let clearListeners: (() => void) | null = null
  let calcSize: (() => void) | null = null
  const initScrollListeners = () => {
    if (!wrapperRef.value) {
      return
    }

    clearListeners?.()
    segmentScrolls.value = []

    const calcWrapperScroll = () => {
      wrapperScroll.value = getScrolls(wrapperRef.value!)
    }
    const sizeCalculations = [calcWrapperScroll]

    const listenerStopHandlers = [useEventListener(wrapperRef.value, 'scroll', calcWrapperScroll)]

    const inputs = wrapperRef.value.querySelectorAll('input')
    if (!inputs.length) {
      return
    }

    // listen to the start and end input elements' scroll event
    // and add its scroll calculation to the overall scroll calculation
    ;[inputs.item(0), inputs.item(inputs.length - 1)].forEach((inputEl, index) => {
      const scrollCalculation = () => {
        segmentScrolls.value[index] = getScrolls(inputEl)
      }
      sizeCalculations.push(scrollCalculation)
      listenerStopHandlers.push(useEventListener(inputEl, 'scroll', scrollCalculation))
    })

    clearListeners = () => listenerStopHandlers.forEach(stop => stop())
    calcSize = () => sizeCalculations.forEach(calc => calc())

    calcSize()
  }

  let resizeStop: (() => void) | null = null
  onMounted(() => {
    // when reset is triggered by comsumer, we re-init the scroll calculations
    watch(resetTrigger, initScrollListeners, { immediate: true })

    // when wrapper is resized, calculate scrolls
    resizeStop = useResizeObserver(wrapperRef, () => {
      calcSize?.()
    })
  })
  onUnmounted(() => {
    clearListeners?.()
    resizeStop?.()
    clearListeners = null
    calcSize = null
  })

  return {
    wrapperScroll,
    segmentScrolls,
  }
}
