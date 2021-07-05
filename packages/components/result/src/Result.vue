<template>
  <div class="ix-result" :class="className">
    <div class="ix-result-icon">
      <slot name="icon">
        <ix-icon :name="currentIcon"></ix-icon>
      </slot>
    </div>
    <div v-if="hasTitle || !!title" class="ix-result-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="hasSubtitle || !!subtitle" class="ix-result-subtitle">
      <slot name="subtitle">{{ subtitle }}</slot>
    </div>
    <div v-if="hasExtra" class="ix-result-extra">
      <slot name="extra" />
    </div>
    <div v-if="hasContent" class="ix-result-content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import type { SetupContext } from 'vue'
import type { ResultConfig } from '@idux/components/config'
import type { ResultProps, ResultStatus } from './types'

import { computed, defineComponent, Slots } from 'vue'
import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { resultProps } from './types'

const defaultIconMap = new Map<ResultStatus, string>([
  ['success', 'check-circle'],
  ['error', 'close-circle'],
  ['info', 'info-circle'],
  ['warning', 'exclamation-circle'],
])

export default defineComponent({
  name: 'IxResult',
  components: { IxIcon },
  props: resultProps,
  setup(props, { slots }: SetupContext) {
    const resultConfig = useGlobalConfig('result')
    const className = useClassName(props, resultConfig)
    const hasTitle = useSlot(slots, 'title')
    const hasSubtitle = useSlot(slots, 'subtitle')
    const hasExtra = useSlot(slots, 'extra')
    const hasContent = useSlot(slots)
    const currentIcon = useIcon(props, resultConfig)

    return { className, hasTitle, hasSubtitle, hasExtra, hasContent, currentIcon }
  },
})

function useClassName(props: ResultProps, config: ResultConfig) {
  return computed(() => {
    const status = props.status ?? config.status

    return [`ix-result-${status}`]
  })
}

function useSlot(slots: Slots, key = 'default') {
  return computed(() => hasSlot(slots, key))
}

function useIcon(props: ResultProps, config: ResultConfig) {
  return computed(() => {
    const status = props.status ?? config.status
    return (props.icon ?? defaultIconMap.get(status)) as string
  })
}
</script>
