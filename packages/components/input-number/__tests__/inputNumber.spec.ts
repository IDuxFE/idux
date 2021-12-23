import { MountingOptions, mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import { renderWork } from '@tests'

import InputNumber from '../src/InputNumber'
import { InputNumberProps } from '../src/types'

describe('InputNumber', () => {
  const InputNumberMount = (options?: MountingOptions<Partial<InputNumberProps>>) => mount(InputNumber, { ...options })

  renderWork(InputNumber)

  test('v-model work', async () => {
    const valueRef = ref(1)
    const wrapper = mount({
      components: { InputNumber },
      template: `<InputNumber v-model:value="valueRef" />`,
      setup() {
        return { valueRef }
      },
    })
    const input = wrapper.find('input')

    expect(input.element.value).toBe(valueRef.value.toString())

    await input.setValue(10)

    expect(valueRef.value).toBe(10)

    valueRef.value = 5
    await nextTick()

    expect(input.element.value).toBe(valueRef.value.toString())
  })

  test('controlled value work', async () => {
    const wrapper = InputNumberMount({ props: { value: 1 } })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('1')

    await input.setValue(10)
    await nextTick()

    expect(input.element.value).toBe('1')
  })

  test('disabled work', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = InputNumberMount({ props: { disabled: true, 'onUpdate:value': onUpdateValue } })

    await wrapper.find('.ix-input-number-increase').trigger('click')

    expect(onUpdateValue).not.toBeCalled()

    await wrapper.setProps({ disabled: false })
    await wrapper.find('.ix-input-number-increase').trigger('click')

    expect(onUpdateValue).toBeCalled()
  })

  test('readonly work', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = InputNumberMount({ props: { readonly: true, 'onUpdate:value': onUpdateValue } })

    await wrapper.find('.ix-input-number-increase').trigger('click')

    expect(onUpdateValue).not.toBeCalled()

    await wrapper.setProps({ readonly: false })
    await wrapper.find('.ix-input-number-increase').trigger('click')

    expect(onUpdateValue).toBeCalled()
  })

  test('step work', async () => {
    const valueRef = ref(1)
    const wrapper = mount({
      components: { InputNumber },
      template: `<InputNumber v-model:value="valueRef" />`,
      setup() {
        return { valueRef }
      },
    })

    await wrapper.find('.ix-input-number-decrease').trigger('click')

    expect(valueRef.value).toBe(0)

    await wrapper.find('.ix-input-number-increase').trigger('click')

    expect(valueRef.value).toBe(1)
  })

  test('precision work', async () => {
    const wrapper = InputNumberMount({ props: { value: 1, precision: 2 } })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('1.00')
  })

  test('keyboard work', async () => {
    const valueRef = ref(1)
    const wrapper = mount({
      components: { InputNumber },
      template: `<InputNumber v-model:value="valueRef" :keyboard="false" />`,
      setup() {
        return { valueRef }
      },
    })
    const input = wrapper.find('input')

    await input.trigger('focus')
    await input.trigger('keydown', { code: 'ArrowUp' })

    expect(input.element.value).toBe('1')
    expect(valueRef.value).toBe(1)

    await input.trigger('keydown', { code: 'ArrowDown' })

    expect(input.element.value).toBe('1')
    expect(valueRef.value).toBe(1)

    await wrapper.setProps({ keyboard: true })

    await input.trigger('keydown', { code: 'ArrowUp' })

    expect(input.element.value).toBe('2')
    expect(valueRef.value).toBe(2)

    await input.trigger('keydown', { code: 'ArrowDown' })

    expect(input.element.value).toBe('1')
    expect(valueRef.value).toBe(1)
  })
})
