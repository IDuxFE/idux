import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Carousel from '../src/Carousel'
import { CarouselProps } from '../src/types'

describe('Carousel', () => {
  const sleep = (ms = 1000) => new Promise<void>(resolve => setTimeout(() => resolve(), ms))
  const CarouselMount = (options?: MountingOptions<Partial<CarouselProps>>) =>
    mount(Carousel, {
      slots: {
        default: () => [h('div', 'card1'), h('div', 'card2'), h('div', 'card3')],
      },
      ...(options as MountingOptions<CarouselProps>),
    })

  renderWork<CarouselProps>(Carousel, {
    props: {
      autoplayTime: 100,
    },
    slots: {
      default: () => [h('div', 'card1'), h('div', 'card2')],
    },
  })

  test('prop showArrow work', async () => {
    const onChange = jest.fn()
    const wrapper = CarouselMount({ props: { showArrow: true, onChange } })

    expect(wrapper.findAll('.ix-carousel-arrow').length).toBe(2)

    await wrapper.find('.ix-carousel-arrow-next').trigger('click')
    await wrapper.find('.ix-carousel-slides').trigger('transitionend')
    expect(onChange).toHaveBeenCalledTimes(1)

    await wrapper.find('.ix-carousel-arrow-prev').trigger('click')
    await wrapper.find('.ix-carousel-slides').trigger('transitionend')
    expect(onChange).toHaveBeenCalledTimes(2)

    await wrapper.setProps({ showArrow: false })
    expect(wrapper.find('.ix-carousel-arrow').exists()).toBeFalsy()
  })

  test('prop dotPlacement work', async () => {
    const wrapper = CarouselMount({ props: { dotPlacement: 'none' } })

    expect(wrapper.find('.ix-carousel-dot').exists()).toBeFalsy()

    const placements = ['bottom', 'top', 'start', 'end']
    for (const placement of placements) {
      await wrapper.setProps({ dotPlacement: placement })
      expect(wrapper.find('.ix-carousel-dot').classes()).toContain(`ix-carousel-dot-${placement}`)

      if (['bottom', 'top'].includes(placement)) {
        expect(wrapper.find('.ix-carousel').classes()).toContain('ix-carousel-horizontal')
      } else {
        expect(wrapper.find('.ix-carousel').classes()).toContain('ix-carousel-vertical')
      }
    }
  })

  test('prop autoplayTime work', async () => {
    const wrapper = CarouselMount({ props: { autoplayTime: 100 } })

    expect(wrapper.findAll('.ix-carousel-dot-item')[0].classes()).toContain('ix-carousel-dot-item-active')

    await sleep(100)
    expect(wrapper.findAll('.ix-carousel-dot-item')[0].classes()).not.toContain('ix-carousel-dot-item-active')
    expect(wrapper.findAll('.ix-carousel-dot-item')[1].classes()).toContain('ix-carousel-dot-item-active')

    await wrapper.setProps({ autoplayTime: 0 })
    await sleep(100)
    expect(wrapper.findAll('.ix-carousel-dot-item')[1].classes()).toContain('ix-carousel-dot-item-active')
  })

  test('prop trigger work', async () => {
    const onChange = jest.fn()
    const wrapper = CarouselMount({ props: { onChange } })

    await wrapper.findAll('.ix-carousel-dot-item')[2].trigger('click')
    await wrapper.find('.ix-carousel-slides').trigger('transitionend')
    expect(wrapper.findAll('.ix-carousel-dot-item')[2].classes()).toContain('ix-carousel-dot-item-active')
    expect(onChange).toHaveBeenCalledTimes(1)

    await wrapper.setProps({
      trigger: 'hover',
    })
    await wrapper.find('.ix-carousel-dot-item').trigger('mouseenter')
    await wrapper.find('.ix-carousel-slides').trigger('transitionend')
    expect(wrapper.find('.ix-carousel-dot-item').classes()).toContain('ix-carousel-dot-item-active')
    expect(onChange).toHaveBeenCalledTimes(2)

    await wrapper.findAll('.ix-carousel-dot-item')[1].trigger('mouseenter')
    await wrapper.find('.ix-carousel-slides').trigger('transitionend')
    expect(wrapper.findAll('.ix-carousel-dot-item')[1].classes()).toContain('ix-carousel-dot-item-active')
    expect(onChange).toHaveBeenCalledTimes(3)
  })

  test('prop onChange work', async () => {
    const onChange = jest.fn()
    const wrapper = CarouselMount({
      props: { onChange, showArrow: true },
      slots: {
        default: () => [h('div', 'card1')],
      },
    })

    await wrapper.find('.ix-carousel-arrow-prev').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(0)

    await wrapper.find('.ix-carousel-arrow-next').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(0)
  })

  test('slot dot work', async () => {
    const onChange = jest.fn()
    const wrapper = CarouselMount({
      props: { onChange },
      slots: {
        default: () => [h('div', 'card1'), h('div', 'card2')],
        dot: () => h('div', { class: 'custom-dot' }),
      },
    })

    expect(wrapper.findAll('.custom-dot').length === 2).toBeTruthy()

    await wrapper.findAll('.custom-dot')[1].trigger('click')
    await wrapper.find('.ix-carousel-slides').trigger('transitionend')
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
