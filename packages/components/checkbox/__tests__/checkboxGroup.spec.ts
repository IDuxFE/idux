import { mount } from '@vue/test-utils'
import CheckboxGroup from '../src/CheckboxGroup.vue'
import Checkbox from '../src/Checkbox.vue'
import { nextTick, Ref, ref } from 'vue'
import { renderWork } from '@tests'

const TestComponent = {
  components: { CheckboxGroup, Checkbox },
  template: `
  <checkbox-group>
    <checkbox value="option1" />
    <checkbox value="option2" />
    <checkbox value="option3" />
  </checkbox-group>
  `,
}

describe('CheckboxGroup.vue and Checkbox', () => {
  renderWork(TestComponent)

  test('value(v-model) work', async () => {
    const value = ref([]) as Ref<string[]>
    const wrapper = mount({
      components: { CheckboxGroup, Checkbox },
      template: `
      <checkbox-group v-model:value="value">
        <checkbox value="option1" />
        <checkbox value="option2" />
        <checkbox value="option3" />
      </checkbox-group>
      `,
      setup() {
        return { value }
      },
    })

    expect(wrapper.findAll('.ix-checkbox-checked').length).toBe(0)

    value.value = ['option1']

    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxCheckbox' })[0].classes()).toContain('ix-checkbox-checked')

    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').setValue(false)
    expect(value.value).toEqual([])
  })

  test('no value(v-model) work', async () => {
    const wrapper = mount({
      components: { CheckboxGroup, Checkbox },
      template: `
      <checkbox-group>
        <checkbox value="option1" />
        <checkbox value="option2" />
        <checkbox value="option3" />
      </checkbox-group>
      `,
      setup() {
        return {}
      },
    })

    expect(wrapper.findAll('.ix-checkbox-checked').length).toBe(0)

    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').setValue(true)

    expect(wrapper.findAllComponents({ name: 'IxCheckbox' })[0].classes()).toContain('ix-checkbox-checked')
  })

  test('change event work', async () => {
    const mockFn = jest.fn()
    const wrapper = mount({
      components: { CheckboxGroup, Checkbox },
      template: `
      <checkbox-group @change="mockFn">
        <checkbox value="option1" />
        <checkbox value="option2" />
        <checkbox value="option3" />
      </checkbox-group>
      `,
      setup() {
        return { mockFn }
      },
    })

    expect(mockFn).toBeCalledTimes(0)

    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').setValue(true)

    expect(mockFn).toBeCalledTimes(1)
  })

  test('disabled work', async () => {
    const value = ref([]) as Ref<string[]>
    const disabled = ref(true)
    const mockFn = jest.fn()
    const wrapper = mount({
      components: { CheckboxGroup, Checkbox },
      template: `
      <checkbox-group v-model:value="value" :disabled="disabled" @change="mockFn">
        <checkbox value="option1" />
        <checkbox value="option2" />
        <checkbox value="option3" />
      </checkbox-group>
      `,
      setup() {
        return { value, disabled, mockFn }
      },
    })

    expect(wrapper.findAll('.ix-checkbox-disabled').length).toBe(3)
    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').trigger('click')
    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').trigger('change')
    expect(value.value).toEqual([])
    expect(mockFn).toBeCalledTimes(0)

    disabled.value = false

    await nextTick()

    expect(wrapper.findAll('.ix-checkbox-disabled').length).toBe(0)

    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').trigger('click')
    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').trigger('change')
    expect(value.value).toEqual(['option1'])
    expect(mockFn).toBeCalledTimes(1)
  })

  test('readonly work', async () => {
    const value = ref([]) as Ref<string[]>
    const readonly = ref(true)
    const mockFn = jest.fn()
    const wrapper = mount({
      components: { CheckboxGroup, Checkbox },
      template: `
      <checkbox-group v-model:value="value" :readonly="readonly" @change="mockFn">
        <checkbox value="option1" />
        <checkbox value="option2" />
        <checkbox value="option3" />
      </checkbox-group>
      `,
      setup() {
        return { value, readonly, mockFn }
      },
    })

    expect(wrapper.findAll('.ix-checkbox-readonly').length).toBe(3)
    // Readonly is not a native property of the checkbox.
    // It prevents the default behavior in click when implementing, so change will not be triggered.
    // Therefore, change event is not simulated here.
    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').trigger('click')
    expect(value.value).toEqual([])
    expect(mockFn).toBeCalledTimes(0)

    readonly.value = false

    await nextTick()

    expect(wrapper.findAll('.ix-checkbox-readonly').length).toBe(0)

    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').trigger('click')
    await wrapper.findAllComponents({ name: 'IxCheckbox' })[0].find('input').trigger('change')
    expect(value.value).toEqual(['option1'])
    expect(mockFn).toBeCalledTimes(1)
  })

  test('name work', async () => {
    const wrapper = mount({
      components: { CheckboxGroup, Checkbox },
      template: `
      <checkbox-group name="group">
        <checkbox value="option1" name="child" />
        <checkbox value="option2" />
        <checkbox value="option3" />
      </checkbox-group>
      `,
      setup() {
        return {}
      },
    })

    expect(wrapper.findAll('input[name=group]').length).toBe(2)
    expect(wrapper.findAll('input[name=child]').length).toBe(1)
  })
})
