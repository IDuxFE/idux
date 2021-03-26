<template>
  <div class="basic-icons">
    <ix-icon name="up" />
    <ix-icon name="down" rotate />
    <ix-icon name="left" rotate="90" />
    <ix-icon name="right" style="color: red" rotate />
    <ix-icon name="ix-icon-up" class="icon-blue" iconfont />
    <ix-icon name="ix-icon-down" iconfont />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { addIconDefinitions, fetchFromIconfont, Up, Down } from '@idux/components/icon'

export default defineComponent({
  setup() {
    // 静态加载：无需发请求,但是会增加包体积, 推荐首屏加载的图标使用静态加载，减少 http 请求数量
    addIconDefinitions([Up, Down])

    // 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
    const loadIconDynamically = (iconName: string) => {
      return fetch(`/icon-svg/${iconName}.svg`).then(res => res.text())
    }
    useGlobalConfig('icon', { loadIconDynamically })

    // 直接引入 iconfont script, 使用时需要注明 iconfont
    fetchFromIconfont('https://at.alicdn.com/t/font_2269256_s10i6xhg8l.js')
  },
})
</script>
<style lang="less" scoped>
.basic-icons {
  .ix-icon {
    margin-right: 6px;
    font-size: 24px;
  }
  .icon-blue {
    color: blue;
  }
}
</style>
