import { mount } from '@vue/test-utils'

import IxMenu from '../src/Menu'
import IxMenuDivider from '../src/MenuDivider'
import IxMenuItem from '../src/MenuItem'
import IxMenuItemGroup from '../src/MenuItemGroup'
import IxMenuSub from '../src/menu-sub/MenuSub'

describe('Menu', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MenuMount = (options = {}) => {
    return mount(
      {
        components: { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxMenuSub },
        template: `
        <IxMenu>
        <IxMenuItem key="item1" icon="up">
          <a href="javascript: void(0)">Item 1</a>
        </IxMenuItem>
        <IxMenuItem key="item2" disabled icon="up"> Item 2 </IxMenuItem>
        <IxMenuDivider />
        <IxMenuSub key="menuSub1" title="Sub Menu 1" icon="up">
          <IxMenuItemGroup title="Item Group 1">
            <IxMenuItem key="item3">Item 3</IxMenuItem>
            <IxMenuItem key="item4">Item 4</IxMenuItem>
          </IxMenuItemGroup>
          <IxMenuDivider />
          <IxMenuSub key="menuSub2">
            <template #title><a href="javascript: void(0)">Sub Menu 2</a></template>
            <IxMenuItem key="item5">Item 5</IxMenuItem>
            <IxMenuItem key="item6">Item 6</IxMenuItem>
          </IxMenuSub>
          <IxMenuSub key="menuSub3" title="Sub Menu 3">
            <IxMenuItem key="item7">Item 7</IxMenuItem>
            <IxMenuItem key="item8">Item 8</IxMenuItem>
          </IxMenuSub>
        </IxMenuSub>
        <IxMenuSub key="menuSub4" disabled title="MenuSub 4" icon="up">
          <IxMenuItem key="item9">Item 9</IxMenuItem>
          <IxMenuItem key="item10">Item 10</IxMenuItem>
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
