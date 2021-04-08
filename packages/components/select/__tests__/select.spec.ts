import { ComponentPublicInstance, reactive } from 'vue'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { wait } from '@tests'
import IxSelect from '../src/Select.vue'
import IxOption from '../src/Option.vue'
import IxOptionGroup from '../src/OptionGroup.vue'
import { OptionProps, SelectProps } from '../src/types'

describe('Select.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let SelectMount: (options: any) => VueWrapper<ComponentPublicInstance>

  beforeEach(() => {
    SelectMount = (options = {}) => {
      return mount(
        {
          components: { IxSelect, IxOption, IxOptionGroup },
          ...options,
        },
        { attachTo: 'body' },
      )
    }
  })

  describe('single template work', () => {
    let selectProps: Partial<SelectProps>
    let selectWrapper: VueWrapper<ComponentPublicInstance>
    let selectContainer: HTMLElement
    let optionContainer: HTMLElement
    let options: HTMLElement[]
    const getOptions = () => Array.from(document.querySelectorAll('.ix-option')) as HTMLElement[]

    const initSelect = (props: Partial<SelectProps>, slots?: string) => {
      selectWrapper = SelectMount({
        template: `
        <ix-select
          v-model:value="props.value"
          v-model:open="props.open"
          :autofocus="props.autofocus"
          :borderless="props.borderless"
          :clearable="props.clearable"
          :compareWith="props.compareWith"
          :disabled="props.disabled"
          :empty="props.empty"
          :filterOption="props.filterOption"
          :inputable="props.inputable"
          :overlayClass="props.overlayClass"
          :placeholder="props.placeholder"
          :searchable="props.searchable"
          :size="props.size"
          :suffix="props.suffix"
        >
          <ix-option label="Tom" value="tom" />
          <ix-option label="Jerry" value="jerry" />
          <ix-option label="Speike" value="speike" /> 
          ${slots || ''}
        </ix-select>
        `,
        setup() {
          return { props }
        },
      })

      selectContainer = document.querySelector('.ix-select-container')!
      optionContainer = document.querySelector('.ix-option-container')!
      options = getOptions()
    }

    afterEach(() => {
      selectContainer.innerHTML = ''
    })

    test('render work', () => {
      selectProps = reactive({ value: 'tom' })
      initSelect(selectProps)

      expect(selectWrapper.html()).toMatchSnapshot()

      expect(() => {
        selectWrapper.vm.$forceUpdate()
        selectWrapper.unmount()
      }).not.toThrow()
    })

    test('v-model:value work', async () => {
      selectProps = reactive({ value: 'tom' })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Tom')

      selectProps.value = undefined
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').exists()).toBeFalsy()

      options[1].click()
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Jerry')
      expect(selectProps.value).toBe('jerry')
    })

    test('v-model:open work', async () => {
      selectProps = reactive({ open: true })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.classes()).toContain('ix-select-opened')
      expect(optionContainer.style.display).toBe('')

      selectProps.open = false
      await flushPromises()

      expect(selectWrapper.classes()).not.toContain('ix-select-opened')
      expect(optionContainer.style.display).toBe('none')

      await selectWrapper.trigger('click')

      expect(selectWrapper.classes()).toContain('ix-select-opened')
      expect(optionContainer.style.display).toBe('')
      expect(selectProps.open).toBe(true)

      await selectWrapper.trigger('click')

      expect(selectWrapper.classes()).not.toContain('ix-select-opened')
      expect(optionContainer.style.display).toBe('none')
      expect(selectProps.open).toBe(false)
    })

    test('autofocus work', async () => {
      selectProps = reactive({ autofocus: true })
      initSelect(selectProps)

      await flushPromises()
      await wait(120)

      expect(optionContainer.style.display).toBe('')

      selectProps.autofocus = false
      await flushPromises()

      expect(optionContainer.style.display).toBe('')
    })

    test('autofocus work', async () => {
      selectProps = reactive({ borderless: true })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.classes()).toContain('ix-select-borderless')

      selectProps.borderless = false
      await flushPromises()

      expect(selectWrapper.classes()).not.toContain('ix-select-borderless')
    })

    test('clearable work', async () => {
      selectProps = reactive({ value: 'tom', clearable: true })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.classes()).toContain('ix-select-clearable')
      expect(selectWrapper.find('.ix-select-item').text()).toBe('Tom')

      selectWrapper.find('.ix-select-clear').trigger('click')
      await flushPromises()

      expect(selectWrapper.find('.ix-select-clear').exists()).toBeFalsy()
      expect(selectWrapper.find('.ix-select-item').exists()).toBeFalsy()

      selectProps.clearable = false
      selectProps.value = 'tom'
      await flushPromises()

      expect(selectWrapper.classes()).not.toContain('ix-select-clearable')
      expect(selectWrapper.find('.ix-select-clear').exists()).toBeFalsy()
      expect(selectWrapper.find('.ix-select-item').text()).toBe('Tom')
    })

    test('compareWith work', async () => {
      const compareWith = (o1: string, o2: string) => !!o1 && !!o2 && o1.charAt(0) === o2.charAt(0)
      selectProps = reactive({ value: 't', compareWith })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Tom')

      selectProps.value = 'j'
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Jerry')

      options[0].click()
      await flushPromises()

      expect(selectProps.value).toBe('tom')
      expect(selectWrapper.find('.ix-select-item').text()).toBe('Tom')
    })

    test('disabled work', async () => {
      selectProps = reactive({ disabled: true })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.classes()).toContain('ix-select-disabled')

      await selectWrapper.trigger('click')

      expect(optionContainer.style.display).toBe('none')

      selectProps.disabled = false

      await flushPromises()

      expect(selectWrapper.classes()).not.toContain('ix-select-disabled')

      await selectWrapper.trigger('click')

      expect(optionContainer.style.display).toBe('')
    })

    test('overlayClass work', async () => {
      selectProps = reactive({ overlayClass: 'text-class' })
      initSelect(selectProps)
      await flushPromises()

      expect(optionContainer.classList).toContain('text-class')

      selectProps.overlayClass = undefined
      await flushPromises()

      expect(optionContainer.classList).not.toContain('text-class')
    })

    test('placeholder work', async () => {
      selectProps = reactive({ placeholder: 'placeholder' })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.find('.ix-select-placeholder').text()).toBe('placeholder')

      selectProps.value = 'tom'
      await flushPromises()

      expect(selectWrapper.find('.ix-select-placeholder').exists()).toBeFalsy()

      selectProps.value = undefined
      await flushPromises()

      expect(selectWrapper.find('.ix-select-placeholder').text()).toBe('placeholder')

      selectProps.placeholder = ''
      await flushPromises()

      expect(selectWrapper.find('.ix-select-placeholder').text()).toBe('')
    })

    test('placeholder slot work', async () => {
      const placeholderSlot = '<template #placeholder>placeholderSlot</template>'
      selectProps = reactive({ placeholder: 'placeholder' })
      initSelect(selectProps, placeholderSlot)
      await flushPromises()

      expect(selectWrapper.find('.ix-select-placeholder').text()).toBe('placeholderSlot')
    })

    test('searchable work', async () => {
      selectProps = reactive({ searchable: true })
      initSelect(selectProps)
      const input = selectWrapper.find('input')
      const getShowOptions = () => options.filter(option => option.style.display !== 'none')
      await flushPromises()

      expect(selectWrapper.classes()).toContain('ix-select-searchable')

      input.element.value = 't'
      await input.trigger('input')

      expect(getShowOptions().length).toBe(1)

      input.element.value = 'e'
      await input.trigger('input')

      expect(getShowOptions().length).toBe(2)

      input.element.value = '拼音'
      await input.trigger('compositionstart')

      expect(getShowOptions().length).toBe(2)

      await input.trigger('input')

      expect(getShowOptions().length).toBe(2)

      await input.trigger('compositionend')

      expect(getShowOptions().length).toBe(0)

      input.element.value = ''
      await input.trigger('input')

      expect(getShowOptions().length).toBe(3)

      selectProps.searchable = false
      await flushPromises()

      expect(input.element.style.opacity).toBe('0')
    })

    test('filterOption work', async () => {
      const filterOption = (searchValue: string, option: OptionProps) => searchValue === option.value
      selectProps = reactive({ searchable: true, filterOption })
      initSelect(selectProps)
      const input = selectWrapper.find('input')
      const getShowOptions = () => options.filter(option => option.style.display !== 'none')
      await flushPromises()

      input.element.value = 't'
      await input.trigger('input')

      expect(getShowOptions().length).toBe(0)

      input.element.value = 'tom'
      await input.trigger('input')

      expect(getShowOptions().length).toBe(1)

      selectProps.filterOption = undefined
      await flushPromises()
      input.element.value = 't'
      await input.trigger('input')

      expect(getShowOptions().length).toBe(1)
    })

    test('empty work', async () => {
      selectProps = reactive({ empty: 'empty' })
      selectWrapper = SelectMount({
        template: `<ix-select :empty="selectProps.empty"></ix-select>`,
        setup() {
          return { selectProps }
        },
      })
      optionContainer = document.querySelector('.ix-option-container')!
      await flushPromises()

      expect(optionContainer.querySelector('.ix-option-container-empty')!.textContent).toBe('empty')
    })

    test('empty slot work', async () => {
      const emptySlot = '<template #empty>emptySlot</template>'
      selectProps = reactive({ empty: 'empty' })
      selectWrapper = SelectMount({
        template: `<ix-select :empty="selectProps.empty">${emptySlot}</ix-select>`,
        setup() {
          return { selectProps }
        },
      })
      optionContainer = document.querySelector('.ix-option-container')!
      await flushPromises()

      expect(optionContainer.querySelector('.ix-option-container-empty')!.textContent).toBe('emptySlot')
    })

    test('size work', async () => {
      selectProps = reactive({ size: 'large' })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.classes()).toContain('ix-select-large')

      selectProps.size = 'small'
      await flushPromises()

      expect(selectWrapper.classes()).toContain('ix-select-small')

      selectProps.size = undefined
      await flushPromises()

      expect(selectWrapper.classes()).toContain('ix-select-medium')
    })

    test('suffix work', async () => {
      selectProps = reactive({ suffix: 'star' })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.find('.ix-icon-star').exists()).toBeTruthy()

      selectProps.suffix = undefined
      await flushPromises()

      expect(selectWrapper.find('.ix-icon-down').exists()).toBeTruthy()
    })

    test('suffix slot work', async () => {
      const suffixSlot = '<template #suffix>suffixSlot</template>'
      selectProps = reactive({ suffix: 'star' })
      initSelect(selectProps, suffixSlot)
      await flushPromises()

      expect(selectWrapper.find('.ix-select-suffix').text()).toBe('suffixSlot')
    })

    test('group options work', async () => {
      selectProps = reactive({ value: 'tom0' })
      selectWrapper = SelectMount({
        template: `
        <ix-select v-model:value="props.value"  >
          <ix-option-group label="Tom">
            <ix-option label="Tom0" value="tom0" />
            <ix-option label="Tom1" value="tom1" />
          </ix-option-group>  
          <ix-option-group label="Jerry">
            <ix-option label="Jerry0" value="jerry0" />
            <ix-option label="Jerry1" value="jerry1" />
          </ix-option-group>
          <ix-option-group label="Speike">
            <ix-option label="Speike0" value="speike0" />
            <ix-option label="Speike1" value="speike1" />
          </ix-option-group>
        </ix-select>
        `,
        setup() {
          return { props: selectProps }
        },
      })
      await flushPromises()

      expect(selectWrapper.html()).toMatchSnapshot()
    })
  })

  describe('multiple template work', () => {
    let selectProps: Partial<SelectProps>
    let selectWrapper: VueWrapper<ComponentPublicInstance>
    let selectContainer: HTMLElement
    let options: HTMLElement[]
    const getOptions = () => Array.from(document.querySelectorAll('.ix-option')) as HTMLElement[]

    const initSelect = (props: Partial<SelectProps>, slots?: string) => {
      selectWrapper = SelectMount({
        template: `
        <ix-select
          multiple
          v-model:value="props.value"
          :maxLabelCount="props.maxLabelCount"
          :multipleLimit="props.multipleLimit"
        >
          <ix-option label="Tom" value="tom" />
          <ix-option label="Jerry" value="jerry" />
          <ix-option label="Speike" value="speike" />
          ${slots || ''}
        </ix-select>
        `,
        setup() {
          return { props }
        },
      })

      selectContainer = document.querySelector('.ix-select-container')!
      options = getOptions()
    }

    afterEach(() => {
      selectContainer.innerHTML = ''
    })

    test('render work', () => {
      selectProps = reactive({ value: ['tom', 'jerry', 'speike'] })
      initSelect(selectProps)

      expect(selectWrapper.html()).toMatchSnapshot()

      expect(() => {
        selectWrapper.vm.$forceUpdate()
        selectWrapper.unmount()
      }).not.toThrow()
    })

    test('v-model:value work', async () => {
      selectProps = reactive({ value: ['tom'] })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item').length).toBe(1)

      selectProps.value = ['tom', 'jerry']
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item').length).toBe(2)

      options[2].click()
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item').length).toBe(3)
      expect(selectProps.value).toEqual(['tom', 'jerry', 'speike'])

      options[2].click()
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item').length).toBe(2)
      expect(selectProps.value).toEqual(['tom', 'jerry'])

      await selectWrapper.findAll('.ix-select-item-remove')[1].trigger('click')

      expect(selectWrapper.findAll('.ix-select-item').length).toBe(1)
      expect(selectProps.value).toEqual(['tom'])
    })

    test('maxLabelCount work', async () => {
      selectProps = reactive({ maxLabelCount: 2 })
      initSelect(selectProps)
      await flushPromises()

      options.forEach(item => item.click())
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item')[0].text()).toBe('Tom')
      expect(selectWrapper.findAll('.ix-select-item')[1].text()).toBe('Jerry')
      expect(selectWrapper.findAll('.ix-select-item')[2].text()).toBe('+ 1 ...')

      options.forEach(item => item.click())
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item').length).toBe(0)

      selectProps.maxLabelCount = 1
      options.forEach(item => item.click())
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item')[0].text()).toBe('Tom')
      expect(selectWrapper.findAll('.ix-select-item')[1].text()).toBe('+ 2 ...')
    })

    test('maxLabelCount slot work', async () => {
      const maxLabelCountSlot =
        '<template #customMaxLabel="{ option }">and {{ option.value.length }} more selected</template>'
      selectProps = reactive({ maxLabelCount: 1 })
      initSelect(selectProps, maxLabelCountSlot)
      await flushPromises()

      options.forEach(item => item.click())
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item')[0].text()).toBe('Tom')
      expect(selectWrapper.findAll('.ix-select-item')[1].text()).toBe('and 2 more selected')

      options[2].click()
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item')[0].text()).toBe('Tom')
      expect(selectWrapper.findAll('.ix-select-item')[1].text()).toBe('and 1 more selected')
    })

    test('customLabel slot work', async () => {
      const customLabelSlot = '<template #customLabel="{ option }">{{ option.label }}:{{ option.value }}</template>'
      selectProps = reactive({ value: ['tom'] })
      initSelect(selectProps, customLabelSlot)
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item')[0].text()).toBe('Tom:tom')

      options[1].click()
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item')[0].text()).toBe('Tom:tom')
      expect(selectWrapper.findAll('.ix-select-item')[1].text()).toBe('Jerry:jerry')
    })

    test('multipleLimit work', async () => {
      selectProps = reactive({ multipleLimit: 2 })
      initSelect(selectProps)
      await flushPromises()

      options.forEach(item => item.click())
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item').length).toBe(2)
      expect(selectProps.value).toEqual(['tom', 'jerry'])

      selectProps.value = []
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item').length).toBe(0)

      selectProps.multipleLimit = 1
      await flushPromises()

      options.forEach(item => item.click())
      await flushPromises()

      expect(selectWrapper.findAll('.ix-select-item').length).toBe(1)
      expect(selectProps.value).toEqual(['tom'])
    })
  })

  describe('render options work', () => {
    let selectProps: Partial<SelectProps>
    let selectWrapper: VueWrapper<ComponentPublicInstance>
    let selectContainer: HTMLElement
    let options: HTMLElement[]
    const getOptions = () => Array.from(document.querySelectorAll('.ix-option')) as HTMLElement[]

    const initSelect = (props: Partial<SelectProps>) => {
      selectWrapper = SelectMount({
        template: `
        <ix-select
          v-model:value="props.value"
          :options="props.options"
          :labelKey="props.labelKey"
          :valueKey="props.valueKey"
        >
        </ix-select>
        `,
        setup() {
          return { props }
        },
      })

      selectContainer = document.querySelector('.ix-select-container')!
      options = getOptions()
    }

    afterEach(() => {
      selectContainer.innerHTML = ''
    })

    test('render work', () => {
      selectProps = reactive({
        value: 'tom',
        options: [
          { label: 'Tom', value: 'tom' },
          { label: 'Jerry', value: 'jerry' },
          { label: 'Speike', value: 'speike' },
        ],
      })
      initSelect(selectProps)

      expect(selectWrapper.html()).toMatchSnapshot()

      expect(() => {
        selectWrapper.vm.$forceUpdate()
        selectWrapper.unmount()
      }).not.toThrow()
    })

    test('v-model:value work', async () => {
      selectProps = reactive({
        value: 'tom',
        options: [
          { label: 'Tom', value: 'tom' },
          { label: 'Jerry', value: 'jerry' },
          { label: 'Speike', value: 'speike', disabled: true },
        ],
      })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Tom')

      selectProps.value = 'jerry'
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Jerry')

      options[2].click()
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Jerry')
      expect(selectProps.value).toEqual('jerry')

      options[0].click()
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Tom')
      expect(selectProps.value).toEqual('tom')
    })

    test('labelKey and valueKey work', async () => {
      selectProps = reactive({
        value: 'tom',
        labelKey: 'text',
        valueKey: 'id',
        options: [
          { text: 'Tom', id: 'tom' },
          { text: 'Jerry', id: 'jerry' },
          { text: 'Speike', id: 'speike', disabled: true },
        ],
      })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Tom')

      selectProps.value = 'jerry'
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Jerry')

      options[2].click()
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Jerry')
      expect(selectProps.value).toEqual('jerry')

      options[0].click()
      await flushPromises()

      expect(selectWrapper.find('.ix-select-item').text()).toBe('Tom')
      expect(selectProps.value).toEqual('tom')
    })

    test('group options work', async () => {
      selectProps = reactive({
        value: 'tom0',
        options: [
          { label: 'Tom0', value: 'tom0', groupLabel: 'Tom' },
          { label: 'Tom1', value: 'tom1', groupLabel: 'Tom' },
          { label: 'Jerry0', value: 'jerry0', groupLabel: 'Jerry' },
          { label: 'Jerry1', value: 'jerry1', groupLabel: 'Jerry' },
          { label: 'Speike0', value: 'speike0', groupLabel: 'Speike' },
          { label: 'Speike1', value: 'speike1', groupLabel: 'Speike' },
        ],
      })
      initSelect(selectProps)
      await flushPromises()

      expect(selectWrapper.html()).toMatchSnapshot()
    })
  })
})
