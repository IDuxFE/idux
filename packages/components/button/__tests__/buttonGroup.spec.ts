import { mount } from '@vue/test-utils'
import ButtonGroup from '../src/ButtonGroup.vue'
import Button from '../src/Button.vue'
import { renderWork } from '@tests'

const TestComponent = {
  components: { ButtonGroup, Button },
  template: `
  <ButtonGroup :mode="mode" :size="size" :shape="shape">
    <Button>default</Button>
    <Button mode="primary">primary</Button>
    <Button size="large">large</Button>
    <Button shape="circle">circle</Button>
  </ButtonGroup>
  `,
  props: {
    mode: String,
    size: String,
    shape: String,
  },
}

describe('ButtonGroup.vue', () => {
  renderWork(TestComponent)

  test('mode work', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.findAll('.ix-button-primary').length).toBe(1)
    expect(wrapper.findAll('.ix-button-dashed').length).toBe(0)

    await wrapper.setProps({ mode: 'dashed' })

    expect(wrapper.findAll('.ix-button-primary').length).toBe(1)
    expect(wrapper.findAll('.ix-button-dashed').length).toBe(3)
  })

  test('size work', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.findAll('.ix-button-large').length).toBe(1)
    expect(wrapper.findAll('.ix-button-small').length).toBe(0)

    await wrapper.setProps({ size: 'small' })

    expect(wrapper.findAll('.ix-button-large').length).toBe(1)
    expect(wrapper.findAll('.ix-button-small').length).toBe(3)
  })

  test('shape work', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.findAll('.ix-button-circle').length).toBe(1)
    expect(wrapper.findAll('.ix-button-round').length).toBe(0)

    await wrapper.setProps({ shape: 'round' })

    expect(wrapper.findAll('.ix-button-circle').length).toBe(1)
    expect(wrapper.findAll('.ix-button-round').length).toBe(3)
  })
})
