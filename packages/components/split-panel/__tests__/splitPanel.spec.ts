import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { h, ref } from 'vue'

import { renderWork } from '@tests'

import SplitArea from '../src/SplitArea'
import SplitPanel from '../src/SplitPanel'
import { SplitPanelProps } from '../src/types'

const defaultSlots = [h(SplitArea), h(SplitArea)]

describe('SplitPanel', () => {
  const SplitPanelMount = (options?: MountingOptions<Partial<SplitPanelProps>>) => {
    const mergedOptions = {
      slots: { default: () => defaultSlots },
      ...options,
      attachTo: 'body',
    } as MountingOptions<SplitPanelProps>
    return mount(SplitPanel, mergedOptions)
  }

  renderWork(SplitPanel, { slots: { default: () => defaultSlots } })

  test('vertical work', async () => {
    const wrapper = SplitPanelMount()

    expect(wrapper.classes()).not.toContain('ix-split-panel-vertical')

    await wrapper.setProps({ vertical: true })

    expect(wrapper.classes()).toContain('ix-split-panel-vertical')
  })

  test('splitterSize work', async () => {
    const wrapper = SplitPanelMount()

    expect(wrapper.find('.ix-split-panel-splitter').attributes('style')).toContain('width: 2px')

    await wrapper.setProps({ splitterSize: 4 })

    expect(wrapper.find('.ix-split-panel-splitter').attributes('style')).toContain('width: 4px')

    await wrapper.setProps({ vertical: true })

    expect(wrapper.find('.ix-split-panel-splitter').attributes('style')).toContain('height: 4px')
  })

  test('splitterColor and splitterActiveColor work', async () => {
    const wrapper = SplitPanelMount()

    expect(wrapper.find('.ix-split-panel-splitter').attributes('style')).toContain('background-color: transparent')

    await wrapper.setProps({ splitterColor: 'rgb(200, 200, 200)' })

    expect(wrapper.find('.ix-split-panel-splitter').attributes('style')).toContain(
      'background-color: rgb(200, 200, 200)',
    )

    await wrapper.find('.ix-split-panel-splitter').trigger('mousedown')

    expect(wrapper.find('.ix-split-panel-splitter').attributes('style')).toContain(
      'background-color: rgb(225, 229, 235)',
    )

    await wrapper.setProps({ splitterActiveColor: 'rgb(235, 235, 235)' })

    expect(wrapper.find('.ix-split-panel-splitter').attributes('style')).toContain(
      'background-color: rgb(235, 235, 235)',
    )
  })

  test('splitterColor and splitterActiveColor work', async () => {
    const onSplitterMousedown = vi.fn()
    const onSplitterMouseup = vi.fn()
    const onSplitterMousemove = vi.fn()
    const wrapper = SplitPanelMount({
      props: {
        onSplitterMousedown,
        onSplitterMouseup,
        onSplitterMousemove,
      },
    })

    await wrapper.find('.ix-split-panel-splitter').trigger('mousedown')

    expect(onSplitterMousedown).toBeCalledWith(new MouseEvent('mousedown'), 0)

    await wrapper.find('.ix-split-panel-splitter').trigger('mousemove')

    expect(onSplitterMousemove).toBeCalledWith(new MouseEvent('mousemove'), 0)

    await wrapper.find('.ix-split-panel-splitter').trigger('mouseup')

    expect(onSplitterMouseup).toBeCalledWith(new MouseEvent('mouseup'), 0)
  })

  test('splitArea props work', async () => {
    const sizeRef = ref(200)
    const verticalRef = ref(false)
    const onTouchedMinSizeChange = vi.fn()
    const wrapper = mount(
      {
        components: { SplitPanel, SplitArea },
        template: `
        <SplitPanel :vertical="verticalRef">
          <SplitArea :size="sizeRef" :minSize="50" :onTouchedMinSizeChange="onTouchedMinSizeChange"> left </SplitArea>
          <SplitArea :size="400"> right </SplitArea>
        </SplitPanel>
      `,
        setup() {
          return { sizeRef, verticalRef, onTouchedMinSizeChange }
        },
      },
      {
        attachTo: 'body',
      },
    )

    await flushPromises()

    expect(wrapper.findAll('.ix-split-panel-area')[0].attributes('style')).toContain('width: 200px;')
    expect(wrapper.findAll('.ix-split-panel-area')[1].attributes('style')).toContain('width: 400px;')

    sizeRef.value = 100

    await flushPromises()

    expect(wrapper.findAll('.ix-split-panel-area')[0].attributes('style')).toContain('width: 100px;')
    expect(wrapper.findAll('.ix-split-panel-area')[1].attributes('style')).toContain('width: 500px;')

    wrapper.find('.ix-split-panel-splitter').trigger('mousedown')
    wrapper.find('.ix-split-panel-splitter').trigger('mousemove', { clientX: -200 })

    await flushPromises()

    expect(wrapper.findAll('.ix-split-panel-area')[0].attributes('style')).toContain('width: 50px;')
    expect(wrapper.findAll('.ix-split-panel-area')[1].attributes('style')).toContain('width: 550px;')

    expect(onTouchedMinSizeChange).toBeCalledWith(true)

    wrapper.find('.ix-split-panel-splitter').trigger('mousedown')
    wrapper.find('.ix-split-panel-splitter').trigger('mousemove', { clientX: 400 })

    await flushPromises()

    expect(onTouchedMinSizeChange).toBeCalledWith(false)

    verticalRef.value = true

    await flushPromises()

    expect(wrapper.findAll('.ix-split-panel-area')[0].attributes('style')).toContain('height: 450px;')
    expect(wrapper.findAll('.ix-split-panel-area')[1].attributes('style')).toContain('height: 150px;')
    expect(wrapper.find('.ix-split-panel-splitter').attributes('style')).toContain('height: 2px;')
  })
})
