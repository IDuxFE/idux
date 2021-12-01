/* eslint-disable camelcase */
import { flushPromises, mount } from '@vue/test-utils'

import { en_US, zh_CN } from '../src/locales'
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
    expect(wrapper.text()).toEqual(zh_CN.empty.description)
  })

  test('addLocale work', async () => {
    const wrapper = mount(Comp)

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    useLocale('en-US')
    expect(warnSpy).toBeCalledTimes(1)

    addLocale(en_US)
    useLocale('en-US')
    await flushPromises()
    expect(wrapper.text()).toEqual(en_US.empty.description)

    addLocale([en_US, zh_CN])
    useLocale('zh-CN')
    await flushPromises()
    expect(wrapper.text()).toEqual(zh_CN.empty.description)
  })

  test('useLocale work', async () => {
    const wrapper = mount(Comp)

    useLocale(en_US)
    await flushPromises()
    expect(wrapper.text()).toEqual(en_US.empty.description)

    useLocale('zh-CN')
    await flushPromises()
    expect(wrapper.text()).toEqual(zh_CN.empty.description)
  })

  test('getLocale work', async () => {
    const i18n = getLocale()

    useLocale(en_US)
    await flushPromises()
    expect(i18n.value).toEqual(en_US)
  })
})
