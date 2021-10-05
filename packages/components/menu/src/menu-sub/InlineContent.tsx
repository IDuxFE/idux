import { computed, defineComponent, inject } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxCollapseTransition } from '@idux/components/_private'
import { menuSubToken } from '../token'

export default defineComponent({
  setup() {
    const { prefixCls } = useGlobalConfig('common')
    const { slots, isExpanded } = inject(menuSubToken)!

    const classes = computed(() => {
      return {
        [`${prefixCls}-menu-content`]: true,
        [`${prefixCls}-menu-inline`]: true,
      }
    })

    return () => (
      <IxCollapseTransition>
        <ul v-show={isExpanded.value} class={classes.value}>
          {slots.default?.()}
        </ul>
      </IxCollapseTransition>
    )
  },
})
