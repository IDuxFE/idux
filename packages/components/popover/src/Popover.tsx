import { defineComponent } from 'vue'
import { getFirstValidNode, getSlotNodes } from '@idux/cdk/utils'
import { IxOverlay } from '@idux/components/_private'
import { popoverProps } from './types'
import { useConfig, useVisibility } from './hooks'

export default defineComponent({
  name: 'IxPopover',
  props: popoverProps,
  setup(props, { slots }) {
    const config = useConfig()
    const visibility = useVisibility()

    return () => (
      <IxOverlay
        v-model={[visibility.value, 'visible']}
        clsPrefix="ix-popover"
        allowEnter
        scrollStrategy="close"
        {...config.value}
        offset={[0, 10]}
      >
        {{
          trigger: () => getFirstValidNode(getSlotNodes(slots)),
          overlay: () => (
            <div>
              <div class="ix-popover-title">{getFirstValidNode(getSlotNodes(slots, 'title')) ?? props.title}</div>
              <div class="ix-popover-inner-content">
                {getFirstValidNode(getSlotNodes(slots, 'content')) ?? props.content}
              </div>
            </div>
          ),
        }}
      </IxOverlay>
    )
  },
})
