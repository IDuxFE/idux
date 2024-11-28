<template>
  <IxSpace vertical>
    <IxDateRangePicker v-model:value="rangeValue">
      <template #overlay>
        <div class="demo-custom-panel__overlay">
          <div class="demo-custom-panel__overlay__sider"> custom sider </div>
          <div class="demo-custom-panel__overlay__panel">
            <IxDateRangePickerOverlayInputs />
            <IxDateRangePanel />
            <IxDateRangePickerOverlayFooter />
          </div>
        </div>
      </template>
    </IxDateRangePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref<[Date, Date] | undefined>()
</script>
<style lang="less">
.demo-custom-panel__overlay {
  display: flex;

  &__sider {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    padding: 8px 0;
    border-right: 1px solid #e1e5eb;
  }

  &__panel {
    padding: 16px 16px 0 16px;
  }
}
</style>
