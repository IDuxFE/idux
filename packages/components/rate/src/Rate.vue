<template>
  <div class="ix-rate-wrap">
    <div
      v-for="(item, index) in rateCount"
      :key="index"
      :ref="
        el => {
          if (el) starRefs[index] = el
        }
      "
      class="ix-rate-item"
      :title="getTooltip(index)"
      :style="{ cursor: disabled ? 'auto' : 'pointer' }"
      @mousemove="handleMouseEnter(item, $event)"
      @mouseleave="handleMouseLeave(item)"
      @click="handleClick(item, $event)"
    >
      <div class="ix-rate-full">
        <ix-icon :name="rateIcon" class="ix-rate-iconfont-main" :class="getIconClass(item)" />
      </div>

      <div v-if="showDecimalIcon(item)" class="ix-rate-half">
        <ix-icon :name="rateIcon" class="ix-rate-iconfont-main ix-rate-half-icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isArray, PropTypes, toNumber, withUndefined } from '@idux/cdk/utils'
import { computed, defineComponent, onBeforeUpdate, ref, watchEffect } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { useGlobalConfig } from '@idux/components/core/config'

const HALF = 2

export default defineComponent({
  name: 'IxRate',
  components: { IxIcon },
  props: {
    value: PropTypes.oneOfType([Number, String]).def(0),
    count: withUndefined(PropTypes.oneOfType([Number, String])),
    icon: PropTypes.string,
    allowHalf: PropTypes.bool,
    disabled: PropTypes.bool,
    tooltips: PropTypes.array,
    allowClear: PropTypes.bool,
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const score = ref(props.value)
    const touchHalf = ref(false)
    const starRefs = ref([])

    const rateGlobalConfig = useGlobalConfig('rate')
    const rateCount = computed(() => toNumber(props.count ?? rateGlobalConfig.count))
    const rateIcon = computed(() => props.icon ?? rateGlobalConfig.icon)
    const allowHalf = computed(() => props.allowHalf ?? rateGlobalConfig.allowHalf)
    const allowClear = computed(() => props.allowClear ?? rateGlobalConfig.allowClear)

    onBeforeUpdate(() => {
      starRefs.value = []
    })

    watchEffect(() => {
      const value = toNumber(props.value)
      score.value = value
      touchHalf.value = value !== Math.floor(value)
    })

    function getIconClass(item: number) {
      return item <= score.value ? 'ix-rate-highlight' : 'ix-rate-normal'
    }

    function showDecimalIcon(item: number) {
      return allowHalf.value && item - 0.5 <= score.value && item > score.value
    }

    function getTooltip(index: number) {
      if (!props.tooltips || !isArray(props.tooltips)) {
        return
      }

      return props.tooltips[index] || ''
    }

    function handleMouseEnter(item: number, e: MouseEvent) {
      if (props.disabled) {
        return
      }

      if (allowHalf.value) {
        updateTouchHalf(item - 1, e)
        score.value = touchHalf.value ? item - 0.5 : item
      } else {
        score.value = item
      }
    }

    function updateTouchHalf(index: number, e: MouseEvent) {
      const target = starRefs.value[index] as HTMLElement

      if (e.offsetX <= target.clientWidth / HALF) {
        touchHalf.value = true
        return
      }

      touchHalf.value = false
    }

    function handleMouseLeave() {
      if (props.disabled) {
        return
      }

      const value = toNumber(props.value)

      if (allowHalf.value) {
        touchHalf.value = value !== Math.floor(value)
      }
      score.value = value
    }

    function handleClick() {
      if (props.disabled) {
        return
      }

      let clearValue = false
      let emitValue = 0
      const beforeValue = toNumber(props.value)
      const currentScore = toNumber(score.value)

      if (allowClear.value) {
        clearValue = beforeValue === currentScore
      }

      emitValue = clearValue ? 0 : currentScore

      if (emitValue !== beforeValue) {
        emit('update:value', emitValue)
        emit('change', emitValue)
      }
    }

    return {
      rateCount,
      rateIcon,
      getTooltip,
      showDecimalIcon,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      getIconClass,
      starRefs,
    }
  },
})
</script>
