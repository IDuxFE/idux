import { type MountingOptions, mount } from '@vue/test-utils'
import { h, ref } from 'vue'

import { renderWork } from '@tests'

import { IxIcon } from '@idux/components/icon'

import IxTagGroup from '../src/TagGroup'
import { TagGroupProps } from '../src/types'

describe('TagGroup', () => {
  const TagGroupMount = (options?: MountingOptions<Partial<TagGroupProps>>) => mount(IxTagGroup, { ...options })
  const dataSource = [
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
  ]

  renderWork(IxTagGroup, { props: { dataSource } })

  test('prop clickable work', async () => {
    const clickFn = vi.fn()
    const wrapper = TagGroupMount({ props: { dataSource, clickable: false, onClick: clickFn } })
    await wrapper.find('.ix-tag').trigger('click')
    expect(clickFn).toBeCalledTimes(0)
    expect(wrapper.find('.ix-tag-group-clickable').exists()).toBe(false)

    await wrapper.setProps({ clickable: true })
    await wrapper.find('.ix-tag').trigger('click')
    expect(clickFn).toBeCalledTimes(1)
    expect(clickFn.mock.calls[0][0]).toBe('a')
    expect(wrapper.find('.ix-tag-group-clickable').exists()).toBe(true)
  })

  test('prop activeKeys work', async () => {
    const activeKeys = ref([])
    const wrapper = mount({
      components: { IxTagGroup },
      template: `<IxTagGroup
        v-model:activeKeys="activeKeys"
        :clickable="true"
        :dataSource="dataSource">
      </IxTagGroup>`,
      setup() {
        return { activeKeys, dataSource }
      },
    })

    await wrapper.find('.ix-tag').trigger('click')
    expect(activeKeys.value.length).toBe(1)
    expect(activeKeys.value[0]).toBe('a')

    await wrapper.find('.ix-tag').trigger('click')
    expect(activeKeys.value.length).toBe(0)
  })

  test('prop dataSource work', async () => {
    const wrapper = TagGroupMount({ props: { dataSource } })

    expect(wrapper.findAll('.ix-tag').length).toBe(2)
    expect(wrapper.find('.ix-tag').text()).toBe('A')

    await wrapper.setProps({ dataSource: [{ label: 'ABC' }] })
    expect(wrapper.findAll('.ix-tag').length).toBe(1)
    expect(wrapper.find('.ix-tag').text()).toBe('ABC')
  })

  test('prop closable work', async () => {
    const closeFn = vi.fn()
    const wrapper = TagGroupMount({ props: { dataSource, onClose: closeFn } })
    expect(wrapper.find('.ix-icon-close').exists()).toBe(false)

    await wrapper.setProps({ closable: true })
    await wrapper.find('.ix-icon-close').trigger('click')
    expect(closeFn).toBeCalledTimes(1)
    expect(closeFn.mock.calls[0][0]).toBe('a')
  })

  test('prop gap work', async () => {
    const wrapper = TagGroupMount({ props: { dataSource, gap: 16 } })

    expect((wrapper.element as HTMLElement).style.gap).toBe('8px 16px')

    await wrapper.setProps({ gap: 15 })
    expect((wrapper.element as HTMLElement).style.gap).toBe('8px 15px')
  })

  test('prop wrap work', async () => {
    const wrapper = TagGroupMount({ props: { dataSource, wrap: true } })

    expect(wrapper.find('.ix-tag-group-nowrap').exists()).toBe(false)

    await wrapper.setProps({ wrap: false })
    expect(wrapper.find('.ix-tag-group-nowrap').exists()).toBe(true)
  })

  test('prop shape work', async () => {
    const wrapper = TagGroupMount({ props: { dataSource, shape: 'round' } })
    const tags = wrapper.findAll('.ix-tag')

    tags.forEach(item => expect(item.classes()).toContain('ix-tag-round'))

    await wrapper.setProps({ shape: 'rect' })
    tags.forEach(item => expect(item.classes()).toContain('ix-tag-rect'))
  })

  test('closeIcon slot work', () => {
    const wrapper = TagGroupMount({
      props: { closable: true, dataSource },
      slots: { closeIcon: () => h(IxIcon, { name: 'up' }) },
    })

    expect(wrapper.find('.ix-icon-close').exists()).not.toBe(true)
    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)
  })
})
