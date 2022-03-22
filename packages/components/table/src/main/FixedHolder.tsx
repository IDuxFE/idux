/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, type Ref, computed, defineComponent, inject, onBeforeUnmount, onMounted } from 'vue'

import { off, on } from '@idux/cdk/utils'

import { TABLE_TOKEN } from '../token'
import ColGroup from './ColGroup'

export default defineComponent({
  setup(_, { slots }) {
    const {
      mergedPrefixCls,
      scrollHeadRef,
      handleScroll,
      scrollWidth,
      flattedData,
      isSticky,
      mergedSticky,
      columnWidths,
    } = inject(TABLE_TOKEN)!

    useScrollEvents(scrollHeadRef, handleScroll)

    const isMaxContent = computed(() => scrollWidth.value === 'max-content')
    const hasData = computed(() => flattedData.value.length > 0)
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [`${prefixCls}-fixed-holder`]: true,
        [`${prefixCls}-sticky-holder`]: isSticky.value,
      }
    })
    const style = computed<CSSProperties>(() => {
      const sticky = isSticky.value
      const { offsetHead, offsetFoot } = mergedSticky.value
      return {
        overflow: 'hidden',
        top: sticky ? offsetHead : undefined,
        bottom: sticky ? offsetFoot : undefined,
      }
    })

    const tableStyle = computed<CSSProperties>(() => {
      const visibility = hasData.value && !columnWidths.value.length ? 'hidden' : undefined
      return {
        tableLayout: 'fixed',
        visibility,
      }
    })

    return () => {
      const children = hasData.value && !isMaxContent.value ? <ColGroup ixFixedHolder /> : null
      return (
        <div class={classes.value} style={style.value} ref={scrollHeadRef}>
          <table style={tableStyle.value}>
            {children}
            {slots.default?.()}
          </table>
        </div>
      )
    }
  },
})

function useScrollEvents(
  scrollHeadRef: Ref<HTMLDivElement | undefined>,
  handleScroll: (evt?: Event, scrollLeft?: number) => void,
) {
  const onWheel = (evt: WheelEvent) => {
    const deltaX = evt.deltaX
    const currentTarget = evt.currentTarget as HTMLDivElement
    if (deltaX) {
      const scrollLeft = currentTarget.scrollLeft + deltaX
      handleScroll(evt, scrollLeft)
      evt.preventDefault()
    }
  }

  onMounted(() => on(scrollHeadRef.value, 'wheel', onWheel, { passive: true }))
  onBeforeUnmount(() => off(scrollHeadRef.value, 'wheel', onWheel))
}
