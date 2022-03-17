import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { VNode, h, ref } from 'vue'

import { isElementVisible, renderWork } from '@tests'

import { IxEmpty } from '@idux/components/empty'
import { IxIcon } from '@idux/components/icon'

import Select from '../src/Select'
import Content from '../src/content/Content'
import Option from '../src/content/Option'
import { SelectOption as SelectOptionComponent, SelectOptionGroup as SelectOptionGroupComponent } from '../src/option'
import { SelectData, SelectProps } from '../src/types'

describe('Select', () => {
  describe('single work', () => {
    const defaultDataSource = [
      { key: 1, label: 'Tom', value: 'tom' },
      { key: 2, label: 'Jerry', value: 'jerry' },
      { key: 3, label: 'Speike', value: 'speike', disabled: true },
    ]
    const defaultValue = 'tom'
    const SelectMount = (options?: MountingOptions<Partial<SelectProps>>) => {
      const { props, ...rest } = options || {}
      return mount(Select, {
        ...rest,
        props: { dataSource: defaultDataSource, value: defaultValue, ...props },
        attachTo: 'body',
      })
    }

    afterEach(() => {
      if (document.querySelector('.ix-select-overlay')) {
        document.querySelector('.ix-select-overlay')!.innerHTML = ''
      }
    })

    renderWork<SelectProps>(Select, { props: { dataSource: defaultDataSource, value: defaultValue }, attachTo: 'body' })

    test('v-model:value work', async () => {
      const onUpdateValue = jest.fn()
      const onChange = jest.fn()
      const wrapper = SelectMount({ props: { open: true, value: 'tom', 'onUpdate:value': onUpdateValue, onChange } })

      expect(wrapper.find('.ix-select-selector-item').text()).toBe('Tom')

      await wrapper.setProps({ value: undefined })

      expect(wrapper.find('.ix-select-selector-item').exists()).toBe(false)

      const options = wrapper.findAllComponents(Option)
      await options[0].trigger('click')

      expect(onUpdateValue).toBeCalledWith('tom')
      expect(onChange).toBeCalledWith('tom', undefined)

      await wrapper.setProps({ value: 'tom' })
      await options[1].trigger('click')

      expect(onUpdateValue).toBeCalledWith('jerry')
      expect(onChange).toBeCalledWith('jerry', 'tom')
    })

    test('v-model:open work', async () => {
      const onUpdateOpen = jest.fn()
      const wrapper = SelectMount({ props: { open: true, 'onUpdate:open': onUpdateOpen } })

      expect(wrapper.find('.ix-select-opened').exists()).toBe(true)
      expect(wrapper.findComponent(Content).isVisible()).toBe(true)

      await wrapper.setProps({ open: false })

      expect(wrapper.find('.ix-select-opened').exists()).toBe(false)
      expect(wrapper.findComponent(Content).isVisible()).toBe(false)

      // TODO fix
      // await wrapper.find('.ix-select').trigger('click')

      // expect(wrapper.find('.ix-select-opened').exists()).toBe(true)
      // expect(onUpdateOpen).toBeCalledWith(true)

      // await wrapper.find('.ix-select').trigger('click')

      // expect(wrapper.find('.ix-select-opened').exists()).toBe(false)
      // expect(onUpdateOpen).toBeCalledWith(false)
    })

    test('allowInput work', async () => {
      const onUpdateValue = jest.fn()
      const wrapper = SelectMount({ props: { allowInput: true, 'onUpdate:value': onUpdateValue } })

      const input = wrapper.find('input')

      await input.setValue('inputValue')
      await input.trigger('keydown', { code: 'Enter' })

      expect(onUpdateValue).toBeCalledWith('inputValue')

      await input.setValue('testValue')
      await input.trigger('keydown', { code: 'Enter' })

      expect(onUpdateValue).toBeCalledWith('testValue')
    })

    test('autofocus work', async () => {
      const wrapper = SelectMount({ props: { autofocus: true } })
      await flushPromises()

      expect(wrapper.find('.ix-select-opened').exists()).toBe(true)
      expect(wrapper.findComponent(Content).isVisible()).toBe(true)
    })

    test('borderless work', async () => {
      const wrapper = SelectMount({ props: { borderless: true } })

      expect(wrapper.find('.ix-select-borderless').exists()).toBe(true)

      await wrapper.setProps({ borderless: false })

      expect(wrapper.find('.ix-select-borderless').exists()).toBe(false)
    })

    test('custom keys work', async () => {
      const dataSource = [
        {
          key: 1,
          text: 'Manager',
          options: [
            { key: 11, text: 'Tom', name: 'tom' },
            { key: 12, text: 'Jerry', name: 'jerry' },
          ],
        },
        {
          key: 2,
          text: 'Engineer',
          options: [{ key: 21, text: 'Speike', name: 'speike' }],
        },
      ]

      const wrapper = SelectMount({
        props: { value: 'tom', open: true, dataSource, childrenKey: 'options', labelKey: 'text', valueKey: 'name' },
      })

      expect(wrapper.find('.ix-select-selector-item').text()).toBe('Tom')

      const optionsComps = wrapper.findAllComponents(Option)
      expect(optionsComps.length).toBe(3)
    })

    test('clearable work', async () => {
      const onUpdateValue = jest.fn()
      const wrapper = SelectMount({ props: { clearable: true, 'onUpdate:value': onUpdateValue } })

      expect(wrapper.find('.ix-select-clearable').exists()).toBe(true)
      expect(wrapper.find('.ix-select-selector-item').text()).toBe('Tom')

      await wrapper.find('.ix-select-selector-clear').trigger('click')

      expect(wrapper.find('.ix-select-clear').exists()).toBe(false)
      expect(onUpdateValue).toBeCalledWith(undefined)

      await wrapper.setProps({ value: 'jerry', clearable: false })

      expect(wrapper.find('.ix-select-clearable').exists()).toBe(false)
      expect(wrapper.find('.ix-select-selector-item').text()).toBe('Jerry')
    })

    test('clearIcon work', async () => {
      const wrapper = SelectMount({ props: { clearable: true, clearIcon: 'up' } })

      expect(wrapper.find('.ix-select-selector-clear').find('.ix-icon-up').exists()).toBe(true)

      await wrapper.setProps({ clearIcon: 'down' })

      expect(wrapper.find('.ix-select-selector-clear').find('.ix-icon-down').exists()).toBe(true)
    })

    test('clearIcon slot work', async () => {
      const wrapper = SelectMount({
        props: { clearable: true, clearIcon: 'up' },
        slots: {
          clearIcon: () => h(IxIcon, { name: 'down' }),
        },
      })

      expect(wrapper.find('.ix-select-selector-clear').find('.ix-icon-up').exists()).toBe(false)
      expect(wrapper.find('.ix-select-selector-clear').find('.ix-icon-down').exists()).toBe(true)
    })

    test('compareFn work', async () => {
      const compareFn = (o1: string, o2: string) => !!o1 && !!o2 && o1.charAt(0) === o2.charAt(0)
      const wrapper = SelectMount({ props: { value: 't', compareFn } })

      expect(wrapper.find('.ix-select-selector-item').text()).toBe('Tom')

      await wrapper.setProps({ value: 'j' })

      expect(wrapper.find('.ix-select-selector-item').text()).toBe('Jerry')
    })

    test('disabled work', async () => {
      const wrapper = SelectMount({ props: { disabled: true } })

      expect(wrapper.find('.ix-select-disabled').exists()).toBe(true)

      // await wrapper.find('.ix-select').trigger('click')

      // expect(wrapper.find('.ix-select-opened').exists()).toBe(false)

      await wrapper.setProps({ disabled: false })

      expect(wrapper.find('.ix-select-disabled').exists()).toBe(false)

      // await wrapper.find('.ix-select').trigger('click')

      // expect(wrapper.find('.ix-select-opened').exists()).toBe(true)
    })

    test('readonly work', async () => {
      const wrapper = SelectMount({
        props: { searchable: true, clearable: true, readonly: true, multiple: true, value: ['tom'] },
      })

      expect(wrapper.find('.ix-select-readonly').exists()).toBe(true)
      expect(wrapper.find('.ix-select-clearable').exists()).toBe(false)
      expect(wrapper.find('.ix-select-searchable').exists()).toBe(false)
      expect(wrapper.find('.ix-select-selector-item-remove').exists()).toBe(false)

      await wrapper.find('.ix-select').trigger('click')

      expect(wrapper.find('.ix-select-opened').exists()).toBe(false)

      await wrapper.setProps({ readonly: false })

      expect(wrapper.find('.ix-select-readonly').exists()).toBe(false)
      expect(wrapper.find('.ix-select-clearable').exists()).toBe(true)
      expect(wrapper.find('.ix-select-searchable').exists()).toBe(true)
      expect(wrapper.find('.ix-select-selector-item-remove').exists()).toBe(true)

      await wrapper.find('.ix-select').trigger('click')

      expect(wrapper.find('.ix-select-opened').exists()).toBe(true)
    })

    test('empty work', async () => {
      let emptyText = 'empty text'
      const wrapper = SelectMount({ props: { open: true, empty: emptyText, dataSource: [] } })

      expect(wrapper.findComponent(Content).find('.ix-empty-description').text()).toBe(emptyText)

      emptyText = 'empty text 2'
      await wrapper.setProps({ empty: { description: emptyText } })

      expect(wrapper.findComponent(Content).find('.ix-empty-description').text()).toBe(emptyText)
    })

    test('empty slot work', async () => {
      const wrapper = SelectMount({
        props: { open: true, empty: 'empty text', dataSource: [] },
        slots: { empty: () => h(IxEmpty, { description: 'empty slot' }) },
      })

      expect(wrapper.findComponent(Content).find('.ix-empty-description').text()).toBe('empty slot')
    })

    test('dataSource work', async () => {
      const wrapper = SelectMount({ props: { open: true, dataSource: [] } })

      expect(wrapper.findAllComponents(Option).length).toBe(0)

      await wrapper.setProps({ dataSource: defaultDataSource })

      expect(wrapper.findAllComponents(Option).length).toBe(3)
    })

    test('overlayClassName work', async () => {
      const wrapper = SelectMount({ props: { open: true, overlayClassName: 'test-class' } })

      expect(isElementVisible(document.querySelector('.test-class'))).toBe(true)

      await wrapper.setProps({ overlayClassName: undefined })

      expect(isElementVisible(document.querySelector('.test-class'))).toBe(false)
    })

    test('overlayRender work', async () => {
      const overlayRender = (children: VNode[]) => {
        return [children, h('div', { class: 'custom-render-div' })]
      }
      const wrapper = SelectMount({ props: { open: true, overlayRender } })

      expect(wrapper.findComponent(Content).find('.custom-render-div').exists()).toBe(true)
    })

    test('placeholder work', async () => {
      const wrapper = SelectMount({ props: { value: undefined, placeholder: 'placeholder' } })

      expect(wrapper.find('.ix-select-selector-placeholder').text()).toBe('placeholder')

      await wrapper.setProps({ value: 'tom' })

      expect(wrapper.find('.ix-select-selector-placeholder').exists()).toBe(false)

      await wrapper.setProps({ value: undefined })

      expect(wrapper.find('.ix-select-selector-placeholder').text()).toBe('placeholder')

      await wrapper.setProps({ placeholder: 'place' })

      expect(wrapper.find('.ix-select-selector-placeholder').text()).toBe('place')
    })

    test('placeholder slot work', async () => {
      const wrapper = SelectMount({
        props: { value: undefined, placeholder: 'placeholder' },
        slots: { placeholder: () => 'placeholder slot' },
      })

      expect(wrapper.find('.ix-select-selector-placeholder').text()).toBe('placeholder slot')
    })

    test('searchable work', async () => {
      const wrapper = SelectMount({ props: { open: true, searchable: true } })

      expect(wrapper.find('.ix-select-searchable').exists()).toBe(true)

      const input = wrapper.find('input')
      await input.setValue('t')

      expect(wrapper.findAllComponents(Option).length).toBe(1)

      await input.setValue('e')
      expect(wrapper.findAllComponents(Option).length).toBe(2)

      await wrapper.setProps({ searchable: false })

      expect(input.element.style.opacity).toBe('0')
    })

    test('searchable with searchFn work', async () => {
      const searchFn = (option: SelectData, searchValue: string) => searchValue === option.value
      const wrapper = SelectMount({ props: { open: true, searchable: true, searchFn } })

      expect(wrapper.find('.ix-select-searchable').exists()).toBe(true)

      const input = wrapper.find('input')
      await input.setValue('tom')

      expect(wrapper.findAllComponents(Option).length).toBe(1)

      await input.setValue('Tom')
      expect(wrapper.findAllComponents(Option).length).toBe(0)
    })

    test('searchable with labelKey work', async () => {
      const wrapper = SelectMount({
        props: {
          open: true,
          searchable: true,
          dataSource: [
            { key: 1, name: 'Tom', id: 'tom' },
            { key: 2, name: 'Jerry', id: 'jerry' },
            { key: 3, name: 'Speike', id: 'speike' },
          ],
          labelKey: 'name',
          valueKey: 'id',
        },
      })

      expect(wrapper.find('.ix-select-searchable').exists()).toBe(true)

      const input = wrapper.find('input')
      await input.setValue('T')

      expect(wrapper.findAllComponents(Option).length).toBe(1)

      await input.setValue('e')
      expect(wrapper.findAllComponents(Option).length).toBe(2)

      await input.setValue('z')
      expect(wrapper.findAllComponents(Option).length).toBe(0)
    })

    test('size work', async () => {
      const wrapper = SelectMount({ props: { size: 'lg' } })

      expect(wrapper.find('.ix-select-lg').exists()).toBe(true)

      await wrapper.setProps({ size: 'sm' })

      expect(wrapper.find('.ix-select-sm').exists()).toBe(true)

      await wrapper.setProps({ size: undefined })

      expect(wrapper.find('.ix-select-md').exists()).toBe(true)
    })

    test('suffix work', async () => {
      const wrapper = SelectMount({ props: { suffix: 'up' } })

      expect(wrapper.find('.ix-icon-up').exists()).toBe(true)

      await wrapper.setProps({ suffix: undefined })

      expect(wrapper.find('.ix-icon-down').exists()).toBe(true)
    })

    test('suffix slot work', async () => {
      const wrapper = SelectMount({ props: { suffix: 'down' }, slots: { suffix: () => h(IxIcon, { name: 'up' }) } })

      expect(wrapper.find('.ix-icon-up').exists()).toBe(true)
    })

    test('virtual work', async () => {
      const dataSource: SelectData[] = []

      for (let index = 0; index < 100; index++) {
        const value = `${index.toString(36)}${index}`
        dataSource.push({ key: index, label: value, value, disabled: index % 10 === 0 })
      }

      const wrapper = SelectMount({ props: { virtual: true, open: true, dataSource } })

      expect(wrapper.findAllComponents(Option).length).toBe(10)

      await wrapper.setProps({ virtual: false })

      expect(wrapper.findAllComponents(Option).length).toBe(100)
    })
  })

  describe('multiple work', () => {
    const defaultDataSource: SelectData[] = []
    for (let index = 0; index < 20; index++) {
      const prefix = index > 9 ? 'B' : 'A'
      defaultDataSource.push({ key: index, label: prefix + index, value: index, disabled: index % 3 === 0 })
    }

    const defaultValue = [0, 1, 2]

    const SelectMount = (options?: MountingOptions<Partial<SelectProps>>) => {
      const { props, ...rest } = options || {}
      return mount(Select, {
        ...rest,
        props: { multiple: true, dataSource: defaultDataSource, value: defaultValue, ...props },
        attachTo: 'body',
      })
    }

    afterEach(() => {
      if (document.querySelector('.ix-select-overlay')) {
        document.querySelector('.ix-select-overlay')!.innerHTML = ''
      }
    })

    renderWork<SelectProps>(Select, {
      props: { multiple: true, value: [0, 1, 2] },
      attachTo: 'body',
    })

    test('v-model:value work', async () => {
      const onUpdateValue = jest.fn()
      const onChange = jest.fn()
      const wrapper = SelectMount({
        props: { open: true, value: [0, 1, 2], 'onUpdate:value': onUpdateValue, onChange },
      })

      expect(wrapper.findAll('.ix-select-selector-item').length).toBe(3)

      await wrapper.setProps({ value: [0] })

      expect(wrapper.findAll('.ix-select-selector-item').length).toBe(1)

      // TODO fix
      // const options = wrapper.findAllComponents(Option)
      // await options[0].trigger('click')

      // expect(onUpdateValue).toBeCalledWith(['tom', 'jerry'])
      // expect(onChange).toBeCalledWith(['tom', 'jerry'], ['tom'])

      // await wrapper.setProps({ value: ['tom', 'jerry'] })
      // await options[1].trigger('click')

      // expect(onUpdateValue).toBeCalledWith(['tom'])
      // expect(onChange).toBeCalledWith(['tom'], ['tom', 'jerry'])
    })

    test('multipleLimit work', async () => {
      const wrapper = SelectMount({
        props: { open: true, value: [0, 1, 2, 3], multipleLimit: 4 },
      })

      let options = wrapper.findAllComponents(Option)

      expect(options[4].find('.ix-checkbox').classes()).toContain('ix-checkbox-disabled')
      expect(options[4].attributes('title')).toBe('该选择器的值不能超过 4 项')

      await wrapper.setProps({ multipleLimit: 5 })

      options = wrapper.findAllComponents(Option)

      expect(options[4].find('.ix-checkbox').classes()).not.toContain('ix-checkbox-disabled')
      expect(options[4].attributes('title')).toBe('')
    })

    test('maxLabelCount work', async () => {
      const wrapper = SelectMount({ props: { maxLabelCount: 3, value: [0, 1, 2, 4, 5] } })

      let items = wrapper.findAll('.ix-select-selector-item')

      expect(items[0].text()).toBe('A0')
      expect(items[1].text()).toBe('A1')
      expect(items[2].text()).toBe('A2')
      expect(items[3].text()).toBe('+ 2 ...')

      await wrapper.setProps({ maxLabelCount: 2 })

      items = wrapper.findAll('.ix-select-selector-item')

      expect(items[0].text()).toBe('A0')
      expect(items[1].text()).toBe('A1')
      expect(items[2].text()).toBe('+ 3 ...')
    })
  })

  describe('template work', () => {
    afterEach(() => {
      if (document.querySelector('.ix-select-overlay')) {
        document.querySelector('.ix-select-overlay')!.innerHTML = ''
      }
    })

    test('render work', () => {
      const wrapper = mount(
        {
          components: { Select, SelectOptionComponent, SelectOptionGroupComponent },
          template: `<Select v-model:value="value">
          <SelectOptionComponent v-for="option in dataSource" :key="option.key" :label="option.label" :value="option.value" :disabled="option.disabled">
          </SelectOptionComponent>
          <SelectOptionGroupComponent key="1" label="Manager">
            <SelectOptionComponent key="11" label="Tom" value="tom1"></SelectOptionComponent>
            <SelectOptionComponent key="11" label="Jerry" value="jerry2"></SelectOptionComponent>
          </SelectOptionGroupComponent>
          <SelectOptionGroupComponent key="21" label="Engineer">
            <SelectOptionComponent key="2" label="Speike" value="speike3"></SelectOptionComponent>
          </SelectOptionGroupComponent>
        </Select>`,
          setup() {
            const value = ref('tom')
            const dataSource: SelectData[] = [
              { key: '01', label: 'Tom', value: 'tom' },
              { key: '02', label: 'Jerry', value: 'jerry' },
              { key: '03', label: 'Speike', value: 'speike', disabled: true },
            ]
            return { value, dataSource }
          },
        },
        {
          attachTo: 'body',
        },
      )

      expect(wrapper.html()).toMatchSnapshot()

      expect(() => {
        wrapper.vm.$forceUpdate()
        wrapper.unmount()
      }).not.toThrow()
    })
  })
})
