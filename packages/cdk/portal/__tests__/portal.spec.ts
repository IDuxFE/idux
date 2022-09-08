import { MountingOptions, mount } from '@vue/test-utils'

import CdkPortal from '../src/Portal'
import { PortalProps } from '../src/types'

describe('Portal', () => {
  const PortalMount = (options?: MountingOptions<Partial<PortalProps>>) =>
    mount(CdkPortal, {
      slots: { default: `<div id='content'>content</div>` },
      ...(options as MountingOptions<PortalProps>),
      attachTo: 'body',
    })

  afterEach(() => {
    document.body.childNodes.forEach(node => node.remove())
  })

  test('render work', () => {
    const wrapper = PortalMount({ props: { target: '.render-container' } })
    expect(document.body.querySelector('.render-container')!.querySelector('#content')).toBeDefined()

    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })

  test('disabled work', async () => {
    const wrapper = PortalMount({ props: { target: '.disabled-container', disabled: true } })
    const container = document.body.querySelector('.disabled-container')!
    expect(container.querySelector('#content')).toBeNull()

    await wrapper.setProps({ disabled: false })

    expect(container.querySelector('#content')).not.toBeNull()
  })

  test('target work', async () => {
    const wrapper = PortalMount({ props: { target: '.target-container1' } })
    const container1 = document.body.querySelector('.target-container1')!
    expect(container1.querySelector('#content')).not.toBeNull()

    const container2 = document.createElement('div')
    container2.classList.add('target-container2')
    document.body.appendChild(container2)

    await wrapper.setProps({ target: container2 })
    expect(container1.querySelector('#content')).toBeNull()
    expect(container2.querySelector('#content')).not.toBeNull()

    const container3 = document.createElement('div')
    container3.classList.add('target-container3')
    document.body.appendChild(container3)

    await wrapper.setProps({ target: '.target-container3' })
    expect(container1.querySelector('#content')).toBeNull()
    expect(container2.querySelector('#content')).toBeNull()
    expect(container3.querySelector('#content')).not.toBeNull()

    const container4 = document.createElement('div')
    container4.id = 'target-container4'
    document.body.appendChild(container4)

    await wrapper.setProps({ target: '#target-container4' })
    expect(container1.querySelector('#content')).toBeNull()
    expect(container2.querySelector('#content')).toBeNull()
    expect(container3.querySelector('#content')).toBeNull()
    expect(container4.querySelector('#content')).not.toBeNull()
  })

  test('load work', async () => {
    const wrapper = PortalMount({ props: { target: '.load-container', load: false } })
    expect(document.body.querySelector('.load-container')).toBeNull()

    await wrapper.setProps({ load: true })

    expect(document.body.querySelector('.load-container')).not.toBeNull()
  })
})
