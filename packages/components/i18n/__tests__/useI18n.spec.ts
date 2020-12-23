/* eslint-disable camelcase */
import { flushPromises, mount } from '@vue/test-utils'
import { es_ES, en_US, zh_CN } from '../languages'
import { addI18n, getI18n, useI18n } from '../useI18n'

const Comp = {
  template: `<div>{{globalI18n.placeholder}}</div>`,
  setup() {
    const globalI18n = getI18n('global')
    return { globalI18n }
  },
}

describe('useI18n.ts', () => {
  test('default zh_CN work', async () => {
    const wrapper = mount(Comp)
    expect(wrapper.text()).toEqual(zh_CN.global.placeholder)
  })

  test('addI18n work', async () => {
    const wrapper = mount(Comp)
    addI18n(es_ES)
    useI18n('es_ES')
    await flushPromises()

    expect(wrapper.text()).toEqual(es_ES.global.placeholder)

    addI18n([en_US, zh_CN])
    useI18n('en_US')
    await flushPromises()
    expect(wrapper.text()).toEqual(en_US.global.placeholder)
  })

  test('useI18n work', async () => {
    const wrapper = mount(Comp)
    useI18n(es_ES)
    await flushPromises()

    expect(wrapper.text()).toEqual(es_ES.global.placeholder)

    useI18n('zh-CN')
    await flushPromises()
    expect(wrapper.text()).toEqual(zh_CN.global.placeholder)

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    useI18n('zh-TW')
    expect(warnSpy).toBeCalledTimes(1)
  })

  test('getI18n work', async () => {
    const i18n = getI18n()

    expect(i18n.value).toEqual(zh_CN)
  })
})
