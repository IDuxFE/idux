import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Cascader from '../src/Cascader'
import OverlayContent from '../src/contents/OverlayContent'
import { CascaderData, CascaderProps } from '../src/types'

const defaultDataSource: CascaderData[] = [
  {
    key: 'components',
    label: 'Components',
    children: [
      {
        key: 'general',
        label: 'General',
        children: [
          {
            key: 'button',
            label: 'Button',
          },
          {
            key: 'header',
            label: 'Header',
          },
          {
            key: 'icon',
            label: 'Icon',
          },
        ],
      },
      {
        key: 'layout',
        label: 'Layout',
        children: [
          {
            key: 'divider',
            label: 'Divider',
          },
          {
            key: 'grid',
            label: 'Grid',
          },
          {
            key: 'space',
            label: 'Space',
          },
        ],
      },
      {
        key: 'navigation',
        label: 'Navigation',
        children: [
          {
            key: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            key: 'dropdown',
            label: 'Dropdown',
          },
          {
            key: 'menu',
            label: 'Menu',
          },
          {
            key: 'pagination',
            label: 'Pagination',
          },
        ],
      },
    ],
  },
  {
    key: 'pro',
    label: 'Pro',
    children: [
      {
        key: 'pro-layout',
        label: 'Layout',
      },
      {
        key: 'pro-table',
        label: 'Table',
        disabled: true,
      },
      {
        key: 'pro-transfer',
        label: 'Transfer',
      },
    ],
  },
  {
    key: 'cdk',
    label: 'CDK',
    disabled: true,
    children: [
      {
        key: 'a11y',
        label: 'Accessibility',
      },
      {
        key: 'breakpoint',
        label: 'Breakpoint',
      },
      {
        key: 'click-outside',
        label: 'ClickOutside',
      },
      {
        key: 'clipboard',
        label: 'Clipboard',
      },
      {
        key: 'forms',
        label: 'Forms',
      },
    ],
  },
]
const defaultSingleValue = ['components', 'general', 'button']
const defaultMultipleValue = [
  ['components', 'general', 'button'],
  ['pro', 'pro-table'],
]
const defaultExpandedKeys = ['components', 'general']

describe.only('Cascader', () => {
  describe('single work', () => {
    const CascaderMount = (options?: MountingOptions<Partial<CascaderProps>>) => {
      const { props, ...rest } = options || {}
      return mount(Cascader, {
        ...rest,
        props: {
          dataSource: defaultDataSource,
          value: defaultSingleValue,
          expandedKeys: defaultExpandedKeys,
          ...props,
        },
        attachTo: 'body',
      })
    }

    renderWork<CascaderProps>(Cascader, {
      props: {
        open: true,
        dataSource: defaultDataSource,
        value: defaultSingleValue,
        expandedKeys: defaultExpandedKeys,
      },
      attachTo: 'body',
    })

    test('v-model:value work', async () => {
      const onUpdateValue = vi.fn()
      const onChange = vi.fn()
      const wrapper = CascaderMount({
        props: {
          open: true,
          'onUpdate:value': onUpdateValue,
          onChange,
        },
      })

      expect(wrapper.find('.ix-selector-item').text()).toBe('Components/General/Button')

      await wrapper.setProps({ value: undefined })

      expect(wrapper.find('.ix-selector-item').exists()).toBe(false)

      const allGroups = wrapper.findComponent(OverlayContent).findAll('.ix-cascader-option-group')

      await allGroups[2].find('.ix-cascader-option').trigger('click')

      // expect(onUpdateValue).toBeCalledWith(['components', 'general', 'button'])
      // expect(onChange).toBeCalledWith(['components', 'general', 'button'], undefined)

      await wrapper.setProps({ value: ['components', 'general', 'button'] })
      await allGroups[2].find('.ix-cascader-option').trigger('click')

      // expect(onUpdateValue).toBeCalledWith(['pro', 'pro-layout'])
      // expect(onChange).toBeCalledWith(['pro', 'pro-layout'], ['components', 'general', 'button'])
    })
  })

  describe('multiple work', () => {
    const CascaderMount = (options?: MountingOptions<Partial<CascaderProps>>) => {
      const { props, ...rest } = options || {}
      return mount(Cascader, {
        ...rest,
        props: {
          multiple: true,
          dataSource: defaultDataSource,
          value: defaultMultipleValue,
          expandedKeys: defaultExpandedKeys,
          ...props,
        },
        attachTo: 'body',
      })
    }

    renderWork<CascaderProps>(Cascader, {
      props: { multiple: true, open: true, dataSource: defaultDataSource, value: defaultMultipleValue },
      attachTo: 'body',
    })

    test('v-model:value work', async () => {
      const onUpdateValue = vi.fn()
      const onChange = vi.fn()
      const wrapper = CascaderMount({
        props: {
          open: true,
          'onUpdate:value': onUpdateValue,
          onChange,
        },
      })

      expect(wrapper.findAll('.ix-selector-item').length).toBe(2)

      await wrapper.setProps({ value: [['components', 'general', 'button']] })

      expect(wrapper.findAll('.ix-selector-item').length).toBe(1)

      const allGroups = wrapper.findComponent(OverlayContent).findAll('.ix-cascader-option-group')

      await allGroups[2].find('.ix-cascader-option').trigger('click')

      // expect(onUpdateValue).toBeCalledWith([
      //   ['components', 'general', 'button'],
      //   ['pro', 'pro-layout'],
      // ])
      // expect(onChange).toBeCalledWith(
      //   [
      //     ['components', 'general', 'button'],
      //     ['pro', 'pro-layout'],
      //   ],
      //   [['components', 'general', 'button']],
      // )
    })
  })
})
