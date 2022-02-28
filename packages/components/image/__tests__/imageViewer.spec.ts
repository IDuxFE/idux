import type { ImageViewerProps } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'

import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'

import { isElementVisible, renderWork, wait } from '@tests'

import ImageViewer from '../src/ImageViewer'

describe('ImageViewer', () => {
  let bodyWrapper: DOMWrapper<Element>

  beforeEach(() => {
    bodyWrapper = new DOMWrapper(document.body, {}) as DOMWrapper<Element>
  })

  afterEach(() => {
    const container = document.querySelector('.ix-image-viewer-container')
    if (container) {
      container.innerHTML = ''
    }
  })

  const ImageViewerMount = (options: MountingOptions<Partial<ImageViewerProps>> = {}) => {
    const { props = {}, ...rest } = options
    const images = ['/icons/logo.svg']
    const activeIndex = 0
    return mount(ImageViewer, {
      ...({
        ...rest,
        props: { images, activeIndex, ...props },
      } as MountingOptions<ImageViewerProps>),
    })
  }

  renderWork<ImageViewerProps>(ImageViewer, { props: { images: ['/icons/logo.svg'] } })

  test('v-model:visible work', async () => {
    const onUpdateVisible = jest.fn()
    const wrapper = ImageViewerMount({ props: { visible: false, 'onUpdate:visible': onUpdateVisible } })
    await flushPromises()

    expect(isElementVisible(document.querySelector('.ix-image-viewer'))).toBe(false)

    await wrapper.setProps({ visible: true })

    expect(isElementVisible(document.querySelector('.ix-image-viewer'))).toBe(true)

    await bodyWrapper.find('.ix-image-viewer img').trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)

    await bodyWrapper.find('.ix-image-viewer .ix-icon-close').trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)

    await bodyWrapper.find('.ix-image-viewer').trigger('keydown.esc')

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('v-model:activeIndex work', async () => {
    const onUpdateActiveIndex = jest.fn()
    const images = ['/1.png', '/2.png', '/3.png']
    const wrapper = ImageViewerMount({
      props: { images, visible: true, activeIndex: 0, 'onUpdate:activeIndex': onUpdateActiveIndex },
    })
    await flushPromises()

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('src')).toBe(images[0])

    await wrapper.setProps({ activeIndex: 1 })

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('src')).toBe(images[1])

    await bodyWrapper.find('.ix-image-viewer').trigger('keydown', { code: 'ArrowRight' })
    await wait(20) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(2)

    await bodyWrapper.find('.ix-image-viewer').trigger('keydown', { code: 'ArrowLeft' })
    await wait(20) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(0)

    await bodyWrapper.find('.ix-image-viewer .ix-icon-left').trigger('click')
    await wait(20) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(0)

    await bodyWrapper.find('.ix-image-viewer .ix-icon-right').trigger('click')
    await wait(20) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(2)
  })

  test('images work', async () => {
    const imagesOld = ['/1.png']
    const wrapper = ImageViewerMount({
      props: { images: imagesOld, visible: true, activeIndex: 0 },
    })
    await flushPromises()

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('src')).toBe(imagesOld[0])

    const imageNew = ['/2.png']
    await wrapper.setProps({ images: imageNew })

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('src')).toBe(imageNew[0])
  })

  test('zoom work', async () => {
    const wrapper = ImageViewerMount({ props: { visible: true } })
    await flushPromises()

    await bodyWrapper.find('.ix-image-viewer').trigger('mousewheel', { wheelDelta: 10 })
    await wait(20) // debounce

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('style')).toMatch('scale(1.2)')

    await bodyWrapper.find('.ix-image-viewer').trigger('mousewheel', { wheelDelta: -10 })
    await wait(20) // debounce

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('style')).toMatch('scale(1)')

    await bodyWrapper.find('.ix-image-viewer .ix-icon-zoom-in').trigger('click')
    await wait(20) // debounce

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('style')).toMatch('scale(1.2)')

    await bodyWrapper.find('.ix-image-viewer .ix-icon-zoom-out').trigger('click')
    await wait(20) // debounce

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('style')).toMatch('scale(1)')

    await wrapper.setProps({ zoom: [0.8, 0.9] })

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('style')).toMatch('scale(0.9)')

    await bodyWrapper.find('.ix-image-viewer .ix-icon-zoom-in').trigger('click')
    await wait(20) // debounce

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('style')).toMatch('scale(0.9)')

    await wrapper.setProps({ zoom: [1.1, 1.2] })

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('style')).toMatch('scale(1.1)')

    await bodyWrapper.find('.ix-image-viewer .ix-icon-zoom-out').trigger('click')
    await wait(20) // debounce

    expect(bodyWrapper.find('.ix-image-viewer img').attributes('style')).toMatch('scale(1.1)')
  })

  test('loop work', async () => {
    const images = ['/1.png', '/2.png', '/3.png']
    const onUpdateActiveIndex = jest.fn()
    const wrapper = ImageViewerMount({
      props: { images, visible: true, activeIndex: 0, 'onUpdate:activeIndex': onUpdateActiveIndex },
    })
    await flushPromises()

    await bodyWrapper.find('.ix-image-viewer .ix-icon-left').trigger('click')
    await wait(20) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(2)

    await wrapper.setProps({ activeIndex: 2 })
    await bodyWrapper.find('.ix-image-viewer .ix-icon-right').trigger('click')
    await wait(20) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(0)

    await wrapper.setProps({ loop: false })

    expect(bodyWrapper.find('.ix-image-viewer .ix-icon-right').classes().toString()).toMatch('disabled')

    await wrapper.setProps({ activeIndex: 0 })

    expect(bodyWrapper.find('.ix-image-viewer .ix-icon-left').classes().toString()).toMatch('disabled')
  })

  test('maskClosable work', async () => {
    const onUpdateVisible = jest.fn()
    const wrapper = ImageViewerMount({
      props: { visible: true, 'onUpdate:visible': onUpdateVisible },
    })
    await bodyWrapper.find('.ix-image-viewer img').trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)
    onUpdateVisible.mockRestore()

    await wrapper.setProps({ maskClosable: false })
    await bodyWrapper.find('.ix-image-viewer .ix-image-viewer-preview').trigger('click')

    expect(onUpdateVisible).not.toBeCalled()
  })

  test('target work', async () => {
    const wrapper = ImageViewerMount({ props: { visible: true } })
    await flushPromises()

    expect((document.querySelector('.ix-image-viewer-container .ix-image-viewer') as Element).innerHTML).not.toBe('')

    await wrapper.setProps({ target: 'image-viewer-container' })

    expect((document.querySelector('.image-viewer-container .ix-image-viewer') as Element).innerHTML).not.toBe('')
  })
})
