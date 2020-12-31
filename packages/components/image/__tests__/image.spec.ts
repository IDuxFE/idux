import { flushPromises, mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import Image from '../src/Image.vue'
import { ImageProps } from '../src/types'

describe('Image.vue', () => {
  let ImageMount: (
    options?: MountingOptions<Partial<ImageProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<ImageProps>>>

  beforeEach(() => {
    ImageMount = (options = {}) => {
      return mount<ImageProps>(Image, {
        ...options,
      })
    }
  })

  test('render work', async () => {
    const wrapper = ImageMount()
    await flushPromises()
    await wrapper.find('img').trigger('load')
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('render src work', async () => {
    const wrapper = ImageMount({
      props: {
        src: 'https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg',
      },
    })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({ src: 'https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/vue.png' })
  })
  test('render width work', async () => {
    const wrapper = ImageMount({
      props: {
        width: '100px',
        src: 'https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg',
      },
    })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({ width: '200px' })
    expect(wrapper.find('img').attributes()['style']).toMatch('width: 200px')
    await wrapper.setProps({ width: null })

    expect(wrapper.find('img').attributes()['style']).toMatch(`width: 100px`)
  })
  test('render height work', async () => {
    const wrapper = ImageMount({
      props: {
        height: '100px',
        src: 'https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg',
      },
    })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({ height: '200px' })
    expect(wrapper.find('img').attributes()['style']).toMatch('height: 200px')
    await wrapper.setProps({ height: null })
    expect(wrapper.find('img').attributes()['style']).toMatch('height: 100px')
  })
  test('render alt work', async () => {
    const wrapper = ImageMount({
      props: {
        alt: 'demo',
        src: 'https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg',
      },
    })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('img').attributes()['alt']).toEqual('demo')
  })
  test('render objectFit work', async () => {
    const wrapper = ImageMount({
      props: {
        src: 'https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg',
      },
    })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({ objectFit: 'fill' })
    expect(wrapper.find('img').attributes()['style']).toMatch('fill')
  })

  test('render preview work', async () => {
    const wrapper = ImageMount({
      props: {
        preview: true,
        width: 200,
        height: 200,
        src: 'https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg',
      },
    })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.find('.ix-image-preview-is').trigger('click')

    expect(wrapper.find('.ix-image-preview').exists()).toBe(true)
    await wrapper.find('.ix-rotate-left').trigger('click')
    expect(wrapper.find('.ix-image-preview-img>img').attributes()['style']).toEqual(
      'transform: scale3d(1, 1, 1) rotate(-90deg);',
    )
    await wrapper.find('.ix-rotate-right').trigger('click')

    expect(wrapper.find('.ix-image-preview-img>img').attributes()['style']).toEqual(
      'transform: scale3d(1, 1, 1) rotate(0deg);',
    )
    await wrapper.find('.ix-zoom-in').trigger('click')
    expect(wrapper.find('.ix-image-preview-img>img').attributes()['style']).toEqual(
      'transform: scale3d(1.1, 1.1, 1) rotate(0deg);',
    )
    await wrapper.find('.ix-zoom-out').trigger('click')
    expect(wrapper.find('.ix-image-preview-img>img').attributes()['style']).toEqual(
      'transform: scale3d(1, 1, 1) rotate(0deg);',
    )

    let i = 10
    while (i) {
      await wrapper.find('.ix-zoom-out').trigger('click')
      i--
    }
    expect(wrapper.find('.ix-zoom-out').attributes()['class']).toEqual(
      'ix-tools-item ix-zoom-out ix-tools-item-disabled',
    )

    await wrapper.find('.ix-close').trigger('click')
    expect(wrapper.find('ix-image-preview').exists()).toBe(false)
  })
  test('render fallback work', async () => {
    const fallback =
      'data:image/png;base64,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'
    const wrapper = ImageMount({
      props: {
        fallback,
        src: '',
      },
    })
    await wrapper.find('img').trigger('error')
    await flushPromises()
    expect(wrapper.find('.ix-image-error').isVisible()).toBe(true)
  })
})
