import { mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import ListItem from '../src/Item'
import List from '../src/List'

const TestComponent = {
  components: { List, ListItem },
  template: `
  <List
    :size="size"
    :header="header"
    :footer="footer"
    :loadMore="loadMore"
    :loading="loading"
    :grid="grid"
    :borderless="borderless"
    @loadMore="handleLoadMore">
    <ListItem v-for='item in items'>{{item}}</ListItem>
  </List>
  `,
  props: {
    size: String,
    header: String,
    footer: String,
    loadMore: String,
    loading: Boolean,
    grid: Object,
    borderless: Boolean,
    handleLoadMore: Function,
  },
  data() {
    return {
      items: Array.from(new Array(4)).map(() => 'default'),
    }
  },
}

describe('List', () => {
  renderWork(TestComponent)

  test('size', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.findAll('.ix-list-md').length).toBe(1)
    expect(wrapper.findAll('.ix-list-sm').length).toBe(0)
    expect(wrapper.findAll('.ix-list-lg').length).toBe(0)

    await wrapper.setProps({ size: 'lg' })

    expect(wrapper.findAll('.ix-list-md').length).toBe(0)
    expect(wrapper.findAll('.ix-list-sm').length).toBe(0)
    expect(wrapper.findAll('.ix-list-lg').length).toBe(1)
  })

  test('header', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.find('.ix-list-header').exists()).toBeFalsy()
    await wrapper.setProps({ header: 'header' })
    expect(wrapper.find('.ix-list-header').text()).toEqual('header')
    expect(wrapper.find('.ix-list-header').exists()).toBeTruthy()
  })
  test('footer', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.find('.ix-list-footer').exists()).toBeFalsy()
    await wrapper.setProps({ footer: 'footer' })
    expect(wrapper.find('.ix-list-footer').text()).toEqual('footer')
    expect(wrapper.find('.ix-list-footer').exists()).toBeTruthy()
  })
  test('split', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.classes()).toContain('ix-list-split')
  })
  test('borderless', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.classes()).toContain('ix-list-border')
    await wrapper.setProps({ borderless: true })
    expect(wrapper.classes()).not.toContain('ix-list-borderless')
    await wrapper.setProps({ borderless: '' })
    expect(wrapper.classes()).not.toContain('ix-list-borderless')
  })

  test('empty', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.ix-empty').exists()).toBeFalsy()
    await wrapper.setData({ items: [] })
    expect(wrapper.find('.ix-empty').exists()).toBeTruthy()
  })

  test('grid', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.find('.ix-row').exists()).toBeFalsy()
    await wrapper.setProps({
      grid: {
        column: 2,
        gutter: [10, 10],
        xs: 2,
      },
    })
    expect(wrapper.find('.ix-row').exists()).toBeTruthy()
    expect(wrapper.find('.ix-col').exists()).toBeTruthy()
    expect(wrapper.find('.ix-list-item').exists()).toBeFalsy()
  })
})
