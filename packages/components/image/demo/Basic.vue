<template>
  <div style="display: flex; justify-content: space-around">
    <ix-image
      objectFit="fill"
      :width="null"
      class="demo"
      src="https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg"
      alt="demo"
    />
    <ix-image
      objectFit="contain"
      class="demo"
      src="https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg"
    />
    <ix-image
      objectFit="contain"
      class="demo"
      src="https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg"
    />
    <ix-image objectFit="cover" class="demo" src="https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg" />
    <ix-image objectFit="none" class="demo" src="https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg" />
    <ix-image
      objectFit="scale-down"
      class="demo"
      src="https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg"
    />
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
