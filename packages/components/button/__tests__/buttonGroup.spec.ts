import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Button from '../src/Button'
import ButtonGroup from '../src/ButtonGroup'
import { ButtonGroupProps } from '../src/types'

const defaultSlot = () => [
  h(Button, null, () => 'default'),
  h(Button, { mode: 'primary' }, () => 'primary'),
  h(Button, { size: 'lg' }, () => 'large'),
  h(Button, { shape: 'circle' }, () => 'circle'),
]

describe('ButtonGroup', () => {
  const ButtonGroupMount = (options?: MountingOptions<Partial<ButtonGroupProps>>) => {
    const { slots, ...rest } = options || {}
    return mount(ButtonGroup, {
      ...rest,
      slots: { default: defaultSlot, ...slots },
    })
  }

  renderWork(ButtonGroup, { slots: { default: defaultSlot } })

  test('gap work', async () => {
    const wrapper = ButtonGroupMount({ props: { gap: 12 } })

    expect(wrapper.classes()).not.toContain('ix-button-group-compact')

    await wrapper.setProps({ gap: 0 })

    expect(wrapper.classes()).toContain('ix-button-group-compact')

    await wrapper.setProps({ gap: '0' })

    expect(wrapper.classes()).toContain('ix-button-group-compact')

    await wrapper.setProps({ gap: '' })

    expect(wrapper.classes()).toContain('ix-button-group-compact')
  })

  test('mode work', async () => {
    const wrapper = ButtonGroupMount()

    expect(wrapper.findAll('.ix-button-primary').length).toBe(1)
    expect(wrapper.findAll('.ix-button-dashed').length).toBe(0)

    await wrapper.setProps({ mode: 'dashed' })

    expect(wrapper.findAll('.ix-button-primary').length).toBe(1)
    expect(wrapper.findAll('.ix-button-dashed').length).toBe(3)
  })

  test('size work', async () => {
    const wrapper = ButtonGroupMount()

    expect(wrapper.findAll('.ix-button-lg').length).toBe(1)
    expect(wrapper.findAll('.ix-button-md').length).toBe(3)

    await wrapper.setProps({ size: 'xl' })

    expect(wrapper.findAll('.ix-button-lg').length).toBe(1)
    expect(wrapper.findAll('.ix-button-xl').length).toBe(3)
  })

  test('shape work', async () => {
    const wrapper = ButtonGroupMount()

    expect(wrapper.findAll('.ix-button-circle').length).toBe(1)
    expect(wrapper.findAll('.ix-button-round').length).toBe(0)

    await wrapper.setProps({ shape: 'round' })

    expect(wrapper.findAll('.ix-button-circle').length).toBe(1)
    expect(wrapper.findAll('.ix-button-round').length).toBe(3)
  })
})
