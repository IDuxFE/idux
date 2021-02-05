import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BackTop from '../src/BackTop.vue'
import { renderWork, waitRAF, isShow, wait } from '@tests'

const mockFn = jest.fn()
const warn = jest.spyOn(console, 'warn').mockImplementation()

const backTopMount = (template: string, options = {}) =>
  mount(
    {
      components: {
        BackTop,
      },
      template,
      ...options,
    },
    { attachTo: document.body },
  )

describe('BackTop.vue', () => {
  renderWork(BackTop)

  test('scroll work', async () => {
    const wrapper = backTopMount(
      `
      <div class="ix-back-top-test" style="height: 300px; overflow: auto;">
        <div style="height: 1000px;">
          <back-top :duration="100" :visibilityHeight="200" target=".ix-back-top-test"></back-top>
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

    wrapper.element.scrollTop = 600
    await wrapper.trigger('scroll')
    await wait(1000)
    expect(isShow(wrapper.find('.ix-back-top'))).toBe(true)

    await wrapper.find('.ix-back-top').trigger('click')
    await wait(1000)
    expect(wrapper.element.scrollTop).toBe(0)

    wrapper.unmount()
    expect(mockFn).toBeCalled()
  })

  test('props work: target is a HTMLElement', async () => {
    const wrapper = backTopMount(
      `
      <div style="height: 1000px;">
        <back-top :target="target"></back-top>
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

    document.documentElement.scrollTop = 600
    window.dispatchEvent(new Event('scroll'))

    await wait(1000)

    expect(isShow(wrapper.find('.ix-back-top'))).toBe(true)
  })

  test('props work: target does not exist', async () => {
    mount(BackTop, {
      props: {
        target: '#ix-back-top-test',
      },
    })

    await nextTick()
    expect(warn).toBeCalled()
  })

  test('props work: target is the default value', async () => {
    window.scrollTo = mockFn
    const wrapper = backTopMount(`
      <div style="height: 1000px; overflow: auto;">
        <back-top></back-top>
      </div>
    `)

    document.documentElement.scrollTop = 600
    window.dispatchEvent(new Event('scroll'))
    await wait(1000)
    await wrapper.find('.ix-back-top').trigger('click')

    await waitRAF()
    expect(mockFn).toBeCalled()
  })
})
