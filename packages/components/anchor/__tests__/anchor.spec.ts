import { renderWork, scrollTarget, wait } from '@tests'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import IxAnchor from '../src/Anchor'
import IxAnchorLink from '../src/AnchorLink'

const TestComponent = defineComponent({
  components: { IxAnchor, IxAnchorLink },
  // eslint-disable-next-line vue/require-prop-types
  props: ['target', 'hidePropsLink', 'emitsHref'],
  template: `
  <IxAnchor :target="target" >
    <IxAnchorLink href="#demo" title="Demo" />
    <IxAnchorLink href="#api" title="API" >
      <IxAnchorLink v-if="!hidePropsLink" href="#props" title="Props"/>
      <IxAnchorLink :href="emitsHref || '#emits'" title="Emits" />
    </IxAnchorLink>
  </IxAnchor>
  <div class="test-target">
    <div id="demo" style="height: 100px;">Demo</div>
    <div id="api">
      <div style="height: 100px;">API</div>
      <div id="props" style="height: 100px;">Props</div>
      <div id="emits" style="height: 100px;">Emits</div>
    </div>
  </div>
  `,
})

describe('Anchor', () => {
  renderWork({
    components: { IxAnchor, IxAnchorLink },
    template: `
    <IxAnchor>
      <IxAnchorLink href="#demo" title="demo" />
      <IxAnchorLink href="#API" title="API" />
      <IxAnchorLink href="#Props" title="Props"/>
      <IxAnchorLink href="#Emits" title="Emits" />
    </IxAnchor>
    `,
  })

  test('affix work', async () => {
    const wrapper = mount(IxAnchor)

    expect(wrapper.classes()).toContain('ix-affix')

    await wrapper.setProps({ affix: false })
    expect(wrapper.classes()).not.toContain('ix-affix')
  })

  test('hideLinkBall work', async () => {
    const wrapper = mount(IxAnchor)

    expect(wrapper.find('.ix-anchor-ink-ball').exists()).toBeTruthy()

    await wrapper.setProps({ hideLinkBall: true })

    expect(wrapper.find('.ix-anchor-ink-ball').exists()).toBeFalsy()
  })

  test('offsetTop work', async () => {
    const wrapper = mount(IxAnchor)

    expect(wrapper.get('.ix-anchor-wrapper').attributes('style')).toContain('max-height: 100vh')

    await wrapper.setProps({ offsetTop: 10 })

    expect(wrapper.get('.ix-anchor-wrapper').attributes('style')).toContain('max-height: calc(100vh - 10px)')
  })

  test('target work', async () => {
    const wrapper = mount(TestComponent, { props: { target: '.test-target' }, attachTo: 'body' })

    expect(wrapper.find('.ix-anchor-link-title-active').exists()).toBeFalsy()

    await scrollTarget(20, wrapper.find('.test-target').element)

    expect(wrapper.find('.ix-anchor-link-title-active').exists()).toBeTruthy()

    await wrapper.setProps({ target: undefined })
  })

  test('link click work', async () => {
    window.scrollTo = jest.fn()
    const wrapper = mount(TestComponent, { attachTo: 'body' })

    await wrapper.find('a[href="#demo"]').trigger('click')
    await wait(100)

    expect(window.scrollTo).toHaveBeenCalled()
  })

  test('register and unregister work', async () => {
    const wrapper = mount(TestComponent, { props: { hidePropsLink: true, emitsHref: 'emits1' }, attachTo: 'body' })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ hidePropsLink: false })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ emitsHref: 'emits2' })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ hidePropsLink: true, emitsHref: 'emits1' })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
