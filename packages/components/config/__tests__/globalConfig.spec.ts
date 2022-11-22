import { flushPromises, mount } from '@vue/test-utils'

import { createGlobalConfig, useGlobalConfig } from '../src/globalConfig'

const ChildComponent = {
  template: `<div>{{ config.size }}</div>`,
  setup() {
    const config = useGlobalConfig('form')
    return { config }
  },
}

const ParentComponent = {
  components: { ChildComponent },
  template: `<ChildComponent />`,
  setup() {
    const [, changeConfig] = useGlobalConfig('form', {})
    return { changeConfig }
  },
}

describe('globalConfig', () => {
  test('createGlobalConfig work', async () => {
    const config = createGlobalConfig({ form: { size: 'lg' } })

    const wrapper = mount(ChildComponent, { global: { plugins: [config] } })

    expect(wrapper.text()).toEqual('lg')
  })

  test('useGlobalConfig work', async () => {
    const wrapper = mount(ParentComponent)

    expect(wrapper.text()).toEqual('md')

    wrapper.vm.changeConfig({ size: 'sm' })
    await flushPromises()

    expect(wrapper.text()).toEqual('sm')
  })
})
