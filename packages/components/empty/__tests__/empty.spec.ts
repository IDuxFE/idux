import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxIcon } from '@idux/components/icon'

import IxEmpty from '../src/Empty'
import { EmptyProps } from '../src/types'

describe('Empty', () => {
  const EmptyMount = (options?: MountingOptions<Partial<EmptyProps>>) => mount(IxEmpty, { ...options })

  renderWork(IxEmpty)

  test('description work', async () => {
    const description = 'my description'
    const wrapper = EmptyMount({ props: { description } })

    expect(wrapper.find('.ix-empty-description').text()).toBe(description)
  })

  test('description with slot work', async () => {
    const descriptionSlot = 'description slots'
    const wrapper = EmptyMount({
      props: { description: 'description props' },
      slots: { description: () => descriptionSlot },
    })

    expect(wrapper.find('.ix-empty-description').text()).toBe(descriptionSlot)
  })

  test('icon work', async () => {
    const wrapper = EmptyMount({ props: { icon: 'up' } })
    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)

    await wrapper.setProps({ icon: 'down' })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)

    await wrapper.setProps({ icon: h(IxIcon, { name: 'left' }) })

    expect(wrapper.find('.ix-icon-left').exists()).toBe(true)
  })

  test('image work', async () => {
    const wrapper = EmptyMount()
    expect(wrapper.find('.ix-icon-empty').exists()).toBe(true)

    await wrapper.setProps({ image: 'image.url' })

    expect(wrapper.find('.ix-icon-empty').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(true)
  })

  test('default slot work', async () => {
    const content = 'content'
    const wrapper = EmptyMount({ slots: { default: () => content } })
    expect(wrapper.find('.ix-empty-content').text()).toBe(content)
  })
})
