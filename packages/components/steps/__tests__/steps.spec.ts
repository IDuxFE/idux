import { mount } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxStep from '../src/Step.tsx'
import IxSteps from '../src/Steps.tsx'
import { nextTick, ref } from 'vue'

const TestComponent = {
  components: { IxSteps, IxStep },
  template: `
  <IxSteps :active="1">
    <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
    <ix-step title="In Progress" description="This is a description."></ix-step>
    <ix-step title="Waiting" description="This is a description."></ix-step>
  </IxSteps>
  `,
}

describe('Steps.vue', () => {
  renderWork(TestComponent)

  test('active work', async () => {
    const active = ref(1)
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxStep' })[active.value].classes()).toContain('ix-step-process')

    active.value = 2

    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxStep' })[active.value].classes()).toContain('ix-step-process')
  })

  test('direction work', async () => {
    const active = ref(1)
    const direction = ref('vertical')
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :direction="direction">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, direction }
      },
    })

    expect(wrapper.findAll('.ix-steps-vertical').length).toBe(1)
  })

  test('placement work', async () => {
    const active = ref(1)
    const placement = ref('vertical')
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :placement="placement">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, placement }
      },
    })

    expect(wrapper.findAll('.ix-steps-vertical-placement').length).toBe(1)
  })

  test('percent work', async () => {
    const active = ref(1)
    const percent = ref(25)
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :percent="percent">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, percent }
      },
    })

    expect(wrapper.findAll('.ix-step-head-percent-circle')[0].attributes().style).toBe('transform: rotate(135deg);')

    percent.value = 50
    await nextTick()
    expect(wrapper.findAll('.ix-step-head-percent-circle')[0].attributes().style).toBe('transform: rotate(225deg);')

    percent.value = 75
    await nextTick()
    expect(wrapper.findAll('.ix-step-head-percent-circle')[0].attributes().style).toBe('transform: rotate(225deg);')
    expect(wrapper.findAll('.ix-step-head-percent-circle')[1].attributes().style).toBe('transform: rotate(135deg);')

    percent.value = 100
    await nextTick()
    expect(wrapper.findAll('.ix-step-head-percent-circle')[0].attributes().style).toBe('transform: rotate(225deg);')
    expect(wrapper.findAll('.ix-step-head-percent-circle')[1].attributes().style).toBe('transform: rotate(225deg);')
  })

  test('progressDot work', async () => {
    const active = ref(1)
    const progressDot = ref(true)
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :progressDot="progressDot">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, progressDot }
      },
    })

    expect(wrapper.findAll('.ix-steps-dot').length).toBe(1)
  })

  test('progressDot work(slot)', async () => {
    const active = ref(1)
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active">
        <template #progressDot>            
            <span class="ix-step-head-dot"></span>
        </template>
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active }
      },
    })

    expect(wrapper.findAll('.ix-steps-dot').length).toBe(1)
  })

  test('size work', async () => {
    const active = ref(1)
    const size = ref('small')
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :size="size">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, size }
      },
    })

    expect(wrapper.findAll('.ix-steps-small').length).toBe(1)
  })

  test('steps(status) work', async () => {
    const active = ref(1)
    const status = ref('error')
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active" :status="status">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, status }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxStep' })[active.value].classes()).toContain('ix-step-' + status.value)
  })

  test('icon work', async () => {
    const active = ref(1)
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active">
        <ix-step status="finish" title="Login" icon="up"></ix-step>
        <ix-step status="finish" title="Verification" icon="verified"></ix-step>
        <ix-step status="process" title="Pay" icon="loading"></ix-step>
        <ix-step status="wait" title="Done" icon="smile"></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active }
      },
    })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-verified').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-loading').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-smile').exists()).toBe(true)
  })

  test('title subTitle description work', async () => {
    const active = ref(1)
    const title = 'Finish'
    const subTitle = '20:20:01'
    const description = 'This is a description'
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active">
        <ix-step :title="title" :sub-title="subTitle" :description="description"></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, title, subTitle, description }
      },
    })

    expect(wrapper.find('.ix-step-title').text()).toContain(title)
    expect(wrapper.find('.ix-step-subtitle').text()).toContain(subTitle)
    expect(wrapper.find('.ix-step-description').text()).toContain(description)
  })

  test('step(status) work', async () => {
    const active = ref(1)
    const status = ref('error')
    const wrapper = mount({
      components: { IxSteps, IxStep },
      template: `
      <IxSteps :active="active">
        <ix-step title="Finish" sub-title="20:20:01" description="This is a description."></ix-step>
        <ix-step :status="status" title="In Progress" description="This is a description."></ix-step>
        <ix-step title="Waiting" description="This is a description."></ix-step>
      </IxSteps>
      `,
      setup() {
        return { active, status }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxStep' })[1].classes()).toContain('ix-step-' + status.value)
  })
})
