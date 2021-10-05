<template>
  <div :class="className">
    <div :class="`${prefixCls}-result-icon`">
      <slot name="icon">
        <IxIcon :name="currentIcon"></IxIcon>
      </slot>
    </div>
    <div v-if="hasTitle || !!title" :class="`${prefixCls}-result-title`">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="hasSubtitle || !!subtitle" :class="`${prefixCls}-result-subtitle`">
      <slot name="subtitle">{{ subtitle }}</slot>
    </div>
    <div v-if="hasExtra" :class="`${prefixCls}-result-extra`">
      <slot name="extra" />
    </div>
    <div v-if="hasContent" :class="`${prefixCls}-result-content`">
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
    const { prefixCls } = useGlobalConfig('common')
    const resultConfig = useGlobalConfig('result')
    const className = useClassName(props, resultConfig)
    const hasTitle = useSlot(slots, 'title')
    const hasSubtitle = useSlot(slots, 'subtitle')
    const hasExtra = useSlot(slots, 'extra')
    const hasContent = useSlot(slots)
    const currentIcon = useIcon(props, resultConfig)

    return { prefixCls, className, hasTitle, hasSubtitle, hasExtra, hasContent, currentIcon }
  },
})

function useClassName(props: ResultProps, config: ResultConfig) {
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    const status = props.status ?? config.status

    return [`${prefixCls}-result`, `${prefixCls}-result-${status}`]
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
