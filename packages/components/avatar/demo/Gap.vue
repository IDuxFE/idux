<template>
  <IxSpace>
    <!-- TODO input-number -->
    <label>Gap: <IxInput v-model:value="gap" style="width: 120px" /></label>
    <IxButton @click="change">Change Text</IxButton>
  </IxSpace>
  <br />

  <IxAvatar size="large" :gap="gap" :text="text" :style="{ backgroundColor }" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

const userList = ['Lucy', 'U', 'Tom', 'Edward']
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

export default defineComponent({
  setup() {
    const gap = ref(4)
    const index = ref(3)
    const text = computed(() => userList[index.value])
    const backgroundColor = computed(() => colorList[index.value])

    const change = () => {
      if (index.value === userList.length - 1) {
        index.value = 0
      } else {
        index.value++
      }
    }

    return { gap, text, backgroundColor, change }
  },
})
</script>
