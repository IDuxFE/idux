import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import IxTag from '../src/Tag'
import { TagProps } from '../src/types'

describe('Tag', () => {
  const TagMount = (options?: MountingOptions<Partial<TagProps>>) => mount(IxTag, { ...options })

  renderWork(IxTag)

  test('tag work', () => {
    const wrapper = TagMount({ slots: { default: 'slot tag' } })

    expect(wrapper.find('.ix-tag-content').text()).toBe('slot tag')
  })

  test('isRound', () => {
    const wrapper = TagMount({ props: { isRound: true } })

    expect(wrapper.find('.ix-tag-round'))
  })

  test('color', () => {
    const wrapper = TagMount({ props: { color: 'red' } })

    expect(wrapper.find('.ix-tag-red'))
  })

  test('custom color', () => {
    const wrapper = TagMount({ props: { color: '#2db7f5' } })

    expect(wrapper.find('.ix-tag-has-color'))
  })

  test('closable', () => {
    const wrapper = TagMount({ props: { closable: true } })

    expect(wrapper.find('.ix-tag-close-icon'))
  })

  test('checked', async () => {
    const wrapper = TagMount({ props: { checkable: true, checked: true } })

    expect(wrapper.find('.ix-tag-checkable-checked'))
  })

  test('checkable false', async () => {
    const wrapper = TagMount({ props: { checkable: false, checked: true } })

    expect(wrapper.classes()).not.toContain('ix-tag-checkable-checked')
  })

  test('icon word', () => {
    const wrapper = TagMount({ props: { icon: 'down' } })

    expect(wrapper.find('.ix-icon-down').exists()).toBeTruthy()
  })

  test('icon slot word', () => {
    const wrapper = TagMount({ slots: { icon: 'slot tag icon' } })

    expect(wrapper.find('.ix-tag-icon').text()).toBe('slot tag icon')
  })
})
