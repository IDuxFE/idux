import { computed, defineComponent, inject, Transition } from 'vue'
import { modalInnerToken } from './token'

export default defineComponent({
  setup() {
    const { props, config, visible } = inject(modalInnerToken)!
    const mask = computed(() => props.mask ?? config.mask)
    const zIndex = computed(() => props.zIndex ?? config.zIndex)
    return { mask, zIndex, visible }
  },

  render() {
    if (!this.mask) {
      return null
    }

    return (
      <Transition name="ix-fade" appear>
        <div v-show={this.visible} class="ix-modal-mask" style={{ zIndex: this.zIndex }}></div>
      </Transition>
    )
  },
})
