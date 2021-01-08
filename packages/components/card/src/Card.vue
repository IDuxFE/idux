<template>
  <div class="ix-card" :class="classes">
    <div v-if="isShowLoading" class="ix-card-loading-block"></div>
    <div v-else class="ix-card-wraper">
      <div class="ix-card__head">
        <div v-if="isShowTitle" class="ix-card__head__title">
          <slot name="title">
            <a>{{ title }}</a>
          </slot>
        </div>
        <div v-if="isShowExtra" class="ix-card__head__extra">
          <slot name="extra">
            <a>{{ extra }}</a>
          </slot>
        </div>
      </div>
      <div class="ix-card__body">
        <slot></slot>
      </div>
      <div v-if="isShowFooter" class="ix-card__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import type { ComponentSize } from '@idux/components/core/types'
import type { CardConfig } from '@idux/components/core/config/types'

import { useGlobalConfig } from '@idux/components/core/config'
import { computed, defineComponent } from 'vue'
import { CardProps } from './types'

export default defineComponent({
  name: 'IxCard',
  props: {
    title: { type: String, default: undefined },
    extra: { type: String, default: undefined },
    hoverable: Boolean,
    borderless: Boolean,
    loading: Boolean,
    size: { type: String as PropType<ComponentSize>, default: undefined },
  },
  setup(props: CardProps, { slots }) {
    // init
    const cardConfig = useGlobalConfig('card')
    const classes = useClasses(props, cardConfig)
    const isShowLoading = computed(() => (props.loading !== undefined ? props.loading : cardConfig.loading))
    const isShowTitle = computed(() => typeof props.title === 'string' || !!slots.title)
    const isShowExtra = computed(() => typeof props.extra === 'string' || !!slots.extra)
    const isShowFooter = computed(() => !!slots.extra)
    return { classes, isShowTitle, isShowExtra, isShowFooter, isShowLoading }
  },
})

const useClasses = (props: CardProps, cardConfig: CardConfig) => {
  return computed(() => {
    const hoverable = props.hoverable !== undefined ? props.hoverable : cardConfig.hoverable
    const borderless = props.borderless !== undefined ? props.borderless : cardConfig.borderless
    const size = props.size !== undefined ? props.size : cardConfig.size
    return [
      size !== 'medium' ? `ix-card-${size}` : '',
      {
        'ix-card-hover': hoverable,
        'ix-card-border': borderless,
      },
    ]
  })
}
</script>
