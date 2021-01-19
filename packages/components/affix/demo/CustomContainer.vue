<template>
  <div class="wrapper">
    <div class="container">
      <ix-affix class="top" :offset="{ top: 0, left: 0 }" :target="container">
        <ix-button mode="primary" @click="changeContainer">{{ btnText }}</ix-button>
      </ix-affix>
      <div class="placeholder">placeholder</div>
      <ix-affix class="bottom" :offset="{ bottom: 0 }" target=".wrapper">
        <ix-button mode="primary">bottom</ix-button>
      </ix-affix>
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent, ref, computed } from 'vue'
export default defineComponent({
  setup() {
    const offset = reactive({ top: 0, bottom: 0, left: 0, right: 0 })
    const container = ref('.wrapper')
    const btnText = computed(() => {
      return container.value === window ? '点击container换成wrapper' : '点击container换成window'
    })

    function changeContainer() {
      container.value = container.value === window ? '.wrapper' : window
    }
    return {
      offset,
      container,
      changeContainer,
      btnText,
    }
  },
})
</script>
<style lang="less" scoped>
.wrapper {
  width: 300px;
  height: 200px;
  overflow: scroll;
  background-color: aquamarine;

  .container {
    padding: 30px;
    height: 1000px;
    width: 1000px;
  }
}
.placeholder {
  width: 300px;
  height: 300px;
  background-color: red;
}
</style>
