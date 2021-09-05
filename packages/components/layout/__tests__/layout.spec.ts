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

    test('siderOut work', async () => {
      const wrapper = LayoutMount({
        props: {
          siderOut: true,
        },
      })

      expect(wrapper.classes()).toContain('sider-out')
    })

    test('Layout-(header sider footer) borderless work', async () => {
      const wrapper = LayoutMount({
        slots: {
          default: () => [
            h(LayoutHeader, { borderless: true }, { default: () => 'header' }),
            h(LayoutSider, { borderless: true }, { default: () => 'sider' }),
            h(LayoutFooter, { borderless: true }, { default: () => 'footer' }),
          ],
        },
      })

      expect(wrapper.find('.ix-layout-header').classes()).not.toContain('bordered')
      expect(wrapper.find('.ix-layout-sider').classes()).not.toContain('bordered')
      expect(wrapper.find('.ix-layout-footer').classes()).not.toContain('bordered')
    })

    test('Layout-(header footer) height work', async () => {
      const wrapper = LayoutMount({
        slots: {
          default: () => [
            h(LayoutHeader, { height: 100 }, { default: () => 'header' }),
            h(LayoutFooter, { height: 100 }, { default: () => 'footer' }),
          ],
        },
      })

      expect(wrapper.find('.ix-layout-header').attributes()['style']).toEqual('height: 100px; line-height: 100px;')
      expect(wrapper.find('.ix-layout-footer').attributes()['style']).toEqual('height: 100px; line-height: 100px;')
    })
  })

  describe('LayoutSider', () => {
    test('direction work', async () => {
      const wrapper = mount(Layout, {
        slots: {
          default: () => [h(LayoutSider, { direction: 'right' }, { default: () => 'sider' })],
        },
      })

      expect(wrapper.find('.ix-layout-sider').classes()).toContain('right')
    })

    test('width work', async () => {
      const wrapper = mount(Layout, {
        slots: {
          default: () => [h(LayoutSider, { width: 200 }, { default: () => 'sider' })],
        },
      })

      expect(wrapper.find('.ix-layout-sider').attributes()['style']).toEqual('width: 200px;')
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
                'onUpdate:collapsed': onCollapse,
                onCollapse,
              },
              { default: () => 'sider' },
            ),
          ],
        },
      })
      const siderWrapper = wrapper.find('.ix-layout-sider')

      expect(siderWrapper.classes()).toContain('collapsed')
      expect(siderWrapper.classes()).toContain('collapsed-width-zero')
      expect(siderWrapper.attributes()['style']).toEqual('width: 0px;')
      expect(wrapper.find('.ix-layout-sider-trigger').exists()).toBeTruthy()

      await wrapper.find('.ix-layout-sider-trigger').trigger('click')
      expect(onCollapse).toBeCalledTimes(2)
      expect(siderWrapper.classes()).not.toContain('collapsed')
      expect(siderWrapper.classes()).not.toContain('collapsed-width-zero')
    })

    test('trigger props work', async () => {
      const wrapper = mount(Layout, {
        slots: {
          default: () => [
            h(
              LayoutSider,
              {
                trigger: h('div', { class: 'vnodeTrigger' }, 'triggerDiv'),
                collapsed: true,
              },
              { default: () => 'sider' },
            ),
          ],
        },
      })

      expect(wrapper.find('.vnodeTrigger').exists()).toBeTruthy()
    })

    test('trigger slot work', async () => {
      const wrapper = mount(Layout, {
        slots: {
          default: () => [
            h(
              LayoutSider,
              {
                collapsed: true,
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

    test('trigger slot and props exit the same time', async () => {
      const wrapper = mount(Layout, {
        slots: {
          default: () => [
            h(
              LayoutSider,
              {
                trigger: h('div', { class: 'vnodeTrigger' }, 'triggerDiv'),
                collapsed: true,
              },
              {
                default: () => 'sider',
                trigger: () => h('div', { class: 'slotTrigger' }, 'triggerDiv'),
              },
            ),
          ],
        },
      })

      expect(wrapper.find('.vnodeTrigger').exists()).toBeTruthy()
      expect(wrapper.find('.slotTrigger').exists()).toBeFalsy()
    })
  })
})
