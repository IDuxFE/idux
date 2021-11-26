import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Skeleton from '../src/Skeleton'
import { SkeletonProps } from '../src/types'

describe('Skeleton', () => {
  const SkeletonMount = (options?: MountingOptions<Partial<SkeletonProps>>) =>
    mount(Skeleton, { ...(options as MountingOptions<SkeletonProps>) })

  const sizeWork = (sizeName: 'width' | 'height') => {
    test(`props ${sizeName} work`, async () => {
      const wrapper = SkeletonMount({
        props: {
          [sizeName]: 40,
        },
      })
      const getLoaderDom = () => wrapper.find('.ix-skeleton-loader').element as HTMLElement

      let loaderDom = getLoaderDom()
      expect(loaderDom.style[sizeName]).toBe('40px')

      await wrapper.setProps({ [sizeName]: '50px' })
      loaderDom = getLoaderDom()
      expect(loaderDom.style[sizeName]).toBe('50px')

      await wrapper.setProps({ [sizeName]: '30%' })
      loaderDom = getLoaderDom()
      expect(loaderDom.style[sizeName]).toBe('30%')
    })
  }

  renderWork<SkeletonProps>(Skeleton)
  sizeWork('width')
  sizeWork('height')

  test('props animated work', async () => {
    const wrapper = SkeletonMount()

    expect(wrapper.find('.ix-skeleton-loader').classes()).toContain('ix-skeleton-animated')

    await wrapper.setProps({ animated: false })
    expect(wrapper.find('.ix-skeleton-loader').classes()).not.toContain('ix-skeleton-animated')
  })
  test('props type work', async () => {
    const wrapper = SkeletonMount()

    expect(wrapper.find('.ix-skeleton-loader').classes()).toContain('ix-skeleton-text')

    await wrapper.setProps({ type: 'rect' })
    expect(wrapper.find('.ix-skeleton-loader').classes()).toContain('ix-skeleton-rect')

    await wrapper.setProps({ type: 'round' })
    expect(wrapper.find('.ix-skeleton-loader').classes()).toContain('ix-skeleton-round')

    await wrapper.setProps({ type: 'circle' })
    expect(wrapper.find('.ix-skeleton-loader').classes()).toContain('ix-skeleton-circle')
  })
  test('props loading work', async () => {
    const wrapper = SkeletonMount({
      slots: {
        default: () => h('div', 'skeletonSlots'),
      },
    })

    expect(wrapper.find('.ix-skeleton-loader').exists()).toBeTruthy()
    expect(wrapper.text()).not.toBe('skeletonSlots')

    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.ix-skeleton-loader').exists()).toBeFalsy()
    expect(wrapper.text()).toBe('skeletonSlots')
  })
  test('props repeat work', () => {
    const wrapper = SkeletonMount({
      props: {
        repeat: 3,
      },
    })

    expect(wrapper.findAll('.ix-skeleton-loader').length).toBe(3)
  })
})
