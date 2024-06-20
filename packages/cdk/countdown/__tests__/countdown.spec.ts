import { flushPromises, mount } from '@vue/test-utils'
import { ref } from 'vue'

import { wait } from '@tests'

import { type Precision, useCountdown } from '../src/useCountdown'

describe('useCountdown.ts', () => {
  test('time work', () => {
    const { hours, minutes, seconds, milliseconds } = useCountdown(3600 * 1000)

    expect(hours.value).toBe('01')
    expect(minutes.value).toBe('00')
    expect(seconds.value).toBe('00')
    expect(milliseconds.value).toBe('')
  })

  test('active work', async () => {
    const wrapper = mount({
      template: `
        <div>
          <span>{{ hours }}</span>
          <span>{{ minutes }}</span>
          <span>{{ seconds }}</span>
          <span>{{ active }}</span>
        </div>
      `,
      setup() {
        const { hours, minutes, seconds, active } = useCountdown(3600 * 1000)
        return { hours, minutes, seconds, active }
      },
    })

    expect(wrapper.find('span:nth-child(1)').text()).toBe('01')
    expect(wrapper.find('span:nth-child(2)').text()).toBe('00')
    expect(wrapper.find('span:nth-child(3)').text()).toBe('00')
    expect(wrapper.find('span:nth-child(4)').text()).toBe('false')

    wrapper.vm.active = true

    await wait(2000)

    expect(wrapper.find('span:nth-child(1)').text()).not.toBe('01')
    expect(wrapper.find('span:nth-child(2)').text()).not.toBe('00')
    expect(wrapper.find('span:nth-child(3)').text()).not.toBe('00')
    expect(wrapper.find('span:nth-child(4)').text()).toBe('true')
  })

  test('reset work', async () => {
    const wrapper = mount({
      template: `
        <div>
          <span>{{ milliseconds }}</span>
        </div>
      `,
      setup() {
        const { milliseconds, reset } = useCountdown(500, {
          immediate: true,
          precision: 2,
        })
        return { milliseconds, reset }
      },
    })

    await wait(1000)

    expect(wrapper.find('span:nth-child(1)').text()).toBe('00')

    wrapper.vm.reset()

    await wait(500)

    expect(wrapper.find('span:nth-child(1)').text()).not.toBe('00')
  })

  test('precision in options work', async () => {
    const wrapper = mount({
      template: `
        <div>
          <span>{{ milliseconds }}</span>
        </div>
      `,
      setup() {
        const precision = ref<Precision>(0)
        const { milliseconds } = useCountdown(500, { precision })
        return { milliseconds, precision }
      },
    })

    expect(wrapper.find('span').text()).toBe('')

    wrapper.vm.precision = 1

    await flushPromises()

    expect(wrapper.find('span').text()).toBe('5')

    wrapper.vm.precision = 2

    await flushPromises()

    expect(wrapper.find('span').text()).toBe('50')

    wrapper.vm.precision = 3

    await flushPromises()

    expect(wrapper.find('span').text()).toBe('500')
  })

  test('immediate and onFinish in options work', async () => {
    const onFinish = vi.fn()
    const wrapper = mount({
      template: `
        <div>
          <span>{{ milliseconds }}</span>
        </div>
      `,
      setup() {
        const { milliseconds } = useCountdown(500, {
          immediate: true,
          precision: 1,
          onFinish,
        })
        return { milliseconds }
      },
    })

    await wait(1000)

    expect(wrapper.find('span:nth-child(1)').text()).not.toBe('5')
    expect(onFinish).toBeCalled()
  })

  test('fps in options work', async () => {
    const wrapper = mount({
      template: `
        <div>
          <span>{{ milliseconds }}</span>
        </div>
      `,
      setup() {
        const { milliseconds } = useCountdown(500, {
          immediate: true,
          precision: 1,
          fps: 1000,
        })
        return { milliseconds }
      },
    })

    expect(wrapper.find('span:nth-child(1)').text()).toBe('5')

    await wait(500)

    expect(wrapper.find('span:nth-child(1)').text()).toBe('5')

    await wait(500)

    expect(wrapper.find('span:nth-child(1)').text()).not.toBe('5')
  })
})
