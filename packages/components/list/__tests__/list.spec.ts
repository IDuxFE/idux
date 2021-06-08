import { flushPromises, mount } from '@vue/test-utils'
import List from '../src/List.vue'
import ListItem from '../src/ListItem.vue'
import { renderWork } from '@tests'

const TestComponent = {
  components: { List, ListItem },
  template: `
  <List 
    :size="size" 
    :header="header" 
    :footer="footer" 
    :loadMore="loadMore" 
    :split="split"
    :loading="loading"
    :grid="grid"
    :borderless="borderless"
    @loadMore="handleLoadMore">
    <ListItem>default</ListItem>
    <ListItem>default</ListItem>
    <ListItem>default</ListItem>
    <ListItem>default</ListItem>
  </List>
  `,
  props: {
    size: String,
    header: String,
    footer: String,
    loadMore: String,
    split: Boolean,
    loading: Boolean,
    grid: Object,
    borderless: Boolean,
    handleLoadMore: Function,
  },
}

async function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

describe('List.vue', () => {
  renderWork(TestComponent)

  test('size', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.findAll('.ix-list-medium').length).toBe(1)
    expect(wrapper.findAll('.ix-list-small').length).toBe(0)
    expect(wrapper.findAll('.ix-list-large').length).toBe(0)

    await wrapper.setProps({ size: 'large' })

    expect(wrapper.findAll('.ix-list-medium').length).toBe(0)
    expect(wrapper.findAll('.ix-list-small').length).toBe(0)
    expect(wrapper.findAll('.ix-list-large').length).toBe(1)
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
  test('loadMore & spin', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.find('.ix-list-loadMore').exists()).toBeFalsy()
    await wrapper.setProps({
      loadMore: '123',
      handleLoadMore: async function (done: jest.DoneCallback) {
        await sleep(1000)
        done()
      },
    })
    expect(wrapper.find('.ix-list-loadMore').exists()).toBeTruthy()
    const loadMoreEL = wrapper.element.querySelector('.ix-list-loadMore') as HTMLElement
    const loadMoreBtn = loadMoreEL.querySelector('button') as HTMLElement
    loadMoreBtn.click()
    await flushPromises()
    expect(wrapper.find('.ix-button-loading').exists()).toBeTruthy()
    await sleep(1100)
    expect(wrapper.find('.ix-button-loading').exists()).toBeFalsy()
    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.ix-spin-spinner').exists()).toBeTruthy()
  })
  test('split', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.classes()).not.toContain('ix-list-split')
    await wrapper.setProps({ split: true })
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
