import { MountingOptions, mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import { renderWork } from '@tests'

import IxInput from '../src/Input'
import { InputProps } from '../src/types'

describe('Input', () => {
  const InputMount = (options?: MountingOptions<Partial<InputProps>>) => mount(IxInput, { ...options })

  renderWork(IxInput)

  test('v-model work', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = InputMount({ props: { value: 'init value', 'onUpdate:value': onUpdateValue } })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('init value')

    await input.setValue('input setValue')

    expect(onUpdateValue).toBeCalledTimes(1)
    expect(onUpdateValue).toBeCalledWith('input setValue')

    await wrapper.setProps({ value: 'wrapper setProps' })

    expect(input.element.value).toBe('wrapper setProps')

    input.element.value = '使用拼音'
    await input.trigger('compositionstart')

    expect(wrapper.emitted()).toHaveProperty('compositionstart')
    expect(onUpdateValue).toBeCalledTimes(1)

    await input.trigger('input')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(onUpdateValue).toBeCalledTimes(1)

    await input.trigger('compositionend')

    expect(wrapper.emitted()).toHaveProperty('compositionend')
    expect(onUpdateValue).toBeCalledTimes(2)
    expect(onUpdateValue).toBeCalledWith('使用拼音')
  })

  test('controlled value work', async () => {
    const wrapper = InputMount({ props: { value: 'init value' } })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('init value')

    // don't trigger change
    await input.setValue('input setValue')
    await nextTick()

    expect(input.element.value).toBe('init value')

    await wrapper.setProps({ value: 'updated value' })

    expect(input.element.value).toBe('updated value')
  })

  test('disabled work', async () => {
    const wrapper = InputMount({ props: { disabled: true } })
    expect(wrapper.classes()).toContain('ix-input-disabled')

    await wrapper.setProps({ disabled: false })

    expect(wrapper.classes()).not.toContain('ix-input-disabled')
  })
})
