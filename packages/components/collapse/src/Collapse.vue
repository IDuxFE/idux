<template>
  <div class="ix-collapse" :class="{ 'ix-collapse-borderless': borderless }">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, watch, computed, ref } from 'vue'
import { CollapseProps, collapseInjectionKey } from './types'
import { PropTypes, toArray } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  name: 'IxCollapse',
  props: {
    accordion: PropTypes.bool,
    active: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).def([]),
    borderless: PropTypes.bool.def(false),
  },
  emits: ['update:active'],
  setup(props: CollapseProps, { emit }) {
    const collapseConfig = useGlobalConfig('collapse')
    const accordion = computed(() => props.accordion ?? collapseConfig.accordion)
    const activeNames = ref<string[]>(toArray(props.active) as [])

    watch(
      () => props.active,
      value => {
        activeNames.value = toArray(value) as []
      },
    )

    const emitCommonEvents = (value: string[]) => {
      emit('update:active', value)
    }

    const handleChange = (name: string) => {
      if (accordion.value) {
        const value = name === activeNames.value[0] ? [] : [name]
        activeNames.value = value
        emitCommonEvents(value)
        return
      }

      const _index = activeNames.value.indexOf(name)

      if (_index > -1) {
        activeNames.value.splice(_index, 1)
      } else {
        activeNames.value.push(name)
      }

      emitCommonEvents(activeNames.value)
    }

    provide(collapseInjectionKey, { props, handleChange })
  },
})
</script>
