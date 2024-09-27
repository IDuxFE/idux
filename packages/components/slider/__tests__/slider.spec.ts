import { mount } from '@vue/test-utils'
import { ref } from 'vue'

import { renderWork } from '@tests'

import Slider from '../src/Slider'
import { SliderProps } from '../src/types'

describe('Slider', () => {
  // const SliderMount = (options?: MountingOptions<Partial<SliderProps>>) => mount(Slider, { ...options })

  renderWork<SliderProps>(Slider, {
    props: { value: 30 },
  })

  test('v-model work', async () => {
    const valueRef = ref(1)
    const wrapper = mount({
      components: { Slider },
      template: `<Slider v-model:value="valueRef" />`,
      setup() {
        return { valueRef }
      },
    })
    const thumb = wrapper.find<HTMLElement>('.ix-slider-thumb')

    expect(valueRef.value).toBe(1)
    expect(thumb.element.style.left).toBe('1%')

    await thumb.trigger('focus')
    await thumb.trigger('keydown', { code: 'ArrowUp' })

    expect(valueRef.value).toBe(2)
    expect(thumb.element.style.left).toBe('2%')
  })

  test('range work', () => {
    const valueRef = ref([20, 50])
    const wrapper = mount({
      components: { Slider },
      template: `<Slider v-model:value="valueRef" range />`,
      setup() {
        return { valueRef }
      },
    })
    const thumbs = wrapper.findAll('.ix-slider-thumb')

    expect(valueRef.value).toEqual([20, 50])
    expect(getComputedStyle(thumbs[0].element).left).toBe('20%')
    expect(getComputedStyle(thumbs[1].element).left).toBe('50%')
  })

  test('vertical work', () => {
    const valueRef = ref(30)
    const wrapper = mount({
      components: { Slider },
      template: `<Slider v-model:value="valueRef" vertical style="height: 300px" />`,
      setup() {
        return { valueRef }
      },
    })
    const thumb = wrapper.find('.ix-slider-thumb')

    expect(valueRef.value).toBe(30)
    expect(getComputedStyle(thumb.element).left).toBe('')
    expect(getComputedStyle(thumb.element).bottom).toBe('30%')
  })

  test('reverse work', () => {
    const valueRef = ref(30)
    const wrapper = mount({
      components: { Slider },
      template: `<Slider v-model:value="valueRef" reverse />`,
      setup() {
        return { valueRef }
      },
    })
    const thumb = wrapper.find('.ix-slider-thumb')

    expect(valueRef.value).toBe(30)
    expect(getComputedStyle(thumb.element).left).toBe('')
    expect(getComputedStyle(thumb.element).right).toBe('30%')
  })
})
