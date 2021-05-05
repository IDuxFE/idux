import { renderWork } from '@tests'
import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import IxListItem from '../src/ListItem.vue'
import { ListItemProps } from '../src/types'

describe('ListItem.vue', () => {
  let ListItemMount: (options?: MountingOptions<Partial<ListItemProps>>) => VueWrapper<InstanceType<typeof IxListItem>>

  beforeEach(() => {
    ListItemMount = options => mount(IxListItem, { ...options })
  })

  renderWork(IxListItem)

  test('title', async () => {
    const wrapper = ListItemMount({ props: { title: 'item title 1' } })

    expect(wrapper.find('.ix-list-item-title').exists()).toBeTruthy()
    expect(wrapper.find('.ix-list-item-title').text()).toEqual('item title 1')

    await wrapper.setProps({ title: 'item title 2' })
    expect(wrapper.find('.ix-list-item-title').text()).toEqual('item title 2')
  })

  test('content', async () => {
    const wrapper = ListItemMount({ props: { content: 'item content 1' } })

    expect(wrapper.find('.ix-list-item-content').exists()).toBeTruthy()
    expect(wrapper.find('.ix-list-item-content').text()).toEqual('item content 1')

    await wrapper.setProps({ content: 'item content 2' })
    expect(wrapper.find('.ix-list-item-content').text()).toEqual('item content 2')
  })

  test('title', async () => {
    const wrapper = ListItemMount({ props: { title: 'item title 1' } })

    expect(wrapper.find('.ix-list-item-title').exists()).toBeTruthy()
    expect(wrapper.find('.ix-list-item-title').text()).toEqual('item title 1')

    await wrapper.setProps({ title: 'item title 2' })
    expect(wrapper.find('.ix-list-item-title').text()).toEqual('item title 2')
  })

  test('slot work', async () => {
    const text = 'ListItem'
    const titleText = 'ListItemTitle'
    const extraText = 'ListItemExtra'
    const wrapper = ListItemMount({
      slots: {
        default: text,
        title: titleText,
        extra: extraText,
      },
    })
    expect(wrapper.find('.ix-list-item-content').text()).toEqual(text)
    expect(wrapper.find('.ix-list-item-title').text()).toEqual(titleText)
    expect(wrapper.find('.ix-list-item-extra').text()).toEqual(extraText)
  })
})
