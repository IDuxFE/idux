<template>
  <div class="statistic-demo-unit">
    <IxStatistic title="Feedback" :value="1128">
      <template #suffix>
        <IxIcon name="book-mark" />
      </template>
    </IxStatistic>
    <IxStatistic title="Unmerged" :value="93" class="demo-class">
      <template #suffix>
        <span> / 100</span>
      </template>
    </IxStatistic>
    <IxStatistic title="Feedback" :value="11.28" :precision="2" suffix="%" class="unit-up">
      <template #prefix>
        <IxIcon name="arrow-up" />
      </template>
    </IxStatistic>
    <IxStatistic title="Idle" :value="9.3" :precision="2" suffix="%" class="unit-down">
      <template #prefix>
        <IxIcon name="arrow-down" />
      </template>
    </IxStatistic>
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
      color: #cf171d;
    }
  }
  .unit-down {
    :deep(.ix-statistic-content) {
      color: #12a679;
    }
  }
}
</style>
