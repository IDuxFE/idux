import { addIconDefinitions, IconDefinition } from '@idux/components/icon'
import { flushPromises, mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import Button from '../src/Button.vue'
import { ButtonProps } from '../src/types'

const Up: IconDefinition = {
  name: 'up',
  svgString:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M265.827 617.592l224.22-224.219c12.497-12.497 32.758-12.497 45.255 0l222.871 222.871c12.496 12.496 12.496 32.758 0 45.254-12.497 12.497-32.758 12.497-45.255 0L521.725 470.306c-4.999-4.999-13.103-4.999-18.102 0L311.082 662.847c-12.497 12.497-32.758 12.497-45.255 0-12.496-12.497-12.496-32.758 0-45.255z"/></svg>',
}

const Loading: IconDefinition = {
  name: 'loading',
  svgString:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M265.827 438.627l224.22 224.22c12.497 12.496 32.758 12.496 45.255 0l222.871-222.871c12.496-12.497 12.496-32.758 0-45.255-12.497-12.497-32.758-12.497-45.255 0L521.725 585.914c-4.999 4.998-13.103 4.998-18.102 0L311.082 393.373c-12.497-12.497-32.758-12.497-45.255 0-12.496 12.496-12.496 32.758 0 45.254z"/></svg>',
}

describe('Button.vue', () => {
  let buttonMount: (
    options?: MountingOptions<Partial<ButtonProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<ButtonProps>>>

  beforeEach(() => {
    addIconDefinitions([Up, Loading])
    buttonMount = (options = {}) => {
      return mount<ButtonProps>(Button, {
        ...options,
      })
    }
  })

  test('render work', () => {
    const wrapper = buttonMount()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('mode work', async () => {
    const wrapper = buttonMount({ props: { mode: 'primary' } })

    expect(wrapper.classes()).toContain('ix-button-primary')
    expect(wrapper.element.tagName).toEqual('BUTTON')

    await wrapper.setProps({ mode: 'dashed' })

    expect(wrapper.classes()).toContain('ix-button-dashed')
    expect(wrapper.element.tagName).toEqual('BUTTON')

    await wrapper.setProps({ mode: 'link' })

    expect(wrapper.classes()).toContain('ix-button-link')
    expect(wrapper.element.tagName).toEqual('A')
  })

  test('danger work', async () => {
    const wrapper = buttonMount()

    expect(wrapper.classes()).not.toContain('ix-button-danger')

    await wrapper.setProps({ danger: true })

    expect(wrapper.classes()).toContain('ix-button-danger')
  })

  test('ghost work', async () => {
    const wrapper = buttonMount()

    expect(wrapper.classes()).not.toContain('ix-button-ghost')

    await wrapper.setProps({ ghost: true })

    expect(wrapper.classes()).toContain('ix-button-ghost')
  })

  test('disabled work', async () => {
    const wrapper = buttonMount({ props: { mode: 'primary' } })

    expect(wrapper.classes()).not.toContain('ix-button-disabled')

    await wrapper.setProps({ disabled: true })

    expect(wrapper.classes()).toContain('ix-button-disabled')
  })

  test.only('loading work', async () => {
    const wrapper = buttonMount({ props: { icon: 'up', loading: true } })
    await flushPromises()

    expect(wrapper.findAll('svg').length).toEqual(1)
    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('loading')
    expect(wrapper.classes()).toContain('ix-button-loading')
  })

  test('size work', async () => {
    const wrapper = buttonMount({ props: { size: 'large' } })

    expect(wrapper.classes()).toContain('ix-button-large')

    await wrapper.setProps({ size: 'small' })

    expect(wrapper.classes()).not.toContain('ix-button-large')
    expect(wrapper.classes()).toContain('ix-button-small')
  })

  test('shape work', async () => {
    const wrapper = buttonMount({ props: { shape: 'circle' } })

    expect(wrapper.classes()).toContain('ix-button-circle')

    await wrapper.setProps({ shape: 'round' })

    expect(wrapper.classes()).not.toContain('ix-button-circle')
    expect(wrapper.classes()).toContain('ix-button-round')
  })

  test('block work', async () => {
    const wrapper = buttonMount()

    expect(wrapper.classes()).not.toContain('ix-button-block')

    await wrapper.setProps({ block: true })

    expect(wrapper.classes()).toContain('ix-button-block')
  })

  test.only('icon work', async () => {
    const wrapper = buttonMount({ props: { icon: 'up' } })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('up')

    await wrapper.setProps({ icon: 'loading' })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('loading')
  })

  test('slot work', async () => {
    const text = 'Button'
    const wrapper = buttonMount({
      slots: {
        default: text,
      },
    })
    expect(wrapper.text()).toEqual(text)
  })
})
