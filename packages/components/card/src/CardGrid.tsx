import { computed, defineComponent, inject, onBeforeUnmount } from 'vue'
import { cardToken } from './token'

import { cardGridProps } from './types'

export default defineComponent({
  name: 'IxCardGrid',
  props: cardGridProps,
  setup(props) {
    const { hoverable, registerGrid, unregisterGrid } = inject(cardToken)!
    registerGrid()
    onBeforeUnmount(() => unregisterGrid())

    const classes = computed(() => {
      return {
        'ix-card-grid': true,
        'ix-card-grid-hoverable': props.hoverable ?? hoverable.value,
      }
    })

    return { classes }
  },
  render() {
    return <div class={this.classes}>{this.$slots.default?.()}</div>
  },
})
