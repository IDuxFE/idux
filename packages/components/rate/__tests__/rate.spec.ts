import { renderWork } from '@tests'
import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'

import IxRate from '../src/Rate.vue'
import { RateProps } from '../src/types'

describe('Rate.vue', () => {
  let RateMount: (options?: MountingOptions<Partial<RateProps>>) => VueWrapper<InstanceType<typeof IxRate>>
  let findNormalIcon: (wrapper: VueWrapper<InstanceType<typeof IxRate>>) => number

  beforeEach(() => {
    RateMount = options => mount(IxRate, { ...options })

    findNormalIcon = (wrapper: VueWrapper<InstanceType<typeof IxRate>>): number => {
      const res = wrapper.findAll('.ix-rate-iconfont-main').filter(item => {
        return item.classes().includes('ix-rate-normal')
      })

      return res.length
    }
  })

  renderWork(IxRate, { props: { value: 3 } })

  test('init hightlight as value', () => {
    const wrapper = RateMount({
      props: {
        value: 3,
      },
    })

    const normalIcon = findNormalIcon(wrapper)

    expect(normalIcon).toBe(2)
  })

  test('test count', () => {
    const wrapper = RateMount({
      props: {
        value: 3,
        count: 10,
      },
    })

    expect(wrapper.findAll('.ix-rate-full').length).toBe(10)
  })

  test('test tooltip', () => {
    const wrapper = RateMount({
      props: {
        value: 3,
        tooltips: ['1', '2', '3', '4', '5'],
      },
    })

    const titleList = wrapper.findAll('.ix-rate-item').filter(item => {
      return item.attributes()['title']
    })

    expect(titleList.length).toBe(5)
  })

  test('test click', async () => {
    const wrapper = RateMount({})

    await wrapper.setProps({ value: 3 })

    const thirdStar = wrapper.findAll('.ix-rate-item')[2].element as HTMLElement
    thirdStar.click()

    const normalIcon = findNormalIcon(wrapper)

    expect(normalIcon).toBe(2)
  })

  test('touch half and allow half', async () => {
    const wrapper = mount({
      template: `<IxRate v-model:value="value" allow-half ref="testRateRef" />`,
      data() {
        return {
          value: 4,
        }
      },
      components: { IxRate },
    })

    const vm = wrapper.vm
    const testHalfItem = wrapper.findAll('.ix-rate-item')[1]

    await testHalfItem.trigger('mousemove', { offsetX: 0 })
    await testHalfItem.trigger('click')
    await testHalfItem.trigger('mouseleave')

    expect(vm.value).toEqual(1.5)
  })

  test('disable', async () => {
    const wrapper = mount({
      template: `<IxRate v-model:value="value" disabled ref="testRateRef" />`,
      data() {
        return {
          value: 4,
        }
      },
      components: { IxRate },
    })

    const vm = wrapper.vm
    const testItem = wrapper.findAll('.ix-rate-item')[1]

    await testItem.trigger('mousemove')
    await testItem.trigger('click')
    await testItem.trigger('mouseleave')

    expect(vm.value).toEqual(4)
  })

  test('allow clear', async () => {
    const wrapper = mount({
      template: `<IxRate v-model:value="value" allow-clear ref="testRateRef" />`,
      data() {
        return {
          value: 2,
        }
      },
      components: { IxRate },
    })

    await wrapper.setProps({ value: 3 })

    const vm = wrapper.vm
    const testItem = wrapper.findAll('.ix-rate-item')[2]

    await testItem.trigger('mousemove', { offsetX: 26 })
    await testItem.trigger('click')
    await testItem.trigger('mouseleave')

    expect(vm.value).toEqual(0)
  })
})
