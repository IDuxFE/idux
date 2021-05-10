import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxOverlay from '../src/Overlay.vue'
import { OverlayProps } from '../src/types'

describe('Overlay.vue', () => {
  let OverlayMount: (options?: MountingOptions<Partial<OverlayProps>>) => VueWrapper<InstanceType<typeof IxOverlay>>

  beforeEach(() => {
    OverlayMount = options => mount(IxOverlay, { ...options })
  })

  renderWork(IxOverlay)
})
