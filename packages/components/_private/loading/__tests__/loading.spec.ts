import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Loading from '../src/Loading'
import { LoadingProps } from '../src/types'

describe('Loading', () => {
  const LoadingMount = (options?: MountingOptions<Partial<LoadingProps>>) =>
    mount(Loading, { ...(options as MountingOptions<LoadingProps>) })

  renderWork<LoadingProps>(Loading)

  test('radius work', async () => {
    const wrapper = LoadingMount({ props: { radius: 14 } })

    expect(wrapper.element.querySelector('svg')?.getAttribute('viewBox')).toEqual('0 0 28 28')
    wrapper.element.querySelectorAll('circle').forEach(el => {
      expect(el.getAttribute('cx')).toEqual('14')
      expect(el.getAttribute('cy')).toEqual('14')
    })

    await wrapper.setProps({ radius: 24 })

    expect(wrapper.element.querySelector('svg')?.getAttribute('viewBox')).toEqual('0 0 48 48')
    wrapper.element.querySelectorAll('circle').forEach(el => {
      expect(el.getAttribute('cx')).toEqual('24')
      expect(el.getAttribute('cy')).toEqual('24')
    })
  })

  test('strokeWidth work', async () => {
    const wrapper = LoadingMount({ props: { strokeWidth: 4 } })

    wrapper.element.querySelectorAll('circle').forEach(el => expect(el.getAttribute('stroke-width')).toEqual('4'))

    await wrapper.setProps({ strokeWidth: 8 })

    wrapper.element.querySelectorAll('circle').forEach(el => expect(el.getAttribute('stroke-width')).toEqual('8'))
  })

  test('duration work', async () => {
    const wrapper = LoadingMount({ props: { duration: 4 } })

    wrapper.element.querySelectorAll('animate').forEach(el => expect(el.getAttribute('dur')).toEqual('4s'))

    await wrapper.setProps({ duration: 8 })

    wrapper.element.querySelectorAll('animate').forEach(el => expect(el.getAttribute('dur')).toEqual('8s'))
  })
})
