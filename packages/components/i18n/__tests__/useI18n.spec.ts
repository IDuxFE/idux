/* eslint-disable camelcase */
import { flushPromises, mount } from '@vue/test-utils'

import enUS from '../src/locales/en-US'
import zhCN from '../src/locales/zh-CN'
import { addLocale, getLocale, useLocale } from '../src/useI18n'

const Comp = {
  template: `<div>{{emptyLocale.description}}</div>`,
  setup() {
    const emptyLocale = getLocale('empty')
    return { emptyLocale }
  },
}

describe('useI18n.ts', () => {
  test('default zh-CN work', async () => {
    const wrapper = mount(Comp)
    expect(wrapper.text()).toEqual(zhCN.empty.description)
  })

  test('addLocale work', async () => {
    const wrapper = mount(Comp)

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    useLocale('en-US')
    expect(warnSpy).toBeCalledTimes(1)

    addLocale(enUS)
    useLocale('en-US')
    await flushPromises()
    expect(wrapper.text()).toEqual(enUS.empty.description)

    addLocale([enUS, zhCN])
    useLocale('zh-CN')
    await flushPromises()
    expect(wrapper.text()).toEqual(zhCN.empty.description)
  })

  test('useLocale work', async () => {
    const wrapper = mount(Comp)

    useLocale(enUS)
    await flushPromises()
    expect(wrapper.text()).toEqual(enUS.empty.description)

    useLocale('zh-CN')
    await flushPromises()
    expect(wrapper.text()).toEqual(zhCN.empty.description)
  })

  test('getLocale work', async () => {
    const i18n = getLocale()

    useLocale(enUS)
    await flushPromises()
    expect(i18n.value).toEqual(enUS)
  })
})
