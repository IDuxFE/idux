import { MountingOptions, mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import { renderWork } from '@tests'

import IxInput from '../src/Input'
import { InputProps } from '../src/types'

describe('Input', () => {
  const InputMount = (options?: MountingOptions<Partial<InputProps>>) => mount(IxInput, { ...options })

  renderWork(IxInput)

  test('v-model work', async () => {
    const valueRef = ref('init value')
    const wrapper = mount({
      components: { IxInput },
      template: `<IxInput v-model:value="valueRef" />`,
      setup() {
        return { valueRef }
      },
    })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('init value')

    await input.setValue('input setValue')

    expect(valueRef.value).toBe('input setValue')

    valueRef.value = 'valueRef change'
    await nextTick()

    expect(input.element.value).toBe('valueRef change')

    input.element.value = '使用拼音'
    await input.trigger('compositionstart')

    expect(wrapper.emitted()).toHaveProperty('compositionstart')
    expect(valueRef.value).toBe('valueRef change')

    await input.trigger('input')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(valueRef.value).toBe('valueRef change')

    await input.trigger('compositionend')

    expect(wrapper.emitted()).toHaveProperty('compositionend')
    expect(valueRef.value).toBe('使用拼音')
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
