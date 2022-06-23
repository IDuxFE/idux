/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, onBeforeUpdate, provide, ref } from 'vue'

import { convertElement, flattenNode } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { useAutoplay } from './composables/useAutoplay'
import { useStrategy } from './composables/useStrategy'
import Dot from './contents/Dot'
import Slider from './contents/Slider'
import { carouselToken } from './token'
import { carouselProps } from './types'

export default defineComponent({
  name: 'IxCarousel',
  props: carouselProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('carousel')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-carousel`)

    const mergedDotPlacement = computed(() => props.dotPlacement ?? config.dotPlacement)
    const mergedShowArrow = computed(() => props.showArrow ?? config.showArrow)
    const mergedTrigger = computed(() => props.trigger ?? config.trigger)
    const mergedVertical = computed(() => mergedDotPlacement.value === 'start' || mergedDotPlacement.value === 'end')

    const mergedChildren = computed(() => flattenNode(slots.default?.()))
    const mergedLength = computed(() => mergedChildren.value.length)

    const carouselRef = ref<HTMLDivElement>()
    const slidersRef = ref<HTMLDivElement>()
    const sliderTrackRef = ref<HTMLDivElement>()
    const sliderRefs = ref<HTMLDivElement[]>([])

    const setRef = (instance: HTMLDivElement | null, index: number) => {
      if (instance) {
        sliderRefs.value[index] = instance
      }
    }

    onBeforeUpdate(() => (sliderRefs.value = []))

    const { activeIndex, runningIndex, unitHeight, unitWidth, goTo, next, prev } = useStrategy(
      props,
      carouselRef,
      sliderTrackRef,
      sliderRefs,
      mergedVertical,
      mergedLength,
    )
    const { startAutoplay, cleanAutoplay } = useAutoplay(props, config, activeIndex, goTo)

    expose({ goTo, next, prev })

    provide(carouselToken, {
      slots,
      mergedPrefixCls,
      mergedTrigger,
      unitHeight,
      unitWidth,
      goTo,
      cleanAutoplay,
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-horizontal`]: !mergedVertical.value,
        [`${prefixCls}-vertical`]: mergedVertical.value,
      })
    })

    const slidersStyle = computed(() => {
      const height = unitHeight.value
      return height > 0 ? `height: ${height}px;` : undefined
    })

    const sliderTrackStyle = computed(() => {
      const width = unitWidth.value
      const height = unitHeight.value
      const length = mergedLength.value
      if (width <= 0 || height <= 0 || length <= 0) {
        return undefined
      }
      if (mergedVertical.value) {
        return `width: ${width}px;height: ${height * length}px;`
      }
      return `width: ${width * length}px;height: ${height}px;`
    })

    const dotsClasses = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-dots`]: true,
        [`${prefixCls}-dots-${mergedDotPlacement.value}`]: true,
      })
    })

    const handleKeydown = (evt: KeyboardEvent) => {
      switch (evt.code) {
        case 'ArrowRight':
        case 'ArrowDown':
          next()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          prev()
          break
      }
    }

    const onTransitionend = () => {
      const sliderTrackElement = sliderTrackRef.value!
      sliderTrackElement.style.transition = ''
      sliderRefs.value.forEach(slider => {
        const element = convertElement(slider)
        if (element) {
          element.style.top = ''
          element.style.left = ''
        }
      })
      const currIndex = runningIndex.value
      if (mergedVertical.value) {
        sliderTrackElement.style.transform = `translate3d(0, ${-currIndex * unitHeight.value}px, 0)`
      } else {
        sliderTrackElement.style.transform = `translate3d(${-currIndex * unitWidth.value}px,0 , 0)`
      }
      activeIndex.value = currIndex
      runningIndex.value = -1
      startAutoplay()
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const children = mergedChildren.value
      const currActiveIndex = activeIndex.value
      const currRunningIndex = runningIndex.value
      return (
        <div ref={carouselRef} class={classes.value}>
          <div
            ref={slidersRef}
            class={`${prefixCls}-sliders`}
            style={slidersStyle.value}
            tabindex="-1"
            onKeydown={handleKeydown}
          >
            <div
              ref={sliderTrackRef}
              class={`${prefixCls}-slider-track`}
              style={sliderTrackStyle.value}
              onTransitionend={onTransitionend}
            >
              {children.map((node, index) => (
                <Slider
                  ref={instance => setRef(instance, index)}
                  key={node.key!}
                  isActive={index === currActiveIndex}
                  index={index}
                >
                  {node}
                </Slider>
              ))}
            </div>
          </div>
          {mergedShowArrow.value && (
            <>
              <div key="__arrow-prev" class={`${prefixCls}-arrow ${prefixCls}-arrow-prev`} onClick={prev}>
                {slots.arrow ? slots.arrow({ type: 'prev' }) : <IxIcon name="left-circle" />}
              </div>
              <div key="__arrow-next" class={`${prefixCls}-arrow ${prefixCls}-arrow-next`} onClick={next}>
                {slots.arrow ? slots.arrow({ type: 'next' }) : <IxIcon name="right-circle" />}
              </div>
            </>
          )}
          {mergedDotPlacement.value !== 'none' && (
            <ul class={dotsClasses.value}>
              {children.map((node, index) => (
                <Dot
                  key={node.key!}
                  isActive={currRunningIndex !== -1 ? index === currRunningIndex : index === currActiveIndex}
                  index={index}
                />
              ))}
            </ul>
          )}
        </div>
      )
    }
  },
})
