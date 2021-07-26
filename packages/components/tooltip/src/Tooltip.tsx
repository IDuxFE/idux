import { defineComponent } from 'vue'
import { getFirstValidNode, getSlotNodes } from '@idux/cdk/utils'
import { IxOverlay } from '@idux/components/_private'
import { tooltipProps } from './types'
import { useConfig, useVisibility } from './hooks'

export default defineComponent({
  name: 'IxTooltip',
  props: tooltipProps,
  setup(props, { slots }) {
    const config = useConfig()
    const visibility = useVisibility()

    return () => (
      <IxOverlay
        v-model={[visibility.value, 'visible']}
        clsPrefix="ix-tooltip"
        allowEnter
        scrollStrategy="close"
        {...config.value}
        offset={[0, 5]}
      >
        {{
          trigger: () => getFirstValidNode(getSlotNodes(slots)),
          overlay: () => getFirstValidNode(getSlotNodes(slots, 'title')) ?? props.title,
        }}
      </IxOverlay>
    )
  },
})
