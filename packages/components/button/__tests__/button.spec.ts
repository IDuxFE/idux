import { renderWork } from '@tests'
import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import IxButton from '../src/Button.vue'
import { ButtonProps } from '../src/types'

describe('Button.vue', () => {
  let ButtonMount: (options?: MountingOptions<Partial<ButtonProps>>) => VueWrapper<InstanceType<typeof IxButton>>

  beforeEach(() => {
    ButtonMount = options => mount(IxButton, { ...options })
  })

  renderWork(IxButton)

  test('mode work', async () => {
    const wrapper = ButtonMount({ props: { mode: 'primary' } })

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
    const wrapper = ButtonMount()

    expect(wrapper.classes()).not.toContain('ix-button-danger')

    await wrapper.setProps({ danger: true })

    expect(wrapper.classes()).toContain('ix-button-danger')
  })

  test('ghost work', async () => {
    const wrapper = ButtonMount()

    expect(wrapper.classes()).not.toContain('ix-button-ghost')

    await wrapper.setProps({ ghost: true })

    expect(wrapper.classes()).toContain('ix-button-ghost')
  })

  test('disabled work', async () => {
    const wrapper = ButtonMount({ props: { mode: 'primary' } })

    expect(wrapper.classes()).not.toContain('ix-button-disabled')

    await wrapper.setProps({ disabled: true })

    expect(wrapper.classes()).toContain('ix-button-disabled')
  })

  test('loading work', async () => {
    const wrapper = ButtonMount({ props: { icon: 'up', loading: true } })

    expect(wrapper.findAll('.ix-icon').length).toEqual(1)
    expect(wrapper.find('.ix-icon-loading').exists()).toBeTruthy()
    expect(wrapper.classes()).toContain('ix-button-loading')
  })

  test('size work', async () => {
    const wrapper = ButtonMount({ props: { size: 'large' } })

    expect(wrapper.classes()).toContain('ix-button-large')

    await wrapper.setProps({ size: 'small' })

    expect(wrapper.classes()).not.toContain('ix-button-large')
    expect(wrapper.classes()).toContain('ix-button-small')
  })

  test('shape work', async () => {
    const wrapper = ButtonMount({ props: { shape: 'circle' } })

    expect(wrapper.classes()).toContain('ix-button-circle')

    await wrapper.setProps({ shape: 'round' })

    expect(wrapper.classes()).not.toContain('ix-button-circle')
    expect(wrapper.classes()).toContain('ix-button-round')
  })

  test('block work', async () => {
    const wrapper = ButtonMount()

    expect(wrapper.classes()).not.toContain('ix-button-block')

    await wrapper.setProps({ block: true })

    expect(wrapper.classes()).toContain('ix-button-block')
  })

  test('icon work', async () => {
    const wrapper = ButtonMount({ props: { icon: 'up' } })

    expect(wrapper.find('.ix-icon-up').exists()).toBeTruthy()

    await wrapper.setProps({ icon: 'down' })

    expect(wrapper.find('.ix-icon-down').exists()).toBeTruthy()

    expect(wrapper.classes()).toContain('ix-button-icon-only')
  })

  test('slot work', async () => {
    const text = 'Button'
    const wrapper = ButtonMount({
      slots: {
        default: text,
      },
    })
    expect(wrapper.text()).toEqual(text)
  })
})
