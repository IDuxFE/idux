import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Image from '../src/Image'
import ImageViewer from '../src/ImageViewer'
import { ImageProps } from '../src/types'

describe('Image', () => {
  const ImageMount = (options?: MountingOptions<Partial<ImageProps>>) => {
    const { props, ...rest } = options ?? {}
    const src = '/icons/logo.svg'

    return mount(Image, { ...({ ...rest, props: { src, ...props } } as MountingOptions<ImageProps>) })
  }

  renderWork<ImageProps>(Image, { props: { src: '/icons/logo.svg' } })

  test('src work', async () => {
    const testSrcA = '/a'
    const testSrcB = '/b'
    const wrapper = ImageMount({ props: { src: testSrcA } })
    await flushPromises()

    expect(wrapper.find('.ix-image-inner').attributes('src')).toBe(testSrcA)

    await wrapper.setProps({ src: testSrcB })

    expect(wrapper.find('.ix-image-inner').attributes('src')).toBe(testSrcB)
  })

  test('preview work', async () => {
    const wrapper = ImageMount()
    await flushPromises()
    await wrapper.find('.ix-image-inner').trigger('load')

    expect(wrapper.find('.ix-image-preview-wrapper').exists()).toBe(true)

    await wrapper.find('.ix-image-preview-wrapper').trigger('click')

    expect(wrapper.findComponent(ImageViewer).props('visible')).toBe(true)

    await wrapper.setProps({ preview: false })

    expect(wrapper.find('.ix-image-preview-wrapper').exists()).toBe(false)
  })

  test('img attrs work', async () => {
    const wrapper = ImageMount({ attrs: { alt: 'testAlt', width: '200' } })
    await flushPromises()

    expect(wrapper.find('.ix-image-inner').attributes('alt')).toBe('testAlt')
    expect(wrapper.find('.ix-image-inner').attributes('width')).toBe('200')
  })

  test('hooks work', async () => {
    const onLoad = vi.fn()
    const onError = vi.fn()
    const wrapper = ImageMount({ props: { onLoad, onError } })
    await flushPromises()
    await wrapper.find('.ix-image-inner').trigger('load')

    expect(onLoad).toBeCalled()

    await wrapper.find('.ix-image-inner').trigger('error')

    expect(onError).toBeCalled()
  })

  test('imageViewerProps work', async () => {
    const imageViewer = {
      visible: true,
      activeIndex: 0,
      images: ['/a'],
      zoom: [1, 2],
      loop: false,
      maskClosable: false,
      target: 'ix-image-container',
      'onUpdate:visible': () => {},
      'onUpdate:activeIndex': () => {},
    }
    const wrapper = ImageMount({ props: { imageViewer } })
    await flushPromises()

    expect(wrapper.findComponent(ImageViewer).props()).toEqual(imageViewer)
  })

  test('slots work', async () => {
    const wrapper = ImageMount({
      slots: {
        previewIcon: h('div', { class: 'slot-previewIcon' }),
        placeholder: h('div', { class: 'slot-placeholder' }),
        fallback: h('div', { class: 'slot-fallback' }),
      },
    })
    await flushPromises()

    expect(wrapper.find('.slot-placeholder').exists()).toBe(true)

    await wrapper.find('.ix-image-inner').trigger('load')

    expect(wrapper.find('.slot-previewIcon').exists()).toBe(true)

    await wrapper.find('.ix-image-inner').trigger('error')

    expect(wrapper.find('.slot-fallback').exists()).toBe(true)
  })
})
