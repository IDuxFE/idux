import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxStatistic from '../src/Statistic.vue'
import { StatisticProps } from '../src/types'

describe('Statistic.vue', () => {
  let StatisticMount: (
    options?: MountingOptions<Partial<StatisticProps>>,
  ) => VueWrapper<InstanceType<typeof IxStatistic>>

  beforeEach(() => {
    StatisticMount = options => mount(IxStatistic, { ...options })
  })

  renderWork(IxStatistic, {
    value: 112893.116,
  })

  test('precision work', async () => {
    const wrapper = StatisticMount({
      props: {
        value: 112893.116,
        precision: 0,
      },
    })

    // 精度为0应该不存在小数部分
    expect(wrapper.find('.ix-statistic-content-value-decimal').exists()).toBeFalsy()

    /*--------测试precision的响应性----------*/
    await wrapper.setProps({ precision: 2 })
    expect(wrapper.get('.ix-statistic-content-value-decimal').text()).toEqual('.11')

    await wrapper.setProps({ precision: 3 })
    expect(wrapper.get('.ix-statistic-content-value-decimal').text()).toEqual('.116')

    await wrapper.setProps({ precision: 4 })
    expect(wrapper.get('.ix-statistic-content-value-decimal').text()).toEqual('.1160')
    /*--------测试precision的响应性----------*/
  })

  test('value work', async () => {
    const wrapper = StatisticMount({
      props: {
        value: 112893.116,
        precision: 2,
      },
    })
    expect(wrapper.get('.ix-statistic-content-value-int').text()).toEqual('112893')
    expect(wrapper.get('.ix-statistic-content-value-decimal').text()).toEqual('.11')

    /*--------测试value的响应性----------*/
    await wrapper.setProps({ value: 112896.5 })
    expect(wrapper.get('.ix-statistic-content-value-int').text()).toEqual('112896')
    expect(wrapper.get('.ix-statistic-content-value-decimal').text()).toEqual('.50')
    /*--------测试value的响应性----------*/
  })

  test('formatter work', async () => {
    const wrapper = StatisticMount({
      props: {
        value: 112893.116,
        precision: 2,
        formatter: value => {
          return {
            value: value + '--test',
            int: '',
            decimal: '',
          }
        },
      },
    })
    expect(wrapper.get('.ix-statistic-content-value').text()).toEqual('112893.116--test')
    expect(wrapper.get('.ix-statistic-content-value-int').text()).toEqual('112893.116--test')
  })

  test('title work', async () => {
    const wrapper = StatisticMount({
      props: {
        value: 112893.116,
        precision: 2,
        title: 'This is title',
      },
    })
    expect(wrapper.get('.ix-statistic-title').text()).toEqual('This is title')
  })

  test('prefix work', async () => {
    const wrapper = StatisticMount({
      props: {
        value: 112893.116,
        precision: 2,
      },
    })
    expect(wrapper.find('.ix-statistic-content-prefix').exists()).toBeFalsy()
    await wrapper.setProps({
      prefix: '#',
    })
    expect(wrapper.get('.ix-statistic-content-prefix').text()).toEqual('#')
  })

  test('suffix work', async () => {
    const wrapper = StatisticMount({
      props: {
        value: 112893.116,
        precision: 2,
      },
    })
    expect(wrapper.find('.ix-statistic-content-suffix').exists()).toBeFalsy()
    await wrapper.setProps({
      suffix: '%',
    })
    expect(wrapper.get('.ix-statistic-content-suffix').text()).toEqual('%')
  })

  test('slot work', async () => {
    const wrapper = StatisticMount({
      props: {
        value: 112893.116,
        precision: 2,
      },
      slots: {
        prefix: '<span>Prefix</span>',
        default: '<span>Conetent</span>',
        suffix: '<span>Suffix</span>',
      },
    })
    expect(wrapper.find('.ix-statistic-content-prefix').html()).toEqual(
      `<span class="ix-statistic-content-prefix"><span>Prefix</span></span>`,
    )
    expect(wrapper.find('.ix-statistic-content-value').html()).toEqual(
      `<span class="ix-statistic-content-value"><span>Conetent</span></span>`,
    )
    expect(wrapper.find('.ix-statistic-content-suffix').html()).toEqual(
      `<span class="ix-statistic-content-suffix"><span>Suffix</span></span>`,
    )
  })
})
