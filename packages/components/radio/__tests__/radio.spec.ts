import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { ref } from 'vue'
import IxRadio from '../src/Radio.vue'
import { RadioProps } from '../src/types'

describe.skip('Radio.vue', () => {
  let RadioMount: (options?: MountingOptions<Partial<RadioProps>>) => VueWrapper<InstanceType<typeof IxRadio>>

  beforeEach(() => {
    RadioMount = options => mount(IxRadio, { ...options })
  })

  test('render work', () => {
    const wrapper = RadioMount()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('radio checked work', async () => {
    const checked = ref(false)
    const wrapper = mount({
      components: { IxRadio },
      template: `<ix-radio v-model:checked="checked">A</ix-radio>`,
      setup() {
        return { checked }
      },
    })
    expect(wrapper.classes()).toContain('ix-radio')
    await wrapper.findAllComponents({ name: 'IxRadio' })[0].trigger('click')
    expect(wrapper.classes()).toContain('ix-radio-checked')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('radio name work', async () => {
    const checked = ref(false)
    const name = ref('name')
    const wrapper = mount({
      components: { IxRadio },
      template: `<ix-radio v-model:checked="checked" :name="name">A</ix-radio>`,
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

  test('radio value work', async () => {
    const wrapper = RadioMount({
      props: {
        value: 'value',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes()['value']).toEqual('value')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('radio disabled work', async () => {
    const wrapper = RadioMount({
      props: {
        disabled: false,
      },
    })
    expect(wrapper.classes()).not.toContain('ix-radio-disabled')
    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('ix-radio-disabled')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
