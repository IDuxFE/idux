import { computed, defineComponent, Teleport } from 'vue'
import { portalProps } from './types'
import { useContainer } from './useContainer'

export default defineComponent({
  name: 'IxPortal',
  props: portalProps,
  setup(props) {
    const to = computed(() => useContainer(props.target))
    return { to }
  },
  render() {
    const { show, to, disabled, $slots } = this
    if (!show) {
      return null
    }

    return (
      <Teleport to={to} disabled={disabled}>
        {$slots.default?.()}
      </Teleport>
    )
  },
})
