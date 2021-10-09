/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { layoutProps } from './types'

export default defineComponent({
  name: 'IxLayout',
  props: layoutProps,
  setup(props, { slots }) {
    const classes = computed(() => {
      return {
        'ix-layout': true,
        'ix-layout-out-sider': props.outSider,
      }
    })
    return () => {
      return <section class={classes.value}>{slots.default?.()}</section>
    }
  },
})
