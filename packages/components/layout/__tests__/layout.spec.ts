import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Layout from '../src/Layout'
import LayoutContent from '../src/LayoutContent'
import LayoutFooter from '../src/LayoutFooter'
import LayoutHeader from '../src/LayoutHeader'
import LayoutSider from '../src/LayoutSider'
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
