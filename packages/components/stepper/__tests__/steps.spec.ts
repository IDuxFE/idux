import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import { renderWork } from '@tests'

import IxStepper from '../src/Stepper'
import IxStepperItem from '../src/StepperItem'

const TestComponent = {
  components: { IxStepper, IxStepperItem },
  template: `
  <IxStepper :active="1">
    <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
    <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
    <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
  </IxStepper>
  `,
}

describe('Stepper', () => {
  renderWork(TestComponent)

  test('active work', async () => {
    const active = ref(1)
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active">
        <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
        <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
        <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxStepperItem' })[active.value].classes()).toContain(
      'ix-stepper-item-process',
    )

    active.value = 2

    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxStepperItem' })[active.value].classes()).toContain(
      'ix-stepper-item-process',
    )
  })

  test('direction work', async () => {
    const active = ref(1)
    const direction = ref('vertical')
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active" :direction="direction">
        <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
        <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
        <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active, direction }
      },
    })

    expect(wrapper.findAll('.ix-stepper-vertical').length).toBe(1)
  })

  test('placement work', async () => {
    const active = ref(1)
    const placement = ref('vertical')
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active" :placement="placement">
        <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
        <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
        <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active, placement }
      },
    })

    expect(wrapper.findAll('.ix-stepper-vertical-placement').length).toBe(1)
  })

  test('percent work', async () => {
    const active = ref(1)
    const percent = ref(25)
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active" :percent="percent">
        <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
        <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
        <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active, percent }
      },
    })

    expect(wrapper.findAll('.ix-stepper-item-head-percent-circle')[0].attributes().style).toBe(
      'transform: rotate(135deg);',
    )

    percent.value = 50
    await nextTick()
    expect(wrapper.findAll('.ix-stepper-item-head-percent-circle')[0].attributes().style).toBe(
      'transform: rotate(225deg);',
    )

    percent.value = 75
    await nextTick()
    expect(wrapper.findAll('.ix-stepper-item-head-percent-circle')[0].attributes().style).toBe(
      'transform: rotate(225deg);',
    )
    expect(wrapper.findAll('.ix-stepper-item-head-percent-circle')[1].attributes().style).toBe(
      'transform: rotate(135deg);',
    )

    percent.value = 100
    await nextTick()
    expect(wrapper.findAll('.ix-stepper-item-head-percent-circle')[0].attributes().style).toBe(
      'transform: rotate(225deg);',
    )
    expect(wrapper.findAll('.ix-stepper-item-head-percent-circle')[1].attributes().style).toBe(
      'transform: rotate(225deg);',
    )
  })

  test('progressDot work', async () => {
    const active = ref(1)
    const progressDot = ref(true)
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active" :progressDot="progressDot">
        <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
        <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
        <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active, progressDot }
      },
    })

    expect(wrapper.findAll('.ix-stepper-dot').length).toBe(1)
  })

  test('progressDot work(slot)', async () => {
    const active = ref(1)
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active">
        <template #progressDot>            
            <span class="ix-stepper-item-head-dot"></span>
        </template>
        <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
        <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
        <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active }
      },
    })

    expect(wrapper.findAll('.ix-stepper-dot').length).toBe(1)
  })

  test('size work', async () => {
    const active = ref(1)
    const size = ref('small')
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active" :size="size">
        <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
        <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
        <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active, size }
      },
    })

    expect(wrapper.findAll('.ix-stepper-small').length).toBe(1)
  })

  test('steps(status) work', async () => {
    const active = ref(1)
    const status = ref('error')
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active" :status="status">
        <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
        <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
        <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active, status }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxStepperItem' })[active.value].classes()).toContain(
      'ix-stepper-item-' + status.value,
    )
  })

  test('icon work', async () => {
    const active = ref(1)
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active">
        <IxStepperItem status="finish" title="Login" icon="up"></IxStepperItem>
        <IxStepperItem status="finish" title="Verification" icon="down"></IxStepperItem>
        <IxStepperItem status="process" title="Pay" icon="left"></IxStepperItem>
        <IxStepperItem status="wait" title="Done" icon="right"></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active }
      },
    })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-left').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-right').exists()).toBe(true)
  })

  test('title subTitle description work', async () => {
    const active = ref(1)
    const title = 'Finish'
    const subTitle = '20:20:01'
    const description = 'This is a description'
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active">
        <IxStepperItem :title="title" :sub-title="subTitle" :description="description"></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active, title, subTitle, description }
      },
    })

    expect(wrapper.find('.ix-stepper-item-title').text()).toContain(title)
    expect(wrapper.find('.ix-stepper-item-subtitle').text()).toContain(subTitle)
    expect(wrapper.find('.ix-stepper-item-description').text()).toContain(description)
  })

  test('step(status) work', async () => {
    const active = ref(1)
    const status = ref('error')
    const wrapper = mount({
      components: { IxStepper, IxStepperItem },
      template: `
      <IxStepper :active="active">
        <IxStepperItem title="Finish" sub-title="20:20:01" description="This is a description."></IxStepperItem>
        <IxStepperItem :status="status" title="In Progress" description="This is a description."></IxStepperItem>
        <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
      </IxStepper>
      `,
      setup() {
        return { active, status }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxStepperItem' })[1].classes()).toContain(
      'ix-stepper-item-' + status.value,
    )
  })
})
