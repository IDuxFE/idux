import { renderWork } from '@tests'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import IxCheckbox from '../src/Checkbox.vue'

describe('Checkbox', () => {
  renderWork(IxCheckbox)

  test('checked(v-model) work', async () => {
    const checked = ref(false)
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked" />`,
      setup() {
        return { checked }
      },
    })

    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(false)

    checked.value = true

    await nextTick()
    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(true)

    await wrapper.find('input').setValue(false)

    expect(checked.value).toBe(false)
    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(false)
  })

  test('no checked(v-model) work', async () => {
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox />`,
    })

    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(false)

    await wrapper.find('input').setValue(true)

    expect(wrapper.find('.ix-checkbox-checked').exists()).toBe(true)
  })

  test('trueValue and falseValue work', async () => {
    const checked = ref('yes')
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked" trueValue="yes" falseValue="no" />`,
      setup() {
        return { checked }
      },
    })

    await wrapper.find('input').setValue(false)

    expect(checked.value).toBe('no')
  })

  test('disabled work', async () => {
    const checked = ref(true)
    const disabled = ref(true)
    const mockFn = jest.fn()
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked" :disabled="disabled" @change="mockFn" />`,
      setup() {
        return { checked, disabled, mockFn }
      },
    })

    expect(wrapper.classes()).toContain('ix-checkbox-disabled')

    await wrapper.find('input').setValue(true)

    expect(wrapper.classes()).toContain('ix-checkbox-disabled')
    expect(checked.value).toBe(true)
    expect(mockFn).toBeCalledTimes(0)

    disabled.value = false

    await nextTick()

    expect(wrapper.classes()).not.toContain('ix-checkbox-disabled')

    await wrapper.find('input').setValue(false)

    expect(checked.value).toBe(false)
    expect(mockFn).toBeCalledTimes(1)
  })

  test('readonly work', async () => {
    const checked = ref(true)
    const readonly = ref(true)
    const focusFn = jest.fn()
    const changeFn = jest.fn()
    const wrapper = mount(
      {
        components: { IxCheckbox },
        template: `<ix-checkbox v-model:checked="checked" :readonly="readonly" @change="changeFn" @focus="focusFn" />`,
        setup() {
          return { checked, readonly, changeFn, focusFn }
        },
      },
      { attachTo: 'body' },
    )

    expect(wrapper.classes()).toContain('ix-checkbox-readonly')

    // Readonly is not a native property of the checkbox.
    // It prevents the default behavior in click when implementing, so change will not be triggered.
    // Therefore, change event is not simulated here.
    await wrapper.find('input').trigger('click')

    expect(wrapper.classes()).toContain('ix-checkbox-readonly')
    expect(checked.value).toBe(true)
    expect(changeFn).toBeCalledTimes(0)

    await wrapper.getComponent(IxCheckbox).vm.focus()
    expect(focusFn).toBeCalledTimes(0)

    readonly.value = false

    await nextTick()

    expect(wrapper.classes()).not.toContain('ix-checkbox-readonly')

    await wrapper.find('input').setValue(false)
    expect(checked.value).toBe(false)
    expect(changeFn).toBeCalledTimes(1)

    await wrapper.getComponent(IxCheckbox).vm.focus()
    expect(focusFn).toBeCalledTimes(1)
  })

  test('indeterminate work', async () => {
    const checked = ref(true)
    const indeterminate = ref(true)
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox v-model:checked="checked" :indeterminate="indeterminate" />`,
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
      template: `<ix-checkbox v-model:checked="checked" @change="mockFn" />`,
      setup() {
        return { checked, mockFn }
      },
    })

    expect(mockFn).toBeCalledTimes(0)

    await wrapper.find('input').setValue(false)

    expect(mockFn).toBeCalledTimes(1)
  })

  test('original checkbox attributes work', async () => {
    const wrapper = mount({
      components: { IxCheckbox },
      template: `<ix-checkbox name="checkboxName" value="checkboxValue" tabindex="1" class="checkox" style="color: red;" />`,
    })

    const checkboxWrapper = wrapper.find('.ix-checkbox')
    const originalInput = wrapper.find('input')
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

  test('focus & blur method work', async () => {
    const focusFn = jest.fn()
    const blurFn = jest.fn()
    const wrapper = mount(
      {
        components: { IxCheckbox },
        attachTo: '.ix-checkbox',
        template: `<ix-checkbox ref="component" @focus="focusFn" @blur="blurFn" />`,
        setup() {
          return { focusFn, blurFn }
        },
      },
      { attachTo: 'body' },
    )

    await wrapper.getComponent(IxCheckbox).vm.focus()

    expect(focusFn).toBeCalledTimes(1)

    await wrapper.getComponent(IxCheckbox).vm.blur()

    expect(blurFn).toBeCalledTimes(1)
  })
})
