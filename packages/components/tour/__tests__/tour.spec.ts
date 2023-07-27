import { DOMWrapper, MountingOptions, flushPromises, mount } from '@vue/test-utils'

import { renderWork, wait } from '@tests'

import Tour from '../src/Tour'
import { TourProps, TourStep } from '../src/types'

const basicSteps: TourStep[] = [
  {
    title: 'Step1',
    description: 'this is description...',
    target: '.step1',
  },
  {
    title: 'Step2',
    description: 'this is description...',
    target: '.step2',
  },
  {
    title: 'Step3',
    description: 'this is description...',
    target: '.step3',
  },
]

function expectElVisible(selector: string, visible: boolean) {
  const element = document.querySelector(selector)

  expect(element === null || window.getComputedStyle(element).display === 'none')[
    visible ? 'toBeFalsy' : 'toBeTruthy'
  ]()
}

async function triggerNext(container?: string) {
  const btns = document.querySelectorAll(`${container ? container + ' ' : ''}.ix-tour-panel .ix-tour-panel-button`)
  const nextButton = btns.item(btns.length - 1)

  await new DOMWrapper(nextButton).trigger('click')
}

describe('Tour', () => {
  const TourMount = async (options?: MountingOptions<Partial<TourProps>>, divClasses?: string[]) => {
    divClasses?.forEach(cls => {
      const div = document.createElement('div')
      div.className = cls
      document.body.appendChild(div)
    })

    const wrapper = mount(Tour, { ...(options as MountingOptions<TourProps>) })

    await wait(2000)

    return wrapper
  }

  renderWork<TourProps>(Tour, {
    props: { steps: basicSteps, visible: true },
  })

  test('panel render work', async () => {
    await TourMount({ props: { steps: basicSteps, visible: true } })

    expect(document.querySelector('.ix-tour-panel')).not.toBe(null)
    expect(document.querySelector('.ix-tour-panel')?.innerHTML).toMatchSnapshot()
  })

  test('v-model:visible work', async () => {
    const onVisibleUpdate = vi.fn()
    const wrapper = await TourMount({
      props: {
        steps: basicSteps,
        visible: false,
        overlayContainer: '.visible-test',
        animatable: false,
        'onUpdate:visible': onVisibleUpdate,
      },
    })

    await flushPromises()

    expectElVisible('.visible-test .ix-tour-overlay', false)
    expectElVisible('.visible-test .ix-tour-mask', false)

    await wrapper.setProps({ visible: true })

    expectElVisible('.visible-test .ix-tour-overlay', true)
    expectElVisible('.visible-test .ix-tour-mask', true)

    await new DOMWrapper(document.querySelector('.visible-test .ix-tour-panel .ix-header-suffix')!).trigger('click')
    expect(onVisibleUpdate).toBeCalledWith(false)

    await wrapper.setProps({ visible: false })

    expectElVisible('.visible-test .ix-tour-overlay', false)
    expectElVisible('.visible-test .ix-tour-mask', false)
  })

  test('v-model:activeIndex work', async () => {
    const onCurrentUpdate = vi.fn()
    const onChange = vi.fn()

    const wrapper = await TourMount({
      props: {
        steps: basicSteps,
        activeIndex: 0,
        overlayContainer: '.active-index-test',
        visible: true,
        animatable: false,
        'onUpdate:activeIndex': onCurrentUpdate,
        onChange,
      },
    })

    expectElVisible('.ix-tour-panel', true)
    expect(document.querySelector('.active-index-test .ix-tour-panel .ix-header .ix-header-title')?.textContent).toBe(
      basicSteps[0].title,
    )

    await wrapper.setProps({ activeIndex: 1 })
    await flushPromises()

    expect(document.querySelector('.active-index-test .ix-tour-panel .ix-header .ix-header-title')?.textContent).toBe(
      basicSteps[1].title,
    )

    await triggerNext('.active-index-test')
    expect(onCurrentUpdate).toBeCalledWith(2)
    expect(onChange).toBeCalledWith(2, 1)
  })
})
