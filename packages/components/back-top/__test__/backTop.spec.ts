import { mount } from '@vue/test-utils'
import IxBackTop from '../src/BackTop.vue'
import { renderWork, waitRAF, isShow, wait, scrollTarget } from '@tests'
import { nextTick } from 'vue'

const mockFn = jest.fn()
const warn = jest.spyOn(console, 'warn').mockImplementation()

const backTopMount = (template: string, options = {}) =>
  mount(
    {
      components: { IxBackTop },
      template,
      ...options,
    },
    { attachTo: document.body },
  )

describe('BackTop.vue', () => {
  renderWork(IxBackTop)

  test('scroll work', async () => {
    const wrapper = backTopMount(
      `
      <div class="ix-back-top-test" style="height: 300px; overflow: auto;">
        <div style="height: 1000px;">
          <ix-back-top :duration="100" :visibilityHeight="200" target=".ix-back-top-test" />
        </div>
      </div>
    `,
      {
        beforeUnmount() {
          mockFn()
        },
      },
    )

    expect(isShow(wrapper.find('.ix-back-top'))).toBe(false)

    await scrollTarget(600, wrapper.element)

    expect(isShow(wrapper.find('.ix-back-top'))).toBe(true)

    await wrapper.find('.ix-back-top').trigger('click')
    await wait(200)

    expect(wrapper.element.scrollTop).toBe(0)

    wrapper.unmount()
    expect(mockFn).toBeCalled()
  })

  test('props work: target is a HTMLElement', async () => {
    const wrapper = backTopMount(
      `
      <div style="height: 1000px;">
        <ix-back-top :target="target" />
      </div>
    `,
      {
        data() {
          return {
            target: document.documentElement,
          }
        },
      },
    )

    expect(isShow(wrapper.find('.ix-back-top'))).toBe(false)

    await scrollTarget(600, document.documentElement)

    expect(isShow(wrapper.find('.ix-back-top'))).toBe(true)
  })

  test('props work: target does not exist', async () => {
    mount(IxBackTop, { props: { target: '#ix-back-top-test' } })

    await nextTick()

    expect(warn).toBeCalled()
  })

  test('props work: target is the default value', async () => {
    window.scrollTo = mockFn

    const wrapper = backTopMount(`
      <div style="height: 1000px; overflow: auto;">
        <ix-back-top />
      </div>
    `)

    await scrollTarget(600, window)
    await wrapper.find('.ix-back-top').trigger('click')
    await waitRAF()

    expect(mockFn).toBeCalled()
  })
})
