import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { ref } from 'vue'
import IxRadioButton from '../src/RadioButton.vue'
import { RadioButtonProps } from '../src/types'

describe.skip('RadioButton.vue', () => {
  let RadioButtonMount: (
    options?: MountingOptions<Partial<RadioButtonProps>>,
  ) => VueWrapper<InstanceType<typeof IxRadioButton>>

  beforeEach(() => {
    RadioButtonMount = options => mount(IxRadioButton, { ...options })
  })

  test('render work', () => {
    const wrapper = RadioButtonMount()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('radioButton checked work', async () => {
    const checked = ref(false)
    const wrapper = mount({
      components: { IxRadioButton },
      template: `<ix-radio-button v-model:checked="checked">A</ix-radio-button>`,
      setup() {
        return { checked }
      },
    })
    expect(wrapper.classes()).toContain('ix-radio-button')
    await wrapper.findAllComponents({ name: 'IxRadioButton' })[0].trigger('click')
    expect(wrapper.classes()).toContain('ix-radio-button-checked')
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('radioButton name work', async () => {
    const checked = ref(false)
    const name = ref('name')
    const wrapper = mount({
      components: { IxRadioButton },
      template: `<ix-radio-button v-model:checked="checked" :name="name">A</ix-radio-button>`,
      setup() {
        return { checked, name }
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes()['name']).toEqual('name')
    await wrapper.setProps({
      name: 'radio',
    })
    expect(input.attributes()['name']).toEqual('radio')
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('radioButton value work', async () => {
    const wrapper = RadioButtonMount({
      props: {
        value: 'value',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes()['value']).toEqual('value')
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('radioButton disabled work', async () => {
    const wrapper = RadioButtonMount({
      props: {
        disabled: false,
      },
    })
    expect(wrapper.classes()).not.toContain('ix-radio-button-disabled')
    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('ix-radio-button-disabled')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
