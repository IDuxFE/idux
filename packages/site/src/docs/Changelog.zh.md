---
category: docs
title: 更新日志
order: 13
---

`@idux` 遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范, 发布周期如下：

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。

# 1.12.0(2023-10-30)


### Bug Fixes

* **pro:search:** 服务端搜索不生效 ([#1727](https://github.com/IDuxFE/idux/issues/1727)) ([0d306ac](https://github.com/IDuxFE/idux/commit/0d306accc006171bcafac2c39228be32c79de530))
* **pro:search:** 搜索输入段的input应当在空值时悬浮显示placeholder ([#1724](https://github.com/IDuxFE/idux/issues/1724)) ([8902bb9](https://github.com/IDuxFE/idux/commit/8902bb982ce2539793631af1feca6ee7046b6485))
* **pro:search:** 创建但未确认的搜索项，在数据更新后不应当改变排列顺序 ([#1725](https://github.com/IDuxFE/idux/issues/1725)) ([34f9669](https://github.com/IDuxFE/idux/commit/34f9669bb274a7cc340e825c8a23f76e82ef8fb3))


### Features

* **comp:*:** 为所有带有浮层的输入类型组件增加 `onFocus`, `onBlur` 事件，并优化键盘操作 ([#1714](https://github.com/IDuxFE/idux/issues/1714)) ([7b739aa](https://github.com/IDuxFE/idux/commit/7b739aaca85bfb0cfc675b88de06426579dc3b76))
  - 注：浮层不会再通过点击组件外部收起，而是会在组件失焦时收起
* **comp:drawer,header,message,modal,notification:** 所有通过`usexxx`使用的实例创建方法，例如 `useModal`，其需要传入`VNode`参数的属性现在均支持传入渲染函数 ([#1717](https://github.com/IDuxFE/idux/issues/1717)) ([69013e8](https://github.com/IDuxFE/idux/commit/69013e8ebb1a8cf3f5a409e7b4463c280b83f815))
* **comp:table:** 新增 `pagination` 插槽 ([#1716](https://github.com/IDuxFE/idux/issues/1716)) ([b653faf](https://github.com/IDuxFE/idux/commit/b653faff81ac5509c6de5b7795a45a4261743b21))
* **comp:table:** 针对树型数据，`TableExpandableColumn` 新增 `expandable.showLine` 配置，用于展示树连线 ([#1718](https://github.com/IDuxFE/idux/issues/1718)) ([4504c0f](https://github.com/IDuxFE/idux/commit/4504c0f4fcb1ff24f32f419c4364d80dc070d357))
* **pro:search:** 新增 `useParser` API，方便用户解析搜索值到更友好的数据类型 ([#1721](https://github.com/IDuxFE/idux/issues/1721)) ([d96bed4](https://github.com/IDuxFE/idux/commit/d96bed4927ef98ab68b0010cfe8777450fd2da57))
* **pro:search:** `select` 类型的搜索项新增 `concludeAllSelected` 配置，可以在全选所有选项后展示 `"全部"` ([#1726](https://github.com/IDuxFE/idux/issues/1726)) ([5e4c7e1](https://github.com/IDuxFE/idux/commit/5e4c7e14b85029623f33ce4ad42f0b17a2a606cc))
* **pro:search:** `treeSelect` 类型的搜索项新增 `defaultExpandedKeys` 配置，可以指定初始展开的节点 ([#1728](https://github.com/IDuxFE/idux/issues/1728)) ([8120fdf](https://github.com/IDuxFE/idux/commit/8120fdfc0c266baa89622d7823ee99b37ac627b2))

## 1.11.2(2023-10-23)


### Bug Fixes

* **comp:upload:** 通过受控属性files的增删，应当可以触发文件的自动上传和终止 ([#1715](https://github.com/IDuxFE/idux/issues/1715)) ([c068cd4](https://github.com/IDuxFE/idux/commit/c068cd48b081c8f1a3b0c03e9f78151537d6781f))
* **comp:table:** 修改seer主题的展开收起按钮全局配置，和tree保持一致 ([#1715](https://github.com/IDuxFE/idux/issues/1715)) ([1a77228](https://github.com/IDuxFE/idux/commit/60143dd158547f6570fe6c4c098e68b4f1a77228))
* **pro:search:** 在全选段输入的内容之后，退格键失效 ([#1722](https://github.com/IDuxFE/idux/issues/1722)) ([1a34c13](https://github.com/IDuxFE/idux/commit/1a34c13dbee9596dc69e8ed6204d19b11524493e))

## 1.11.1(2023-10-17)

### Bug Fixes

* **pro:search:** placeholder 没有垂直居中对齐 ([#1713](https://github.com/IDuxFE/idux/issues/1713)) ([f05cc48](https://github.com/IDuxFE/idux/commit/f05cc4851a003f3bec4a9bf61657860701fa1efd))
* **pro:search:** select面板在鼠标移出之后不应当清除选项的激活状态 ([#1712](https://github.com/IDuxFE/idux/issues/1712)) ([a6d539a](https://github.com/IDuxFE/idux/commit/a6d539a576c0df230729dd79f07edf13d02f6bb3))

# 1.11.0(2023-10-07)


### Bug Fixes

* **comp:radio:** radio选中的圆点位置不应当固定写死，导致大尺寸下位置异常 ([#1707](https://github.com/IDuxFE/idux/issues/1707)) ([840eefe](https://github.com/IDuxFE/idux/commit/840eefef03633b2ecf5c9a481ddb36f63888cc8e))
* **comp:text:** 原生 tooltip 在没有省略的时候不应当显示 ([#1709](https://github.com/IDuxFE/idux/issues/1709)) ([8513cd9](https://github.com/IDuxFE/idux/commit/8513cd92aad47081dd9ef160897bd388a88ffa68))
* **comp:text:** 当文字只有一行且没有省略并配置了ellipsis时，显示出现闪烁 ([#1706](https://github.com/IDuxFE/idux/issues/1706)) ([5afea2f](https://github.com/IDuxFE/idux/commit/5afea2f36f6a3a53c1d72fa37804f58a8f134a62))
* **comp:text:** 当文字的省略的行数为1时，使用原生css的ellipsis实现以提升性能 ([#1705](https://github.com/IDuxFE/idux/issues/1705)) ([271ef83](https://github.com/IDuxFE/idux/commit/271ef83dd5d88afff84e8007439e9b5a8d5546b0))
* **pro:search:** 在以受控方式修改value后，未确认的搜索项会出现key重复的问题 ([#1708](https://github.com/IDuxFE/idux/issues/1708)) ([3ae8dd2](https://github.com/IDuxFE/idux/commit/3ae8dd2a825483ce530abbf57a24cfb6fa99fa29))
* **pro:textarea:** readonly不生效 ([#1704](https://github.com/IDuxFE/idux/issues/1704)) ([6e82eb4](https://github.com/IDuxFE/idux/commit/6e82eb4cbc5a8a2b20f5d7315b8c0cedbfd96110))

### Features

* **comp:card:** `shadow` 属性现在支持全局配置 ([#1696](https://github.com/IDuxFE/idux/issues/1696)) ([d3672cc](https://github.com/IDuxFE/idux/commit/d3672ccd8ba53f126b6ce7643fa3141e25b88c0e))
* **pro:search:** quickSelect 属性支持对象配置 ([#1697](https://github.com/IDuxFE/idux/issues/1697)) ([5259671](https://github.com/IDuxFE/idux/commit/52596710afee111bc5d98d145f4af5c3a516cd15))
* **pro:search:** searchField 支持 `keywordFallback` 配置实现自由输入转关键字功能 ([#1698](https://github.com/IDuxFE/idux/issues/1698)) ([430c740](https://github.com/IDuxFE/idux/commit/430c74094cae6d99e27517d4060839f0d24a3670))

## 1.10.2(2023-09-25)


### Bug Fixes

* **comp:text:** 复制图标的默认全局配置不正确 ([#1700](https://github.com/IDuxFE/idux/issues/1700)) ([7c26c81](https://github.com/IDuxFE/idux/commit/7c26c818ec581a4c1b4de7b79af0734fab0448a5))
* **comp:text:** 展开收起图标再文字内容没有出现省略和折叠的情况下不应当显示 ([#1699](https://github.com/IDuxFE/idux/issues/1699)) ([43d489b](https://github.com/IDuxFE/idux/commit/43d489b0692e05cd7d3e3e0cd030a10751f7f781))

## 1.10.1(2023-09-18)


### Bug Fixes

* **comp:config:** 修改seer全局配置 ([#1695](https://github.com/IDuxFE/idux/issues/1695)) ([63878a5](https://github.com/IDuxFE/idux/commit/63878a5dbf15b28115d03f21b4cc6c1e0bb0b10d))
* **comp:icon:** 增加三个图标（thumbnail、fit-to-view、select） ([#1685](https://github.com/IDuxFE/idux/issues/1685)) ([bdb7ba1](https://github.com/IDuxFE/idux/commit/bdb7ba199dd914823bb04ec3a7cfa6a7869f6d2e))
* **comp:radio:** 移除不必要的console.log ([#1691](https://github.com/IDuxFE/idux/issues/1691)) ([f779ea2](https://github.com/IDuxFE/idux/commit/f779ea2f885e1c737de5444433446f096a112c66))
* **comp:stepper:** 更改seer下的全局配置，修改`size`为`sm` ([#1694](https://github.com/IDuxFE/idux/issues/1694)) ([51ae0b2](https://github.com/IDuxFE/idux/commit/51ae0b24365736f319862e4f86197bcdba355c73))
* **comp:tree:** 修改内容区域水平padding为 `0` ([#1686](https://github.com/IDuxFE/idux/issues/1686)) ([231a6ee](https://github.com/IDuxFE/idux/commit/231a6ee957145e02d20c3287e5e2747657f438f0))
* **pro:search:** 搜索项名称输入最大宽度不应当溢出容器 ([#1693](https://github.com/IDuxFE/idux/issues/1693)) ([fe42021](https://github.com/IDuxFE/idux/commit/fe4202104300b63d2ac3fde2df84a15e76b8832d))
* **pro:search:** 名称选择浮窗在有过滤的前提下，关闭会导致数据闪烁 ([#1692](https://github.com/IDuxFE/idux/issues/1692)) ([34034a3](https://github.com/IDuxFE/idux/commit/34034a3cf842c4d7f54c1207ba29022a1be3458b))
* **pro:search:** safari下搜索框不应该自动聚焦 ([#1689](https://github.com/IDuxFE/idux/issues/1689)) ([e211465](https://github.com/IDuxFE/idux/commit/e211465f23f76c2e08a60d27ed424546109eb533))
* **pro:search:** safari下搜索项输入段的横向滚动事件不生效，导致省略号的显示隐藏异常 ([#1690](https://github.com/IDuxFE/idux/issues/1690)) ([1caabb8](https://github.com/IDuxFE/idux/commit/1caabb892f4b8bd543a92773cbb9717f6d4d0a20))

# 1.10.0(2023-09-11)



### Features

* **comp:table:** `selectable` 列的 `customCell` 支持 `record` 和 `rowIndex` 参数方便自定义 ([#1681](https://github.com/IDuxFE/idux/issues/1681)) ([b80ba68](https://github.com/IDuxFE/idux/commit/b80ba6802cf0e1dfa520565c38c816eb7c9c5af1))
* **comp:tabs:** `customTitle` 支持 `overflowed` 参数，代表tab是否滚动溢出 ([#1682](https://github.com/IDuxFE/idux/issues/1682)) ([5da8900](https://github.com/IDuxFE/idux/commit/5da8900279c8ce81c7e871029b3b47503fa33816))
* **comp:text:** 重写组件以提供更好的 `ellipsis` 相关支持 ([#1680](https://github.com/IDuxFE/idux/issues/1680)) ([fb1adb2](https://github.com/IDuxFE/idux/commit/fb1adb27657e21a1eddff253fb5c0137d44df281))
  - 不再基于 `line-clamp` 实现多行省略
  - 新增 `ellipsis` 选项代替之前的 `lineClamp` 以及 `exandable` 属性
  - 新增 `ellipsis` 插槽
  - 新增 `suffix` 插槽
  - 新增 `copyIcon` 选项以及插槽，并支持全局配置
  - 新增 `expandIcon` 选项以及插槽，并支持全局配置
* **comp:upload:** 新增 `onMaxCountExceeded` 事件 ([#1673](https://github.com/IDuxFE/idux/issues/1673)) ([8faddc1](https://github.com/IDuxFE/idux/commit/8faddc1388ddc8dae97814ece2ac3eef69c5c53f))
  - 组件重构以支持完整的受控使用方式，不再支持直接修改回调传递的 `file` 的属性，需要修改源数据
* **pro:search:** add `size` prop ([#1667](https://github.com/IDuxFE/idux/issues/1667)) ([e8068bd](https://github.com/IDuxFE/idux/commit/e8068bdc5f0136ad9c5057fe90f50546515d31da))

## 1.9.5(2023-09-04)

### Bug Fixes

* **comp:alert:** 将 `warning` 类型的 alert 图标修改为 `'exclamation-circle'` ([#1676](https://github.com/IDuxFE/idux/issues/1676)) ([3d9c265](https://github.com/IDuxFE/idux/commit/3d9c2657dfdecbd3185f90efd9d042540343fa8b))
* **comp:card:** footer 中的 button 样式定义不再直接使用button，改用class ([#1677](https://github.com/IDuxFE/idux/issues/1677)) ([cf91774](https://github.com/IDuxFE/idux/commit/cf91774662bb84bd50ddfba77db4ff65df2e3a59))
* **comp:tree:** 树的 `select` 禁用配置不生效 ([#1675](https://github.com/IDuxFE/idux/issues/1675)) ([c6b1bb3](https://github.com/IDuxFE/idux/commit/c6b1bb321f9a2eb698c9d5c02c18a67eb9af6f74))
* **comp:upload:** 默认的图标配置不正确，没有预览图标 ([#1674](https://github.com/IDuxFE/idux/issues/1674)) ([0bf4f6b](https://github.com/IDuxFE/idux/commit/0bf4f6be6d812506d7848b58fd30044b9563722a))

## 1.9.4(2023-08-28)

### Bug Fixes

* **comp:dropdown:** 给demo中的图标增加展开时的旋转动画 ([#1671](https://github.com/IDuxFE/idux/issues/1671)) ([d81b1c5](https://github.com/IDuxFE/idux/commit/d81b1c5981365c245c5a88616d3f3b952790d49d))
* **comp:divider:** 标题在placement为`start`或`end`时，将与文字顶行对齐，去除左右缩进和边距 ([#1668](https://github.com/IDuxFE/idux/issues/1668)) ([f488830](https://github.com/IDuxFE/idux/commit/f488830a5151a441c779d79d7791f14b8b19138e))
* **comp:tree:** 在级联模式下，树节点的禁用状态有应当级联计算 ([#1666](https://github.com/IDuxFE/idux/issues/1666)) ([c57dfb3](https://github.com/IDuxFE/idux/commit/c57dfb3d5a7b5b4140e5c54b981574d7c364eec8))
* **comp:input:** 当检验不通过时，前置或后置的select不应当出现蓝色的box-shadow ([#1665](https://github.com/IDuxFE/idux/issues/1665)) ([bb26dbb](https://github.com/IDuxFE/idux/commit/bb26dbbccc4987399e65f802395f0c3620c10b3b))
* **comp:date-picker:** 新增快捷选择示例 ([#1664](https://github.com/IDuxFE/idux/issues/1664)) ([485e9ae](https://github.com/IDuxFE/idux/commit/485e9aea77ece91a4aa05cc5322c743067043928))
* **comp:pagination:** sizeChanger 在简洁模式下应当支持显示 ([#1663](https://github.com/IDuxFE/idux/issues/1663)) ([23178ed](https://github.com/IDuxFE/idux/commit/23178edca00e566a811fd148c5d2560654bf78f9))
* **pro:table:** 修改layouTool面板中复选框与文字的间距为4px ([#1669](https://github.com/IDuxFE/idux/issues/1669)) ([5c72c47](https://github.com/IDuxFE/idux/commit/5c72c47513c357401683884826af1af41664b61a))
* **pro:search:** 在searchField变化时，对应的搜索项应当更新 ([#1662](https://github.com/IDuxFE/idux/issues/1662)) ([a564dd3](https://github.com/IDuxFE/idux/commit/a564dd30a3a73961c0b7f6d8d17949c156bc41b6))

## 1.9.3(2023-08-21)

### Bug Fixes

- **cdk:popper:** `display: none`的 reference 对应的浮层不应被隐藏 ([#1659](https://github.com/IDuxFE/idux/issues/1659)) ([830be33](https://github.com/IDuxFE/idux/commit/830be33d41b4271c65107b15557ea91253ce90e2))
- **comp:alert:** Alert内容文字与分页不对齐 ([#1658](https://github.com/IDuxFE/idux/issues/1658)) ([f691999](https://github.com/IDuxFE/idux/commit/f6919999f20ba36c0618945c437e3f22537a62f4))
- **comp:card:** 给footer的按钮加上class，避免影响自定义按钮样式 ([#1660](https://github.com/IDuxFE/idux/issues/1660)) ([54f2c7f](https://github.com/IDuxFE/idux/commit/54f2c7fafe6cad925b2a80a37a146b0cb733b41e))
- **comp:drawer:** 抽屉内容的第一次渲染应当等到第一次显示之后 ([#1657](https://github.com/IDuxFE/idux/issues/1657)) ([4e4542b](https://github.com/IDuxFE/idux/commit/4e4542bad43c90749d49309f873b8c804c5ce102))
- **pro:search:** 当搜索项在确认时被删除，onItemConfirm事件的参数不正确 ([#1661](https://github.com/IDuxFE/idux/issues/1661)) ([84f95d1](https://github.com/IDuxFE/idux/commit/84f95d1e2b0f4f3a64fcfc322f40ddbc81153fa9))
- **pro:search:** 新创建未确认的搜索项在其他搜索项确认后被异常更新 ([#1656](https://github.com/IDuxFE/idux/issues/1656)) ([6ae11ea](https://github.com/IDuxFE/idux/commit/6ae11ea0cc591beac35d9bff64fe6aa9e59ea65c))
- **pro:search:** 有默认值的输入段不应当在创建时被置于激活状态 ([#1655](https://github.com/IDuxFE/idux/issues/1655)) ([97a40d6](https://github.com/IDuxFE/idux/commit/97a40d64db0d0a1c7e8f553b4adfd7fe071f8997))

## 1.9.2(2023-08-14)

### Bug Fixes

- **cdk:forms:** 使用异步校验器时control的状态不正确 ([#1645](https://github.com/IDuxFE/idux/issues/1645)) ([fa591b5](https://github.com/IDuxFE/idux/commit/fa591b5d8b7655971e1e2accbd2fb921a50319df))
- **cdk:popper:** 当reference是display none隐藏时，不应更新箭头状态等 ([#1653](https://github.com/IDuxFE/idux/issues/1653)) ([cf83513](https://github.com/IDuxFE/idux/commit/cf835133dae5ddfa58a2daac1a3e3e4e397feebd))
- **cdk:popper:** 当reference的祖先节点被隐藏时，reference将被视为隐藏 ([#1648](https://github.com/IDuxFE/idux/issues/1648)) ([db00adb](https://github.com/IDuxFE/idux/commit/db00adbed7b2afcce6406239b59e8576cefd4d87))
- **comp:\*:** overlay的popper选项在更新时应当深度watch ([#1652](https://github.com/IDuxFE/idux/issues/1652)) ([e6f5fa2](https://github.com/IDuxFE/idux/commit/e6f5fa2cfac1d869ff6b4279456e44308b3c72b9))
- **comp:date-picker:** 面板头部的年月按钮字体大小不正确 ([#1640](https://github.com/IDuxFE/idux/issues/1640)) ([e7895a1](https://github.com/IDuxFE/idux/commit/e7895a10874e609141ab33a6a033510dc0605ffe))
- **comp:drawer:** 使用自定义容器时，初始的出现动画不正常 ([#1642](https://github.com/IDuxFE/idux/issues/1642)) ([a4dc760](https://github.com/IDuxFE/idux/commit/a4dc760fef2eb9e1e119073f663e13fb07f561ab))
- **comp:dropdown:** dropdown面板的border-radius不生效，增加overflow:hidden ([#1632](https://github.com/IDuxFE/idux/issues/1632)) ([4817f09](https://github.com/IDuxFE/idux/commit/4817f09ca5e5f5b23fe1bb76c1c64c366cfcf6b6))
- **comp:modal:** header的尺寸在没有header内容时为sm ([#1634](https://github.com/IDuxFE/idux/issues/1634)) ([ca74b62](https://github.com/IDuxFE/idux/commit/ca74b62d49990f8c8ef6dfed0e77ffb14f2f7ebe))
- **comp:select:** maxLabel 配置 resposive时，几率出现换行 ([#1647](https://github.com/IDuxFE/idux/issues/1647)) ([468a749](https://github.com/IDuxFE/idux/commit/468a749d17a80ecaedaef32f3afd5ca5f02506fe))
- **comp:select:** 分组选项的缩进不生效 ([#1636](https://github.com/IDuxFE/idux/issues/1636)) ([8807a31](https://github.com/IDuxFE/idux/commit/8807a3199ef00c4401631e6ed5bd75c4b9bd806f))
- **comp:table:** 文字节点与展开收起按钮之间的间距不生效 ([#1637](https://github.com/IDuxFE/idux/issues/1637)) ([0183341](https://github.com/IDuxFE/idux/commit/0183341f3c03814c29d37a1e086937738bf13f93))
- **comp:table:** 表头的筛选和排序按钮大小不正确 ([#1649](https://github.com/IDuxFE/idux/issues/1649)) ([2697bb8](https://github.com/IDuxFE/idux/commit/2697bb8b3e5db3e460c76f985650b27487500b87))
- **comp:tag:** tag内容没有水平居中 ([#1650](https://github.com/IDuxFE/idux/issues/1650)) ([02c5043](https://github.com/IDuxFE/idux/commit/02c50439918438b25e10676528d68bbfc9ce0601))
- **comp:tour:** step的title选项应当是可选的 ([#1628](https://github.com/IDuxFE/idux/issues/1628)) ([ecd1b7c](https://github.com/IDuxFE/idux/commit/ecd1b7c596f03fb02b8e76caa8863ab83b129453))
- **comp:transfer:** 清除按钮不正确 ([#1633](https://github.com/IDuxFE/idux/issues/1633)) ([73eab86](https://github.com/IDuxFE/idux/commit/73eab866397277034cbac4c97645817ed2bc4763))
- **pro:search:** 通过快捷面板取消所有所选的选项选中，应当删除该搜索项 ([#1646](https://github.com/IDuxFE/idux/issues/1646)) ([eab7c44](https://github.com/IDuxFE/idux/commit/eab7c444cc86a4e0dd5a30258f0c2fd8a3103da2))

# 1.9.1(2023-08-05)

### Bug Fixes

- **comp:\*:** 修改reset样式来隐藏edge浏览器中`password`类型`input`的小眼睛图标 ([#1626](https://github.com/IDuxFE/idux/issues/1626)) ([a0dddbd](https://github.com/IDuxFE/idux/commit/a0dddbd7d85fdceeb33cbce8b31f6fd3eb142b37))
- **comp:\*:** 浮层内容在渲染为空之后有几率由于箭头尺寸获取失败导致位置计算不正确 ([#1627](https://github.com/IDuxFE/idux/issues/1627)) ([8c36d26](https://github.com/IDuxFE/idux/commit/8c36d26e41a4a04504710e9ea3305f57fc6590ce))
- **comp:button:** `text`和`link`类型的按钮应当可以选中复制 ([#1624](https://github.com/IDuxFE/idux/issues/1624)) ([4ca9283](https://github.com/IDuxFE/idux/commit/4ca92832e7a40b6d875b26cfdeb7c9f7f74bfa1c))
- **comp:tour:** 异步使用场景下，滚动屏幕可能会造成当前激活状态的内容显示不正确 ([#1621](https://github.com/IDuxFE/idux/issues/1621)) ([cb6d0bf](https://github.com/IDuxFE/idux/commit/cb6d0bf323b85b9b90c159025e2acca2b3b36b74))
- **comp:tour:** `closable`应当可以配置 ([#1622](https://github.com/IDuxFE/idux/issues/1622)) ([409c280](https://github.com/IDuxFE/idux/commit/409c280c5f536d0b49a92eca7bd74385fac6a59f))
- **pro:search:** 增加`select`类型面板在快捷面板中的`min-height` ([#1625](https://github.com/IDuxFE/idux/issues/1625)) ([b019804](https://github.com/IDuxFE/idux/commit/b0198049809ff1f2ee8f28d9759c4bc82466cb67))
- **pro:search:** 中文输入导致闪烁不正常 ([#1620](https://github.com/IDuxFE/idux/issues/1620)) ([1e4a1c7](https://github.com/IDuxFE/idux/commit/1e4a1c745b6af7174e697ffd42bfe4b1be09302f))

# 1.9.0(2023-07-27)

### Bug Fixes

- **comp:select:** 开启 allowInput 时，中文输入法下按回车键异常 ([#1611](https://github.com/IDuxFE/idux/issues/1611)) ([62d53e7](https://github.com/IDuxFE/idux/commit/62d53e7e471ae11f7f2556400d26180be53ffd15))
- **comp:table:** `customMenu` 新增相关参数 ([#1619](https://github.com/IDuxFE/idux/issues/1619)) ([079df65](https://github.com/IDuxFE/idux/commit/079df65c7ac96770dc306cdce64688936dde0d1e))
- **pro:search:** 每一段的输入都有独立的溢出省略号 ([#1614](https://github.com/IDuxFE/idux/issues/1614)) ([ffc85a1](https://github.com/IDuxFE/idux/commit/ffc85a15be8f3c2c4c3478e24b3576c1f98a6486))
- **pro:search:** 空状态也应当根据searchStates判断 ([#1613](https://github.com/IDuxFE/idux/issues/1613)) ([25e755f](https://github.com/IDuxFE/idux/commit/25e755f45e6a2d79728e3553383cc8616fbe1d27))
- **pro:search:** 退格键不起作用 ([#1612](https://github.com/IDuxFE/idux/issues/1612)) ([eec8158](https://github.com/IDuxFE/idux/commit/eec81580261220487022fa6b3368f60995fa323e))
- **pro:table:** 布局设置点击 label 区域无法触发勾选 ([#1609](https://github.com/IDuxFE/idux/issues/1609)) ([fdda882](https://github.com/IDuxFE/idux/commit/fdda882354bb7c02449ba2bf6eeae4395b9a931e))

### Features

- **comp:\*:** 所有支持虚拟滚动的组件新增 virtualItemHeight 配置 ([#1618](https://github.com/IDuxFE/idux/issues/1618)) ([b1a5801](https://github.com/IDuxFE/idux/commit/b1a5801e943f4189b550769c5d107e80487ba097))
- **comp:checkbox,radio:** 新增 fieldset 插槽 ([#1608](https://github.com/IDuxFE/idux/issues/1608)) ([53c9131](https://github.com/IDuxFE/idux/commit/53c9131ebdfde4abd8886b33d11d2dcbf85b062c))
- **comp:tag:** 支持 css variable 并新增 status 配置 ([#1600](https://github.com/IDuxFE/idux/issues/1600)) ([4c2d506](https://github.com/IDuxFE/idux/commit/4c2d5069e745c30ad256436a4eeacd60e09afbe2))
- **comp:tour:** 新增新手引导组件 ([#1610](https://github.com/IDuxFE/idux/issues/1610)) ([79335e3](https://github.com/IDuxFE/idux/commit/79335e3917daf024b64b38f6ffdb78cedc4165e4))
- **comp:tree-select:** 新增 searchPlaceholder 配置 ([#1617](https://github.com/IDuxFE/idux/issues/1617)) ([3a2687e](https://github.com/IDuxFE/idux/commit/3a2687e6cc7b9bfdd97d86da30697a35d26db3f3))
- **pro:search:** 在 blur 的时候更新 value ([#1616](https://github.com/IDuxFE/idux/issues/1616)) ([294884e](https://github.com/IDuxFE/idux/commit/294884e21d404a50fab27a73a5bac6e7de014cbb))

## 1.8.1(2023-07-14)

### Bug Fixes

- **comp:icon:** 更新图标资源 ([#1597](https://github.com/IDuxFE/idux/issues/1597)) ([cffe08c](https://github.com/IDuxFE/idux/commit/cffe08ceeab96144bc54523473f042b6222a5e5f))
- **comp:input:** 样式同步设计规范 ([#1602](https://github.com/IDuxFE/idux/issues/1602)) ([5a5eaea](https://github.com/IDuxFE/idux/commit/5a5eaea187b4af52e11da3135e8b4bd1ef2b2f34))
- **comp:textarea:** firefox 下的 boxsizing 计算异常 ([#1599](https://github.com/IDuxFE/idux/issues/1599)) ([f68df61](https://github.com/IDuxFE/idux/commit/f68df6195f04f0770078e508970e839099170168))
- **comp:text:** lineClamp 工作异常 ([#1596](https://github.com/IDuxFE/idux/issues/1596)) ([f9a33e5](https://github.com/IDuxFE/idux/commit/f9a33e5e8e2217b1db669086464ddaee92802af2))
- **pro:search:** 未声明组件名称 ([#1598](https://github.com/IDuxFE/idux/issues/1598)) ([12bf691](https://github.com/IDuxFE/idux/commit/12bf691c8eb4a83b1f0ca32fdb9d399f1929d495))

# 1.8.0(2023-07-06)

### Bug Fixes

- **comp:carousel:** dot 点击区域过小 ([#1590](https://github.com/IDuxFE/idux/issues/1590)) ([7138b40](https://github.com/IDuxFE/idux/commit/7138b40f74adaf47960d8be73427eb92f61e0090))
- **comp:date-picker:** 开始和结束的单元格计算错误 ([#1591](https://github.com/IDuxFE/idux/issues/1591)) ([d66c71b](https://github.com/IDuxFE/idux/commit/d66c71b9399083e3da16db8347547cadfc7cb1b5))
- **pro:table:** 布局设置中的树勾选逻辑错误 ([#1593](https://github.com/IDuxFE/idux/issues/1593)) ([799ac59](https://github.com/IDuxFE/idux/commit/799ac5909aac314589c330d2b57f7ce91414c561))

### Features

- **comp:text:** 新增文本组件 ([#1595](https://github.com/IDuxFE/idux/issues/1595)) ([9df3f1b](https://github.com/IDuxFE/idux/commit/9df3f1bba067130bca7f9104312d6b2ee3527b2a))
- **comp:tree:** expandIcon 支持函数和全局配置 ([#1586](https://github.com/IDuxFE/idux/issues/1586)) ([f4b1a38](https://github.com/IDuxFE/idux/commit/f4b1a38bd3160fed17abbc2e656025611f8459e9))
- **pro:search:** 新增 `mutiSegment` 配置 ([#1574](https://github.com/IDuxFE/idux/issues/1574)) ([90a1a8a](https://github.com/IDuxFE/idux/commit/90a1a8a1f5e197735aafa4fc0faac76008af0996))
- **pro:search:** 新增 IxProSearchShortcut 组件和相关插槽 ([#1594](https://github.com/IDuxFE/idux/issues/1594)) ([c605be2](https://github.com/IDuxFE/idux/commit/c605be21e7cb3f13c87cebffd87e09d2947493cd))
- **pro:transfer:** 表格穿梭框支持布局配置 ([#1579](https://github.com/IDuxFE/idux/issues/1579)) ([6c6d41b](https://github.com/IDuxFE/idux/commit/6c6d41bf75a8a560c0446e27a5d1dde90bda0bcb))

## 1.7.2(2023-06-28)

### Bug Fixes

- **comp:image:** 默认图标未正确加载 ([#1581](https://github.com/IDuxFE/idux/issues/1581)) ([cc81151](https://github.com/IDuxFE/idux/commit/cc811518ca04948600d16ea486e1dfa33dd5b8b8)), closes [#1580](https://github.com/IDuxFE/idux/issues/1580)
- **comp:modal:** 按钮的默认大小应该为 'md' ([#1582](https://github.com/IDuxFE/idux/issues/1582)) ([00c7c6c](https://github.com/IDuxFE/idux/commit/00c7c6c7c1b9da47648112ce63b5f210bef45946))
- **comp:select:** `onSearch` 应该在 input 被清除时调用 ([#1577](https://github.com/IDuxFE/idux/issues/1577)) ([ab4e4b0](https://github.com/IDuxFE/idux/commit/ab4e4b0981b1054197878f18c34543be19073a62))
- **comp:style:** watermark 的样式没有被正确引入 ([#1575](https://github.com/IDuxFE/idux/issues/1575)) ([d8b9aed](https://github.com/IDuxFE/idux/commit/d8b9aed807c5d86ea6feefd6460e8895bd4852ff))
- **comp:tree:** 拖拽时的阴影不正确 ([#1584](https://github.com/IDuxFE/idux/issues/1584)) ([5b73101](https://github.com/IDuxFE/idux/commit/5b73101c5375f855a34f877f79c9941d38052e75))
- **comp:tree:** 降低样式优先级，提高浏览器兼容性 ([#1585](https://github.com/IDuxFE/idux/issues/1585)) ([9949124](https://github.com/IDuxFE/idux/commit/9949124a82f45fcdcd91b9b1bbe2d37a6945111b))

## 1.7.1(2023-06-05)

### Bug Fixes

- **comp:config:** the weekStartsOn does not work in the enUS locale ([#1570](https://github.com/IDuxFE/idux/issues/1570)) ([0ce5cf4](https://github.com/IDuxFE/idux/commit/0ce5cf411fc0d27f45ec9a01374428a42e82e965))
- **comp:form:** the disabled color using css variable ([#1572](https://github.com/IDuxFE/idux/issues/1572)) ([850a1db](https://github.com/IDuxFE/idux/commit/850a1db5219c4836c813a7ec0f790c9eca80bfbd))
- **comp:select:** the placeholder in overlay can't setting ([#1571](https://github.com/IDuxFE/idux/issues/1571)) ([7388dc4](https://github.com/IDuxFE/idux/commit/7388dc4bf028d18d62744596e7ad2cec193b8e08))

# 1.7.0(2023-05-29)

### Bug Fixes

- **comp:\*:** trigger 隐藏后，正在过渡动画的浮层还会显示 ([#1552](https://github.com/IDuxFE/idux/issues/1552)) ([c0d2e9c](https://github.com/IDuxFE/idux/commit/c0d2e9c6d87ba072536b6709b45be545fb5c43bb))
- **comp:button:** 图标没有居中对齐 ([#1542](https://github.com/IDuxFE/idux/issues/1542)) ([cf269a5](https://github.com/IDuxFE/idux/commit/cf269a51c55b2b35d60005efcf8c17f0b45bd849))
- **comp:empty:** SVG 的 id 应该是唯一的 ([#1539](https://github.com/IDuxFE/idux/issues/1539)) ([40d25f5](https://github.com/IDuxFE/idux/commit/40d25f53e640d0f31507e19e034e9f552836b8a9))
- **comp:popconfirm:** 视觉更新，同步设计规范 ([#1565](https://github.com/IDuxFE/idux/issues/1565)) ([08e1821](https://github.com/IDuxFE/idux/commit/08e182129f041c3cc61fef4147b4db46db3835a8))
- **comp:table:** 固定列的背景颜色异常 ([#1543](https://github.com/IDuxFE/idux/issues/1543)) ([7448e38](https://github.com/IDuxFE/idux/commit/7448e38fd71de06ea4a2ac494091f1c9e681545f))
- **comp:tabs:** 动态的 tab 时，高亮下划线的位置不正确 ([#1563](https://github.com/IDuxFE/idux/issues/1563)) ([15be909](https://github.com/IDuxFE/idux/commit/15be90944959d517027b987fe85da1ef22372c73))
- **comp:tabs:** 当没有为展示的数据时候，更多面板应该隐藏 ([#1547](https://github.com/IDuxFE/idux/issues/1547)) ([13013b3](https://github.com/IDuxFE/idux/commit/13013b369daff7c7e7b82c125175c75c02f58fe2))
- **comp:tooltip:** 当 destroyOnHide 为 true 时， visible 不能正常工作 ([#1550](https://github.com/IDuxFE/idux/issues/1550)) ([05fdb30](https://github.com/IDuxFE/idux/commit/05fdb3054ac21e217f90bac35aa097cab508730b))
- **comp:tree-select:** 设置 getKey 后，异步加载数据异常 ([#1541](https://github.com/IDuxFE/idux/issues/1541)) ([6cd6155](https://github.com/IDuxFE/idux/commit/6cd615566d7a6e1692c4cb914daab0b6a82345c3))
- **comp:upload:** accept 区分大小写 ([#1544](https://github.com/IDuxFE/idux/issues/1544)) ([b7e9b89](https://github.com/IDuxFE/idux/commit/b7e9b891e48b9c12b90a6ad0d2d57d0b6d65ebf2))
- **pro:search:** 有操作符的搜索项，在快捷选择面板中选中之后不会触发更新 ([#1559](https://github.com/IDuxFE/idux/issues/1559)) ([2385ed8](https://github.com/IDuxFE/idux/commit/2385ed80289a4e1cc68f8e38618c1d8684db5f1e))
- **pro:search:** 点击搜索按钮会重置正在编辑的标签 ([#1557](https://github.com/IDuxFE/idux/issues/1557)) ([324d74f](https://github.com/IDuxFE/idux/commit/324d74fbc115a05a3c564489d2e445bd22379505))
- **pro:search:** input 类型的搜索项，trim在输入的时候不起作用 ([#1560](https://github.com/IDuxFE/idux/issues/1560)) ([9f2232a](https://github.com/IDuxFE/idux/commit/9f2232a33e2fe76cbeded7e9faa342c31e31c1bf))
- **pro:search:** 应当在创建后立即设置新标签为激活状态，并展开对应的面板 ([#1554](https://github.com/IDuxFE/idux/issues/1554)) ([31e433c](https://github.com/IDuxFE/idux/commit/31e433c5d27f2c7adff15ed7d1496b2ca7032dfc))
- **pro:search:** 去掉min-width，跟随输入内容变化而变化 ([#1551](https://github.com/IDuxFE/idux/issues/1551)) ([04e2500](https://github.com/IDuxFE/idux/commit/04e2500bdf1d4b8df5a0d9f8030729b06040e95b))
- **pro:search:** 在搜索项没有确认的情况下失焦，即激活状态改变为非激活，标签内容应当重置 ([#1553](https://github.com/IDuxFE/idux/issues/1553)) ([b8cada3](https://github.com/IDuxFE/idux/commit/b8cada3a1247e87134fef88191e985cc0fd06765))
- **pro:table:** 布局面板不应该展示空状态 ([#1562](https://github.com/IDuxFE/idux/issues/1562)) ([ea62fd1](https://github.com/IDuxFE/idux/commit/ea62fd18634b7c96ac446f97848a4ded2dd06c7d))

### Features

- **comp:modal:** 新增 `animatable` 全局配置 ([#1558](https://github.com/IDuxFE/idux/issues/1558)) ([0e82271](https://github.com/IDuxFE/idux/commit/0e822713a001e61b86523bdf0a6ddfd81af5b61a))
- **comp:style:** 滚动条添加 `scroll-min` 样式和 css variable ([#1564](https://github.com/IDuxFE/idux/issues/1564)) ([d425a6f](https://github.com/IDuxFE/idux/commit/d425a6f75d1ffb7686c320e83f0c2c06c6756e80))
- **comp:tabs:** 新增 addIcon 插槽 ([#1566](https://github.com/IDuxFE/idux/issues/1566)) ([dcd9c1a](https://github.com/IDuxFE/idux/commit/dcd9c1a9c24a7256113ed6a64518d7b0fc5d451f))
- **pro:search:** 新增自定义图标和展开的配置 ([#1556](https://github.com/IDuxFE/idux/issues/1556)) ([bec5772](https://github.com/IDuxFE/idux/commit/bec5772cc15d2a516430dff64c3b0e2d3c8637cf))


## 1.6.1(2023-05-08)

### Bug Fixes

- **comp:button:** 使用 inline-flex 布局解决图标对齐的问题 ([#1542](https://github.com/IDuxFE/idux/issues/1542)) ([cf269a5](https://github.com/IDuxFE/idux/commit/cf269a51c55b2b35d60005efcf8c17f0b45bd849))
- **comp:empty:** svg 的 id 应该始终唯一 ([#1539](https://github.com/IDuxFE/idux/issues/1539)) ([40d25f5](https://github.com/IDuxFE/idux/commit/40d25f53e640d0f31507e19e034e9f552836b8a9))
- **comp:table:** 被选中的固定列的背景颜色异常 ([#1543](https://github.com/IDuxFE/idux/issues/1543)) ([7448e38](https://github.com/IDuxFE/idux/commit/7448e38fd71de06ea4a2ac494091f1c9e681545f))
- **comp:tabs:** 更多面板在空数据时应该被隐藏 ([#1547](https://github.com/IDuxFE/idux/issues/1547)) ([13013b3](https://github.com/IDuxFE/idux/commit/13013b369daff7c7e7b82c125175c75c02f58fe2))
- **comp:tree-select:** 使用 getKey 时，异步加载数据异常 ([#1541](https://github.com/IDuxFE/idux/issues/1541)) ([6cd6155](https://github.com/IDuxFE/idux/commit/6cd615566d7a6e1692c4cb914daab0b6a82345c3))
- **comp:upload:** 接受文件类型没有正常工作 ([#1544](https://github.com/IDuxFE/idux/issues/1544)) ([b7e9b89](https://github.com/IDuxFE/idux/commit/b7e9b891e48b9c12b90a6ad0d2d57d0b6d65ebf2))

# 1.6.0(2023-04-17)

### Bug Fixes

- **cdk:drag-drop:** 全局共享的 context 初始化不正确 ([#1537](https://github.com/IDuxFE/idux/issues/1537)) ([1a8793d](https://github.com/IDuxFE/idux/commit/1a8793d811f309324df5c63fd721f81fd1a7c466)), closes [#1436](https://github.com/IDuxFE/idux/issues/1436)

### Features

- **comp:tabs:** 支持 dataSource, closable, addable 动态新增关闭 ([#1536](https://github.com/IDuxFE/idux/issues/1536)) ([0dad84b](https://github.com/IDuxFE/idux/commit/0dad84b7664587553daf9d51b69cfe5c839f1cf6))
- **pro:search:** 新增快速选择面板 ([#1529](https://github.com/IDuxFE/idux/issues/1529)) ([daa39da](https://github.com/IDuxFE/idux/commit/daa39dac438ad2fe8fd9d358f731a2e20b68b603))

## 1.5.4(2023-04-13)

### Bug Fixes

- **cdk:scroll:** onScrolledBottom 没有被正确触发 ([#1535](https://github.com/IDuxFE/idux/issues/1535)) ([cee4685](https://github.com/IDuxFE/idux/commit/cee46854af45863a8831eb22a901f9d2f535efb4))
- **comp:cascader:** onChange 没有被正确触发 ([#1528](https://github.com/IDuxFE/idux/issues/1528)) ([c045d47](https://github.com/IDuxFE/idux/commit/c045d471719e32b288377ea17003ca98b83def7a))
- **comp:select:** 下拉面板的 activeValue 不能被设置为 undefined ([#1533](https://github.com/IDuxFE/idux/issues/1533)) ([7949a28](https://github.com/IDuxFE/idux/commit/7949a28f96557b7ff1cc12c88dbbd82e549211cd))
- **comp:select:** 同时 searchable 和 multiple 工作异常 ([#1530](https://github.com/IDuxFE/idux/issues/1530)) ([8240c44](https://github.com/IDuxFE/idux/commit/8240c44440e310328835e6c3938031d4edc09406))
- **pro:tree:** header 为空时异常渲染 ([#1531](https://github.com/IDuxFE/idux/issues/1531)) ([64f6e33](https://github.com/IDuxFE/idux/commit/64f6e332ba310151baac5a1e670ae3832af41faa))

## 1.5.3(2023-04-04)

### Bug Fixes

- **cdk:popper:** 隐藏后不应该再计算位置 ([#1515](https://github.com/IDuxFE/idux/issues/1515)) ([9552ef3](https://github.com/IDuxFE/idux/commit/9552ef360c439e16414668d4a7bb07e0d7b5b504))
- **comp:\*:** 动画中的浮层不应该被 reference hidden 影响  ([#1516](https://github.com/IDuxFE/idux/issues/1516)) ([3d4ce98](https://github.com/IDuxFE/idux/commit/3d4ce98e103f93f72c9655dfcef0206be7208691))
- **comp:icon:** 'info' 和 'exclamation' 图标互换 ([#1525](https://github.com/IDuxFE/idux/issues/1525)) ([dc98fae](https://github.com/IDuxFE/idux/commit/dc98faee2f89f86a1f2f5ee42ee2b92404c892da))
- **comp:icon:** ellipsis 图标错误 ([#1522](https://github.com/IDuxFE/idux/issues/1522)) ([615f483](https://github.com/IDuxFE/idux/commit/615f48300d7f930a033385594ea42032a0f9b880))
- **pro:search:** 动画不生效 ([#1517](https://github.com/IDuxFE/idux/issues/1517)) ([a781bb9](https://github.com/IDuxFE/idux/commit/a781bb9930479b800022cc410eb8c5dca3a25a19))


## 1.5.2(2023-03-27)

### Bug Fixes

- **cdk:forms:** 动态禁用不生效 ([#1503](https://github.com/IDuxFE/idux/issues/1503)) ([88a6d3f](https://github.com/IDuxFE/idux/commit/88a6d3f568521eea4b39220c03f7a622695cec70))
- **cdk:scroll:** keepAlive 模式下滚动位置异常 ([#1505](https://github.com/IDuxFE/idux/issues/1505)) ([2d74862](https://github.com/IDuxFE/idux/commit/2d7486257cda29fe554572208bf516b70f33102e))
- **comp:button:** ButtonGroup 的 disabled 不生效 ([#1508](https://github.com/IDuxFE/idux/issues/1508)) ([6e44b98](https://github.com/IDuxFE/idux/commit/6e44b9848864df369499afe885068bdf033e4f27))
- **comp:date-picker:** disabledDate 在年，月等面板时工作异常 ([#1514](https://github.com/IDuxFE/idux/issues/1514)) ([06c546c](https://github.com/IDuxFE/idux/commit/06c546c5a9caf517068123fc098ec32226977451))
- **comp:date-picker:** 重置面板的样式 ([#1511](https://github.com/IDuxFE/idux/issues/1511)) ([3fe76f2](https://github.com/IDuxFE/idux/commit/3fe76f25317a0e5aeae24865d50c00a7827b8815))
- **comp:select:** compositionEnd 没有被正常触发 ([#1513](https://github.com/IDuxFE/idux/issues/1513)) ([33a2cf6](https://github.com/IDuxFE/idux/commit/33a2cf6a7e0c8760f5e1e354a1f6c5221cfa738c))
- **comp:timeline:** 样式更新 ([#1509](https://github.com/IDuxFE/idux/issues/1509)) ([b9db622](https://github.com/IDuxFE/idux/commit/b9db622646403063993c0ba0708701b18323c32f))
- **pro:table:** 最后一列表头的图标被遮挡 ([#1507](https://github.com/IDuxFE/idux/issues/1507)) ([d2654f2](https://github.com/IDuxFE/idux/commit/d2654f215e07f364730b29f5aa7ebeedd405cd41))
- **pro:textarea:** placeholder 的颜色异常 ([#1512](https://github.com/IDuxFE/idux/issues/1512)) ([521ac8d](https://github.com/IDuxFE/idux/commit/521ac8d60a6bbf20fe2b4aad556e1a9bddd96b22))

## 1.5.1(2023-03-14)

### Bug Fixes

- **comp:\*:** 表单组件的 control 类型声明不正确 ([#1495](https://github.com/IDuxFE/idux/issues/1495)) ([ace2a1e](https://github.com/IDuxFE/idux/commit/ace2a1ed57c2f6a3a3f5bd41a20e393d90866d60))
- **comp:cascader:** 面板的样式异常 ([#1500](https://github.com/IDuxFE/idux/issues/1500)) ([dfb5d0b](https://github.com/IDuxFE/idux/commit/dfb5d0bd93d7af6716e79a7e5c5563357881d5d8))
- **comp:spin:** 在抽屉中开启遮罩后依旧可以点击按钮 ([#1499](https://github.com/IDuxFE/idux/issues/1499)) ([3463cea](https://github.com/IDuxFE/idux/commit/3463cea35f83485c71ab66d0b8d1c23a79ff0935))
- **pro:search:** 输入状态初始化时机不正确 ([#1496](https://github.com/IDuxFE/idux/issues/1496)) ([70f947c](https://github.com/IDuxFE/idux/commit/70f947cc455f2a8a2ab82ae90540997218d04b32))
- **pro:search:** 下拉框面板启用虚拟滚动不生效 ([#1501](https://github.com/IDuxFE/idux/issues/1501)) ([5def0ab](https://github.com/IDuxFE/idux/commit/5def0abd30af0d2772ba2df3987c3b13274d3544))

# 1.5.0(2023-03-07)

### Bug Fixes

- **comp:cascader:** searchValue 不正常工作 ([#1487](https://github.com/IDuxFE/idux/issues/1487)) ([42b408b](https://github.com/IDuxFE/idux/commit/42b408b91d81b6fff08322902b9fa514850455bc))
- **comp:modal:** 样式更新和 css variable 支持 ([#1479](https://github.com/IDuxFE/idux/issues/1479)) ([f45776d](https://github.com/IDuxFE/idux/commit/f45776d3a9e35ebd1a522d4d0c8faf97fd96be4b))
- **comp:table:** 展开的叶子节点缩进不正确，选中的数据未缓存 ([#1484](https://github.com/IDuxFE/idux/issues/1484)) ([a3d5bb7](https://github.com/IDuxFE/idux/commit/a3d5bb74c337d557f0d1a8baeb48949fe5bd02fd)), closes [#1482](https://github.com/IDuxFE/idux/issues/1482)
- **comp:textarea:** removeChild 的健壮性判断 ([#1492](https://github.com/IDuxFE/idux/issues/1492)) ([e489e8e](https://github.com/IDuxFE/idux/commit/e489e8e40770ac3eaf805a872eb796077df19520))
- **pro:search:** 输入空字符传应该验证失败 ([#1494](https://github.com/IDuxFE/idux/issues/1494)) ([168620e](https://github.com/IDuxFE/idux/commit/168620e6696a71c0f9693bdc42734e1a7e1f99d3))
- **pro:search:** name 下拉框不渲染 ([#1493](https://github.com/IDuxFE/idux/issues/1493)) ([cb4b86a](https://github.com/IDuxFE/idux/commit/cb4b86a35aabb64616fe476f8d544b7e2a1174cc))

### Features

- **cdk:forms:** formArray 支持 clearControls ([#1490](https://github.com/IDuxFE/idux/issues/1490)) ([1cd4dcc](https://github.com/IDuxFE/idux/commit/1cd4dccf36df890fac95351f4714070e18333141))
- **comp:cascader:** 新增 `IxCascaderPanel` 组件 ([#1481](https://github.com/IDuxFE/idux/issues/1481)) ([e044390](https://github.com/IDuxFE/idux/commit/e044390c26c594978c8bcc0edfb72e65edd47db3))
- **comp:desc:** 新增 Descriptions 组件 ([#1470](https://github.com/IDuxFE/idux/issues/1470)) ([a7faf13](https://github.com/IDuxFE/idux/commit/a7faf1365ef93a765e85fadfda4b06cf41600caf))
- **comp:rate:** 新增 color 配置 ([#1420](https://github.com/IDuxFE/idux/issues/1420)) ([31c29e0](https://github.com/IDuxFE/idux/commit/31c29e03975b6d1ecd1966dfbc0abd606d36e499))
- **comp:select:** 新增 loading 配置 ([#1439](https://github.com/IDuxFE/idux/issues/1439)) ([3289784](https://github.com/IDuxFE/idux/commit/328978436467bc8b7f59650c56809c7804096a1c))
- **pro:search:** 下拉框面板支持 `onSearch` ([#1444](https://github.com/IDuxFE/idux/issues/1444)) ([79a7acc](https://github.com/IDuxFE/idux/commit/79a7acc40a43bcab853e5bfefcf1a0433452597f))
- **pro:search:** 新增 `'cascader'` 面板 ([#1485](https://github.com/IDuxFE/idux/issues/1485)) ([88b751b](https://github.com/IDuxFE/idux/commit/88b751b276440d0024296c5ccd3ef62c53af6d35))
- **pro:search:** 新增 `customNameLabel` 和 `customOperatorLabel` ([#1491](https://github.com/IDuxFE/idux/issues/1491)) ([1be87e8](https://github.com/IDuxFE/idux/commit/1be87e8cab9a926527efa433baeb4c1e99d27840))
- **pro:table:** 布局设置面板支持隐藏修改大小，重置等功能 ([#1488](https://github.com/IDuxFE/idux/issues/1488)) ([950f1b1](https://github.com/IDuxFE/idux/commit/950f1b1eb40b70e66e90989ac81da1fa3ffc8ed9))

## 1.4.3(2023-02-27)

### Bug Fixes

- **comp:alert:** 图标应该总是顶部对齐 ([#1467](https://github.com/IDuxFE/idux/issues/1467)) ([c71ee04](https://github.com/IDuxFE/idux/commit/c71ee046f74d602967a4699c7c53a0971302414d))
- **comp:icon:** 图标资源更新 ([#1468](https://github.com/IDuxFE/idux/issues/1468)) ([78918ae](https://github.com/IDuxFE/idux/commit/78918ae3a4866827eb1ed07235e19b5b49d074e2))
- **comp:rate:** control 不生效 ([#1471](https://github.com/IDuxFE/idux/issues/1471)) ([0b2dfa1](https://github.com/IDuxFE/idux/commit/0b2dfa11c6b0a27f509b8ce8d56402c6e15a90ab))
- **comp:slider:** 禁用状态下的标记颜色不正确 ([#1457](https://github.com/IDuxFE/idux/issues/1457)) ([d215935](https://github.com/IDuxFE/idux/commit/d2159356f6ff0a144ae42d16eb05aad6fea5399b))
- **comp:spin:** 遮罩层的透明度不正确 ([#1464](https://github.com/IDuxFE/idux/issues/1464)) ([f88ad9a](https://github.com/IDuxFE/idux/commit/f88ad9a86e86479a36d863ed48cb9ffb6eecc7f5))
- **comp:stepper:** 步骤条的连线 dashed 不起作用 ([#1458](https://github.com/IDuxFE/idux/issues/1458)) ([c688624](https://github.com/IDuxFE/idux/commit/c688624953502cf9dfce61cc08c6be1cf3ba92f4))
- **comp:table:** 在 chrome83 的虚拟滚动+固定列异常 ([#1473](https://github.com/IDuxFE/idux/issues/1473)) ([4523705](https://github.com/IDuxFE/idux/commit/452370565c4b099d53e2e186e64d0ecd285f564f))
- **comp:transfer:** 分页器的快速跳转不生效，后缀图标样式问题 ([#1459](https://github.com/IDuxFE/idux/issues/1459)) ([499ae90](https://github.com/IDuxFE/idux/commit/499ae902879597a53de0005f148aa9426a7c2287))
- **pro:search:** 浮层面板的 offset ([#1463](https://github.com/IDuxFE/idux/issues/1463)) ([2da284d](https://github.com/IDuxFE/idux/commit/2da284de936a4d427691a31569ec8902b7d80549))
- **pro:search:** multiple 时验证异常 ([#1475](https://github.com/IDuxFE/idux/issues/1475)) ([b961c4e](https://github.com/IDuxFE/idux/commit/b961c4e5769647323085d31a9b3f73ce12bb67a0))
- **pro:search:** 面板的键盘事件应该只在面板打开时触发 ([#1477](https://github.com/IDuxFE/idux/issues/1477)) ([76a1bac](https://github.com/IDuxFE/idux/commit/76a1bacdadcc909584b22366f62be50ae7f42ba8))
- **pro:tree:** padding 样式异常 ([#1466](https://github.com/IDuxFE/idux/issues/1466)) ([ec8c61d](https://github.com/IDuxFE/idux/commit/ec8c61dce3cc554c77d6016d5ce69ab5ab085e3b))

## 1.4.2(2023-02-20)

### Bug Fixes

- **comp:carousel:** 当动态减少 item 的数量为 1 时，展示异常 ([#1450](https://github.com/IDuxFE/idux/issues/1450)) ([2e37c44](https://github.com/IDuxFE/idux/commit/2e37c447a9672c35c25fe448250d0fbcc01646d0))
- **comp:carousel:** 缩放后的展示异常 ([#1448](https://github.com/IDuxFE/idux/issues/1448)) ([58ee991](https://github.com/IDuxFE/idux/commit/58ee991568e5b397fac95baa70bbc98866290c78))
- **comp:empty:** 解决 svg 的 id 冲突问题 ([#1451](https://github.com/IDuxFE/idux/issues/1451)) ([8ca7a08](https://github.com/IDuxFE/idux/commit/8ca7a08b86b8cc185f936da2afcb0b191f672894))
- **comp:upload:** 文本不居中 ([#1461](https://github.com/IDuxFE/idux/issues/1461)) ([afeb80e](https://github.com/IDuxFE/idux/commit/afeb80e942a4fb9f399a75d601897ef7e8e5293a))
- Select 和 ProTable 的样式问题 ([#1452](https://github.com/IDuxFE/idux/issues/1452)) ([c07ef31](https://github.com/IDuxFE/idux/commit/c07ef312795834867d658703842a02244456328a))
- **pro:search:** `treeSelect` 的高度异常 ([#1445](https://github.com/IDuxFE/idux/issues/1445)) ([388da6a](https://github.com/IDuxFE/idux/commit/388da6a6b1f2d5eeac354eeedabe4c81bf89f976))
- **pro:search:** 移除浮层面板的动画效果 ([#1447](https://github.com/IDuxFE/idux/issues/1447)) ([4c28a78](https://github.com/IDuxFE/idux/commit/4c28a78c83a1f820b8976956549c27390316135e))

## 1.4.1(2023-02-13)

### Bug Fixes

- **comp:\*:** 使用更智能的淡入淡出的动画 ([#1422](https://github.com/IDuxFE/idux/issues/1422)) ([33fb35f](https://github.com/IDuxFE/idux/commit/33fb35ff3e420c723bd6bf56d0b4149bf7f388b5))
- **comp:card:** 移除底部的 padding 以及按钮点击效果 ([#1418](https://github.com/IDuxFE/idux/issues/1418)) ([0612164](https://github.com/IDuxFE/idux/commit/0612164270e4837bf502df6951c42643475ebbfd))
- **comp:select:** blur 事件导致 item 渲染不正确 ([#1437](https://github.com/IDuxFE/idux/issues/1437)) ([b15fedd](https://github.com/IDuxFE/idux/commit/b15fedd291622e3faa25c2430e9ce690f4202521)), closes [#1431](https://github.com/IDuxFE/idux/issues/1431)
- **comp:select:** 在回车事件后触发 blur ([#1441](https://github.com/IDuxFE/idux/issues/1441)) ([391c526](https://github.com/IDuxFE/idux/commit/391c526d4fa9c12af33eaf3c89e1699f52bd16f5))
- **comp:table:** onScroll 未生效 ([#1428](https://github.com/IDuxFE/idux/issues/1428)) ([79136b5](https://github.com/IDuxFE/idux/commit/79136b5813c3ed14c13ab82062e79cca751ebebe))
- **comp:table:** 分页器的大小不能够自定义覆盖 ([#1440](https://github.com/IDuxFE/idux/issues/1440)) ([b647883](https://github.com/IDuxFE/idux/commit/b64788390a513f5d77e3bd6a4896abeb72e3017d))
- **comp:transfer:** 全选的状态错误 ([#1442](https://github.com/IDuxFE/idux/issues/1442)) ([ff3bcf9](https://github.com/IDuxFE/idux/commit/ff3bcf9def843043769d27c06200e6df0138f03d))
- **pro:search:** 面板为空时，渲染异常 ([#1424](https://github.com/IDuxFE/idux/issues/1424)) ([7829ca1](https://github.com/IDuxFE/idux/commit/7829ca1389d7b42cb04dc4da872ff2dcdba62cc4))
- **pro:transfer:** `children` 策略下数量计算错误 ([#1443](https://github.com/IDuxFE/idux/issues/1443)) ([e0f9597](https://github.com/IDuxFE/idux/commit/e0f9597364e823bc9b4927ea9472bd3891e1a207))
- **pro:tree:** 全展开的状态异常 ([#1429](https://github.com/IDuxFE/idux/issues/1429)) ([2d2d7ca](https://github.com/IDuxFE/idux/commit/2d2d7ca1a6c8b4a64f5c8e42f6e1f83ff4d01a7e))

# 1.4.0(2023-01-16)

### Bug Fixes

- **comp:badge:** 支持非数字的字符 ([#1399](https://github.com/IDuxFE/idux/issues/1399)) ([5400b29](https://github.com/IDuxFE/idux/commit/5400b29de42776e6078752f4495f3fc3d8401dba))
- **comp:tree:** `onCheck` 的回调参数不正确 ([#1404](https://github.com/IDuxFE/idux/issues/1404)) ([2858da6](https://github.com/IDuxFE/idux/commit/2858da62cf218a4397d4266fe853866a638b6a3d))
- **comp:tree:** 被选中的节点样式不正确 ([#1416](https://github.com/IDuxFE/idux/issues/1416)) ([b112049](https://github.com/IDuxFE/idux/commit/b1120491a71f5f68f6c6332c9f0f58156106354a))
- **comp:tree:** showLine 时没有对齐 ([#1393](https://github.com/IDuxFE/idux/issues/1393)) ([0dd030d](https://github.com/IDuxFE/idux/commit/0dd030de66cf84a7d3a3e0f043ced4bdde2b17d1))
- **pro:table:** resize 后宽度计算问题 ([#1417](https://github.com/IDuxFE/idux/issues/1417)) ([d7ef42c](https://github.com/IDuxFE/idux/commit/d7ef42cca7b2ca6611cd352b1f68592f1fa0b421))
- **pro:transfer:** 优化 tree 展开节点的逻辑 ([#1414](https://github.com/IDuxFE/idux/issues/1414)) ([fec5fee](https://github.com/IDuxFE/idux/commit/fec5fee6146cd9412abdcb4bd4a8a6b42c78bf58))
- **pro:transfer:** 覆盖树节点被选中的样式 ([#1407](https://github.com/IDuxFE/idux/issues/1407)) ([477ac44](https://github.com/IDuxFE/idux/commit/477ac44f11036d33bfc487c51b44d54e765139ed))
- **pro:tree:** 空状态的图标没有居中 ([#1394](https://github.com/IDuxFE/idux/issues/1394)) ([2c58ca2](https://github.com/IDuxFE/idux/commit/2c58ca23132609febd9b985b9eb912fd52105c52))

### Features

- **cdk:forms:** `ValidatorOptions` 的 `disabled` 支持函数形式 ([#1395](https://github.com/IDuxFE/idux/issues/1395)) ([d633174](https://github.com/IDuxFE/idux/commit/d633174afbf32d05a6d42c793ded4cb3eeeb952c))
- **cdk:forms:** `setMessages` 新增第二个参数用于支持 `i18n` ([#1398](https://github.com/IDuxFE/idux/issues/1398)) ([0a8b116](https://github.com/IDuxFE/idux/commit/0a8b116c432617701108d0dfe2322efccf7d0ac7))
- **cdk:utils, pro:search:** 新增 tree 相关工具函数, 高级搜索支持 `'treeSelect'` ([#1391](https://github.com/IDuxFE/idux/issues/1391)) ([4bf719d](https://github.com/IDuxFE/idux/commit/4bf719ddcea66b12500d2df891c09ba0af8621f1))
- **cdk:utils:** 新增 tree 相关工具函数，修复过滤和分页的问题 ([#1406](https://github.com/IDuxFE/idux/issues/1406)) ([56035c1](https://github.com/IDuxFE/idux/commit/56035c131cacbdf32c3eee3387f266768a85124b))
- **comp:badge:** 新增 processing 配置 ([#1400](https://github.com/IDuxFE/idux/issues/1400)) ([ba15f33](https://github.com/IDuxFE/idux/commit/ba15f33eaa0393ef466cdef0c0327703f728ad21))
- **comp:badge:** 新增 status 配置, 支持 css variable ([#1390](https://github.com/IDuxFE/idux/issues/1390)) ([da3905e](https://github.com/IDuxFE/idux/commit/da3905e626e5f8f14d11f9330aa2ac7eb73b874b))
- **comp:cascader:** 新增 disableData 用于支持动态禁用选项 ([#1408](https://github.com/IDuxFE/idux/issues/1408)) ([65328e7](https://github.com/IDuxFE/idux/commit/65328e7ee5b6e0794a856741f7b66b8817f6c7b3))
- **comp:stepper:** 新增 dot 配置 ([#1401](https://github.com/IDuxFE/idux/issues/1401)) ([aa90a7e](https://github.com/IDuxFE/idux/commit/aa90a7e55c809e8b8e1fdc98836bcc7029fcaff7)), closes [#1082](https://github.com/IDuxFE/idux/issues/1082)

## 1.3.3(2023-01-09)

### Bug Fixes

- **comp:cascader:** 选中和展开状态展示不正确 ([#1386](https://github.com/IDuxFE/idux/issues/1386)) ([847f139](https://github.com/IDuxFE/idux/commit/847f1394ea970eb3b91ee095ea30aa75c2760610))
- **comp:header:** 移除背景颜色 ([#1392](https://github.com/IDuxFE/idux/issues/1392)) ([55bb758](https://github.com/IDuxFE/idux/commit/55bb75847ea1ca7d6e3372d3b2c71315c086c66c))
- **comp:input-number:** 增加和减少的按钮默认不显示 ([#1385](https://github.com/IDuxFE/idux/issues/1385)) ([b77fac6](https://github.com/IDuxFE/idux/commit/b77fac60833d6ca544812d74417d5a604075de36))
- **comp:select:** 输入了一个值后，就无法选择其他的值 ([#1387](https://github.com/IDuxFE/idux/issues/1387)) ([59fc80e](https://github.com/IDuxFE/idux/commit/59fc80e5a8439fc34d61ea104f1f53dcce9a701e))
- **pro:search:** 浮层的 zIndex 计算错误 ([#1389](https://github.com/IDuxFE/idux/issues/1389)) ([81ff47e](https://github.com/IDuxFE/idux/commit/81ff47e9ac9a2afceb4ac8726f6f2618a6933377))
- **pro:transfer:** 树穿梭框的 'off' 级联策略下展示错误 ([#1388](https://github.com/IDuxFE/idux/issues/1388)) ([796bfaf](https://github.com/IDuxFE/idux/commit/796bfaf6ce627d564a8db9e7675b9879342e4e5f))

## 1.3.2(2023-01-03)

### Bug Fixes

- **comp:alert:** 样式更新 ([#1377](https://github.com/IDuxFE/idux/issues/1377)) ([30d1ab3](https://github.com/IDuxFE/idux/commit/30d1ab381b4eb833e12137d6d85d9a230ca411f1))
- **comp:anchor:** 样式更新，支持 css variable ([#1379](https://github.com/IDuxFE/idux/issues/1379)) ([3a106d9](https://github.com/IDuxFE/idux/commit/3a106d952b6ec3217d7f95655f2406457383b873))
- **comp:anchor:** 样式更新，支持 css variable ([#1380](https://github.com/IDuxFE/idux/issues/1380)) ([f83ccc8](https://github.com/IDuxFE/idux/commit/f83ccc80a8aeb5ddc1efb0d27582dfcfd22df919))
- **comp:back-top:**  样式更新，支持 css variable ([#1381](https://github.com/IDuxFE/idux/issues/1381)) ([cb97fd0](https://github.com/IDuxFE/idux/commit/cb97fd0905c544e5d43eb62d0ea9bb49eaa4db16))
- **comp:overlay:** 快速切换显隐导致定位异常 ([#1384](https://github.com/IDuxFE/idux/issues/1384)) ([5d13977](https://github.com/IDuxFE/idux/commit/5d139778a494b36feeece08b0c5c27f68bd66a37))
- **comp:progress:** 带小数点时展示异常 ([#1382](https://github.com/IDuxFE/idux/issues/1382)) ([e474fa5](https://github.com/IDuxFE/idux/commit/e474fa534ea9dc147a544b6f641b55803cc950b6))
- **comp:table:** 单选并支持点击选中时，无法反选 ([#1383](https://github.com/IDuxFE/idux/issues/1383)) ([1300c13](https://github.com/IDuxFE/idux/commit/1300c134d11132455f5e259b98fc5bf9f7d17aa4))
- **comp:table:** 当 columns 为动态加载时，排序和过滤功能异常 ([#1376](https://github.com/IDuxFE/idux/issues/1376)) ([9163d69](https://github.com/IDuxFE/idux/commit/9163d69bac526f1aa7dae86e769f830e3e01acd9))
- **pro:table:** 部分 props 没有被正确的穿透 ([#1378](https://github.com/IDuxFE/idux/issues/1378)) ([edb23d4](https://github.com/IDuxFE/idux/commit/edb23d42b9d2479fa10b17f201e0a87c45c4cd7e))

## 1.3.1(2022-12-23)

### Bug Fixes

- **build:** 使用 webpack 的项目在 js 文件中引入样式文件失败 ([#1369](https://github.com/IDuxFE/idux/issues/1369)) ([c2288d5](https://github.com/IDuxFE/idux/commit/c2288d5f6840ca3c2b463e78add9a0efbf5f178d))
- **comp:modal:** 在动画结束前销毁组件会得到一个错误 ([#1371](https://github.com/IDuxFE/idux/issues/1371)) ([de416c1](https://github.com/IDuxFE/idux/commit/de416c10416ef4577f1fc09c108b61000e078e3e))
- **comp:table:** 序号计算错误 ([#1370](https://github.com/IDuxFE/idux/issues/1370)) ([f19efbe](https://github.com/IDuxFE/idux/commit/f19efbe0e6a893e1211e1df97893094f68fb2c25))
- **comp:textarea:** lin-height 计算错误 ([#1372](https://github.com/IDuxFE/idux/issues/1372)) ([627e018](https://github.com/IDuxFE/idux/commit/627e01800c24cc96891920e89c9a8af077691449))
- **comp:time-picker:** range-picker 的值为数组时不应该显示清除图标 ([#1365](https://github.com/IDuxFE/idux/issues/1365)) ([e6800a7](https://github.com/IDuxFE/idux/commit/e6800a74abb6c64c7c76de1564711c9c6be0b12b))
- **comp:tree:** 禁用不应该影响半选状态 ([#1373](https://github.com/IDuxFE/idux/issues/1373)) ([0607e5c](https://github.com/IDuxFE/idux/commit/0607e5cf958f561f9dbd3a1d5199f143e4127d71))
- **pro:search:** 搜索项在非 focus 状态时遮挡了页面内容 ([#1374](https://github.com/IDuxFE/idux/issues/1374)) ([bda0db2](https://github.com/IDuxFE/idux/commit/bda0db24475d123cb0a2cd7531f6c9235087802b))
- **pro:search:** 点击搜索项没有触发 focus ([#1368](https://github.com/IDuxFE/idux/issues/1368)) ([14637be](https://github.com/IDuxFE/idux/commit/14637be0880c72674d31363d97e367e326143c6a))

# 1.3.0(2022-12-16)

### Bug Fixes

- **cdk:breakpoint:** query 异常销毁 ([#1357](https://github.com/IDuxFE/idux/issues/1357)) ([2b45f6b](https://github.com/IDuxFE/idux/commit/2b45f6b6c6fdf3cc3febd41861c766c6fc705816))
- **cdk:popper:** 升级 @floating-ui 解决缩放后的定位问题 ([#1362](https://github.com/IDuxFE/idux/issues/1362)) ([8aeb214](https://github.com/IDuxFE/idux/commit/8aeb2149ff2d81c5d5ab1a9fec763d1efa156fd6))
- **comp:\*:** 打开1次浮层组件触发了两次 zIndex 的变更 ([#1355](https://github.com/IDuxFE/idux/issues/1355)) ([7cec4ec](https://github.com/IDuxFE/idux/commit/7cec4ec5d9c882d9fae54cba221efda34ba3bc93))
- **comp:\*:** 禁用的字体颜色降低等级 ([#1358](https://github.com/IDuxFE/idux/issues/1358)) ([49c8743](https://github.com/IDuxFE/idux/commit/49c874344710d8edbe43c48c010d2b97f4b0bb3b))
- **comp:button:** display 设置为 inline-block，移除 focus 样式 ([#1354](https://github.com/IDuxFE/idux/issues/1354)) ([107c03e](https://github.com/IDuxFE/idux/commit/107c03e20c2db96f0bd7fecd6da8a9eee084dcf5))
- **comp:cascader:** 切换数据后，滚动条应该置顶 ([#1353](https://github.com/IDuxFE/idux/issues/1353)) ([031834e](https://github.com/IDuxFE/idux/commit/031834e6d9b948b4a065a8a56bdf4afc1c2145a3)), closes [#1316](https://github.com/IDuxFE/idux/issues/1316)
- **comp:input:** 优化禁用时的动画 ([#1352](https://github.com/IDuxFE/idux/issues/1352)) ([9950e6f](https://github.com/IDuxFE/idux/commit/9950e6f966aa8964ba6283a75b1505da22bc87cd))
- **pro:search:** zIndex 在 focus 后触发变更 ([#1356](https://github.com/IDuxFE/idux/issues/1356)) ([61a51fd](https://github.com/IDuxFE/idux/commit/61a51fd62c9ab74601261ac82be692ee782ceb4f))
- **scripts:** 移除 min.css ([#1359](https://github.com/IDuxFE/idux/issues/1359)) ([20f04f4](https://github.com/IDuxFE/idux/commit/20f04f45dbb0927ce0314ff731bb7ac4c0e9b9db))

### Features

- **comp:button,checkbox,radio:** 添加 wave 动画效果 ([#1303](https://github.com/IDuxFE/idux/issues/1303)) ([4881414](https://github.com/IDuxFE/idux/commit/4881414bf48fee70cc13f0038e8487b5390a92d3))
- **comp:table:** 勾选列支持显示序号 ([#1360](https://github.com/IDuxFE/idux/issues/1360)) ([19e6f68](https://github.com/IDuxFE/idux/commit/19e6f685cda0c1900fa624a09349e95593c32d3b))
- **comp:tabs:** 支持 size 的配置, 默认为 md ([#1361](https://github.com/IDuxFE/idux/issues/1361)) ([41eb8d9](https://github.com/IDuxFE/idux/commit/41eb8d92af463c0e36a2bba0c631cd9acf5e45fe))
- **pro:search:** 搜索图标点击会触发搜索值修改 ([#1321](https://github.com/IDuxFE/idux/issues/1321)) ([e44673f](https://github.com/IDuxFE/idux/commit/e44673f5320a76d9daca61f887a44e377d206815))
- **pro:search:** 支持占位符 ([#1322](https://github.com/IDuxFE/idux/issues/1322)) ([84d0e66](https://github.com/IDuxFE/idux/commit/84d0e662024bd9f763a9f5debd65e90d52238c4b))
- **pro:table:** 支持在布局菜单中不显示列 ([#1364](https://github.com/IDuxFE/idux/issues/1364)) ([2e7533c](https://github.com/IDuxFE/idux/commit/2e7533cfebbbb12bd682b4805fb600d3a438607e))

## 1.2.4(2022-12-10)

### Bug Fixes

- **comp:\*:** 部分组件的字体大小在 seer 主题下不正确 ([#1343](https://github.com/IDuxFE/idux/issues/1343)) ([5c74fcf](https://github.com/IDuxFE/idux/commit/5c74fcf6964bd7d76e5d35f5bf84ca52b0f21fae))
- **comp:carousel:** 当只有2个子面板的时候，切换白屏 ([#1346](https://github.com/IDuxFE/idux/issues/1346)) ([6a5f46b](https://github.com/IDuxFE/idux/commit/6a5f46b3af56efe3c74434845708843483e13557))
- **comp:checkbox:** 禁用样式异常 ([#1344](https://github.com/IDuxFE/idux/issues/1344)) ([55b0be8](https://github.com/IDuxFE/idux/commit/55b0be849a43cf06c6dd98f4086ae0db37728ecf))
- **comp:date-picker,comp:time-picker:** 打开 picker 时不应该滚动窗口 ([#1342](https://github.com/IDuxFE/idux/issues/1342)) ([cce0c0e](https://github.com/IDuxFE/idux/commit/cce0c0e81b67722f797f73db52632974ad7822b9))
- **comp:empty:** 补充图标的样式 ([#1349](https://github.com/IDuxFE/idux/issues/1349)) ([69ec9f9](https://github.com/IDuxFE/idux/commit/69ec9f944ea3569b6a85c0bcb9eb278f2fad084e))
- **comp:progress:** trailColor 不工作 ([#1347](https://github.com/IDuxFE/idux/issues/1347)) ([f448714](https://github.com/IDuxFE/idux/commit/f448714ab19d8c2e5ddb170ed4dec5f9a8526054))
- **comp:upload:** customRequest 允许可选和 async ([#1340](https://github.com/IDuxFE/idux/issues/1340)) ([52250a5](https://github.com/IDuxFE/idux/commit/52250a55225b8d36df904e3211d463fb67d23308))
- **pro:layout:** 没有设置 logo 时,依旧渲染了 dom ([#1348](https://github.com/IDuxFE/idux/issues/1348)) ([375c691](https://github.com/IDuxFE/idux/commit/375c69132dcd06a46cdbf449aac8760d2e25eab5))

## 1.2.3(2022-12-07)

### Bug Fixes

- **cdk:popper:** 有箭头的时候 shift middleware 失效  ([#1337](https://github.com/IDuxFE/idux/issues/1337)) ([3f7afbd](https://github.com/IDuxFE/idux/commit/3f7afbdb8a8562887dddaf1c73272033ae5901a2))
- **comp:\*:** overlayContainer 新增回调参数 ([#1336](https://github.com/IDuxFE/idux/issues/1336)) ([70e0d34](https://github.com/IDuxFE/idux/commit/70e0d34fd38c9dc1179b9bdb9d93f2e480a48b0a))
- **comp:\*:** 通过 getter 去管理 overlayZIndex ([#1341](https://github.com/IDuxFE/idux/issues/1341)) ([ad3445d](https://github.com/IDuxFE/idux/commit/ad3445d6968678f4223cc073e2e9be3dc9e536ba))
- **comp:header:** 移除默认的 padding ([#1330](https://github.com/IDuxFE/idux/issues/1330)) ([236f691](https://github.com/IDuxFE/idux/commit/236f6916a5e40815b3c55f09b45d759e5409f465))
- **comp:table:** selectable 的 align 没有正常工作 ([#1339](https://github.com/IDuxFE/idux/issues/1339)) ([be9e814](https://github.com/IDuxFE/idux/commit/be9e814e4c6d66900bd61a5fef967b147bdd7440))
- **pro:layout:** 样式更新，移除无用的代码 ([#1335](https://github.com/IDuxFE/idux/issues/1335)) ([a4ba26a](https://github.com/IDuxFE/idux/commit/a4ba26a5cacf5f4c73f36e66406e6a9a07f37ad8))
- **pro:search:** 聚焦状态时，溢出的标签没有展示 ([#1331](https://github.com/IDuxFE/idux/issues/1331)) ([05478ab](https://github.com/IDuxFE/idux/commit/05478abaee913334409dd0933a2e35487c7ff060))
- **pro:table:** resizable 不工作 ([#1334](https://github.com/IDuxFE/idux/issues/1334)) ([b3a568d](https://github.com/IDuxFE/idux/commit/b3a568d6b82557846756b456f57d64d14c1a41ff))
- **pro:tree:** 没有配置 header 时 expandIcon 样式异常 ([#1332](https://github.com/IDuxFE/idux/issues/1332)) ([bf03db5](https://github.com/IDuxFE/idux/commit/bf03db58c1abc38653f17e76de2809bd456095ae))

## 1.2.2(2022-12-02)

### Bug Fixes

- **cdk:popper:** 使用 shift middleware 让浮层始终保持在视图之中 ([#1329](https://github.com/IDuxFE/idux/issues/1329)) ([8152be1](https://github.com/IDuxFE/idux/commit/8152be184b1796c00a8ab5cbe41e2aacc77d5a91))
- **comp:\*:** 受控模式的浮层组件无法正常初始化 ([#1320](https://github.com/IDuxFE/idux/issues/1320)) ([a93231d](https://github.com/IDuxFE/idux/commit/a93231de5f937135f548535089d7da77d94f0a55))
- **comp:tooltip,popover,popconfirm:** 样式更新，支持 css variable ([#1323](https://github.com/IDuxFE/idux/issues/1323)) ([3c305a7](https://github.com/IDuxFE/idux/commit/3c305a73e9717a09e32d0408554fd83713bd5010))
- **dropdown,header,tree-select:** 样式更新 ([#1319](https://github.com/IDuxFE/idux/issues/1319)) ([145865c](https://github.com/IDuxFE/idux/commit/145865c64034515af1e86f63fd9c939fd30f0126))
- **pro:table:** 列的 visible 改变时没有触发 onColumnsChange ([#1327](https://github.com/IDuxFE/idux/issues/1327)) ([d0fb7fd](https://github.com/IDuxFE/idux/commit/d0fb7fd6f4729ab64a9e1286a22990d125f6a181))
- **pro:table:** 拖拽结束时会触发排序 ([#1324](https://github.com/IDuxFE/idux/issues/1324)) ([57c5a7f](https://github.com/IDuxFE/idux/commit/57c5a7fa14aae9bbc50c4fecb2d115f38888ef8c))

## 1.2.1(2022-12-01)

### Bug Fixes

- **comp:cascader:** set expandedKeys with default value ([#1315](https://github.com/IDuxFE/idux/issues/1315)) ([1d8aa5f](https://github.com/IDuxFE/idux/commit/1d8aa5f8f23c7f068080e41c6ee3f2c876b2f5fe)), closes [#1192](https://github.com/IDuxFE/idux/issues/1192)
- **comp:dropdown:** update style with dark menu ([#1313](https://github.com/IDuxFE/idux/issues/1313)) ([6878994](https://github.com/IDuxFE/idux/commit/6878994fafe456f61fafcae3e38039e1ae64920a))
- **comp:table:** the head is hidden when with autoHeight and not scroll ([#1317](https://github.com/IDuxFE/idux/issues/1317)) ([bf088c3](https://github.com/IDuxFE/idux/commit/bf088c35bf43493894ec42c92e2493a26f9a3079))

# 1.2.0(2022-11-28)

### Bug Fixes

- **comp:\*:** overlay destroyOnHide 之后，popper 不再计算位置 ([#1288](https://github.com/IDuxFE/idux/issues/1288)) ([0d5fe4e](https://github.com/IDuxFE/idux/commit/0d5fe4eda56c33aafab5fdcb56d21c26931f8128))
- **comp:\*:** 众多组件同步最新设计规范 ([#1238](https://github.com/IDuxFE/idux/issues/1238)) ([68435df](https://github.com/IDuxFE/idux/commit/68435dffce06aeaeed870e8da745fcbfd44b685e))
- **comp:alert:** 样式同步设计规范, 支持 css variable ([#1283](https://github.com/IDuxFE/idux/issues/1283)) ([3ce5024](https://github.com/IDuxFE/idux/commit/3ce50243e3c31aca0d461f5fedd16f355eb59836))
- **comp:button:** 嵌套的 ButtonGroup 样式异常 ([#1299](https://github.com/IDuxFE/idux/issues/1299)) ([af018fb](https://github.com/IDuxFE/idux/commit/af018fbeb9d427022f712785d235a197323c8556))
- **comp:button:** 在 text 和 link 模式时, min-width 为 auto ([#1278](https://github.com/IDuxFE/idux/issues/1278)) ([36411e2](https://github.com/IDuxFE/idux/commit/36411e21417769a8238059d620e027f58d0435c5))
- **comp:button:** 在 text 和 link 模式时, height 为 auto ([#1282](https://github.com/IDuxFE/idux/issues/1282)) ([d4653bb](https://github.com/IDuxFE/idux/commit/d4653bb1ed543a8f758d895fffae33c5a122d0e4))
- **comp:button:** loading 状态时的 line-height 不一致导致的样式异常 ([#1308](https://github.com/IDuxFE/idux/issues/1308)) ([23aeeed](https://github.com/IDuxFE/idux/commit/23aeeed933aebc0299a4e994988aa72006d7a75e))
- **comp:button:** ButtonGroup 的 radius 消失问题 ([#1290](https://github.com/IDuxFE/idux/issues/1290)) ([714f588](https://github.com/IDuxFE/idux/commit/714f5887dde46627371c9fa912768291988baead))
- **comp:checkbox:** 样式同步设计规范, 支持 css variable ([#1291](https://github.com/IDuxFE/idux/issues/1291)) ([b378ef2](https://github.com/IDuxFE/idux/commit/b378ef220bc6aedf25a5fa8e35f754127a489bf5))
- **comp:dropdown:** 样式同步设计规范, 支持 css variable ([#1301](https://github.com/IDuxFE/idux/issues/1301)) ([0a59283](https://github.com/IDuxFE/idux/commit/0a5928331999ce70b294f8ffd51cd87b6ef7271b))
- **comp:input,input-number:** 样式同步设计规范, 支持 css variable ([#1289](https://github.com/IDuxFE/idux/issues/1289)) ([5a9eb9d](https://github.com/IDuxFE/idux/commit/5a9eb9d0f8a1f06e6ca25823244cb1ba524c8af3))
- **comp:layout:** 样式同步设计规范, 支持 css variable ([#1302](https://github.com/IDuxFE/idux/issues/1302)) ([3d8a5c3](https://github.com/IDuxFE/idux/commit/3d8a5c3bd3affb0f4967ac73374f0622abe6aec5))
- **comp:radio:** 样式同步设计规范, 支持 css variable ([#1293](https://github.com/IDuxFE/idux/issues/1293)) ([e438cb3](https://github.com/IDuxFE/idux/commit/e438cb3b73fe7c2009b4722463e6a2d29cc7b3e2))
- **comp:textarea,pro:textarea:** 火狐浏览器的 scrollHeight 兼容性问题 ([c61d7b2](https://github.com/IDuxFE/idux/commit/c61d7b22b1755e35e6974a738a5d6fcf68680182))
- **comp:tree:** 搜索没有匹配到且存在已展开节点时，全部节点被渲染 ([#1305](https://github.com/IDuxFE/idux/issues/1305)) ([fd3fae2](https://github.com/IDuxFE/idux/commit/fd3fae2c5b9e2662e7a17f5bab43ff6b15336796))
- **comp:tree:** leafLineIcon 样式没有对齐 ([#1287](https://github.com/IDuxFE/idux/issues/1287)) ([6f77ada](https://github.com/IDuxFE/idux/commit/6f77adaedf084bcd675f45ac2931714366091462))

### Features

- **comp:\*:** 导出 modal, drawer 等组件的 provider token ([#1310](https://github.com/IDuxFE/idux/issues/1310)) ([bc482bd](https://github.com/IDuxFE/idux/commit/bc482bd207e37759c995b59ce28b2f41f7b54487))
- **comp:alert:** 默认类型为 warning, 新增 offline 类型, 支持 banner 配置 ([#1298](https://github.com/IDuxFE/idux/issues/1298)) ([9ca13db](https://github.com/IDuxFE/idux/commit/9ca13dbb9e9dc4eb6c75d02fe9f346bbc4c21a37))
- **comp:button:** ButtonGroup 使用 Space 实现 ([#1279](https://github.com/IDuxFE/idux/issues/1279)) ([46e65b1](https://github.com/IDuxFE/idux/commit/46e65b1798511d9709cc787a758cbd58d70560d6))
- **comp:config:** 新增 Seer 全局配置 ([#1295](https://github.com/IDuxFE/idux/issues/1295)) ([db38d14](https://github.com/IDuxFE/idux/commit/db38d146d3d72f7f44e295aa0cd8ba789ce034a8))
- **comp:empty:** 新增 simple 模式, 支持 css variable ([#1268](https://github.com/IDuxFE/idux/issues/1268)) ([4d5e770](https://github.com/IDuxFE/idux/commit/4d5e7702546e48afa1b1c46e6d73cba2b1ba71cc))
- **comp:form:** 阻止默认的 submit 事件 ([#1296](https://github.com/IDuxFE/idux/issues/1296)) ([edca00d](https://github.com/IDuxFE/idux/commit/edca00d2b74ac86f39a990f043e638747550d288))
- **comp:menu:** 新增 overlayDelay 配置, MenuItem 支持自定义后缀图标 ([#1300](https://github.com/IDuxFE/idux/issues/1300)) ([f1dde91](https://github.com/IDuxFE/idux/commit/f1dde91da7b5469cb7f540b3eb7a9ba30bded8a1)), closes [#1292](https://github.com/IDuxFE/idux/issues/1292)
- **comp:table:** ellipsis 配置和 expandable 的图标配置能力增强 ([#1280](https://github.com/IDuxFE/idux/issues/1280)) ([9587f15](https://github.com/IDuxFE/idux/commit/9587f151703cd7ec4803b7561d89e8f71fb12224))
- **pro:layout:** 新增 logo 配置, 修改默认的 fixed 和 theme 配置, 支持 css variable ([#1307](https://github.com/IDuxFE/idux/issues/1307)) ([1d47a0c](https://github.com/IDuxFE/idux/commit/1d47a0c4557b66a1f01b006b95780ee69eb9ff13))

## 1.1.2(2022-11-15)

### Bug Fixes

- **comp:button, card, pagination, pro:tree:** 样式问题修复 ([#1275](https://github.com/IDuxFE/idux/issues/1275)) ([6082a15](https://github.com/IDuxFE/idux/commit/6082a15ac78c0087962bd21921385734ad1b5d72))
- **comp:modal:** 调用 userModal 的 update 更新 content，无法触发更新 ([#1270](https://github.com/IDuxFE/idux/issues/1270)) ([38f130a](https://github.com/IDuxFE/idux/commit/38f130a932938539cb25d2a71eafffb0e9a8005f))
- **comp:transfer:** 空的 suffix 不应该被渲染 ([#1267](https://github.com/IDuxFE/idux/issues/1267)) ([4ab1ebb](https://github.com/IDuxFE/idux/commit/4ab1ebb4c02b6b55edfd2cfdece578c95668c3fd))
- **pro:table:** resize 列宽使其他的列变得过窄 ([#1276](https://github.com/IDuxFE/idux/issues/1276)) ([cd4e08c](https://github.com/IDuxFE/idux/commit/cd4e08c74936f89ddf802724cb7cfa98c7ee5e7f))

## 1.1.1(2022-11-13)

### Bug Fixes

- **comp:select:** 浮层打开时，点击 trigger 无法触发 focus ([#1271](https://github.com/IDuxFE/idux/issues/1271)) ([bd34155](https://github.com/IDuxFE/idux/commit/bd34155089c1755a8dffd31e68a9f7ff0e89ace9))
- **comp:spin:** useSpin 移除外层容器节点且支持子元素 resize ([#1273](https://github.com/IDuxFE/idux/issues/1273)) ([bb2b4fd](https://github.com/IDuxFE/idux/commit/bb2b4fd8ea31877be0e7f6b08a8d8167275e0d0f))
- **comp:table:** 当 scroll.with 存在时，始终显示滚动条 ([#1274](https://github.com/IDuxFE/idux/issues/1274)) ([2d8c9c4](https://github.com/IDuxFE/idux/commit/2d8c9c41e409c9ef9856a8df24d60e56907db1b4))
- **comp:tree:** 未开启 virtual 时，height 设置不生效 ([#1244](https://github.com/IDuxFE/idux/issues/1244)) ([fa4d0f3](https://github.com/IDuxFE/idux/commit/fa4d0f3375ce62a8664c6a85ad356933a29b54b4))
- **pro:search:** 不再自动弹出搜索条件名称选择的面板 ([#1260](https://github.com/IDuxFE/idux/issues/1260)) ([da4de16](https://github.com/IDuxFE/idux/commit/da4de1681ef5bbffdbe0f7a10d54173572a765fc))

# 1.1.0(2022-11-08)

### Bug Fixes

- **comp:\*:** 存在 arrow 的时候，overlay 的 offset 计算错误 ([#1255](https://github.com/IDuxFE/idux/issues/1255)) ([81802c6](https://github.com/IDuxFE/idux/commit/81802c6924cd4fc09be7f5651bc8421ba813c532))
- **comp:date-picker:** 起始日期和结束日期互换 ([#1258](https://github.com/IDuxFE/idux/issues/1258)) ([9622758](https://github.com/IDuxFE/idux/commit/96227584fe60691bfbf261f67a43220f26c162c0))
- **comp:input-number:** 严格检查 value 是否为 number ([#1250](https://github.com/IDuxFE/idux/issues/1250)) ([75c9fe1](https://github.com/IDuxFE/idux/commit/75c9fe1ca420f972dbad56364aa2d2a7f696d2c6))
- **comp:slider:** tooltip 闪烁 ([#1256](https://github.com/IDuxFE/idux/issues/1256)) ([fe6a533](https://github.com/IDuxFE/idux/commit/fe6a5330eca4877a8429beb7e47812da3cdf6f22))
- **comp:space:** 空的子元素应该被隐藏 ([#1263](https://github.com/IDuxFE/idux/issues/1263)) ([7fed8bc](https://github.com/IDuxFE/idux/commit/7fed8bca5b4e1e8aa720d38fc5acd10bd27ff473))
- **comp:stepper,comp:slider:** 样式修复 ([#1243](https://github.com/IDuxFE/idux/issues/1243)) ([d07e914](https://github.com/IDuxFE/idux/commit/d07e9143ccaf40518c4a7017aad65bf1f33b2797))
- **comp:table:** 当列宽设置为百分比的时候，拖拽调整列宽异常 ([#1254](https://github.com/IDuxFE/idux/issues/1254)) ([ae21248](https://github.com/IDuxFE/idux/commit/ae2124844e8cf5f68ae95a1c220bb153f5e54ccb))
- **comp:table:** ellipsis 用在非普通列时，样式异常 ([#1245](https://github.com/IDuxFE/idux/issues/1245)) ([44a5353](https://github.com/IDuxFE/idux/commit/44a53530b086e52e6bf2c89bc3f6b8c81d3d0f6b))
- **pro:search:** 失焦后应该重置搜索条件 ([#1253](https://github.com/IDuxFE/idux/issues/1253)) ([775901e](https://github.com/IDuxFE/idux/commit/775901e33c083e0bbd963de6bd566067362c5f0d))

### Features

- **\*:transfer:** 新增 searchPlaceholder 配置 ([#1230](https://github.com/IDuxFE/idux/issues/1230)) ([2d47151](https://github.com/IDuxFE/idux/commit/2d47151d368ac04f0fd55bea89a959331e4e4a7e)), closes [#1213](https://github.com/IDuxFE/idux/issues/1213)
- **comp:button:** ButtonGroup 新增 gap 配置 ([#1235](https://github.com/IDuxFE/idux/issues/1235)) ([7613c7d](https://github.com/IDuxFE/idux/commit/7613c7d76ed7c13a7a5aca4e7ab3ed5d32a34eac))
- **comp:collapse:** 新增 size 配置 ([#1252](https://github.com/IDuxFE/idux/issues/1252)) ([f3aa234](https://github.com/IDuxFE/idux/commit/f3aa23408ee04561da17aef6c5dbd09f814bbeb0))
- **comp:date-picker:** DateRangePicker 新增 onSelect 配置 ([#1248](https://github.com/IDuxFE/idux/issues/1248)) ([b263b79](https://github.com/IDuxFE/idux/commit/b263b79b7b6b987bad572829b334906bc284844b))
- **comp:header:** 支持 css variable ([#1251](https://github.com/IDuxFE/idux/issues/1251)) ([be94528](https://github.com/IDuxFE/idux/commit/be94528a8b6966a7ee25d3fc05f940147dbbe07e))
- **comp:pagination:** 新增 large 尺寸 ([#1249](https://github.com/IDuxFE/idux/issues/1249)) ([a05d7b7](https://github.com/IDuxFE/idux/commit/a05d7b7872cedb8317b039bb8f978344fb2af59d))
- **comp:select,comp:tree-select,comp:cascader:** 新增 selectedItem 插槽 ([#1257](https://github.com/IDuxFE/idux/issues/1257)) ([9651a8d](https://github.com/IDuxFE/idux/commit/9651a8d406e7e6097dd7472b3bfffe4a5e7e3b1f))
- **comp:spin:** 支持 useSpin 的用法 ([#1222](https://github.com/IDuxFE/idux/issues/1222)) ([42491a9](https://github.com/IDuxFE/idux/commit/42491a944757b38103c8b3eac141fa54902c5112))
- **comp:tooltip,comp:tree,comp:tree-select:** 新增 offset 配置 ([#1221](https://github.com/IDuxFE/idux/issues/1221)) ([f99028f](https://github.com/IDuxFE/idux/commit/f99028ffc1a75dc8f8a843ddc6d8cc6e0ac4ff66))

## 1.0.2(2022-10-29)

### Bug Fixes

- **cdk:drag-drop:** handle 失效 ([677b163](https://github.com/IDuxFE/idux/commit/677b1635e54ff0d38b80563b0b6fa632f30b1432))
- **comp:input:** input suffix 字体大小调整 ([#1233](https://github.com/IDuxFE/idux/issues/1233)) ([5d3f260](https://github.com/IDuxFE/idux/commit/5d3f2607367331059fe2ff884889227a3c4567dd))
- **comp:tabs:** 设置 selectedKey 时，没有滚动到正确位置 ([#1236](https://github.com/IDuxFE/idux/issues/1236)) ([050a1f7](https://github.com/IDuxFE/idux/commit/050a1f7089aba2b818382393d76d6ca7acab2e2f))
- **comp:time-picker:** time-range-picker 使用异常 ([82ce400](https://github.com/IDuxFE/idux/commit/82ce4004d98b86c53b6c2ec334542294ffa36b55))
- **comp:transfer:** 更新 transfer 组件样式和 demo ([#1234](https://github.com/IDuxFE/idux/issues/1234)) ([d93b815](https://github.com/IDuxFE/idux/commit/d93b815f22220fb3ff11c313873cb1d1ddef1ccd))
- **comp:*:** 部分组件样式与设计规范同步 ([#1232](https://github.com/IDuxFE/idux/issues/1232)) ([4bf61fb](https://github.com/IDuxFE/idux/commit/4bf61fbda7bf277f546e65fc0945a9720d6aeb1c))

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

# 1.0.0(2022-10-14)

欢迎来到 `@idux` 的第一个正式版本，之前版本的用户请参考[升级指南](https://github.com/IDuxFE/idux/issues/1193)进行升级。

### Bug Fixes

* **cdk:popper:** vue 警告: 监听了一个非响应式对象 ([#1197](https://github.com/IDuxFE/idux/issues/1197)) ([123e62f](https://github.com/IDuxFE/idux/commit/123e62f32e62b801dce86d799f6ab95b7025b526))
* **comp:carousel:** 动态新增删除子节点的时候 gotTo 不能正常跳转  ([#1196](https://github.com/IDuxFE/idux/issues/1196)) ([1406d27](https://github.com/IDuxFE/idux/commit/1406d27ca409d5ed53d81aafdf8848d173249b77))
* **comp:modal:** 关闭动画结束前可以点击 ok 和 cancel 按钮 ([#1190](https://github.com/IDuxFE/idux/issues/1190)) ([e207465](https://github.com/IDuxFE/idux/commit/e20746521e3dd3102b1e736802a25de6591ac927))

### Features

* **cdk:popper:** 将 popperjs 升级到 floating-ui ([#1191](https://github.com/IDuxFE/idux/issues/1191)) ([7eb77d6](https://github.com/IDuxFE/idux/commit/7eb77d66cb5063e5724c1bf2666a2e33492e09e6))
