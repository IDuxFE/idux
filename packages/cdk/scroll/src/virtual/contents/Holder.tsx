/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, computed, defineComponent, inject, onBeforeUnmount, onMounted, ref } from 'vue'

import { isString, throttle } from 'lodash-es'

import { offResize, onResize } from '@idux/cdk/resize'
import { convertCssPixel } from '@idux/cdk/utils'

import { virtualScrollToken } from '../token'

export default defineComponent({
  setup(_, { slots }) {
    const {
      props,
      slots: virtualScrollSlots,
      holderRef,
      fillerRef,
      collectHeights,
      scrollHeight,
      scrollOffset,
      handleScroll,
    } = inject(virtualScrollToken)!

    const style = computed<CSSProperties | undefined>(() => {
      const { height, fullHeight } = props
      if (!height || height <= 0) {
        return undefined
      }

      if (isString(height)) {
        return { height }
      }

      return { [fullHeight ? 'height' : 'maxHeight']: convertCssPixel(height) }
    })

    const fillerStyle = computed<CSSProperties | undefined>(() => {
      if (scrollOffset.value === undefined) {
        return undefined
      }
      return { height: `${scrollHeight.value}px` }
    })

    const contentStyle = computed<CSSProperties | undefined>(() => {
      const offset = scrollOffset.value
      if (offset === undefined) {
        return undefined
      }
      return {
        transform: `translateY(${offset}px)`,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
      }
    })

    const contentRef = ref<HTMLDivElement>()
    const onContentResize = throttle(collectHeights, 16)
    // 这里不能用 useResizeObserver, 会有 test 爆栈警告, 具体原因后面再排查。
    onMounted(() => onResize(contentRef.value, onContentResize))
    onBeforeUnmount(() => offResize(contentRef.value, onContentResize))

    return () => {
      const children = slots.default!()
      const contentRender = virtualScrollSlots.content ?? props.contentRender
      return (
        <div ref={holderRef} class="cdk-virtual-scroll-holder" style={style.value} onScroll={handleScroll}>
          <div ref={fillerRef} class="cdk-virtual-scroll-filler" style={fillerStyle.value}>
            <div ref={contentRef} class="cdk-virtual-scroll-content" style={contentStyle.value}>
              {contentRender ? contentRender(children) : children}
            </div>
          </div>
        </div>
      )
    }
  },
})
