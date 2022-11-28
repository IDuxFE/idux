import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Layout from '../src/Layout'
import LayoutContent from '../src/LayoutContent'
import LayoutFooter from '../src/LayoutFooter'
import LayoutHeader from '../src/LayoutHeader'
import LayoutSider from '../src/LayoutSider'
import LayoutSiderTrigger from '../src/LayoutSiderTrigger'
import { LayoutProps } from '../src/types'

const defaultSlots = [
  h(LayoutHeader, null, { default: () => 'header' }),
  h(LayoutSider, null, { default: () => 'sider' }),
  h(LayoutContent, null, { default: () => 'content' }),
  h(LayoutFooter, null, { default: () => 'footer' }),
]

describe('Layout', () => {
  const LayoutMount = (options?: MountingOptions<Partial<LayoutProps>>) => {
    return mount(Layout, options)
  }

  renderWork<LayoutProps>(Layout, {
    slots: {
      default: () => defaultSlots,
    },
  })

  test('collapsed work', async () => {
    const onUpdateCollapsed = vi.fn()
    const wrapper = mount(Layout, {
      slots: {
        default: () => [
          h(
            LayoutSider,
            { collapsed: true, 'onUpdate:collapsed': onUpdateCollapsed },
            { default: () => h(LayoutSiderTrigger) },
          ),
        ],
      },
    })

    expect(wrapper.find('.ix-layout-sider').classes()).toContain('ix-layout-sider-collapsed')

    await wrapper.findComponent(LayoutSiderTrigger).find('button').trigger('click')

    expect(onUpdateCollapsed).toBeCalledWith(false, 'trigger')
  })

  test('fixed work', async () => {
    const wrapper = LayoutMount({ props: { fixed: true } })

    expect(wrapper.classes()).toContain('ix-layout-fixed-header')
    expect(wrapper.classes()).toContain('ix-layout-fixed-sider')

    await wrapper.setProps({ fixed: false })

    expect(wrapper.classes()).not.toContain('ix-layout-fixed-header')
    expect(wrapper.classes()).not.toContain('ix-layout-fixed-sider')

    await wrapper.setProps({ fixed: { header: true, sider: false } })

    expect(wrapper.classes()).toContain('ix-layout-fixed-header')
    expect(wrapper.classes()).not.toContain('ix-layout-fixed-sider')

    await wrapper.setProps({ fixed: { header: false, sider: true } })

    expect(wrapper.classes()).not.toContain('ix-layout-fixed-header')
    expect(wrapper.classes()).toContain('ix-layout-fixed-sider')
  })
})
