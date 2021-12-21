/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { cloneVNode, computed, defineComponent, normalizeClass, ref } from 'vue'

import { flattenNode } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { useAutoplay } from './composables/useAutoplay'
import { useWalk } from './composables/useWalk'
import { carouselProps } from './types'

export default defineComponent({
  name: 'IxCarousel',
  props: carouselProps,
  setup(props, { slots, expose }) {
    const carouselRef = ref<HTMLDivElement | null>(null)
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-carousel`)
    const config = useGlobalConfig('carousel')
    const autoplayTime = computed(() => props.autoplayTime ?? config.autoplayTime)
    const dotPlacement = computed(() => props.dotPlacement ?? config.dotPlacement)
    const showArrow = computed(() => props.showArrow ?? config.showArrow)
    const trigger = computed(() => props.trigger ?? config.trigger)
    const children = computed(() => flattenNode(slots.default?.()))
    const length = computed(() => children.value.length)
    const vertical = computed(() => dotPlacement.value === 'start' || dotPlacement.value === 'end')
    const itemClass = computed(() => `${mergedPrefixCls.value}-slide-item`)
    const size = computed(() => {
      const carousel = carouselRef.value
      return {
        width: carousel?.offsetWidth ?? 0,
        height: carousel?.querySelector<HTMLElement>(`.${itemClass.value}`)?.offsetHeight ?? 0,
      }
    })
    const total = computed(() => length.value + 2)

    const slidesStyle = computed(() => {
      const index = activeIndex.value % total.value
      const offset = vertical.value
        ? { top: `-${size.value.height * index}px` }
        : { left: `-${size.value.width * index}px` }

      return {
        width: `${total.value * size.value.width}px`,
        ...offset,
      }
    })
    const slideItemStyle = computed(() => {
      return {
        width: `${size.value.width}px`,
        height: '100%',
      }
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-vertical`]: vertical.value,
        [`${prefixCls}-horizontal`]: !vertical.value,
      })
    })
    const slidesClass = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-slides`]: true,
      })
    })
    const dotClass = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-dot`]: true,
        [`${prefixCls}-dot-${dotPlacement.value}`]: true,
      })
    })

    const { goTo, next, prev, onTransitionend, activeIndex } = useWalk(length, props)
    expose({ goTo, next, prev })

    useAutoplay(autoplayTime, next)

    const onClick = (slideIndex: number) => {
      if (trigger.value === 'click') {
        goTo(slideIndex)
      }
    }
    const onMouseenter = (slideIndex: number) => {
      if (trigger.value === 'hover') {
        goTo(slideIndex)
      }
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const startVNode = cloneVNode(children.value[length.value - 1])
      const endVNode = cloneVNode(children.value[0])
      const slides = [startVNode, ...children.value, endVNode].map(slideItem => (
        <div class={itemClass.value} style={slideItemStyle.value}>
          {slideItem}
        </div>
      ))
      const prevArrow = slots.arrow?.({ type: 'prev' }) ?? <IxIcon name="left-circle" />
      const nextArrow = slots.arrow?.({ type: 'next' }) ?? <IxIcon name="right-circle" />
      const dots = Array.from({ length: length.value }).map((_, index: number) => {
        const isActive = index + 1 === activeIndex.value
        const itemClass = {
          [`${prefixCls}-dot-item`]: true,
          [`${prefixCls}-dot-item-active`]: isActive,
        }
        const children = slots.dot ? (
          slots.dot({ index, isActive })
        ) : (
          <button class={`${prefixCls}-dot-item-default`}></button>
        )
        return (
          <li class={itemClass} onClick={() => onClick(index)} onMouseenter={() => onMouseenter(index)}>
            {children}
          </li>
        )
      })

      return (
        <div ref={carouselRef} class={classes.value} style={{ height: `${size.value.height}px` }}>
          <div class={slidesClass.value} style={slidesStyle.value} onTransitionend={onTransitionend}>
            {slides}
          </div>
          {showArrow.value && (
            <>
              <div class={`${prefixCls}-arrow ${prefixCls}-arrow-prev`} onClick={prev}>
                {prevArrow}
              </div>
              <div class={`${prefixCls}-arrow ${prefixCls}-arrow-next`} onClick={next}>
                {nextArrow}
              </div>
            </>
          )}
          {dotPlacement.value !== 'none' && <ul class={dotClass.value}>{dots}</ul>}
        </div>
      )
    }
  },
})
