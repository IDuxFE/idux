import { defineComponent } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { mount } from '@vue/test-utils'

import IxPortal from '../src/Portal.vue'

const TestComponent = defineComponent({
  components: { IxPortal },
  props: {
    disabled: PropTypes.bool,
    target: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(HTMLElement)]).isRequired,
  },
  template: `
  <ix-portal :disabled='disabled' :target='target'>
    <div id='overlay'>overlay</div>
  </ix-portal>
  `,
})

describe('Portal.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let PortalMount: any

  beforeEach(() => {
    PortalMount = (options = { props: { target: 'ix-container' } }) => {
      return mount(TestComponent, {
        ...options,
      })
    }
  })

  test('render work', () => {
    const wrapper = PortalMount()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled work', async () => {
    const wrapper = PortalMount()
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ disabled: true })
    expect(wrapper.get('#overlay')).toBeDefined()
  })

  test('target work', async () => {
    const container = document.createElement('div')
    container.classList.add('test-container')
    document.body.appendChild(container)

    const wrapper1 = PortalMount({ props: { target: 'ix-container' } })
    expect(wrapper1.html()).toMatchSnapshot()
    expect(document.body.querySelector('.ix-container')).not.toBeNull()

    const wrapper2 = PortalMount({ props: { target: 'ix-container' } })
    expect(wrapper2.html()).toMatchSnapshot()
    expect(document.body.querySelectorAll('.ix-container').length).toEqual(1)

    await wrapper2.setProps({ target: container })
    expect(container.hasChildNodes()).toBeTruthy()
  })
})
