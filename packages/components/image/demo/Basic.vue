<template>
  <div style="display: flex; justify-content: space-around">
    <ix-image objectFit="fill" :width="null" class="demo" src="https://idux.site/logo.svg" alt="demo" />
    <ix-image objectFit="contain" class="demo" src="https://idux.site/logo.svg" />
    <ix-image objectFit="contain" class="demo" src="https://idux.site/logo.svg" />
    <ix-image objectFit="cover" class="demo" src="https://idux.site/logo.svg" />
    <ix-image objectFit="none" class="demo" src="https://idux.site/logo.svg" />
    <ix-image objectFit="scale-down" class="demo" src="https://idux.site/logo.svg" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const width = ref(100)
    const height = ref(100)
    return {
      width,
      height,
    }
  },
})
</script>

<style lang="less">
.demo {
  width: 100px;
  height: 100px;
}
</style>
