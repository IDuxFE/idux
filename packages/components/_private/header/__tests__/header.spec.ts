import type { HeaderProps } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'

import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'

import Header from '../src/Header'

describe('Header', () => {
  const HeaderMount = (options?: MountingOptions<Partial<HeaderProps>>) =>
    mount(Header, { ...options } as MountingOptions<HeaderProps>)

  renderWork<HeaderProps>(Header, { props: { header: 'Header title', closable: true, closeIcon: 'close' } })

  test('closable work', async () => {
    const onClose = vi.fn()
    const wrapper = HeaderMount({ props: { closable: true, closeIcon: 'close', onClose } })

    expect(wrapper.find('.ix-header-suffix').exists()).toBe(true)

    await wrapper.find('.ix-header-suffix').trigger('click')

    expect(onClose).toBeCalled()

    await wrapper.setProps({ closable: false })

    expect(wrapper.isVisible()).toBe(false)
  })

  test('closeIcon work', async () => {
    const wrapper = HeaderMount({ props: { closable: true, closeIcon: 'up' } })

    expect(wrapper.find('.ix-header-suffix').find('.ix-icon-up').exists()).toBe(true)

    await wrapper.setProps({ closeIcon: 'down' })

    expect(wrapper.find('.ix-header-suffix').find('.ix-icon-up').exists()).toBe(false)
    expect(wrapper.find('.ix-header-suffix').find('.ix-icon-down').exists()).toBe(true)
  })

  test('closeIcon slot work', async () => {
    const wrapper = HeaderMount({
      props: { closable: true, closeIcon: 'up' },
      slots: { closeIcon: () => h(IxIcon, { name: 'down' }) },
    })

    expect(wrapper.find('.ix-header-suffix').find('.ix-icon-up').exists()).toBe(false)
    expect(wrapper.find('.ix-header-suffix').find('.ix-icon-down').exists()).toBe(true)
  })

  test('header work', async () => {
    let header = 'header 1'
    const wrapper = HeaderMount({ props: { header } })

    expect(wrapper.find('.ix-header-title').text()).toBe(header)

    header = 'header 2'
    await wrapper.setProps({ header: { title: header } })

    expect(wrapper.find('.ix-header-title').text()).toBe(header)
  })

  test('header slot work', () => {
    const wrapper = HeaderMount({
      props: { header: 'header 1' },
      slots: { header: () => h(IxHeader, { title: 'header slot' }) },
    })

    expect(wrapper.find('.ix-header-title').text()).toBe('header slot')
  })
})
