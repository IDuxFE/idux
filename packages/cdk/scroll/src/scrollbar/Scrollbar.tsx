/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeStyle, ref } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'

import { useScrollbarState } from './composables/useScrollbarState'
import { scrollbarProps } from './types'

export default defineComponent({
  props: scrollbarProps,
  setup(props) {
    const scrollbarRef = ref<HTMLElement>()
    const thumbRef = ref<HTMLElement>()

    const { canScroll, offset, isDragging, thumbSize } = useScrollbarState(props, scrollbarRef, thumbRef)

    const classes = computed(() => ({
      'cdk-scrollbar': true,
      'cdk-scrollbar-vertical': !props.horizontal,
      'cdk-scrollbar-horizontal': !!props.horizontal,
    }))
    const style = computed(() => normalizeStyle(props.containerStyle))
    const thumbClass = computed(() => ({
      'cdk-scrollbar-thumb': true,
      'cdk-scrollbar-thumb-moving': isDragging.value,
    }))
    const thumbStyle = computed(() => {
      const thumbSizeStyle = convertCssPixel(thumbSize.value)
      const offsetSizeStyle = convertCssPixel(offset.value)
      const _style = props.horizontal
        ? {
            marginLeft: offsetSizeStyle,
            width: thumbSizeStyle,
          }
        : {
            marginTop: offsetSizeStyle,
            height: thumbSizeStyle,
          }

      return normalizeStyle([_style, props.thumbStyle])
    })

    return () => (
      <div ref={scrollbarRef} class={classes.value} style={style.value}>
        <div v-show={canScroll.value} ref={thumbRef} class={thumbClass.value} style={thumbStyle.value} />
      </div>
    )
  },
})
