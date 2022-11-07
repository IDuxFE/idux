<template>
  <IxSpace align="center" itemless>
    <IxButton mode="primary" @click="show = true">Show</IxButton>
    <IxButton @click="show = false">Hide</IxButton>
    <CustomButton :show="show"></CustomButton>
    Text
    <CustomButton :show="show"></CustomButton>
    Text
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'

import { IxButton } from '@idux/components/button'

// eslint-disable-next-line vue/one-component-per-file
const CustomButton = defineComponent({
  props: {
    show: Boolean,
  },
  setup(props) {
    return () => (props.show ? h(IxButton, null, () => 'Button') : null)
  },
})

// eslint-disable-next-line vue/one-component-per-file
export default defineComponent({
  components: { CustomButton },
  setup() {
    const show = ref(false)
    return { show }
  },
})
</script>
