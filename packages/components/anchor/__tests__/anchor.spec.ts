import { scrollTarget, wait } from '@tests'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import IxAnchor from '../src/Anchor.vue'
import IxLink from '../src/Link.vue'
import { AnchorProps, Section } from '../src/types'
import { renderWork } from '@tests'

const AnchorSlots = defineComponent({
  components: { IxLink },
  template: `<ix-link href="#demo" title="demo" />
      <ix-link href="#API" title="API" />
      <ix-link href="#Props" title="Props"/>
    <ix-link href="#Emits" title="Emits" />`,
})

function IxAnchorMount(template = '', attrs: AnchorProps | null = null) {
  return mount(
    {
      components: { IxAnchor, IxLink },
      template:
        template ||
        `<div class="ix-anchor-target">
                  <div id="demo" style="height: 20px"></div>
                  <div id="API" style="height: 20px"></div>
                  <ix-anchor ref="anchor"
                            :affix="affix"
                            :showInkInFixed="showInkInFixed"
                            :target="target">
                    <ix-link href="#demo" title="demo" />
                    <ix-link href="#API" title="API" />
                    <ix-link href="#noTarget" title="noTarget" />
                  </ix-anchor>
                </div>`,
      setup() {
        return (
          attrs || {
            affix: true,
            showInkInFixed: false,
            target: '.ix-anchor-target',
          }
        )
      },
    },
    {
      attachTo: document.body,
    },
  )
}
describe('Anchor.vue', () => {
  renderWork(IxAnchor)

  test('render work', async () => {
    const wrapper = IxAnchorMount()

    expect(wrapper.findAll('.ix-anchor-link').length).toBe(3)

    await scrollTarget(600, wrapper.element)

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.find('a[href="#demo"]').trigger('click')

    expect(wrapper.get('a[href="#demo"]').attributes('class')).toContain('ix-anchor-link-active')
  })

  // affix work 为false时渲染affix组件，为true是普通的div
  test('affix work', async () => {
    const wrapper = mount(IxAnchor, {
      slots: {
        default: AnchorSlots,
      },
    })

    // expect(wrapper.element.tagName).toEqual('ix-affix')
    expect(wrapper.classes()).toContain('ix-affix')

    await wrapper.setProps({ affix: false })
    expect(wrapper.element.tagName).toEqual('DIV')

    expect(wrapper.html()).toMatchSnapshot()
  })

  // showInkInFixed默认false 显示小圆点ix-anchor-ink-ball
  test('showInkInFixed work', async () => {
    const wrapper = mount(IxAnchor, {
      slots: {
        default: AnchorSlots,
      },
      props: {
        affix: false,
      },
    })

    await wrapper.setProps({ affix: false })
    expect(wrapper.get('.ix-anchor-ink-ball').attributes('style')).toContain('display: none;')

    await wrapper.setProps({ showInkInFixed: true })
    expect(wrapper.get('.ix-anchor-ink-ball').attributes('style')).not.toContain('display: none;')
  })

  test('scrollTo work', async () => {
    const wrapper = IxAnchorMount('', {
      target: window,
    })

    const scrollToSpy = jest.spyOn(window, 'scrollTo')

    await wrapper.find('a[href="#noTarget"]').trigger('click')

    await wait(200)

    expect(scrollToSpy).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  test('scrollTo work', async () => {
    const wrapper = IxAnchorMount('', {
      target: window,
    })

    const scrollToSpy = jest.spyOn(window, 'scrollTo')

    expect(scrollToSpy).not.toHaveBeenCalled()

    await wait(200)

    await wrapper.find('a[href="#API"]').trigger('click')

    await wait(200)

    expect(scrollToSpy).toHaveBeenCalled()
    wrapper.unmount()
  })

  // container 指定滚动的容器，默认window
  test('target work', async () => {
    spyOn(window, 'addEventListener')
    spyOn(document.body, 'addEventListener')
    const wrapper = mount(IxAnchor, {
      slots: {
        default: AnchorSlots,
      },
    })

    await wait(200)
    expect(window.addEventListener).toHaveBeenCalled()

    wrapper.setProps({
      target: document.body,
    })

    expect(window.addEventListener).toHaveBeenCalled()
  })

  test('Onclick work', async () => {
    let event
    let alink
    const href = '#demo'
    const title = href
    const handleClick = (e: Event, link: Section) => ([event, alink] = [e, link])
    const wrapper = mount(
      {
        components: { IxAnchor, IxLink },
        template: `<div class="ix-anchor-target">
                  <div id="demo" style="height: 20px"></div>
                  <div id="API" style="height: 20px"></div>
                  <ix-anchor @click="handleClick">
                    <ix-link :title="title" :href="href" />
                  </ix-anchor>
                </div>`,
        setup() {
          return {
            handleClick,
            title,
            href,
          }
        },
      },
      { attachTo: document.body },
    )
    await wait(200)
    await wrapper.find('a[href="#demo"]').trigger('click')
    await wait(200)
    expect(event).not.toBe(undefined)
    expect(alink).toEqual({ href, title })
  })
})
