/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, normalizeStyle, ref, watch } from 'vue'

import { throttle } from 'lodash-es'

import { callEmit, convertCssPixel } from '@idux/cdk/utils'

import { splitPanelToken } from './token'
import { splitterProps } from './types'

export default defineComponent({
  name: 'IxSplitter',
  props: splitterProps,
  setup(props) {
    const { areaSizeArray, areaMinSizeArray, prefixCls, props: splitPanelProps } = inject(splitPanelToken)!

    const mousedown = ref(false)
    const mouseover = ref(false)
    const preAreaTouchMinSizeRef = ref(false)
    const nextAreaTouchMinSizeRef = ref(false)
    let startOffset = 0
    let endOffset = 0
    let offset = 0

    const mergedPrefixCls = computed(() => `${prefixCls.value}-splitter`)

    const handleMousedown = (evt: MouseEvent) => {
      const { index } = props
      callEmit(splitPanelProps.onSplitterMousedown, evt, index)
      mousedown.value = true

      startOffset = splitPanelProps.vertical ? evt.clientY : evt.clientX
      const preAreaOldSize = areaSizeArray.value[index]!
      const nextAreaOldSize = areaSizeArray.value[index + 1]!
      const preAreaMinSize = areaMinSizeArray.value[index]
      const nextAreaMinSize = areaMinSizeArray.value[index + 1]

      document.body.onmousemove = throttle((evt: MouseEvent) => {
        callEmit(splitPanelProps.onSplitterMousemove, evt, index)
        endOffset = splitPanelProps.vertical ? evt.clientY : evt.clientX

        offset = endOffset - startOffset
        let preAreaNewSize = preAreaOldSize + offset
        let nextAreaNewSize = nextAreaOldSize - offset
        if (preAreaNewSize < preAreaMinSize) {
          preAreaTouchMinSizeRef.value = true
          preAreaNewSize = preAreaMinSize
          nextAreaNewSize = preAreaOldSize + nextAreaOldSize - preAreaMinSize
        } else if (nextAreaNewSize < nextAreaMinSize) {
          nextAreaTouchMinSizeRef.value = true
          preAreaNewSize = preAreaOldSize + nextAreaOldSize - nextAreaMinSize
          nextAreaNewSize = nextAreaMinSize
        } else {
          preAreaTouchMinSizeRef.value = false
          nextAreaTouchMinSizeRef.value = false
        }

        areaSizeArray.value[index] = preAreaNewSize
        areaSizeArray.value[index + 1] = nextAreaNewSize
        return false
      }, 30)

      document.body.onmouseup = (evt: MouseEvent) => {
        callEmit(splitPanelProps.onSplitterMouseup, evt, index)
        mousedown.value = false
        document.body.onmousemove = null
        document.body.onmouseup = null
      }
    }

    watch([preAreaTouchMinSizeRef, nextAreaTouchMinSizeRef], ([preVal, nextVal], [oldPreVal, oldNextVal]) => {
      if (preVal !== oldPreVal) {
        callEmit(props.onPreAreaTouchedMinSizeChange, preVal)
      } else if (nextVal !== oldNextVal) {
        callEmit(props.onNextAreaTouchedMinSizeChange, nextVal)
      }
    })

    const classes = computed(() => {
      return normalizeClass({
        [mergedPrefixCls.value]: true,
      })
    })

    const style = computed(() => {
      return normalizeStyle({
        [splitPanelProps.vertical ? 'height' : 'width']: convertCssPixel(splitPanelProps.splitterSize),
        backgroundColor:
          mousedown.value || mouseover.value ? splitPanelProps.splitterActiveColor : splitPanelProps.splitterColor,
      })
    })

    return () => {
      return (
        <div
          class={classes.value}
          style={style.value}
          onMousedown={handleMousedown}
          onMouseenter={() => (mouseover.value = true)}
          onMouseleave={() => (mouseover.value = false)}
        />
      )
    }
  },
})
