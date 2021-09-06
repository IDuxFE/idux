import { h } from 'vue'
import { mount, MountingOptions } from '@vue/test-utils'
import { renderWork } from '@tests'
import Layout from '../src/Layout'
import LayoutContent from '../src/LayoutContent'
import LayoutSider from '../src/LayoutSider'
import LayoutHeader from '../src/LayoutHeader'
import LayoutFooter from '../src/LayoutFooter'
import { LayoutProps } from '../src/types'

const defaultSlots = [
  h(LayoutHeader, null, { default: () => 'header' }),
  h(LayoutSider, null, { default: () => 'sider' }),
  h(LayoutContent, null, { default: () => 'content' }),
  h(LayoutFooter, null, { default: () => 'footer' }),
]

describe('Layout', () => {
  renderWork<LayoutProps>(Layout, {
    slots: {
      default: () => defaultSlots,
    },
  })

  describe('basic work', () => {
    const LayoutMount = (options?: MountingOptions<Partial<LayoutProps>>) => {
      const { slots, ...rest } = options || {}
      const mergedOptions = {
        slots: { default: () => defaultSlots, ...slots },
        ...rest,
      } as MountingOptions<LayoutProps>
      return mount(Layout, mergedOptions)
    }

    test('outSider work', async () => {
      const wrapper = LayoutMount({
        props: {
          outSider: true,
        },
      })

      expect(wrapper.classes()).toContain('ix-layout-out-sider')
    })
  })

  describe('LayoutSider', () => {
    test('placement work', async () => {
      const wrapper = mount(Layout, {
        slots: {
          default: () => [h(LayoutSider, { placement: 'end' }, { default: () => 'sider' })],
        },
      })

      expect(wrapper.find('.ix-layout-sider').classes()).toContain('ix-layout-sider-end')
    })

    test('width work', async () => {
      const wrapper = mount(Layout, {
        slots: {
          default: () => [h(LayoutSider, { width: 200 }, { default: () => 'sider' })],
        },
      })

      expect(wrapper.find('.ix-layout-sider').attributes()['style']).toEqual('width: 200px;')
    })

    test('showTrigger work', async () => {
      const wrapper = mount(Layout, {
        slots: {
          default: () => [
            h(
              LayoutSider,
              {
                showTrigger: true,
              },
              {
                default: () => 'sider',
              },
            ),
          ],
        },
      })

      expect(wrapper.find('.ix-layout-sider-trigger').exists()).toBeTruthy()
    })

    test('collapsed work', async () => {
      const onCollapse = jest.fn()

      const wrapper = mount(Layout, {
        slots: {
          default: () => [
            h(
              LayoutSider,
              {
                collapsed: true,
                collapsedWidth: 0,
                showTrigger: true,
                'onUpdate:collapsed': onCollapse,
                onCollapse,
              },
              { default: () => 'sider' },
            ),
          ],
        },
      })
      const siderWrapper = wrapper.find('.ix-layout-sider')

      expect(siderWrapper.classes()).toContain('ix-layout-sider-collapsed')
      expect(siderWrapper.attributes()['style']).toEqual('width: 0px;')
      expect(wrapper.find('.ix-layout-sider-trigger').exists()).toBeTruthy()

      await wrapper.find('.ix-layout-sider-trigger').trigger('click')
      expect(onCollapse).toBeCalledTimes(2)
      expect(siderWrapper.classes()).not.toContain('ix-layout-sider-collapsed')
    })

    test('trigger slot work', async () => {
      const wrapper = mount(Layout, {
        slots: {
          default: () => [
            h(
              LayoutSider,
              {
                showTrigger: true,
              },
              {
                default: () => 'sider',
                trigger: () => h('div', { class: 'slotTrigger' }, 'triggerDiv'),
              },
            ),
          ],
        },
      })

      expect(wrapper.find('.slotTrigger').exists()).toBeTruthy()
    })
  })
})
