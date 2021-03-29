import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { ref } from 'vue'
import IxRadio from '../src/Radio.vue'
import IxRadioButton from '../src/RadioButton.vue'
import IxRadioGroup from '../src/RadioGroup.vue'
import { RadioGroupProps } from '../src/types'

describe.skip('RadioGroup.vue', () => {
  let RadioGroupMount: (
    options?: MountingOptions<Partial<RadioGroupProps>>,
  ) => VueWrapper<InstanceType<typeof IxRadioGroup>>

  beforeEach(() => {
    RadioGroupMount = options => mount(IxRadioGroup, { ...options })
  })
  test('render work', () => {
    const wrapper = RadioGroupMount()
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('radioGroup v-model -> child normal style work', async () => {
    const radioGroup = ref('a')
    const mockFn = jest.fn()
    const wrapper = mount({
      components: { IxRadioGroup, IxRadio },
      template: `<ix-radio-group v-model="radioGroup" @change="mockFn"><ix-radio value="a">a</ix-radio><ix-radio value="b">b</ix-radio></ix-radio-group>`,
      setup() {
        return { radioGroup, mockFn }
      },
    })
    expect(wrapper.classes()).toContain('ix-radio-group')
    expect(mockFn).toBeCalledTimes(0)
    await wrapper.findAllComponents({ name: 'IxRadio' })[1].trigger('click')
    expect(mockFn).toBeCalledTimes(1)
  })
  test('radioGroup v-model -> child button style work', async () => {
    const radioGroup = ref('a')
    const mockFn = jest.fn()
    const wrapper = mount({
      components: { IxRadioGroup, IxRadioButton },
      template: `<ix-radio-group v-model="radioGroup" @change="mockFn"><ix-radio-button value="a">a</ix-radio-button><ix-radio-button value="b">b</ix-radio-button></ix-radio-group>`,
      setup() {
        return { radioGroup, mockFn }
      },
    })
    expect(wrapper.classes()).toContain('ix-radio-group')
    expect(mockFn).toBeCalledTimes(0)
    await wrapper.findAllComponents({ name: 'IxRadioButton' })[1].trigger('click')
    expect(mockFn).toBeCalledTimes(1)
  })

  test('radioGroup size work', async () => {
    const radioGroup = ref('a')
    const wrapper = mount({
      components: { IxRadioGroup, IxRadioButton },
      template: `<ix-radio-group v-model="radioGroup" size="medium"><ix-radio-button value="a">a</ix-radio-button><ix-radio-button value="b">b</ix-radio-button></ix-radio-group>`,
      setup() {
        return { radioGroup }
      },
    })
    expect(wrapper.classes()).toContain('ix-radio-group')
    const IxRadioButtonCmp = wrapper.findAllComponents({ name: 'IxRadioButton' })[0]
    expect(IxRadioButtonCmp.classes()).toContain('ix-radio-button-medium')
    const sizes = ['large', 'medium', 'small']
    for (let index = 0; index < sizes.length; index++) {
      const size = sizes[index]
      await wrapper.setProps({
        size,
      })
      expect(IxRadioButtonCmp.classes()).toContain(`ix-radio-button-${size}`)
    }
  })
  test('radioGroup mode work', async () => {
    const radioGroup = ref('a')
    const wrapper = mount({
      components: { IxRadioGroup, IxRadioButton },
      template: `<ix-radio-group v-model="radioGroup" mode="border"><ix-radio-button value="a">a</ix-radio-button><ix-radio-button value="b">b</ix-radio-button></ix-radio-group>`,
      setup() {
        return { radioGroup }
      },
    })
    expect(wrapper.classes()).toContain('ix-radio-group')
    const IxRadioButtonCmp = wrapper.findAllComponents({ name: 'IxRadioButton' })[0]
    expect(IxRadioButtonCmp.classes()).toContain('ix-radio-button-border')
    const modes = ['border', 'fill']
    for (let index = 0; index < modes.length; index++) {
      const mode = modes[index]
      await wrapper.setProps({
        mode,
      })
      expect(IxRadioButtonCmp.classes()).toContain(`ix-radio-button-${mode}`)
    }
  })
  test('radioGroup disabled -> child button style work', async () => {
    const radioGroup = ref('a')
    const wrapper = mount({
      components: { IxRadioGroup, IxRadioButton },
      template: `<ix-radio-group v-model="radioGroup" mode="border" :disabled="false"><ix-radio-button value="a">a</ix-radio-button><ix-radio-button value="b">b</ix-radio-button></ix-radio-group>`,
      setup() {
        return { radioGroup }
      },
    })
    expect(wrapper.classes()).toContain('ix-radio-group')
    const IxRadioButtonCmp = wrapper.findAllComponents({ name: 'IxRadioButton' })[0]
    expect(IxRadioButtonCmp.classes()).not.toContain('ix-radio-button-disabled')
    await wrapper.setProps({
      disabled: true,
    })
    expect(IxRadioButtonCmp.classes()).toContain('ix-radio-button-disabled')
  })

  test('radioGroup disabled -> child normal style work', async () => {
    const radioGroup = ref('a')
    const wrapper = mount({
      components: { IxRadioGroup, IxRadio },
      template: `<ix-radio-group v-model="radioGroup" mode="border" :disabled="false"><ix-radio value="a">a</ix-radio><ix-radio value="b">b</ix-radio></ix-radio-group>`,
      setup() {
        return { radioGroup }
      },
    })
    expect(wrapper.classes()).toContain('ix-radio-group')
    const IxRadioButtonCmp = wrapper.findAllComponents({ name: 'IxRadio' })[0]
    expect(IxRadioButtonCmp.classes()).not.toContain('ix-radio-disabled')
    await wrapper.setProps({
      disabled: true,
    })
    expect(IxRadioButtonCmp.classes()).toContain('ix-radio-disabled')
  })
})
