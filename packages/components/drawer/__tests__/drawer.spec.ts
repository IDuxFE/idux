import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import { renderWork } from '@tests'
import IxDrawer from '../src/Drawer.vue'
import { DrawerProps } from '../src/types'

describe('Drawer.vue', () => {
  let DrawerMount: (
    options?: MountingOptions<Partial<DrawerProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<DrawerProps>>>

  beforeEach(() => {
    DrawerMount = (options = {}) => {
      return mount<DrawerProps>(IxDrawer, {
        ...options,
      })
    }
  })

  renderWork(IxDrawer)

  test('title slot work', async () => {
    const title = 'title slots'
    const wrapper = DrawerMount({
      props: { title: 'title props' },
      slots: { title },
    })

    expect(wrapper.find('.ix-drawer-header-title').text()).toEqual(title)
  })
})
