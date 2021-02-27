import { computed, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { IxButton } from '@idux/components'
import { clickOutside } from '../src/useClickOutside'

describe('useClickOutside.ts', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockClear()
    jest.spyOn(console, 'warn').mockClear()
    jest.spyOn(console, 'error').mockClear()
  })

  const testComponent = {
    components: { IxButton },
    directives: { clickOutside },
    setup() {
      const status = ref(false)

      const update = () => {
        status.value = !status.value
      }

      const log = () => {
        console.log('hello world')
      }

      const warn = () => {
        console.warn('hello world')
      }

      const error = () => {
        console.error('hello world')
      }

      const globalClick = computed(() => (status.value ? error : warn))

      return { update, log, globalClick }
    },
    template: `
      <ix-button @click="update">Update</ix-button>
      <p v-click-outside="globalClick" @click="log">Hello world</p>
    `,
  }

  test('mount work', async () => {
    const wrapper = mount(testComponent)
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    document.body.click()
    expect(warn).toBeCalled()
    expect(warn).toBeCalledTimes(1)
    await wrapper.get('p').trigger('click')
    expect(log).toBeCalled()
    expect(log).toBeCalledTimes(1)
    expect(warn).toBeCalledTimes(1)
    wrapper.unmount()
  })

  test('update work', async () => {
    const wrapper = mount(testComponent)
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    document.body.click()
    expect(warn).toBeCalled()
    expect(warn).toBeCalledTimes(1)
    await wrapper.get('.ix-button').trigger('click')
    document.body.click()
    expect(error).toBeCalled()
    expect(error).toBeCalledTimes(1)
    expect(warn).toBeCalledTimes(1)
  })
})
