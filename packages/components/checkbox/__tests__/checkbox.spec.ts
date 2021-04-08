import { renderWork } from '@tests'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import IxCheckbox from '../src/Checkbox.vue'

describe.skip('Checkbox.vue', () => {
  renderWork(IxCheckbox)

  test('checked(v-model) work', async () => {
    const checked = ref(false)
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked">option</ix-checkbox>`,
      setup() {
        return { checked }
      },
    })

    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(false)

    checked.value = true

    await nextTick()
    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(true)

    await wrapper.trigger('click')

    expect(checked.value).toBe(false)
    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(false)
  })

  test('no checked(v-model) work', async () => {
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox>option</ix-checkbox>`,
    })

    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(false)

    await wrapper.trigger('click')

    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(true)
  })

  test('trueValue and falseValue work', async () => {
    const checked = ref('yes')
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked" trueValue="yes" falseValue="no">option</ix-checkbox>`,
      setup() {
        return { checked }
      },
    })

    await wrapper.trigger('click')

    expect(checked.value).toBe('no')
  })

  test('disabled work', async () => {
    const checked = ref(true)
    const disabled = ref(true)
    const mockFn = jest.fn()
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked" :disabled="disabled" @change="mockFn">option</ix-checkbox>`,
      setup() {
        return { checked, disabled, mockFn }
      },
    })

    expect(wrapper.classes()).toContain('ix-checkbox-disabled')

    await wrapper.trigger('click')

    expect(wrapper.classes()).toContain('ix-checkbox-disabled')
    expect(checked.value).toBe(true)
    expect(mockFn).toBeCalledTimes(0)

    disabled.value = false

    await nextTick()

    expect(wrapper.classes()).not.toContain('ix-checkbox-disabled')

    await wrapper.trigger('click')

    expect(checked.value).toBe(false)
    expect(mockFn).toBeCalledTimes(1)
  })

  test('readonly work', async () => {
    const checked = ref(true)
    const readonly = ref(true)
    const mockFn = jest.fn()
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked" :readonly="readonly" @change="mockFn">option</ix-checkbox>`,
      setup() {
        return { checked, readonly, mockFn }
      },
    })

    expect(wrapper.classes()).toContain('ix-checkbox-readonly')

    await wrapper.trigger('click')

    expect(wrapper.classes()).toContain('ix-checkbox-readonly')
    expect(checked.value).toBe(true)
    expect(mockFn).toBeCalledTimes(0)

    readonly.value = false

    await nextTick()

    expect(wrapper.classes()).not.toContain('ix-checkbox-readonly')

    await wrapper.trigger('click')
    expect(checked.value).toBe(false)
    expect(mockFn).toBeCalledTimes(1)
  })

  test('indeterminate work', async () => {
    const checked = ref(true)
    const indeterminate = ref(true)
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked" :indeterminate="indeterminate">option</ix-checkbox>`,
      setup() {
        return { checked, indeterminate }
      },
    })

    expect(wrapper.classes()).toContain('ix-checkbox-indeterminate')
    expect(wrapper.classes()).not.toContain('ix-checkbox-checked')

    indeterminate.value = false

    await nextTick()

    expect(wrapper.classes()).not.toContain('ix-checkbox-indeterminate')
    expect(wrapper.classes()).toContain('ix-checkbox-checked')
  })

  test('change event work', async () => {
    const checked = ref(true)
    const mockFn = jest.fn()
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked" @change="mockFn">option</ix-checkbox>`,
      setup() {
        return { checked, mockFn }
      },
    })

    expect(mockFn).toBeCalledTimes(0)

    await wrapper.trigger('click')

    expect(mockFn).toBeCalledTimes(1)
  })

  test('original checkbox attributes work', async () => {
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox name="checkboxName" value="checkboxValue" tabindex="1" class="checkox" style="color: red;">option</ix-checkbox>`,
    })

    const checkboxWrapper = wrapper.find('.ix-checkbox')
    const originalInput = wrapper.find("input[type='checkbox']")
    const input = wrapper.find('.ix-checkbox-inner')

    expect(checkboxWrapper.classes()).toContain('checkox')
    expect(checkboxWrapper.attributes()['style']).toEqual('color: red;')
    expect(checkboxWrapper.attributes()['name']).not.toBeDefined()
    expect(checkboxWrapper.attributes()['value']).not.toBeDefined()
    expect(checkboxWrapper.attributes()['tabindex']).not.toBeDefined()

    expect(originalInput.attributes()['name']).toEqual('checkboxName')
    expect(originalInput.attributes()['value']).toEqual('checkboxValue')
    expect(originalInput.classes()).not.toContain('checkox')
    expect(originalInput.attributes()['style']).not.toEqual('color: red;')

    expect(input.attributes()['tabindex']).toEqual('1')
  })
})
