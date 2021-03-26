import { mount } from '@vue/test-utils'
import { ComponentOptions, watchEffect } from 'vue'
import { useAttrs } from '../src/useAttrs'

const getChildComp = (excludeOptions?: { keys?: string[]; listeners?: boolean }): ComponentOptions => {
  return {
    template: `<div></div>`,
    setup() {
      const attrs = useAttrs(excludeOptions)
      watchEffect(() => {
        console.log(Object.keys(attrs.value))
      })
    },
  }
}

const getWrapper = (Comp: ComponentOptions) => {
  return mount({
    components: { Comp },
    props: ['attrs'],
    template: `<Comp v-bind="attrs" />`,
  })
}

describe('useAttrs.ts', () => {
  test('basic work', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = getWrapper(getChildComp())

    expect(log).toBeCalledWith([])

    await wrapper.setProps({ attrs: { a: 'a', b: 'b', onClick: () => void 0 } })

    expect(log).toBeCalledWith(['a', 'b', 'onClick'])
  })

  test('exclude keys work', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = getWrapper(getChildComp({ keys: ['a', 'c'] }))

    expect(log).toBeCalledWith([])

    await wrapper.setProps({ attrs: { a: 'a', b: 'b', onClick: () => void 0 } })

    expect(log).toBeCalledWith(['b', 'onClick'])

    await wrapper.setProps({ attrs: { a: 'a', b: 'b', c: 'c', onClick: () => void 0 } })

    expect(log).toBeCalledWith(['b', 'onClick'])
  })

  test('exclude listeners work', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = getWrapper(getChildComp({ listeners: true }))

    expect(log).toBeCalledWith([])

    await wrapper.setProps({ attrs: { a: 'a', onClick: () => void 0 } })

    expect(log).toBeCalledWith(['a'])
  })
})
