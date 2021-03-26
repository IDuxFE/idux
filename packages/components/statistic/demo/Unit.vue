<template>
  <div class="statistic-demo-unit">
    <ix-statistic title="Feedback" :value="1128">
      <template #suffix>
        <ix-icon name="like" />
      </template>
    </ix-statistic>
    <ix-statistic title="Unmerged" :value="93" class="demo-class">
      <template #suffix>
        <span> / 100</span>
      </template>
    </ix-statistic>
    <ix-statistic title="Feedback" :value="11.28" :precision="2" suffix="%" class="unit-up">
      <template #prefix>
        <ix-icon name="arrow-up" />
      </template>
    </ix-statistic>
    <ix-statistic title="Idle" :value="9.3" :precision="2" suffix="%" class="unit-down">
      <template #prefix>
        <ix-icon name="arrow-down" />
      </template>
    </ix-statistic>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const precision = ref(2)
    const add = () => precision.value++
    return { precision, add }
  },
})
</script>
<style lang="less" scoped>
.statistic-demo-unit {
  .unit-up {
    :deep(.ix-statistic-content) {
      color: red;
    }
  }
  .unit-down {
    :deep(.ix-statistic-content) {
      color: green;
    }
  }
}
</style>
