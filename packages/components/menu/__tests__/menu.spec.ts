import { ComponentPublicInstance } from 'vue'
import { mount, VueWrapper } from '@vue/test-utils'
import IxMenu from '../src/menu/Menu.vue'
import IxMenuItem from '../src/menu/MenuItem.vue'
import IxMenuItemGroup from '../src/menu/MenuItemGroup.vue'
import IxMenuDivider from '../src/menu/MenuDivider.vue'
import IxSubMenu from '../src/sub-menu/SubMenu.vue'

describe('Menu.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let MenuMount: (options: any) => VueWrapper<ComponentPublicInstance>

  beforeEach(() => {
    MenuMount = (options = {}) => {
      return mount(
        {
          components: { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxSubMenu },
          template: `
          <ix-menu>
          <ix-menu-item cid="item1" icon="star">
            <a href="javascript: void(0)">Item 1</a>
          </ix-menu-item>
          <ix-menu-item cid="item2" disabled icon="star"> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-sub-menu cid="subMenu1" title="Sub Menu 1" icon="star">
            <ix-menu-item-group title="Item Group 1">
              <ix-menu-item cid="item3">Item 3</ix-menu-item>
              <ix-menu-item cid="item4">Item 4</ix-menu-item>
            </ix-menu-item-group>
            <ix-menu-divider />
            <ix-sub-menu cid="subMenu2">
              <template #title><a href="javascript: void(0)">Sub Menu 2</a></template>
              <ix-menu-item cid="item5">Item 5</ix-menu-item>
              <ix-menu-item cid="item6">Item 6</ix-menu-item>
            </ix-sub-menu>
            <ix-sub-menu cid="subMenu3" title="Sub Menu 3">
              <ix-menu-item cid="item7">Item 7</ix-menu-item>
              <ix-menu-item cid="item8">Item 8</ix-menu-item>
            </ix-sub-menu>
          </ix-sub-menu>
          <ix-sub-menu cid="subMenu4" disabled title="SubMenu 4" icon="star">
            <ix-menu-item cid="item9">Item 9</ix-menu-item>
            <ix-menu-item cid="item10">Item 10</ix-menu-item>
          </ix-sub-menu>
        </ix-menu>
          `,
          ...options,
        },
        { attachTo: 'body' },
      )
    }
  })

  test('render work', () => {
    const wrapper = MenuMount({})

    expect(wrapper.html()).toMatchSnapshot()

    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })
})
