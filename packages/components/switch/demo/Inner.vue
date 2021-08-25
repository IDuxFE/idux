<template>
  <div>
    <div>只配置props：</div>
    <IxSwitch checked-children="开" un-checked-children="关" />
  </div>
  <div class="mt-5">
    <div>只配置slots</div>
    <IxSwitch>
      <template #unCheckedChildren>
        <IxIcon name="close"></IxIcon>
      </template>
    </IxSwitch>
  </div>
  <div class="mt-5">
    <div>同时配置props、slots：</div>
    <IxSwitch v-model:checked="checked" checked-children="开" un-checked-children="关">
      <template #checkedChildren>
        <IxIcon name="check"></IxIcon>
        <span>kaikaikaikai</span>
      </template>
      <template #unCheckedChildren>
        <IxIcon name="close"></IxIcon>
        <span>关</span>
      </template>
    </IxSwitch>
  </div>
  <div class="mt-5">
    <div>可以配置disabled：</div>
    <IxSwitch :disabled="disabled">
      <template #unCheckedChildren>
        <span>关</span>
      </template>
    </IxSwitch>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    const disabled = ref(true)

    return {
      checked,
      disabled,
    }
  },
})
</script>

<style lang="less" scoped>
.mt-5 {
  margin-top: 5px;
}
</style>
