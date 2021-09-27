import { h, reactive } from 'vue'
import { flushPromises, mount, MountingOptions } from '@vue/test-utils'
import { renderWork } from '@tests'
import { IxIcon } from '@idux/components/icon'
import Collapse from '../src/Collapse'
import CollapsePanel from '../src/CollapsePanel'
import { CollapseProps } from '../src/types'

const defaultPanels = [
  h(CollapsePanel, { key: 0, header: 'header 0' }),
  h(CollapsePanel, { key: 1, header: 'header 1' }),
  h(CollapsePanel, { key: 2, header: 'header 2' }),
]

describe('Collapse', () => {
  renderWork(Collapse, {
    props: { expandedKeys: [1] },
    slots: { default: () => defaultPanels },
  })

  describe('basic work', () => {
    const CollapseMount = (options?: MountingOptions<Partial<CollapseProps>>) => {
      const { slots, ...rest } = options || {}
      const mergedOptions = {
        slots: { default: () => defaultPanels, ...slots },
        ...rest,
      } as MountingOptions<CollapseProps>
      return mount(Collapse, mergedOptions)
    }

    test('v-model:expandedKeys work', async () => {
      const onUpdateExpandedKeys = jest.fn()
      const wrapper = CollapseMount({
        props: {
          expandedKeys: [0],
          'onUpdate:expandedKeys': onUpdateExpandedKeys,
        },
      })

      expect(wrapper.findAll('.ix-collapse-panel').length).toBe(3)
      expect(wrapper.findAll('.ix-collapse-panel-expanded').length).toBe(1)

      await wrapper.setProps({ expandedKeys: [0, 1] })

      expect(wrapper.findAll('.ix-collapse-panel-expanded').length).toBe(2)

      await wrapper.findAll('.ix-header')[0].trigger('click')

      expect(wrapper.findAll('.ix-collapse-panel-expanded').length).toBe(1)
      expect(onUpdateExpandedKeys).toBeCalledWith([1])

      await wrapper.findAll('.ix-header')[0].trigger('click')

      expect(wrapper.findAll('.ix-collapse-panel-expanded').length).toBe(2)
      expect(onUpdateExpandedKeys).toBeCalledWith([1, 0])
    })

    test('accordion work', async () => {
      const onUpdateExpandedKeys = jest.fn()
      const wrapper = CollapseMount({
        props: {
          accordion: true,
          expandedKeys: [0],
          'onUpdate:expandedKeys': onUpdateExpandedKeys,
        },
      })

      await wrapper.findAll('.ix-header')[1].trigger('click')

      expect(wrapper.findAll('.ix-collapse-panel-expanded').length).toBe(1)
      expect(onUpdateExpandedKeys).toBeCalledWith([1])

      await wrapper.findAll('.ix-header')[0].trigger('click')

      expect(wrapper.findAll('.ix-collapse-panel-expanded').length).toBe(1)
      expect(onUpdateExpandedKeys).toBeCalledWith([0])
    })

    test('borderless work', async () => {
      const wrapper = CollapseMount({
        props: {
          borderless: true,
        },
      })

      expect(wrapper.find('.ix-collapse-borderless').exists()).toBeTruthy()

      await wrapper.setProps({ borderless: false })

      expect(wrapper.find('.ix-collapse-borderless').exists()).toBeFalsy()
    })

    test('expandIcon work', async () => {
      const wrapper = CollapseMount({
        props: {
          expandIcon: 'left',
        },
      })

      expect(wrapper.find('.ix-icon-left').exists()).toBeTruthy()

      await wrapper.setProps({ expandIcon: 'right' })

      expect(wrapper.find('.ix-icon-left').exists()).toBeFalsy()
      expect(wrapper.find('.ix-icon-right').exists()).toBeTruthy()
    })

    test('expandIcon slot work', async () => {
      const wrapper = CollapseMount({
        props: {
          expandIcon: 'left',
        },
        slots: {
          expandIcon: ({ key, expanded }: { key: number; expanded: boolean }) =>
            key === 2 ? undefined : h(IxIcon, { name: 'up', rotate: expanded ? 90 : 0 }),
        },
      })

      expect(wrapper.findAll('.ix-icon-up').length).toBe(2)
    })

    test('ghost work', async () => {
      const wrapper = CollapseMount({
        props: {
          ghost: true,
        },
      })

      expect(wrapper.find('.ix-collapse-ghost').exists()).toBeTruthy()

      await wrapper.setProps({ ghost: false })

      expect(wrapper.find('.ix-collapse-ghost').exists()).toBeFalsy()
    })
  })

  describe('panel work', () => {
    test('disabled work', async () => {
      const onUpdateExpandedKeys = jest.fn()
      // TODO remove reactive
      const panelProps = reactive({ key: 0, header: 'header 0', disabled: true })
      const wrapper = mount(Collapse, {
        props: { 'onUpdate:expandedKeys': onUpdateExpandedKeys },
        slots: {
          default: () => [h(CollapsePanel, panelProps)],
        },
      })

      expect(wrapper.find('.ix-collapse-panel-disabled').exists()).toBeTruthy()

      await wrapper.findAll('.ix-header')[0].trigger('click')

      expect(onUpdateExpandedKeys).not.toBeCalled()

      panelProps.disabled = false

      await flushPromises()

      expect(wrapper.find('.ix-collapse-panel-disabled').exists()).toBeFalsy()

      await wrapper.findAll('.ix-header')[0].trigger('click')

      expect(onUpdateExpandedKeys).toBeCalledWith([0])
    })

    test('header work', async () => {
      const onUpdateExpandedKeys = jest.fn()
      // TODO remove reactive
      const panelProps = reactive({ key: 0, header: 'header 0' })
      const wrapper = mount(Collapse, {
        props: { 'onUpdate:expandedKeys': onUpdateExpandedKeys },
        slots: {
          default: () => [h(CollapsePanel, panelProps)],
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      panelProps.header = { title: 'hello header', suffix: 'left' } as any

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
