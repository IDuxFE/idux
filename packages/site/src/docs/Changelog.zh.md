---
category: docs
title: 更新日志
order: 13
---

`@idux` 遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范, 发布周期如下：

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。

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

## 1.2.0(2022-11-28)

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

## 1.1.0(2022-11-08)

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

## 1.0.0(2022-10-14)

欢迎来到 `@idux` 的第一个正式版本，之前版本的用户请参考[升级指南](https://github.com/IDuxFE/idux/issues/1193)进行升级。

### Bug Fixes

* **cdk:popper:** vue 警告: 监听了一个非响应式对象 ([#1197](https://github.com/IDuxFE/idux/issues/1197)) ([123e62f](https://github.com/IDuxFE/idux/commit/123e62f32e62b801dce86d799f6ab95b7025b526))
* **comp:carousel:** 动态新增删除子节点的时候 gotTo 不能正常跳转  ([#1196](https://github.com/IDuxFE/idux/issues/1196)) ([1406d27](https://github.com/IDuxFE/idux/commit/1406d27ca409d5ed53d81aafdf8848d173249b77))
* **comp:modal:** 关闭动画结束前可以点击 ok 和 cancel 按钮 ([#1190](https://github.com/IDuxFE/idux/issues/1190)) ([e207465](https://github.com/IDuxFE/idux/commit/e20746521e3dd3102b1e736802a25de6591ac927))

### Features

* **cdk:popper:** 将 popperjs 升级到 floating-ui ([#1191](https://github.com/IDuxFE/idux/issues/1191)) ([7eb77d6](https://github.com/IDuxFE/idux/commit/7eb77d66cb5063e5724c1bf2666a2e33492e09e6))
