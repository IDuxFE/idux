import { mount } from '@vue/test-utils'
import { computed, reactive, ref } from 'vue'

import { scrollTarget, wait } from '@tests'

import { usePanelScroll } from '../src/composables/usePanelScroll'
import { TimePanelColumnProps } from '../src/types'

const options = [
  {
    value: 1,
    disabled: false,
  },
  {
    value: 2,
    disabled: true,
  },
  {
    value: 3,
    disabled: false,
  },
  {
    value: 4,
    disabled: false,
  },
  {
    value: 5,
    disabled: true,
  },
]

const cellHeight = 50

describe('usePanelScroll', () => {
  const Comp = {
    template: `<ul style="display:block">
      <li v-for="item in options" class="test-cell" :style="liStyle">{{ item.value }}</li>
    </ul>`,
    data: () => ({
      options,
      ulStyle: {
        height: `${cellHeight}px`,
        width: '20px',
        margin: 0,
        padding: 0,
        overflow: 'auto',
      },
      liStyle: {
        height: `${cellHeight}px`,
        width: '20px',
        margin: 0,
        padding: 0,
      },
    }),
  }
  const TestCompMount = () => mount(Comp)
  const initTestContext = (selectedValue?: number) => {
    const wrapper = TestCompMount()
    Object.defineProperty(wrapper.element as HTMLUListElement, 'offsetHeight', {
      get() {
        return cellHeight
      },
    })
    ;[].slice.call(wrapper.element.querySelectorAll('li')).forEach(li => {
      Object.defineProperty(li as HTMLUListElement, 'offsetHeight', {
        get() {
          return cellHeight
        },
      })
    })
    const onChange = vi.fn()
    const props: TimePanelColumnProps = reactive({
      selectedValue: selectedValue ?? 1,
      options,
      onChange,
    })
    const scrollAPI = usePanelScroll(
      props,
      ref(wrapper.element as HTMLUListElement),
      computed(() => 'test'),
    )
    ;(wrapper.element as HTMLUListElement).addEventListener('scroll', scrollAPI.handleScroll)

    const scrollTo = (top: number) => scrollTarget(top, wrapper.element)

    return {
      wrapper,
      props,
      onChange,
      scrollTo,
      ...scrollAPI,
    }
  }

  test('scroll operation', async () => {
    const { wrapper, scrollTo, handleScrollAdjust, onChange } = initTestContext()
    await scrollTo(2 * cellHeight + 10)
    handleScrollAdjust()
    expect(wrapper.element.scrollTop).toBe(2 * cellHeight + 10)
    await wait(200)
    expect(onChange).toBeCalledWith(3)

    handleScrollAdjust()
    await wait(300)
    expect(wrapper.element.scrollTop).toBe(2 * cellHeight)

    onChange.mockClear()
    await scrollTo(4 * cellHeight)
    await wait(200)
    expect(onChange).not.toBeCalled()
  })

  test('props change', async () => {
    const { wrapper, props } = initTestContext(2)
    expect(wrapper.element.scrollTop).toBe(0)

    props.visible = false
    await wait()
    props.visible = true
    await wait(300)
    expect(wrapper.element.scrollTop).toBe(cellHeight)

    props.selectedValue = 3
    await wait(300)
    expect(wrapper.element.scrollTop).toBe(2 * cellHeight)

    props.selectedValue = 1
    await wait(300)
    expect(wrapper.element.scrollTop).toBe(0)
  })

  test('adjustPanel', async () => {
    const { wrapper, adjustPanel } = initTestContext()

    adjustPanel(3)
    await wait(300)
    expect(wrapper.element.scrollTop).toBe(3 * cellHeight)
  })
})
