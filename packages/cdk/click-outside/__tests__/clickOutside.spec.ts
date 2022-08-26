import { mount } from '@vue/test-utils'

import { vClickOutside } from '../src/vClickOutside'

describe('vClickOutside.ts', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockClear()
    vi.spyOn(console, 'warn').mockClear()
    vi.spyOn(console, 'error').mockClear()
    vi.spyOn(console, 'info').mockClear()
  })

  const testComponent = {
    directives: { clickOutside: vClickOutside },
    setup() {
      const log = () => {
        console.log('log')
      }

      const warn = () => {
        console.warn('warn')
      }

      const info = () => {
        console.info('info')
      }

      const error = () => {
        console.error('error')
      }

      return { log, warn, info, error }
    },
    template: `
      <button id="update" @click="$forceUpdate">update</button>
      <button id="log" v-click-outside="log">log</button>
      <button id="warn" v-click-outside="warn">warn</button>
      <button id="info" v-click-outside="info">info</button>
      <button id="error" v-click-outside="error">error</button>
    `,
  }

  test('directive work', async () => {
    const wrapper = mount(testComponent)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const info = vi.spyOn(console, 'info').mockImplementation(() => {})

    document.body.click()
    expect(log).toBeCalled()
    expect(log).toBeCalledTimes(1)
    expect(warn).toBeCalled()
    expect(warn).toBeCalledTimes(1)
    expect(error).toBeCalled()
    expect(error).toBeCalledTimes(1)
    expect(info).toBeCalled()
    expect(info).toBeCalledTimes(1)

    await wrapper.get('#update').trigger('click')
    expect(log).toBeCalled()
    expect(log).toBeCalledTimes(1)
    expect(warn).toBeCalled()
    expect(warn).toBeCalledTimes(1)
    expect(error).toBeCalled()
    expect(error).toBeCalledTimes(1)
    expect(info).toBeCalled()
    expect(info).toBeCalledTimes(1)
  })
})
