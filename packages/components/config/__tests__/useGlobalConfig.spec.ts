import { mount } from '@vue/test-utils'
import { ComponentOptions, nextTick } from 'vue'
import { useGlobalConfig } from '../src/useGlobalConfig'

const getComp = () => {
  return {
    template: `<div>{{ config.size }}</div>`,
    setup() {
      const config = useGlobalConfig('button')
      return { config }
    },
  }
}

const getApp = (Comp: ComponentOptions) => {
  return mount({
    components: { Comp },
    template: `<Comp />`,
    setup() {
      const config = useGlobalConfig('button', { size: 'large' })
      const changeConfig = () => (config.size = 'small')
      return { changeConfig }
    },
  })
}

describe('useGlobalConfig.ts', () => {
  test('GlobalConfig work', async () => {
    const wrapper = getApp(getComp())

    expect(wrapper.text()).toEqual('large')

    wrapper.vm.changeConfig()
    await nextTick()

    expect(wrapper.text()).toEqual('small')
  })
})
