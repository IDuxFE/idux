import { renderWork } from '@tests'
import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import IxDivider from '../src/Divider.vue'
import { DividerProps } from '../src/types'

describe('Divider.vue', () => {
  let DividerMount: (options?: MountingOptions<Partial<DividerProps>>) => VueWrapper<InstanceType<typeof IxDivider>>

  beforeEach(() => {
    DividerMount = options => mount(IxDivider, { ...options })
  })

  renderWork(IxDivider)

  test('type work', async () => {
    const wrapper = DividerMount()
    expect(wrapper.classes()).toContain('ix-divider-horizontal')

    await wrapper.setProps({ type: 'horizontal' })
    expect(wrapper.classes()).toContain('ix-divider-horizontal')

    await wrapper.setProps({ type: 'vertical' })
    expect(wrapper.classes()).toContain('ix-divider-vertical')
  })

  test('dashed work', async () => {
    const wrapper = DividerMount()
    expect(wrapper.classes()).not.toContain('ix-divider-dashed')

    await wrapper.setProps({ dashed: true })
    expect(wrapper.classes()).toContain('ix-divider-dashed')

    await wrapper.setProps({ dashed: false })
    expect(wrapper.classes()).not.toContain('ix-divider-dashed')
  })

  test('slot work', async () => {
    const text = 'Text'
    let wrapper = DividerMount()
    expect(wrapper.classes()).not.toContain('ix-divider-with-text')
    expect(wrapper.text()).not.toEqual(text)
    expect(wrapper.find('.ix-divider-inner-text').exists()).toBeFalsy()

    wrapper = DividerMount({ slots: { default: text } })
    expect(wrapper.classes()).toContain('ix-divider-with-text')
    expect(wrapper.text()).toEqual(text)
    expect(wrapper.find('.ix-divider-inner-text').exists()).toBeTruthy()
  })

  test('plain work', async () => {
    const text = 'Text'
    let wrapper = DividerMount()
    expect(wrapper.classes()).not.toContain('ix-divider-plain')

    wrapper = DividerMount({ slots: { default: text } })
    expect(wrapper.classes()).not.toContain('ix-divider-plain')

    await wrapper.setProps({ plain: true })
    expect(wrapper.classes()).toContain('ix-divider-plain')

    await wrapper.setProps({ plain: false })
    expect(wrapper.classes()).not.toContain('ix-divider-plain')
  })

  test('position work', async () => {
    const text = 'Text'
    let wrapper = DividerMount()
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'horizontal' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'vertical' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    wrapper = DividerMount({ slots: { default: text } })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'horizontal' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'vertical' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    wrapper = DividerMount({ slots: { default: text }, props: { position: 'left' } })
    expect(wrapper.classes()).toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'horizontal' })
    expect(wrapper.classes()).toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'vertical' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    wrapper = DividerMount({ props: { position: 'left' } })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'horizontal' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'vertical' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    wrapper = DividerMount({ slots: { default: text }, props: { position: 'center' } })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'horizontal' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'vertical' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    wrapper = DividerMount({ props: { position: 'center' } })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'horizontal' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'vertical' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    wrapper = DividerMount({ slots: { default: text }, props: { position: 'right' } })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'horizontal' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'vertical' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    wrapper = DividerMount({ props: { position: 'right' } })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'horizontal' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')

    await wrapper.setProps({ type: 'vertical' })
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-left')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-center')
    expect(wrapper.classes()).not.toContain('ix-divider-with-text-right')
  })
})
