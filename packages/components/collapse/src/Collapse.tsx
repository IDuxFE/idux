import { defineComponent, provide, computed, unref } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { useMergedProp } from '@idux/components/utils'
import { collapseToken } from './token'
import { collapseProps } from './types'

export default defineComponent({
  name: 'IxCollapse',
  props: collapseProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('collapse')
    const accordion = computed(() => props.accordion ?? config.accordion)
    const borderless = computed(() => props.borderless ?? config.borderless)
    const expandIcon = computed(() => props.expandIcon ?? config.expandIcon)
    const ghost = computed(() => props.ghost ?? config.ghost)

    const expandedKeys = useMergedProp(props, 'expandedKeys')

    const handleExpand = (key: string | number) => {
      let tempKeys = unref(expandedKeys)
      const index = tempKeys.indexOf(key)
      if (accordion.value) {
        tempKeys = index > -1 ? [] : [key]
      } else {
        index > -1 ? tempKeys.splice(index, 1) : tempKeys.push(key)
      }

      expandedKeys.value = [...tempKeys]
    }

    provide(collapseToken, { props, slots, expandedKeys, expandIcon, handleExpand })

    const classes = computed(() => {
      return {
        'ix-collapse': true,
        'ix-collapse-borderless': borderless.value,
        'ix-collapse-ghost': ghost.value,
      }
    })

    return () => <div class={classes.value}>{slots.default?.()}</div>
  },
})
