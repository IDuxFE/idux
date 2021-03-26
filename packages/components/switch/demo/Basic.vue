<template>
  <ix-switch v-model:checked="checked" @update:checked="updateChecked"></ix-switch>
  <div class="mt-5">父组件的checked: {{ checked }}</div>
  <ix-button class="mt-5" @click="changeChecked">父组件触发改变</ix-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    const changeChecked = () => {
      checked.value = !checked.value
    }

    const updateChecked = (updateChecked: boolean) => {
      console.log(updateChecked)
    }

    return {
      checked,
      changeChecked,
      updateChecked,
    }
  },
})
</script>
<style lang="less" scoped>
.mt-5 {
  margin-top: 5px;
}
</style>
