/* eslint-disable camelcase */
import { flushPromises, mount } from '@vue/test-utils'
import { zh_CN, en_US } from '../src/locales'
import { addLocale, getLocale, useLocale } from '../src/useI18n'

const Comp = {
  template: `<div>{{globalLocale.placeholder}}</div>`,
  setup() {
    const globalLocale = getLocale('global')
    return { globalLocale }
  },
}

describe('useI18n.ts', () => {
  test('default zh-CN work', async () => {
    const wrapper = mount(Comp)
    expect(wrapper.text()).toEqual(zh_CN.global.placeholder)
  })

  test('addLocale work', async () => {
    const wrapper = mount(Comp)

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    useLocale('en-US')
    expect(warnSpy).toBeCalledTimes(1)

    addLocale(en_US)
    useLocale('en-US')
    await flushPromises()
    expect(wrapper.text()).toEqual(en_US.global.placeholder)

    addLocale([en_US, zh_CN])
    useLocale('zh-CN')
    await flushPromises()
    expect(wrapper.text()).toEqual(zh_CN.global.placeholder)
  })

  test('useLocale work', async () => {
    const wrapper = mount(Comp)

    useLocale(en_US)
    await flushPromises()
    expect(wrapper.text()).toEqual(en_US.global.placeholder)

    useLocale('zh-CN')
    await flushPromises()
    expect(wrapper.text()).toEqual(zh_CN.global.placeholder)
  })

  test('getLocale work', async () => {
    const i18n = getLocale()

    useLocale(en_US)
    await flushPromises()
    expect(i18n.value).toEqual(en_US)
  })
})
