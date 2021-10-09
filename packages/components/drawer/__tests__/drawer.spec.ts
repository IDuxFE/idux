// import { mount, MountingOptions } from '@vue/test-utils'
import { renderWork } from '@tests'

import IxDrawer from '../src/Drawer'
// import { DrawerProps } from '../src/types'

// TODO: drawer test
describe.skip('Drawer', () => {
  // const DrawerMount = (options?: MountingOptions<Partial<DrawerProps>>) => mount(IxDrawer, { ...(options as MountingOptions<DrawerProps>)})

  renderWork(IxDrawer)
})
