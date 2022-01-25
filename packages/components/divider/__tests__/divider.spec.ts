import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import IxDivider from '../src/Divider'
import { DividerProps } from '../src/types'

describe('Divider', () => {
  const DividerMount = (options?: MountingOptions<Partial<DividerProps>>) => mount(IxDivider, { ...options })

  renderWork(IxDivider)

  test('dashed work', async () => {
    const wrapper = DividerMount({ props: { dashed: true } })

    expect(wrapper.classes()).toContain('ix-divider-dashed')

    await wrapper.setProps({ dashed: false })
    expect(wrapper.classes()).not.toContain('ix-divider-dashed')
  })

  test('label work', async () => {
    const label = 'label'
    const wrapper = DividerMount({ props: { label } })

    expect(wrapper.classes()).toContain('ix-divider-with-label')
    expect(wrapper.text()).toEqual(label)

    const label2 = `label2`
    await wrapper.setProps({ label: label2 })

    expect(wrapper.text()).toEqual(label2)
  })

  test('label slot work', async () => {
    const label = 'label'
    const labelSlot = 'label slot'
    const wrapper = DividerMount({ props: { label }, slots: { default: labelSlot } })

    expect(wrapper.text()).toEqual(labelSlot)
  })

  test('labelPlacement work', async () => {
    const wrapper = DividerMount({ props: { label: 'label', labelPlacement: 'start' } })

    expect(wrapper.classes()).toContain('ix-divider-with-label-start')

    await wrapper.setProps({ labelPlacement: 'end' })

    expect(wrapper.classes()).toContain('ix-divider-with-label-end')

    await wrapper.setProps({ label: undefined })

    expect(wrapper.classes()).not.toContain('ix-divider-with-label-end')
  })

  test('plain work', async () => {
    const wrapper = DividerMount({ props: { label: 'label', plain: true } })

    expect(wrapper.classes()).toContain('ix-divider-plain')

    await wrapper.setProps({ plain: false })

    expect(wrapper.classes()).not.toContain('ix-divider-plain')

    await wrapper.setProps({ label: undefined, plain: true })

    expect(wrapper.classes()).not.toContain('ix-divider-plain')
  })

  test('size work', async () => {
    const wrapper = DividerMount({ props: { size: 'sm' } })

    expect(wrapper.classes()).toContain('ix-divider-sm')

    await wrapper.setProps({ size: 'lg' })

    expect(wrapper.classes()).toContain('ix-divider-lg')
  })

  test('vertical work', async () => {
    const wrapper = DividerMount({ props: { vertical: true } })

    expect(wrapper.classes()).toContain('ix-divider-vertical')

    await wrapper.setProps({ vertical: false })
    expect(wrapper.classes()).toContain('ix-divider-horizontal')
  })
})
