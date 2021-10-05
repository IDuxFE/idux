import type { Ref, StyleValue } from 'vue'

import { computed, defineComponent, inject, onBeforeUnmount, onMounted } from 'vue'
import { off, on } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { TABLE_TOKEN } from '../token'
import ColGroup from './ColGroup'

export default defineComponent({
  setup(_, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const { scrollHeadRef, handleScroll, scrollX, flattedData, isSticky, mergedSticky, columnWidths } =
      inject(TABLE_TOKEN)!

    useScrollEvents(scrollHeadRef, handleScroll)

    const isMaxContent = computed(() => scrollX.value === 'max-content')
    const hasData = computed(() => flattedData.value.length > 0)
    const classes = computed(() => {
      return {
        [`${prefixCls}-table-fixed-holder`]: true,
        [`${prefixCls}-table-sticky-holder`]: isSticky.value,
      }
    })
    const style = computed<StyleValue>(() => {
      const sticky = isSticky.value
      const { offsetHead, offsetFoot } = mergedSticky.value
      return {
        overflow: 'hidden',
        top: sticky ? offsetHead : undefined,
        bottom: sticky ? offsetFoot : undefined,
      }
    })

    const tableStyle = computed<StyleValue>(() => {
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
