//import { mount, MountingOptions } from '@vue/test-utils'
import { renderWork } from '@tests'

import Wave from '../src/Wave'
import { WaveProps } from '../src/types'

describe('Wave', () => {
  //const WaveMount = (options?: MountingOptions<Partial<WaveProps>>) => mount(Wave, { ...(options as MountingOptions<WaveProps>)})

  renderWork<WaveProps>(Wave, {
    props: {},
  })
})
