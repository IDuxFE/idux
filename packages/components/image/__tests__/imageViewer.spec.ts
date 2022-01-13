import type { ImageViewerProps } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'

import { flushPromises, mount } from '@vue/test-utils'

import { renderWork, wait } from '@tests'

import ImageViewer from '../src/ImageViewer'
import ImageViewerContent from '../src/component/ImageViewerContent'

describe('ImageViewer', () => {
  beforeEach(() => {
    const el = document.createElement('div')
    el.className = 'ix-image-viewer-container'
    document.body.appendChild(el)
  })

  afterEach(() => {
    ;(document.querySelector('.ix-image-viewer-container') as HTMLElement).innerHTML = ''
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

    expect(wrapper.findComponent(ImageViewerContent).exists()).toBe(false)

    await wrapper.setProps({ visible: true })

    expect(wrapper.findComponent(ImageViewerContent).exists()).toBe(true)

    await wrapper.findComponent(ImageViewerContent).find('img').trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)

    await wrapper.findComponent(ImageViewerContent).find('.ix-icon-close').trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)

    await wrapper.findComponent(ImageViewerContent).trigger('keydown.esc')

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('v-model:activeIndex work', async () => {
    const onUpdateActiveIndex = jest.fn()
    const images = ['/1.png', '/2.png', '/3.png']
    const wrapper = ImageViewerMount({
      props: { images, visible: true, activeIndex: 0, 'onUpdate:activeIndex': onUpdateActiveIndex },
    })
    await flushPromises()

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('src')).toBe(images[0])

    await wrapper.setProps({ activeIndex: 1 })

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('src')).toBe(images[1])

    await wrapper.findComponent(ImageViewerContent).trigger('keydown', { code: 'ArrowRight' })
    await wait(10) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(2)

    await wrapper.findComponent(ImageViewerContent).trigger('keydown', { code: 'ArrowLeft' })
    await wait(10) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(0)

    await wrapper.findComponent(ImageViewerContent).find('.ix-icon-left').trigger('click')
    await wait(10) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(0)

    await wrapper.findComponent(ImageViewerContent).find('.ix-icon-right').trigger('click')
    await wait(10) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(2)
  })

  test('images work', async () => {
    const imagesOld = ['/1.png']
    const wrapper = ImageViewerMount({
      props: { images: imagesOld, visible: true, activeIndex: 0 },
    })
    await flushPromises()

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('src')).toBe(imagesOld[0])

    const imageNew = ['/2.png']
    await wrapper.setProps({ images: imageNew })

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('src')).toBe(imageNew[0])
  })

  test('zoom work', async () => {
    const wrapper = ImageViewerMount({ props: { visible: true } })
    await flushPromises()

    await wrapper.findComponent(ImageViewerContent).trigger('mousewheel', { wheelDelta: 10 })
    await wait(10) // debounce

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('style')).toMatch('scale(1.2)')

    await wrapper.findComponent(ImageViewerContent).trigger('mousewheel', { wheelDelta: -10 })
    await wait(10) // debounce

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('style')).toMatch('scale(1)')

    await wrapper.findComponent(ImageViewerContent).find('.ix-icon-zoom-in').trigger('click')
    await wait(10) // debounce

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('style')).toMatch('scale(1.2)')

    await wrapper.findComponent(ImageViewerContent).find('.ix-icon-zoom-out').trigger('click')
    await wait(10) // debounce

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('style')).toMatch('scale(1)')

    await wrapper.setProps({ zoom: [0.8, 0.9] })

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('style')).toMatch('scale(0.9)')

    await wrapper.findComponent(ImageViewerContent).find('.ix-icon-zoom-in').trigger('click')
    await wait(10) // debounce

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('style')).toMatch('scale(0.9)')

    await wrapper.setProps({ zoom: [1.1, 1.2] })

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('style')).toMatch('scale(1.1)')

    await wrapper.findComponent(ImageViewerContent).find('.ix-icon-zoom-out').trigger('click')
    await wait(10) // debounce

    expect(wrapper.findComponent(ImageViewerContent).find('img').attributes('style')).toMatch('scale(1.1)')
  })

  test('loop work', async () => {
    const images = ['/1.png', '/2.png', '/3.png']
    const onUpdateActiveIndex = jest.fn()
    const wrapper = ImageViewerMount({
      props: { images, visible: true, activeIndex: 0, 'onUpdate:activeIndex': onUpdateActiveIndex },
    })
    await flushPromises()

    await wrapper.findComponent(ImageViewerContent).find('.ix-icon-left').trigger('click')
    await wait(10) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(2)

    await wrapper.setProps({ activeIndex: 2 })
    await wrapper.findComponent(ImageViewerContent).find('.ix-icon-right').trigger('click')
    await wait(10) // debounce

    expect(onUpdateActiveIndex).toBeCalledWith(0)

    await wrapper.setProps({ loop: false })

    expect(wrapper.findComponent(ImageViewerContent).find('.ix-icon-right').classes().toString()).toMatch('disabled')

    await wrapper.setProps({ activeIndex: 0 })

    expect(wrapper.findComponent(ImageViewerContent).find('.ix-icon-left').classes().toString()).toMatch('disabled')
  })

  test('maskClosable work', async () => {
    const onUpdateVisible = jest.fn()
    const wrapper = ImageViewerMount({
      props: { visible: true, 'onUpdate:visible': onUpdateVisible },
    })
    await wrapper.findComponent(ImageViewerContent).find('img').trigger('click')

    expect(onUpdateVisible).toBeCalledWith(false)
    onUpdateVisible.mockRestore()

    await wrapper.setProps({ maskClosable: false })
    await wrapper.findComponent(ImageViewerContent).find('.ix-image-viewer-preview').trigger('click')

    expect(onUpdateVisible).not.toBeCalled()
  })

  test('target work', async () => {
    const wrapper = ImageViewerMount({ props: { visible: true } })
    await flushPromises()

    expect((document.querySelector('.ix-image-viewer-container .ix-image-viewer') as HTMLElement).innerHTML).not.toBe(
      '',
    )

    await wrapper.setProps({ target: 'image-viewer-container' })

    expect((document.querySelector('.image-viewer-container .ix-image-viewer') as HTMLElement).innerHTML).not.toBe('')
  })
})
