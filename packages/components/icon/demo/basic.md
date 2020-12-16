---
order: 0
title:
  zh: 基本使用
  en: Basic usage
---

## zh

通过指定 `name` 属性来加载不同的图标, 可以使用 `rotate` 来开启旋转或者直接指定旋转角度。
支持动态加载和静态加载, 推荐在首屏加载的图标使用静态加载的方式，其他图标使用动态加载。  
同时还支持直接引入 iconfont 的脚本, 使用较为方便。

## demo

```html
<template>
  <ix-icon name="up" />
  <ix-icon name="down" rotate />
  <ix-icon name="left" rotate="90" />
  <ix-icon name="right" rotate />
  <ix-icon name="ix-icon-up" iconfont />
  <ix-icon name="ix-icon-down" iconfont />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components'
import { addIconDefinitions, Down, fetchFromIconfont } from '@idux/components/icon'

export default defineComponent({
  setup() {
    // 静态加载：无需发请求,但是会增加包体积, 推荐首屏加载的图标使用静态加载，减少 http 请求数量
    addIconDefinitions([Down])

    // 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
    const loadIconDynamically = (iconName: string) => {
      // TODO： fix with vite
      return fetch(`packages/components/icon/src/svg/${iconName}.svg`).then(res => res.text())
    }
    useGlobalConfig('icon', { loadIconDynamically })

    // 直接引入 iconfont script, 使用时需要注明 iconfont
    fetchFromIconfont('https://at.alicdn.com/t/font_2269256_s10i6xhg8l.js')
  },
})
</script>

```
