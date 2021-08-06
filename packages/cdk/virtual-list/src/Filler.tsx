import type { CSSProperties } from 'vue'
import type { VirtualFillerProps } from './types'

import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { isNil, throttle } from 'lodash-es'
import { offResize, onResize } from '@idux/cdk/utils'
import { virtualFillerProps } from './types'

export default defineComponent({
  name: 'IxVirtualFiller',
  props: virtualFillerProps,
  setup(props, { emit }) {
    const styles = useStyles(props)
    const { innerRef } = useInnerResize(emit)
    return { styles, innerRef }
  },

  render() {
    const { styles, $slots } = this
    return (
      <div class="ix-virtual-filler" style={styles.outer}>
        <div class="ix-virtual-filler-inner" style={styles.inner} ref="innerRef">
          {$slots.default?.()}
        </div>
      </div>
    )
  },
})

const useStyles = (props: VirtualFillerProps) => {
  return computed(() => {
    let outer: CSSProperties = {}
    let inner: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
    }

    const { offset, scrollHeight = 0 } = props
    if (!isNil(offset) && !isNil(scrollHeight)) {
      outer = { height: `${scrollHeight}px`, position: 'relative', overflow: 'hidden' }

      inner = {
        ...inner,
        transform: `translateY(${offset}px)`,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
      }
    }
    return { outer, inner }
  })
}

const useInnerResize = (emit: (event: 'resize') => void) => {
  const innerRef = ref<HTMLDivElement>()
  const onInnerResize = throttle(() => emit('resize'), 16)

  onMounted(() => onResize(innerRef.value, onInnerResize))
  onBeforeUnmount(() => offResize(innerRef.value, onInnerResize))

  return { innerRef }
}
