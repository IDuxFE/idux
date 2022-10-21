---
category: docs
title: 更新日志
order: 13
---

`@idux` 遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范, 发布周期如下：

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。

## 1.0.1(2022-10-21)

### Bug Fixes

- **cdk:drag-drop:** pointer 模式下无法聚焦 ([#1202](https://github.com/IDuxFE/idux/issues/1202)) ([#1203](https://github.com/IDuxFE/idux/issues/1203)) ([e46d5cb](https://github.com/IDuxFE/idux/commit/e46d5cb06ffa7172e5f71bfd382a8fd811d3285f))
- **comp:cascader:** 选中样式问题 ([#1207](https://github.com/IDuxFE/idux/issues/1207)) ([5fd11e1](https://github.com/IDuxFE/idux/commit/5fd11e11290d20ebca0511e2bdc5d41e7da52c44))
- **comp:select:** selector 后缀图标多行时固定 ([#1205](https://github.com/IDuxFE/idux/issues/1205)) ([de86a17](https://github.com/IDuxFE/idux/commit/de86a171571fd2e226a81cc95278a3b3f6d64bb8))
- **comp:slider:** 原点改成竖线 ([#1208](https://github.com/IDuxFE/idux/issues/1208)) ([90651fd](https://github.com/IDuxFE/idux/commit/90651fd4c3d15b6e5c6acb241c6f56e9816b0eb2))
- **comp:switch:** 移除 seer 主题的阴影 ([#1209](https://github.com/IDuxFE/idux/issues/1209)) ([953d5ce](https://github.com/IDuxFE/idux/commit/953d5ce6fe1ae884baf4bcdb0cfc491295e4348c))
- **comp:table:** 过滤下拉菜单中的按钮为 `xs` 大小 ([#1218](https://github.com/IDuxFE/idux/issues/1218)) ([6c6411a](https://github.com/IDuxFE/idux/commit/6c6411a9866c46bc5a4e78939fab38e950d15545))
- **comp:textarea:** line-height 导致高度计算错误 ([#1214](https://github.com/IDuxFE/idux/issues/1214)) ([2d4ffa4](https://github.com/IDuxFE/idux/commit/2d4ffa4459fb6cd984b3ddfffd9d9355d7922c7f))
- **comp:watermark:** 防篡改数据抖动问题 ([#1206](https://github.com/IDuxFE/idux/issues/1206)) ([49863e9](https://github.com/IDuxFE/idux/commit/49863e9d8943ef7ec1bd98bf5bffe6c4e8418419))
- **pro:textarea:** disabled 不生效 ([#1215](https://github.com/IDuxFE/idux/issues/1215)) ([8dc1f8d](https://github.com/IDuxFE/idux/commit/8dc1f8df6d82162327f22b87996334f74064e8b2))
- **pro:transfer:** 级联策略为 parent 时, flat-target-data 不能正常工作 ([#1204](https://github.com/IDuxFE/idux/issues/1204)) ([54d197b](https://github.com/IDuxFE/idux/commit/54d197b2a1aa48a4a475e90cfde8dca3c5cb2f2a))

## 1.0.0(2022-10-14)

欢迎来到 `@idux` 的第一个正式版本，之前版本的用户请参考[升级指南](https://github.com/IDuxFE/idux/issues/1193)进行升级。

### Bug Fixes

* **cdk:popper:** vue 警告: 监听了一个非响应式对象 ([#1197](https://github.com/IDuxFE/idux/issues/1197)) ([123e62f](https://github.com/IDuxFE/idux/commit/123e62f32e62b801dce86d799f6ab95b7025b526))
* **comp:carousel:** 动态新增删除子节点的时候 gotTo 不能正常跳转  ([#1196](https://github.com/IDuxFE/idux/issues/1196)) ([1406d27](https://github.com/IDuxFE/idux/commit/1406d27ca409d5ed53d81aafdf8848d173249b77))
* **comp:modal:** 关闭动画结束前可以点击 ok 和 cancel 按钮 ([#1190](https://github.com/IDuxFE/idux/issues/1190)) ([e207465](https://github.com/IDuxFE/idux/commit/e20746521e3dd3102b1e736802a25de6591ac927))

### Features

* **cdk:popper:** 将 popperjs 升级到 floating-ui ([#1191](https://github.com/IDuxFE/idux/issues/1191)) ([7eb77d6](https://github.com/IDuxFE/idux/commit/7eb77d66cb5063e5724c1bf2666a2e33492e09e6))
