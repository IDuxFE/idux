import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxTooltip from '../src/Tooltip.vue'
import { TooltipProps } from '../src/types'

describe('Tooltip.vue', () => {
  let TooltipMount: (options?: MountingOptions<Partial<TooltipProps>>) => VueWrapper<InstanceType<typeof IxTooltip>>

  beforeEach(() => {
    TooltipMount = options => mount(IxTooltip, { ...options })
  })

  renderWork(IxTooltip)
})
