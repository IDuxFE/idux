<template>
  <div class="ix-card" :class="classes">
    <div class="ix-card-head" v-if="isShowTitle || isShowExtra">
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
    <ix-spin :spinning="isShowLoading" tip="加载中...">
      <div class="ix-card-body" :class="isShowLoading ? 'ix-card-loading-block' : ''">
        <slot v-if="hadDefaultSlot && !isShowLoading"></slot>
      </div>
    </ix-spin>

    <div v-if="isShowFooter" class="ix-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { hasSlot, PropTypes } from '@idux/cdk/utils'
import type { CardConfig } from '@idux/components/core/config/types'

import { useGlobalConfig } from '@idux/components/core/config'
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
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small'] as const),
  },
  setup(props: CardProps, { slots }) {
    // init
    const cardConfig = useGlobalConfig('card')
    const classes = useClasses(props, cardConfig)
    const isShowLoading = computed(() => props.loading ?? cardConfig.loading)
    const isShowTitle = computed(() => typeof props.title === 'string' || !!slots.title)
    const isShowExtra = computed(() => typeof props.extra === 'string' || !!slots.extra)
    const isShowFooter = computed(() => !!slots.footer)
    const hadDefaultSlot = computed(() => hasSlot(slots))
    return { classes, isShowTitle, isShowExtra, isShowFooter, isShowLoading, hadDefaultSlot }
  },
})

const useClasses = (props: CardProps, cardConfig: CardConfig) => {
  return computed(() => {
    const hoverable = props.hoverable ?? cardConfig.hoverable
    const borderless = props.borderless ?? cardConfig.borderless
    const size = props.size ?? cardConfig.size
    return [
      size !== 'default' ? `ix-card-${size}` : '',
      {
        'ix-card-hover': hoverable,
        'ix-card-border': !borderless,
      },
    ]
  })
}
</script>
