<template>
  <div class="ix-card" :class="classes">
    <div v-if="isShowTitle || isShowExtra" class="ix-card-head">
      <div v-if="isShowTitle" class="ix-card-head-title">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </div>
      <div v-if="isShowExtra" class="ix-card-head-extra">
        <slot name="extra">
          <span>{{ extra }}</span>
        </slot>
      </div>
    </div>
    <ix-spin :spinning="loading">
      <div class="ix-card-body" :class="loading ? 'ix-card-loading-block' : ''">
        <slot></slot>
      </div>
    </ix-spin>

    <div v-if="isShowFooter" class="ix-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { hasSlot, PropTypes } from '@idux/cdk/utils'
import type { CardConfig } from '@idux/components/config'

import { useGlobalConfig } from '@idux/components/config'
import { computed, defineComponent } from 'vue'
import { CardProps } from './types'
import { IxSpin } from '@idux/components/spin'

export default defineComponent({
  name: 'IxCard',
  components: { IxSpin },
  props: {
    title: PropTypes.string,
    extra: PropTypes.string,
    hoverable: PropTypes.bool,
    borderless: PropTypes.bool,
    loading: PropTypes.bool.def(false),
    size: PropTypes.oneOf(['medium', 'small'] as const),
  },
  setup(props: CardProps, { slots }) {
    const cardConfig = useGlobalConfig('card')
    const classes = useClasses(props, cardConfig)
    const isShowTitle = computed(() => props.title || hasSlot(slots, 'title'))
    const isShowExtra = computed(() => props.extra || hasSlot(slots, 'extra'))
    const isShowFooter = computed(() => hasSlot(slots, 'footer'))
    return { classes, isShowTitle, isShowExtra, isShowFooter }
  },
})

const useClasses = (props: CardProps, cardConfig: CardConfig) => {
  return computed(() => {
    const hoverable = props.hoverable ?? cardConfig.hoverable
    const borderless = props.borderless ?? cardConfig.borderless
    const size = props.size ?? cardConfig.size
    return [
      size !== 'medium' ? `ix-card-${size}` : '',
      {
        'ix-card-hover': hoverable,
        'ix-card-border': !borderless,
      },
    ]
  })
}
</script>
