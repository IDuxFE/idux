import { mount } from '@vue/test-utils'
import IxMenu from '../src/menu/Menu.vue'
import IxMenuItem from '../src/menu/MenuItem.vue'
import IxMenuItemGroup from '../src/menu/MenuItemGroup.vue'
import IxMenuDivider from '../src/menu/MenuDivider.vue'
import IxMenuSub from '../src/menu-sub/MenuSub.vue'

describe('Menu', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MenuMount = (options = {}) => {
    return mount(
      {
        components: { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxMenuSub },
        template: `
        <IxMenu>
        <IxMenuItem cid="item1" icon="star">
          <a href="javascript: void(0)">Item 1</a>
        </IxMenuItem>
        <IxMenuItem cid="item2" disabled icon="star"> Item 2 </IxMenuItem>
        <IxMenuDivider />
        <IxMenuSub cid="menuSub1" title="Sub Menu 1" icon="star">
          <IxMenuItemGroup title="Item Group 1">
            <IxMenuItem cid="item3">Item 3</IxMenuItem>
            <IxMenuItem cid="item4">Item 4</IxMenuItem>
          </IxMenuItemGroup>
          <IxMenuDivider />
          <IxMenuSub cid="menuSub2">
            <template #title><a href="javascript: void(0)">Sub Menu 2</a></template>
            <IxMenuItem cid="item5">Item 5</IxMenuItem>
            <IxMenuItem cid="item6">Item 6</IxMenuItem>
          </IxMenuSub>
          <IxMenuSub cid="menuSub3" title="Sub Menu 3">
            <IxMenuItem cid="item7">Item 7</IxMenuItem>
            <IxMenuItem cid="item8">Item 8</IxMenuItem>
          </IxMenuSub>
        </IxMenuSub>
        <IxMenuSub cid="menuSub4" disabled title="MenuSub 4" icon="star">
          <IxMenuItem cid="item9">Item 9</IxMenuItem>
          <IxMenuItem cid="item10">Item 10</IxMenuItem>
        </IxMenuSub>
      </IxMenu>
        `,
        ...options,
      },
      { attachTo: 'body' },
    )
  }

  test('render work', () => {
    const wrapper = MenuMount({})

    expect(wrapper.html()).toMatchSnapshot()

    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })
})
