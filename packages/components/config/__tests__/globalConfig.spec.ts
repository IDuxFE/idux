import { mount, flushPromises } from '@vue/test-utils'
import { createGlobalConfig, useGlobalConfig } from '../src/globalConfig'

const ChildComponent = {
  template: `<div>{{ config.size }}</div>`,
  setup() {
    const config = useGlobalConfig('button')
    return { config }
  },
}

const ParentComponent = {
  components: { ChildComponent },
  template: `<ChildComponent />`,
  setup() {
    const { changeConfig } = useGlobalConfig('button', { size: 'large' })
    return { changeConfig }
  },
}

describe('globalConfig.ts', () => {
  test('createGlobalConfig work', async () => {
    const config = createGlobalConfig({ button: { size: 'large' } })

    const wrapper = mount(ChildComponent, { global: { plugins: [config] } })

    expect(wrapper.text()).toEqual('large')
  })

  test('useGlobalConfig work', async () => {
    const wrapper = mount(ParentComponent)

    expect(wrapper.text()).toEqual('large')

    wrapper.vm.changeConfig({ size: 'small' })
    await flushPromises()

    expect(wrapper.text()).toEqual('small')
  })
})
