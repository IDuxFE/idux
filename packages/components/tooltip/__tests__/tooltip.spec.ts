import type { MountingOptions } from '@vue/test-utils'
import type { TooltipProps } from '@idux/components/tooltip'

import { renderWork, wait } from '@tests'
import IxTooltip from '../src/tooltip'
import { mount, VueWrapper } from '@vue/test-utils'

const TestComponent = {
  components: { IxTooltip },
  props: ['title', 'placement', 'visible', 'trigger', 'destroyOnHide'],
  template: `
    <ix-tooltip :title='title' :placement='placement' :visible='visible' :trigger='trigger' :destroy-on-hide='destroyOnHide'>
      <template v-if='!!$slots.title' #title><slot name='title'/></template>
      <span>Tooltip will show when it's hovered.</span>
    </ix-tooltip>
  `,
}

describe('tooltip.tsx', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tooltipMount: (options?: MountingOptions<TooltipProps>) => VueWrapper<any>

  beforeEach(() => {
    tooltipMount = options => mount(TestComponent, options)
  })

  afterEach(() => {
    document.body.querySelectorAll('.ix-tooltip').forEach(value => {
      value.remove()
    })
  })

  renderWork(IxTooltip)

  test('title work', async () => {
    const textWrapper = tooltipMount({ props: { title: 'prompt text' } })
    expect((document.body.querySelector('.ix-tooltip') as HTMLDivElement).style.display).toEqual('none')
    await textWrapper.get('span').trigger('mouseenter')
    await wait(100)
    expect((document.body.querySelector('.ix-tooltip') as HTMLDivElement).style.display).toEqual('')

    const title = '<div id="custom-title">prompt text</div>'
    const slotWrapper = tooltipMount({ slots: { title } })
    expect((document.body.querySelectorAll('.ix-tooltip')[1] as HTMLDivElement).style.display).toEqual('none')
    await slotWrapper.get('span').trigger('mouseenter')
    await wait(100)
    expect((document.body.querySelectorAll('.ix-tooltip')[1] as HTMLDivElement).style.display).toEqual('')
  })

  test('destroyOnHide work', async () => {
    const wrapper = tooltipMount({ props: { destroyOnHide: true, title: 'prompt text' } })
    expect(document.body.querySelector('.ix-tooltip')!.querySelector('.ix-tooltip-content')).toBeNull()
    await wrapper.get('span').trigger('mouseenter')
    await wait(100)
    expect(document.body.querySelector('.ix-tooltip')!.querySelector('.ix-tooltip-content')).toBeDefined()
    await wrapper.get('span').trigger('mouseleave')
    await wait(500)
    expect(document.body.querySelector('.ix-tooltip')!.querySelector('.ix-tooltip-content')).toBeNull()
  })

  test('without title', () => {
    tooltipMount()
    expect(document.body.querySelector('.ix-tooltip')).toBeNull()
  })

  // todo global click test
})
