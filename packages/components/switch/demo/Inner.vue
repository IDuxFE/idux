<template>
  <div>
    <div>只配置props：</div>
    <ix-switch checked-children="开" un-checked-children="关" />
  </div>
  <div class="mt-5">
    <div>只配置slots</div>
    <ix-switch>
      <template #unCheckedChildren>
        <ix-icon name="close"></ix-icon>
      </template>
    </ix-switch>
  </div>
  <div class="mt-5">
    <div>同时配置props、slots：</div>
    <ix-switch v-model:checked="checked" checked-children="开" un-checked-children="关">
      <template #checkedChildren>
        <ix-icon name="check"></ix-icon>
        <span>kaikaikaikai</span>
      </template>
      <template #unCheckedChildren>
        <ix-icon name="close"></ix-icon>
        <span>关</span>
      </template>
    </ix-switch>
  </div>
  <div class="mt-5">
    <div>可以配置disabled：</div>
    <ix-switch :disabled="disabled">
      <template #unCheckedChildren>
        <span>关</span>
      </template>
    </ix-switch>
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
