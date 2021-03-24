import { mount } from '@vue/test-utils'
import { IxButton } from '@idux/components/button'
import { clickOutside } from '../src/useClickOutside'

describe('useClickOutside.ts', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockClear()
    jest.spyOn(console, 'warn').mockClear()
    jest.spyOn(console, 'error').mockClear()
    jest.spyOn(console, 'info').mockClear()
  })

  const testComponent = {
    components: { IxButton },
    directives: { clickOutside },
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
      <ix-button id="update" @click="$forceUpdate">update</ix-button>
      <ix-button id="log" v-click-outside="log">log</ix-button>
      <ix-button id="warn" v-click-outside="warn">warn</ix-button>
      <ix-button id="info" v-click-outside="info">info</ix-button>
      <ix-button id="error" v-click-outside="error">error</ix-button>
    `,
  }

  test('directive work', async () => {
    const wrapper = mount(testComponent)
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    const info = jest.spyOn(console, 'info').mockImplementation(() => {})

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
    wrapper.unmount()
  })
})
