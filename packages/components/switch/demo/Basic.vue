<template>
  <IxSpace direction="vertical" :size="20">
    <IxSwitch v-model:checked="checked" @change="updateChecked"></IxSwitch>
    <IxButton @click="changeChecked">Change</IxButton>
  </IxSpace>
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
