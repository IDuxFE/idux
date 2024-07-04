/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, computed, defineComponent, inject, onBeforeUnmount, onMounted, ref } from 'vue'

import { isNumber, isString, throttle } from 'lodash-es'

import { offResize, onResize } from '@idux/cdk/resize'
import { convertCssPixel } from '@idux/cdk/utils'

import { virtualScrollToken } from '../token'

export default defineComponent({
  setup(_, { slots }) {
    const {
      props,
      slots: virtualScrollSlots,
      enabled,
      holderRef,
      fillerHorizontalRef,
      fillerVerticalRef,
      collectSize,
      scrollHeight,
      scrollWidth,
      scrollOffsetLeft,
      scrollOffsetTop,
      handleScroll,
      topIndex,
      bottomIndex,
      leftIndex,
      rightIndex,
      renderedData,
    } = inject(virtualScrollToken)!

    const style = computed<CSSProperties | undefined>(() => {
      const { height, fullHeight, width, fullWidth } = props

      const resolvedHeight = convertSize(height)
      const resolvedWidth = convertSize(width)

      if (!resolvedHeight && !resolvedWidth) {
        return
      }

      return {
        [fullHeight || isString(height) ? 'height' : 'maxHeight']: resolvedHeight,
        [fullWidth || isString(width) ? 'width' : 'maxWidth']: resolvedWidth,
        overflowX: props.scrollMode !== 'native' || !resolvedWidth || resolvedWidth === 'auto' ? 'hidden' : 'auto',
        overflowY: props.scrollMode !== 'native' || !resolvedHeight || resolvedHeight === 'auto' ? 'hidden' : 'auto',
      }
    })

    const fillerVerticalStyle = computed<CSSProperties | undefined>(() => {
      if (scrollOffsetTop.value === undefined) {
        return undefined
      }
      return { height: `${scrollHeight.value}px`, width: '1px', marginLeft: '-1px' }
    })
    const fillerHorizontalStyle = computed<CSSProperties | undefined>(() => {
      if (scrollOffsetLeft.value === undefined) {
        return undefined
      }

      return { width: `${scrollWidth.value}px`, height: '1px', marginTop: '-1px' }
    })

    const contentStyle = computed<CSSProperties | undefined>(() => {
      const offsetTop = scrollOffsetTop.value
      const offsetLeft = scrollOffsetLeft.value

      if (offsetTop === undefined && offsetLeft == undefined) {
        return undefined
      }
      return {
        marginTop: convertCssPixel(offsetTop),
        marginLeft: convertCssPixel(offsetLeft),
      }
    })

    const contentRef = ref<HTMLDivElement>()
    const onContentResize = throttle(collectSize, 16)
    // 这里不能用 useResizeObserver, 会有 test 爆栈警告, 具体原因后面再排查。
    onMounted(() => {
      onResize(contentRef.value, onContentResize)
    })
    onBeforeUnmount(() => {
      offResize(contentRef.value, onContentResize)
    })

    return () => {
      const children = slots.default!()
      const contentRender = virtualScrollSlots.content ?? props.contentRender
      return (
        <div ref={holderRef} class="cdk-virtual-scroll-holder" style={style.value} onScroll={handleScroll}>
          {enabled.value.horizontal && (
            <div
              ref={fillerHorizontalRef}
              class="cdk-virtual-scroll-filler-horizontal"
              style={fillerHorizontalStyle.value}
            ></div>
          )}
          {enabled.value.vertical && (
            <div
              ref={fillerVerticalRef}
              class="cdk-virtual-scroll-filler-vertical"
              style={fillerVerticalStyle.value}
            ></div>
          )}
          <div ref={contentRef} class="cdk-virtual-scroll-content" style={contentStyle.value}>
            {contentRender
              ? contentRender(children, {
                  topIndex: topIndex.value,
                  bottomIndex: bottomIndex.value,
                  leftIndex: leftIndex.value,
                  rightIndex: rightIndex.value,
                  renderedData: renderedData.value,
                })
              : children}
          </div>
        </div>
      )
    }
  },
})

function convertSize(size: number | string | undefined) {
  return !size || (isNumber(size) && size <= 0) ? undefined : isString(size) ? size : convertCssPixel(size)
}
