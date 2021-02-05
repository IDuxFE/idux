import { mount } from '@vue/test-utils'
import { useClipboard } from '../src/useClipboard'

const copyText = 'copy text'

const getComp = () => {
  return {
    template: `<div></div>`,
    setup() {
      const { copy } = useClipboard()
      return { copy }
    },
  }
}

describe('useClipboard.ts', () => {
  test('copy work', async () => {
    const wrapper = mount(getComp())

    document.execCommand = jest.fn().mockReturnValue(true)
    await wrapper.vm.copy(copyText)
    wrapper.unmount()

    expect(document.execCommand).toHaveBeenCalledWith('copy')
  })

  test('copy fail', async () => {
    const wrapper = mount(getComp())

    document.execCommand = jest.fn().mockReturnValue(false)
    const successful = await wrapper.vm.copy(copyText)

    expect(successful).toBeFalsy()
  })

  test('attempts work', async () => {
    const wrapper = mount(getComp())

    document.execCommand = jest.fn().mockReturnValue(false)
    await wrapper.vm.copy(copyText, 3)

    expect(document.execCommand).toHaveBeenCalledTimes(3)

    document.execCommand = jest.fn().mockReturnValue(true)
    await wrapper.vm.copy(copyText, 3)

    expect(document.execCommand).toHaveBeenCalledTimes(1)
  })

  test('unmounted work', async () => {
    const wrapper = mount(getComp())
    const clearTimeout = jest.spyOn(window, 'clearTimeout')
    document.execCommand = jest.fn().mockReturnValue(false)
    wrapper.vm.copy(copyText, 3)
    wrapper.unmount()

    expect(clearTimeout).toHaveBeenCalledTimes(1)
  })
})
