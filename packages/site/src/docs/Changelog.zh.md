---
category: docs
title: 更新日志
order: 13
---

`@idux` 遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范, 发布周期如下：

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。

## 2.3.1(2024-07-12)


### Bug Fixes

* **cdk:dnd:** 暴露的组件没有定义name或者disableName ([#1964](https://github.com/IDuxFE/idux/issues/1964)) ([d1de6c7](https://github.com/IDuxFE/idux/commit/d1de6c7915a9250cfde3f29bb9369739b26db821))

# 2.3.0(2024-07-12)


### Bug Fixes

* **cdk:scroll:** 模拟滚动条，在数据更新之后有几率出现闪烁 ([#1943](https://github.com/IDuxFE/idux/issues/1943)) ([4b25a18](https://github.com/IDuxFE/idux/commit/4b25a18681af4d5722c19da1d595d197a8095e63))
* **cdk:scroll:** 虚拟滚动，当已经滚动到底部的时候，横向的滚动会持续触发scrolledBottom ([#1948](https://github.com/IDuxFE/idux/issues/1948)) ([d39c7e8](https://github.com/IDuxFE/idux/commit/d39c7e8516bc1249b8bc877aefc401c9cedb6482))
* **cdk:scroll:** 虚拟列表在数据变化之后，渲染出现错误 ([#1949](https://github.com/IDuxFE/idux/issues/1949)) ([491d5aa](https://github.com/IDuxFE/idux/commit/491d5aaa8ab42d8076526501fd2198b004e3438c))
* **cdk:scroll:** 在 firefox 下，虚拟滚动列表中的鼠标滚轮失效 ([#1946](https://github.com/IDuxFE/idux/issues/1946)) ([9c81358](https://github.com/IDuxFE/idux/commit/9c813583a203fdc90f573b69a352eca958f3c37e))
* **cdk:scroll:** 在虚拟列表中，如果存在在窗口左边插入的元素，滚动的位置会出现跳跃 ([#1950](https://github.com/IDuxFE/idux/issues/1950)) ([28a6724](https://github.com/IDuxFE/idux/commit/28a6724babbd2088ed1f17c1f8de86ccfedb108c))
  - 在表格开启了横向虚拟滚动时，且存在起始位置的固定列，横向滚动会有该问题
* **comp:*:** 带有浮层的控件（包括proSearch），在浮层中聚焦有可能会导致浮层异常关闭 ([#1952](https://github.com/IDuxFE/idux/issues/1952)) ([67a2f82](https://github.com/IDuxFE/idux/commit/67a2f8256e0adb5b507d60d1efa3cf8fb92f6ba9))
  - 修改所有带浮层控件的聚焦控制逻辑
  - 使用通用的浮层聚焦控制逻辑重构proSearch的聚焦控制代码
* **comp:modal:** 使用 `cdk/dnd` 重构弹窗组件的可拖拽效果，替换掉废弃的 `drag-drop` ([#1954](https://github.com/IDuxFE/idux/issues/1954)) ([39fe969](https://github.com/IDuxFE/idux/commit/39fe969515b03fb8f171a91a560e1c091cf33e85))
* **comp:table:** 初始设置的 `selectedRowKeys`，如果其不在最开始的 `dataSource` 中，则触发勾选会导致其被移除 ([#1951](https://github.com/IDuxFE/idux/issues/1951)) ([22698bf](https://github.com/IDuxFE/idux/commit/22698bf9863fc4aa0228933fe583269e703fe4fb))
  - tree 组件也存在该问题
* **pro:textarea:** 当某一行输入没有换行且跨越了多行，如果其存在输入校验错误，悬浮到除了错误行的第一行之外，错误提示都不会展示 ([#1959](https://github.com/IDuxFE/idux/issues/1959)) ([82a756b](https://github.com/IDuxFE/idux/commit/82a756bf1fcdd87b982289124c3d2001e075e3ae))


### Features

* **cdk:dnd:** 新增拖拽移动以及拖拽排序的库函数和组件 `cdk/dnd` ([#1953](https://github.com/IDuxFE/idux/issues/1953)) ([7eaa878](https://github.com/IDuxFE/idux/commit/7eaa878e55137158bb786d8a3cf141994cd9a2f9))
  - 原 `cdk/drag-drop` 现以及废弃，请使用 `cdk/dnd` 替换
* **comp:image:** ImageViewer 支持配置 `draggable` 以支持预览的图片拖拽 ([#1956](https://github.com/IDuxFE/idux/issues/1956)) ([d2638c3](https://github.com/IDuxFE/idux/commit/d2638c3e2bf57c85502d7f30fcfb9761ec037c77))
* **comp:popconfirm:** popconfirm 支持 `showArrow` 全局配置 ([#1960](https://github.com/IDuxFE/idux/issues/1960)) ([63deaf5](https://github.com/IDuxFE/idux/commit/63deaf59d381f65e55b1feb00de6afd7a6321873))
  - 同时修改了 `tooltip`, `popover` 的 `showArrow` 全局配置不生效的问题
* **comp:select:** 新增拖拽排序功能，详情见demo ([#1955](https://github.com/IDuxFE/idux/issues/1955)) ([6281bc2](https://github.com/IDuxFE/idux/commit/6281bc2091f5c10322d271d1cfaf9eaa6d06f0df))
* **comp:tabs:** 新增拖拽排序功能，详情见demo ([#1958](https://github.com/IDuxFE/idux/issues/1958)) ([7d70cf7](https://github.com/IDuxFE/idux/commit/7d70cf77b699bf5519a5b53d24e19f1dc1cfa8a1))
* **pro:table:** 新增数据拖拽排序功能，详情见demo ([#1957](https://github.com/IDuxFE/idux/issues/1957)) ([9b59fb2](https://github.com/IDuxFE/idux/commit/9b59fb2616e15ff368f45fa5fece047098aba43f))


### BREAKING CHANGES

* **cdk:drag-drop:** `cdk:drag-drop` 已经废弃，使用 `cdk/dnd` 替换

## 2.2.3(2024-06-12)


### Bug Fixes

* **comp:select:** 在失焦之后，选择框中的输入内容应当清空 ([#1941](https://github.com/IDuxFE/idux/issues/1941)) ([502d8ce](https://github.com/IDuxFE/idux/commit/502d8ce6562b4ce0b4c11e03461da3f5764fcb2f))
  - 单选场景下，在配置了searchable之后，在选择框中输入搜索内容，失焦之后输入的内容没有清空并且input元素遮挡了选中的内容
* **comp:table:** 分页器在数据为空的时候应当渲染，但通过v-show隐藏 ([#1940](https://github.com/IDuxFE/idux/issues/1940)) ([e2f7a65](https://github.com/IDuxFE/idux/commit/e2f7a65cca8e256e18abf5e13194b28dc1a6da61))
  - 当数据为空时，默认不渲染分页，导致数据改变后分页组件的事件没有正常触发
* **comp:table:** 当`dataSource`改变后，同时点击选择新加载的数据列，原本选中的列会被清空 ([#1939](https://github.com/IDuxFE/idux/issues/1939)) ([373b434](https://github.com/IDuxFE/idux/commit/373b434cb4a80d524691331ade0f477bd350e3b6))
* **comp:tree-select:** 开启虚拟滚动之后，滚动到底部面板会抖动 ([#1942](https://github.com/IDuxFE/idux/issues/1942)) ([2ef737d](https://github.com/IDuxFE/idux/commit/2ef737d32a8d0af2dacde14be72ce2ccf40498bf))

## 2.2.2(2024-06-11)


### Bug Fixes

* **cdk:virtual:** 当`dataSource`改变时，渲染出的元素不正常，会出现重复 ([#1937](https://github.com/IDuxFE/idux/issues/1937)) ([2511d1a](https://github.com/IDuxFE/idux/commit/2511d1aa3c42b320a88313ccdff231f8654c760f))
  - 例如：在 `IxProTable` 中，改变显示的列，再向左滚动，会出现重复的列，导致渲染异常
* **comp:table:** 全选勾选框，在所有的数据都被禁用的时候，不应该展示已勾选的状态 ([#1936](https://github.com/IDuxFE/idux/issues/1936)) ([d1fb275](https://github.com/IDuxFE/idux/commit/d1fb2758516a537498af520076b491605dd1e1e4))
* **comp:table:** 当`dataSource`改变后，原本选中的列会被清空 ([#1938](https://github.com/IDuxFE/idux/issues/1938)) ([aa97b68](https://github.com/IDuxFE/idux/commit/aa97b68fba18f854a8b093d052b8463ea4c98db0))
  - 例如：在服务端分页和搜索的场景中，先选中当前页的行或者全选当前页，切页之后再选择某行或全选当前页，会出现上一次选择的数据被清空覆盖的情况
* **pro:search:** `select`搜索项中， 远程搜索的场景下，搜索过后选中某项数据，会覆盖掉之前选中的数据 ([#1935](https://github.com/IDuxFE/idux/issues/1935)) ([708f1f7](https://github.com/IDuxFE/idux/commit/708f1f76beaa6efac2f2cd8e094229b8172db07d))

## 2.2.1(2024-05-20)


### Bug Fixes

* **cdk:scroll:** 下一次渲染时，渲染池中未被回收的元素（即上一次渲染也存在的元素）的index和数据不正确，应该重新赋值 ([#1926](https://github.com/IDuxFE/idux/issues/1926)) ([c177f36](https://github.com/IDuxFE/idux/commit/c177f364727e30867bc35b76843f4060a69353bf))
* **comp:*:** 默认主题下 overlay border color 主题token不合法，修改为 `transparent` ([#1924](https://github.com/IDuxFE/idux/issues/1924)) ([f1ac247](https://github.com/IDuxFE/idux/commit/f1ac24711c89c9feb871a1b3610fd9cff26ceb32))
* **comp:popconfirm:** 在当header中的icon未渲染，或者header未渲染时，内容区域的padding不应该留出icon的位置 ([#1929](https://github.com/IDuxFE/idux/issues/1929)) ([cd02157](https://github.com/IDuxFE/idux/commit/cd0215742cefdab756eba022c5a74f2ca07a4479))
* **comp:table:** 当表格数据为空时，全选不应该被勾选 ([#1928](https://github.com/IDuxFE/idux/issues/1928)) ([dd13848](https://github.com/IDuxFE/idux/commit/dd1384843dc83ca628a7a155fa0d55ee58332c0f))
* **comp:tabs:** `line` 类型的tabs，当title中的内容因为自定义渲染被更新导致尺寸变化，线的位置不正确 ([#1927](https://github.com/IDuxFE/idux/issues/1927)) ([2ec613a](https://github.com/IDuxFE/idux/commit/2ec613a5218519550360707b133b67a3ad96116f))
* **comp:tree-select:** 当浮层中的树没有渲染时，通过选择框删除标签不起作用 ([#1923](https://github.com/IDuxFE/idux/issues/1923)) ([134992f](https://github.com/IDuxFE/idux/commit/134992fde39f722f9e6d64773eae53f0b0d59dbb))
* **pro:table:** 布局工具中通过搜索过滤之后，勾选某一个列，表格的列显示状态异常 ([#1925](https://github.com/IDuxFE/idux/issues/1925)) ([19078ee](https://github.com/IDuxFE/idux/commit/19078ee89316c522c5dec74e405229a96100277b))
* **pro:tag-select:** 修改颜色相关主题token，并提供 `indicatorColor` 单独配置编辑面板中的指示圆点的颜色 ([#1922](https://github.com/IDuxFE/idux/issues/1922)) ([5256ad1](https://github.com/IDuxFE/idux/commit/5256ad107a8a47f30b05d3686554c4e03e626c8c))
  - 默认的颜色调整
  - colors 配置新增 `indicatorColor` 配置，未提供则仍然使用 `backgroundColor`
* **pro:tag-select:** 通过输入创建标签以及在编辑面板中修改标签的label时，支持对输入进行校验 ([#1931](https://github.com/IDuxFE/idux/issues/1931)) ([fe649cc](https://github.com/IDuxFE/idux/commit/fe649cc822ba0b35803dbfd547384b857072c88b))
  - 新增 `tagLabelValidator` 对输入进行校验，并展示错误提示
  - 新增 `alert` 插槽，用来自定义面板中告警提示的显示

# 2.2.0(2024-05-09)


### Bug Fixes

* **cdk:popper:** 在触发了shift中间件之后，箭头的位置没有重新计算 ([#1917](https://github.com/IDuxFE/idux/issues/1917)) ([a4072a5](https://github.com/IDuxFE/idux/commit/a4072a571c6bc10d93d588c2ccec97bcc2f33742))
* **cdk:virtual:** 渲染池中具有相同数据key的元素没有被成功复用 ([#1910](https://github.com/IDuxFE/idux/issues/1910)) ([df3a961](https://github.com/IDuxFE/idux/commit/df3a961ee47b518dfeebc5979389704f748feaa6))
* **comp:alert:** 修改 `info` 类型的告警图标为 `info-circle` ([#1916](https://github.com/IDuxFE/idux/issues/1916)) ([e08e100](https://github.com/IDuxFE/idux/commit/e08e100607bd3ee8debfaccd592c55c1c54c870e))
* **comp:table:** 固定列的阴影在初始渲染和resize之后没有正常显示 ([#1909](https://github.com/IDuxFE/idux/issues/1909)) ([0ea197a](https://github.com/IDuxFE/idux/commit/0ea197ac3f4acbbcd1309da1669e2e6e5b292715))
* **comp:tabs:** 所有面板浮层中，选中的tab选项应该具有选中的状态样式 ([#1921](https://github.com/IDuxFE/idux/issues/1921)) ([b883501](https://github.com/IDuxFE/idux/commit/b883501633b5a301aa42c41ce4714cbab07ccb82))
* **comp:theme:** 将主题样式的引用次数保存在style元素上，避免不同的上下文间不能共享引用次数 ([#1907](https://github.com/IDuxFE/idux/issues/1907)) ([ff062cd](https://github.com/IDuxFE/idux/commit/ff062cdcd14244babd911a648cf1a578d3e62a51))
* **pro:search:** tree-select 类型的搜索项，在取消勾选某个叶子节点后，搜索输入解析错误 ([#1914](https://github.com/IDuxFE/idux/issues/1914)) ([5e44824](https://github.com/IDuxFE/idux/commit/5e448248ab1e259f57295e8ed1737673206d70dd))


### Features

* **comp:alert:** 新增文字和背景颜色主题token配置 ([#1918](https://github.com/IDuxFE/idux/issues/1918)) ([114e26f](https://github.com/IDuxFE/idux/commit/114e26f551ed3f378d5818616cca4e36d42cf053))
  - 修改 `warning` 类型的文字和背景颜色，取色板中的 `gold.base` 和 `bronze.d10`
* **comp:table:** 树表格支持 cascaderStrategy，自定义级联策略 ([#1911](https://github.com/IDuxFE/idux/issues/1911)) ([e05e6af](https://github.com/IDuxFE/idux/commit/e05e6af66da5d7776dc8c50c35965e1947425fe1))
* **comp:tabs:** 重写tabs组件以支持新特性 ([#1913](https://github.com/IDuxFE/idux/issues/1913)) ([3c34eba](https://github.com/IDuxFE/idux/commit/3c34eba9776f202697ae1a24a1946c5e44cf0723))
  - 1. 支持所有面板（之前的下拉面板仅仅展示溢出的tab选项，现在会展示所有的tab）
  - 2. 支持tabs导航内的滚动和左右切换
* **comp:theme:** 新增 gold, silver 和 bronze 颜色到基础颜色 ([#1915](https://github.com/IDuxFE/idux/issues/1915)) ([1946e26](https://github.com/IDuxFE/idux/commit/1946e268bee09593cccf998decbae9f136fb745b))
* **pro:transfer:** 支持 `tree-table` 类型的穿梭框（树表格） ([#1912](https://github.com/IDuxFE/idux/issues/1912)) ([06a8263](https://github.com/IDuxFE/idux/commit/06a8263231e5a778834d8e7eb358ec08ab920656))

## 2.1.3(2024-04-25)


### Bug Fixes

* **cdk:virtual:** 渲染池的元素复用效果没有生效 ([#1900](https://github.com/IDuxFE/idux/issues/1900)) ([514b2dd](https://github.com/IDuxFE/idux/commit/514b2dd5a76bac45b2ae3b2306751164a8470331))
  - 正常情况下，当某个元素或者组件被滚动到区域外变成非激活状态时，会被回收并复用
* **comp:table:** 重构表格列宽计算和测量的逻辑 ([#1899](https://github.com/IDuxFE/idux/issues/1899)) ([425def0](https://github.com/IDuxFE/idux/commit/425def0567b009e75e92a98f8a6c35b8eaef37d4))
  - tbody所在的表格，colgroup中不会再使用测量后的列宽作为宽度，仅会使用表格列最初配置的宽度
  - thead所在的表格，colgroup中优先使用测量后的列宽作为宽度
* **comp:table:** rowSpan 和 colSpan 的参数传递错误 ([#1908](https://github.com/IDuxFE/idux/issues/1908)) ([2aebaec](https://github.com/IDuxFE/idux/commit/2aebaec3878e0bf5b610e7f6716d68c833bbd1ab))
* **pro:search:** 在 select 类型的 field 数据没有加载之前设置了 value，数据加载过后会报错 ([#1906](https://github.com/IDuxFE/idux/issues/1906)) ([5f00488](https://github.com/IDuxFE/idux/commit/5f00488397b041cfb22605dd392c73494911c474))
* **pro:table:** 改变列的固定位置后，列的排序应该被改变 ([#1901](https://github.com/IDuxFE/idux/issues/1901)) ([daba3f6](https://github.com/IDuxFE/idux/commit/daba3f69128fb8540f5642a47b4100ee4a8a1426))
* **pro:tag-select:** 修改创建标签选项的输入内容 font-weight 为 fontWeightXl ([#1903](https://github.com/IDuxFE/idux/issues/1903)) ([03f67c3](https://github.com/IDuxFE/idux/commit/03f67c3be5aa5bd4ac22088ccd0a22cf85b62ebb))
* **pro:tag-select:** 修改标签数据编辑面板的样式 ([#1904](https://github.com/IDuxFE/idux/issues/1904)) ([3a87226](https://github.com/IDuxFE/idux/commit/3a87226ca4a648fa58732c95d953d701cc6fe5c8))
  - 删除按钮增加悬浮和激活背景色
  - 删除按钮下方增加分割线
  - 已经选中的颜色，悬浮后不会改变背景色
* **pro:tag-select:** 标签数据删除后的弹窗确认是否需要，应该是可以配置的 ([#1905](https://github.com/IDuxFE/idux/issues/1905)) ([659b1f7](https://github.com/IDuxFE/idux/commit/659b1f7e039cc9c350ea4185a3550ee9f18fee1b))
* **pro:tag-select:** 标签的 min-widht 应该是 auto ([#1902](https://github.com/IDuxFE/idux/issues/1902)) ([d80987d](https://github.com/IDuxFE/idux/commit/d80987ded74c0830f65df320e77bff376acdd273))


## 2.1.2(2024-04-17)


### Bug Fixes

* **cdk:resizable:** 在刚开始resize的时候，position就应该被设置 ([#1889](https://github.com/IDuxFE/idux/issues/1889)) ([aaf85b6](https://github.com/IDuxFE/idux/commit/aaf85b6b1f430d27f24ac88bbcb881b69f233d4f))
* **comp:*:** 主题token转换成css变量使用的正则表达式在safari下不兼容，导致白屏 ([#1897](https://github.com/IDuxFE/idux/issues/1897)) ([8166a03](https://github.com/IDuxFE/idux/commit/8166a03c821bbb236f0ba442118f307ef1ef7172))
* **comp:*:** 更新 colorInfo 和 colorOfflineText token ([#1896](https://github.com/IDuxFE/idux/issues/1896)) ([8a10fc8](https://github.com/IDuxFE/idux/commit/8a10fc81f7153c3ac3d48d68d2125b86f32154be))
* **comp:breadcrumb:** 修改 breadcrumb 的字体大小为 fontSizeMd ([#1893](https://github.com/IDuxFE/idux/issues/1893)) ([6d51cf9](https://github.com/IDuxFE/idux/commit/6d51cf924e1ac342ab00393d2006b93eb42af3fb))
* **comp:modal:** 弹窗的 title 应该可以设置 word break ([#1888](https://github.com/IDuxFE/idux/issues/1888)) ([62b606a](https://github.com/IDuxFE/idux/commit/62b606a6b5c0e697c9508bc3aaa213f28fb91e2e))
* **comp:select:** 模块引入路径错误 ([#1885](https://github.com/IDuxFE/idux/issues/1885)) ([bae7eb7](https://github.com/IDuxFE/idux/commit/bae7eb7e626698867476bfe263057dc11775c6ff))
* **comp:table:** 固到列尾的列 z-index 应该比固定到列首的列高 ([#1892](https://github.com/IDuxFE/idux/issues/1892)) ([4941867](https://github.com/IDuxFE/idux/commit/49418677195a7d77bdfdfe816500240a769e9001))
* **comp:table:** 当某一行的最后一个元素因为row-span是0而没有展示的时候，上一列的有边框缺失了 ([#1890](https://github.com/IDuxFE/idux/issues/1890)) ([76d77b6](https://github.com/IDuxFE/idux/commit/76d77b60642ba9a14c27fe89c774663a6284c2e5))
* **comp:tree-select:** 多选模式下，在选项被点击选中后，搜索的输入不应该被清空 ([#1886](https://github.com/IDuxFE/idux/issues/1886)) ([28f70c1](https://github.com/IDuxFE/idux/commit/28f70c1b724c0ff89aa875bb2a0c08c9a1f2e03e))
* **comp:tree:** cascaderStrategy 变动之后，checkedChange事件应该被触发 ([#1887](https://github.com/IDuxFE/idux/issues/1887)) ([a122a31](https://github.com/IDuxFE/idux/commit/a122a31bdcff2e3c532082496301f70ca5c1880a))
* **pro:table:** 布局工具的列搜索不存在之后，会出现多个空状态 ([#1891](https://github.com/IDuxFE/idux/issues/1891)) ([b122426](https://github.com/IDuxFE/idux/commit/b12242689a40727f950e8eac51539e4476284b08))
  - 重构proTable的列操作逻辑，不再显式更改计算属性的值
* **pro:textarea:** 支持 rows 设置 ([#1518](https://github.com/IDuxFE/idux/issues/1518)) ([562314c](https://github.com/IDuxFE/idux/commit/562314c3bd9a64f154bfa6608d4798f0ce0f806b))
* **pro:textarea:** rows 配置之后，高度异常 ([#1894](https://github.com/IDuxFE/idux/issues/1894)) ([f9737fd](https://github.com/IDuxFE/idux/commit/f9737fd1ec0295ac81fb8e5d5cfa8d4f8462d75e))

## 2.1.1(2024-04-08)


### Bug Fixes

* **comp:carousel:** 当轮播图的数量小于等于1时，前后切换的箭头不应该显示，且切换的方法调用不应该生效 ([#1871](https://github.com/IDuxFE/idux/issues/1871)) ([e8a6d6e](https://github.com/IDuxFE/idux/commit/e8a6d6e00e01e683c4fe63345f6b80ba8c020d63))
* **comp:collapse,empty:** margin size css 变量引用错误 ([#1872](https://github.com/IDuxFE/idux/issues/1872)) ([dca4899](https://github.com/IDuxFE/idux/commit/dca489914745f956d63abebb350a8324cc69c926))
* **comp:input:** 在IxInput的addon中渲染的select组件，样式不正常 ([#1873](https://github.com/IDuxFE/idux/issues/1873)) ([73c4f11](https://github.com/IDuxFE/idux/commit/73c4f11feb33487a015153bcac2d2f326be2cff8))
* **comp:spin:** spin 的遮罩背景颜色不正确 ([#1874](https://github.com/IDuxFE/idux/issues/1874)) ([f2fcf2d](https://github.com/IDuxFE/idux/commit/f2fcf2dfe16fee05aeedd298de3361e9be76b81b))
  - 修改为使用背景色混合0.7的不透明度的颜色
  - 新增了 `maskBgColor`的主题token，可以用来配置遮罩颜色
  - 不再使用opacity来设置遮罩的效果，改为使用背景颜色
* **comp:table:** 点击展开收起图标不应该触发行的选中 ([#1875](https://github.com/IDuxFE/idux/issues/1875)) ([818722e](https://github.com/IDuxFE/idux/commit/818722e99e026893b40f7ca3f37881c161105358))
* **comp:tooltip:** tooltip 的内容应该支持换行 ([#1876](https://github.com/IDuxFE/idux/issues/1876)) ([ab4a449](https://github.com/IDuxFE/idux/commit/ab4a4491fa7446018897173485f09ca6db7fedfa))
  - 提供了 `whiteSpace` 的主题token，现在默认为 `pre-wrap`，如果该行为对当前场景有影响，可以自行配置
* **comp:tree-select:** 从选择框中移除一个选项，不能级联处理树的选中项 ([#1877](https://github.com/IDuxFE/idux/issues/1877)) ([ce4f477](https://github.com/IDuxFE/idux/commit/ce4f4778e370562ee8bf4130c663d2c182d37d90))
  - 重构了树组件的选中处理逻辑
* **pro:search:** 快捷面板中，当选中下方的选项时，不应该收起面板中的搜索输入框 ([#1883](https://github.com/IDuxFE/idux/issues/1883)) ([e9d8517](https://github.com/IDuxFE/idux/commit/e9d8517a2772f708d37f379bc1e70a41ecff8933))
* **pro:tag-select:** 标签最大数量超出的告警提示内容不正确 ([#1882](https://github.com/IDuxFE/idux/issues/1882)) ([c6eef62](https://github.com/IDuxFE/idux/commit/c6eef623e1d5a8485c835bd5b69360fa1348545f))
* **pro:tag-select:** 当移除一个未被选中的标签数据时，不应该触发 `onTagRemove` 事件 ([#1880](https://github.com/IDuxFE/idux/issues/1880)) ([c3703a8](https://github.com/IDuxFE/idux/commit/c3703a8b71050e50802e14997d501af1cbe5c949))
* **pro:tag-select:** 支持了 `beforeRemoveConfirm` 和 `beforeSelectConfirm` ([#1879](https://github.com/IDuxFE/idux/issues/1879)) ([4f48690](https://github.com/IDuxFE/idux/commit/4f4869003bb14c6af9e470f2602286072c298939))
* **pro:tag-select:** 当有一个标签数据被搜索输入严格匹配到的时候，不应该展示创建标签的选项 ([#1881](https://github.com/IDuxFE/idux/issues/1881)) ([fb6116f](https://github.com/IDuxFE/idux/commit/fb6116ffd7102a9025e5b0b5a4a14b48d6db7601))
* **pro:tag-select:** 当overlayMatchWidth为true时，标签的文字不应该溢出 ([#1878](https://github.com/IDuxFE/idux/issues/1878)) ([d2fcdbf](https://github.com/IDuxFE/idux/commit/d2fcdbff3487505cd2be2f1dca849e71d8b2655d))

# 2.1.0(2024-03-27)


### Bug Fixes

* **comp:input:** input 组件的主题hashId没有正确绑定 ([#1863](https://github.com/IDuxFE/idux/issues/1863)) ([bf11379](https://github.com/IDuxFE/idux/commit/bf1137915a9cf8d023821cc5a2b36f50959c03c9))
* **comp:textarea:** textarea 在暗黑主题下文字颜色不正常 ([#1864](https://github.com/IDuxFE/idux/issues/1864)) ([17fa41f](https://github.com/IDuxFE/idux/commit/17fa41f109a60bb1c5a8e17030716c7a62a3ed37))
* **comp:tour:** 异步添加的 step 不能生效 ([#1866](https://github.com/IDuxFE/idux/issues/1866)) ([0c6c54d](https://github.com/IDuxFE/idux/commit/0c6c54d377b74e66d47ee7c3e75f12b3eca7aa35))


### Features

* **comp:control-trigger:** 新增 `IxControlTrigger` 组件，用于自定义带有浮层的输入控件 ([#1862](https://github.com/IDuxFE/idux/issues/1862)) ([899f796](https://github.com/IDuxFE/idux/commit/899f796e20ca411c9f4ba541df57521021e2689b))
  - select, treeSelect, cascader, time-picker, date-picker 组件均重构为使用该组件包裹
* **comp:theme:** `useThemeToken` 自定义注册的主题变量支持指定前缀 ([#1865](https://github.com/IDuxFE/idux/issues/1865)) ([094f62a](https://github.com/IDuxFE/idux/commit/094f62adef4496e2aff00c2dba830c1cb129df26))
* **comp:tour:** 支持 `targetDisabled` 配置是否禁用目标区域的操作 ([#1869](https://github.com/IDuxFE/idux/issues/1869)) ([5c48d01](https://github.com/IDuxFE/idux/commit/5c48d01f5d798bd0c8746f0cc66f67f696e72106))
* **comp:tour:** 支持通过外边框以及遮罩渲染容器配置 ([#1868](https://github.com/IDuxFE/idux/issues/1868)) ([5c25eb3](https://github.com/IDuxFE/idux/commit/5c25eb3643b5bf593392545fd6ad0f4572297a0f))
  - 通过 `gap.outline` 设置外边框的宽度，通过 `mask.outlineColor` 设置外边框的颜色
  - 通过 `mask.container` 设置遮罩渲染的位置信息，指定遮罩的位置和宽高
* **comp:selector** 新增 `IxSelector` 选择框组件，用于选择器类型组件的自定义 ([#1861](https://github.com/IDuxFE/idux/issues/1861)) ([a50147b](https://github.com/IDuxFE/idux/commit/a50147bfc26071ae42ae1b65e24b13d6a71302be))
  - select, treeSelect, cascader, time-picker, date-picker 组件均重构为使用该组件实现
* **pro:tag-select** 新增 `IxProTagSelect` 标签选择组件 ([#1867](https://github.com/IDuxFE/idux/issues/1867)) ([9b50004](https://github.com/IDuxFE/idux/commit/9b50004dfa3d4e11e67fb307eee93bebac703663))

## 2.0.1(2024-03-05)


### Bug Fixes

* **comp:config:** `millisecond` 应该被包含在 TimeConfigType 中 ([#1850](https://github.com/IDuxFE/idux/issues/1850)) ([405b050](https://github.com/IDuxFE/idux/commit/405b0504f957bd1b7c081cfa99a3792a6d03729e))
* **comp:date-picker:** 范围选择选中的日期范围应该覆盖完整的时间 ([#1851](https://github.com/IDuxFE/idux/issues/1851)) ([8174c4f](https://github.com/IDuxFE/idux/commit/8174c4f4b71d62d6614fc7ba08abc530bc844f9b))
  - 例如：选择1月到3月，应该是从1月1日0点0分0秒0毫秒到3月31日23点59分59秒999毫秒
* **comp:select:** 由可输入的select通过输入创建的选择，通过点击面板选中时，返回了undefined ([#1855](https://github.com/IDuxFE/idux/issues/1855)) ([fa02551](https://github.com/IDuxFE/idux/commit/fa025514a2aac19f22ee91a834cef47a4060b2aa))
* **comp:table:** selectable 列中 checkbox 或者 radio 的高度不正确，会导致行高比正常文字行高很多，导致selectable列配置了showIndex时，悬浮后行高抖动明显 ([#1859](https://github.com/IDuxFE/idux/issues/1859)) ([690fab8](https://github.com/IDuxFE/idux/commit/690fab8773c42ae2595f5b521fe29a4c819606e1))
* **comp:table:** selectable 列的 showIndex 不生效 ([#1858](https://github.com/IDuxFE/idux/issues/1858)) ([654ad1a](https://github.com/IDuxFE/idux/commit/654ad1a644f79b867d0cb1785e858184091a3a4f))
* **comp:theme:** 基础色 turquoise 不正确，根据设计稿色板调整 ([#1852](https://github.com/IDuxFE/idux/issues/1852)) ([70e75eb](https://github.com/IDuxFE/idux/commit/70e75eb64068e9d3b595a5338b8090f2b685400b))
* **comp:theme:** 优化全局变量的更新逻辑 ([#1853](https://github.com/IDuxFE/idux/issues/1853)) ([b89990c](https://github.com/IDuxFE/idux/commit/b89990c14ae52ebf991cfd164502a9dc6a4b51f5))
* **comp:time-picker,date-picker:** format字符串中未体现的时间或日期部分，应当从传入的值或者上次选中的值中拿取并赋值 ([#1857](https://github.com/IDuxFE/idux/issues/1857)) ([6a75ae2](https://github.com/IDuxFE/idux/commit/6a75ae28947a56f10536064f6a5d2b2bdcbd7daa))
  - 例如：yyyy-MM 的格式输入，在通过手动输入后并不能体现日、小时、分钟这些部分，如果有传入的或者上次选中的值，这些部分的取值应该和其保持一致
* **date-picker:** 日期范围选择，当面板被关闭时，应当触发一次 onSelect ([#1856](https://github.com/IDuxFE/idux/issues/1856)) ([c82e28b](https://github.com/IDuxFE/idux/commit/c82e28baf6ea1b65e3538e2df8ee36ee16bc3957))
  - 该修改主要为了修复通过onSelect来设置禁用日期的场景，原本当正在选择的状态中关闭面板，会导致禁用日期的设置不正常
* **pro:tree:** 优化树横向展开收起的动画效果以及显式问题 ([#1854](https://github.com/IDuxFE/idux/issues/1854)) ([98d0595](https://github.com/IDuxFE/idux/commit/98d059538e0fd46fcb1ddff4379a6dc5c6c49b48))
  - 1. 展开收起过程中不应当出现滚动条
  - 2. 展开收起的过程中不应该隐藏内容
  - 3. 收起之后树的内容应该不可点击
  - 4. 收起之后配置了collapsedWidth并小于44px时，展开收起图标应该水平居中对齐

# 2.0.0(2024-02-01)

### Bug Fixes

* **cdk:form,comp:icon:** 修复疑似的内存泄露问题 ([#1846](https://github.com/IDuxFE/idux/issues/1846)) ([43581b1](https://github.com/IDuxFE/idux/commit/7ce35d7f3ed92e64d63b3c3c950d8b3dbac0b9ba))
* **cdk:scroll:** 优化虚拟滚动渲染池的复用逻辑 ([#1837](https://github.com/IDuxFE/idux/issues/1837)) ([4a37a0a](https://github.com/IDuxFE/idux/commit/998abea734bc03205a835469247dd1f06343619e))
* **comp:alert,tag:** 将rgba的背景色替换成在基础背景色上没有alhpa通道的颜色，避免透出背景色 ([#1840](https://github.com/IDuxFE/idux/issues/1840)) ([458b070](https://github.com/IDuxFE/idux/commit/8d05916477f4ff4ad4afc6d5a0e6e29a8c4bd5eb))
* **comp:button:** 当存在图标时，按钮内容没有垂直居中 ([#1830](https://github.com/IDuxFE/idux/issues/1830)) ([cefdc0d](https://github.com/IDuxFE/idux/commit/fbf4586a6e26c585d09cbcb0b814b465ba985103))
* **comp:cascader:** 远程搜索不生效 ([#1832](https://github.com/IDuxFE/idux/issues/1832)) ([8d1e463](https://github.com/IDuxFE/idux/commit/551935ea1b8cec100d6757eb4518c7e991845945))
* **comp:drawer:** 设置了 destroyOnHide 的抽屉如果在进入动画结束之前设置关闭抽屉，会导致抽屉无法销毁遮挡屏幕 ([#1836](https://github.com/IDuxFE/idux/issues/1836)) ([773fb38](https://github.com/IDuxFE/idux/commit/1156a4f4e209bde9af2d8dda122733c9fde3ecb2))
* **comp:header:** header的竖条应当和title顶部对齐 ([#1842](https://github.com/IDuxFE/idux/issues/1842)) ([592fc8b](https://github.com/IDuxFE/idux/commit/1688ecd673fc5b8799edd37e02b343e55b35845a))
* **comp:popconfirm:** 修改内容区域和title的间距样式 ([#1823](https://github.com/IDuxFE/idux/issues/1823)) ([fc63a44](https://github.com/IDuxFE/idux/commit/339c292614be2892f593e574b078ee77a2291edb))
* **comp:popover:** 移除内容区域的上内边距 ([#1822](https://github.com/IDuxFE/idux/issues/1822)) ([6b29646](https://github.com/IDuxFE/idux/commit/b372290f615ce5a72ed24d565d1b3a7f0310685a))
* **comp:select:** 单选场景下，选项被选中后应当清楚搜索的输入 ([#1843](https://github.com/IDuxFE/idux/issues/1843)) ([15daf1c](https://github.com/IDuxFE/idux/commit/6fbf32bf51c09476b7ab414229e4c64d3b5b0202))
* **comp:select:** 当类型从单选动态改为多选的时候，输入框的长度不正确 ([#1829](https://github.com/IDuxFE/idux/issues/1829)) ([91c1f34](https://github.com/IDuxFE/idux/commit/0c7e0a44a0148be61803a51d021d5dbe05c755e8))
* **comp:table:** 不连续的固定列，在滚动后固定效果出现问题，没有正常固定 ([#1835](https://github.com/IDuxFE/idux/issues/1835)) ([9a8332b](https://github.com/IDuxFE/idux/commit/d2c4f17385b1ea5ac21d65571494b6a3de6d2fd8))
* **comp:table:** 树表格的连线显示不正常 ([#1844](https://github.com/IDuxFE/idux/issues/1844)) ([2405527](https://github.com/IDuxFE/idux/commit/3e1b72fa1c0995fc30061d468bf8eac374157e28))
* **comp:table:** 表格内容和表头的横向滚动位置同步，在有虚拟滚动的情况下，应当使用虚拟滚动的scrollTo来设置，而不是直接设置容器的滚动，避免白屏问题 ([#1834](https://github.com/IDuxFE/idux/issues/1834)) ([383ca7d](https://github.com/IDuxFE/idux/commit/18b9e6b6cefcc6e0fbc25c53914e62a629c52455))
* **comp:tree:** 修改树节点连线以及图标之间的布局和间距，使其符合设计规范 ([#1839](https://github.com/IDuxFE/idux/issues/1839)) ([f091062](https://github.com/IDuxFE/idux/commit/de649a98cfabf9ede54a1707e1a0f2ed31d280ea))
* **pro:table:** 当刚好滚动到布局工具触发按钮与列边界线重合后，鼠标悬浮到布局工具的触发按钮上时，不应当触发resize ([#1838](https://github.com/IDuxFE/idux/issues/1838)) ([ba1b33e](https://github.com/IDuxFE/idux/commit/de649a98cfabf9ede54a1707e1a0f2ed31d280ea))


### Features

* **cdk:scroll:** 虚拟滚动的 scrollTo 方法支持设置横向滚动位置和目标 ([#1833](https://github.com/IDuxFE/idux/issues/1833)) ([d062236](https://github.com/IDuxFE/idux/commit/437c0348d8df072d2f15235423203ac2eda7901b))


### BREAKING CHANGES

* **cdk:scroll:** scrollTo 选项 `index` 已经废弃, 请使用 `rowIndex`
* **cdk:scroll:** scrollTo 选项 `offset` 已经废弃, 请使用 `verticalOffset`
* **cdk:scroll:** scrollTo 选项 `key` 已经废弃, 请使用 `rowKey`
* **cdk:scroll:** scrollTo 选项 `align` 已经废弃, 请使用 `verticalAlign`

# 2.0.0-beta.6(2024-01-17)


### Bug Fixes

* **cdk:popper:** 箭头的尺寸没有被正确计算 ([#1813](https://github.com/IDuxFE/idux/issues/1813)) ([f7abe16](https://github.com/IDuxFE/idux/commit/f7abe16f9b8bf71124d46fc96c8a6594d36ef64e))
* **comp:*:** 修改所有的浮层默认 placement 为 bottomStart ([#1815](https://github.com/IDuxFE/idux/issues/1815)) ([4189049](https://github.com/IDuxFE/idux/commit/4189049b6e151ceaca7f0c29ea1f249e525e7646))
* **comp:alert:** 修改 alert 图标的 margin-right 为 marginSizeXs([#1802](https://github.com/IDuxFE/idux/issues/1802)) ([4df6f97](https://github.com/IDuxFE/idux/commit/4df6f97f89afcfd47f33b9279afc4ebe02714829))
* **comp:collapse:** 修改头部前缀的 margin-right 为 marginSizeMd ([#1811](https://github.com/IDuxFE/idux/issues/1811)) ([6bf6655](https://github.com/IDuxFE/idux/commit/6bf6655451c2066a6b1136b95886d246eafbb0bd))
* **comp:header:** 修改竖条的高度为文字高度减去2px ([#1804](https://github.com/IDuxFE/idux/issues/1804)) ([972bd64](https://github.com/IDuxFE/idux/commit/972bd64a73f456dbb540e99df5dc7a69ea383895))
* **comp:select:** 主题token optionGroupMargin 的单位错误 ([#1821](https://github.com/IDuxFE/idux/issues/1821)) ([c1c2906](https://github.com/IDuxFE/idux/commit/c1c2906b76292206dc939682676ab5ca005c4fd7))
* **pro:search:** 快捷搜索面板的搜索条展开后上方被遮挡 ([#1819](https://github.com/IDuxFE/idux/issues/1819)) ([c6824ea](https://github.com/IDuxFE/idux/commit/c6824ea4efaa3548015a831e7e3f5c15cd7b31d7))


### Features

* **cdk:scroll:** 虚拟滚动新增模拟滚动模式支持 ([#1812](https://github.com/IDuxFE/idux/issues/1812)) ([17ccefa](https://github.com/IDuxFE/idux/commit/17ccefaf3cd0689e12e69be9d5af95578a12eae5))
* **pro:search:** select field 支持缓存已选的源数据 ([#1814](https://github.com/IDuxFE/idux/issues/1814)) ([6e80276](https://github.com/IDuxFE/idux/commit/6e80276e2b6461c98f2946b490e1d48ac0dcdc35))

# 2.0.0-beta.5(2024-01-08)


### Bug Fixes

* **cdk:popper:** 修改默认的 placement 为 `bottomStart` ([#1785](https://github.com/IDuxFE/idux/issues/1785)) ([5d9ddc4](https://github.com/IDuxFE/idux/commit/5d9ddc4d9e21226c9d7ef89b223cc4eb574ac611))
* **comp:collapse:** 修改 header 的字体大小为 fontSizeHeaderSm ([#1790](https://github.com/IDuxFE/idux/issues/1790)) ([664c34b](https://github.com/IDuxFE/idux/commit/664c34bb1b1b5a00b8685a13742f400a2169f8ed))
* **comp:head:** 修改头部组件竖线样式 ([#1781](https://github.com/IDuxFE/idux/issues/1781)) ([12278ef](https://github.com/IDuxFE/idux/commit/12278ef297d1878a7cd7e273f542a2e0c87b3048))
* **comp:popover,tooltip:** 将paddings相关css样式改为引用主题样式 ([#1780](https://github.com/IDuxFE/idux/issues/1780)) ([0c2be7b](https://github.com/IDuxFE/idux/commit/0c2be7b23582e13cbf1595703cfc90b2584a1739))
* **comp:table:** 数据为空时不应当展示分页 ([#1782](https://github.com/IDuxFE/idux/issues/1782)) ([85d80e1](https://github.com/IDuxFE/idux/commit/85d80e174ad0fb81c7b04001a67bc86cdf98479b))
* **comp:table:** scroll相关的class应当由表格是否有滚动溢出判断 ([#1798](https://github.com/IDuxFE/idux/issues/1798)) ([dfbaec7](https://github.com/IDuxFE/idux/commit/dfbaec78965f7d29b994842845c148b9ee7ec5f3))
* **comp:table:** 表格的头部在列宽未计算时不显示 ([#1794](https://github.com/IDuxFE/idux/issues/1794)) ([7a1cd70](https://github.com/IDuxFE/idux/commit/7a1cd702e367fa494fe507c83231f4529ed56ee5))
* **comp:tabs:** segment类型的tab在选中时不应当字体加粗 ([#1788](https://github.com/IDuxFE/idux/issues/1788)) ([7a8a89f](https://github.com/IDuxFE/idux/commit/7a8a89fb1b5440abe93cee14d9a6a21e4a163d17))
* **comp:tag:** 修改normal类型的标签背景颜色 ([#1792](https://github.com/IDuxFE/idux/issues/1792)) ([5990a28](https://github.com/IDuxFE/idux/commit/5990a284794ecfb10595c8d2cfede460ba3499ed))
* **comp:timeline:** 修改 contentMarginBottom 主题token为 marginSizeLg ([#1791](https://github.com/IDuxFE/idux/issues/1791)) ([bc3b27f](https://github.com/IDuxFE/idux/commit/bc3b27f453adb23202ea7a0de08238ede3f5eb30))
* **comp:tree:** 根据设计稿修改树连线样式 ([#1783](https://github.com/IDuxFE/idux/issues/1783)) ([ca64a1e](https://github.com/IDuxFE/idux/commit/ca64a1e0b0e60bfa301aa78518b173b6668be4dd))
* **comp:upload:** 当maxCount为1时，后面选中的文件不会自动上传 ([#1786](https://github.com/IDuxFE/idux/issues/1786)) ([400a0b4](https://github.com/IDuxFE/idux/commit/400a0b4cb1db93f8354e53c97c3384115ae04bae))
* **comp:upload:** 文件列表中移除按钮图标修改为 'close' ([#1787](https://github.com/IDuxFE/idux/issues/1787)) ([f862fdf](https://github.com/IDuxFE/idux/commit/f862fdf59e4c22cf8171e6e2e7f650940120baba))
* **comp:** 修改 offline 相关颜色主题token ([#1789](https://github.com/IDuxFE/idux/issues/1789)) ([00cd10c](https://github.com/IDuxFE/idux/commit/00cd10cd033c37e6c83e3a8aa5689d8b8bc85d86))
* **pro:search:** container的zIndex在没有聚焦时不应当被绑定 ([#1795](https://github.com/IDuxFE/idux/issues/1795)) ([613079d](https://github.com/IDuxFE/idux/commit/613079d37e43bcf3c36cd05f4dcbeb0cdec4ab88))
* **pro:search:** 将间距相关的css样式改为引用主题变量 ([#1793](https://github.com/IDuxFE/idux/issues/1793)) ([6505440](https://github.com/IDuxFE/idux/commit/65054408d5dc1ea5ddff19cb3b34c9087faba995))
* **pro:search:** 可搜索的搜索项，在勾选选项之后应当保留搜索字符串 ([#1796](https://github.com/IDuxFE/idux/issues/1796)) ([97cf777](https://github.com/IDuxFE/idux/commit/97cf77786e8bab7303c3dc212a80b5c465ed772b))

### Features

* **comp:table:** 列的 align 配置支持 cell and title，即表头和表体的对齐方式分开配置 ([#1784](https://github.com/IDuxFE/idux/issues/1784)) ([7a69ea1](https://github.com/IDuxFE/idux/commit/7a69ea147bbabd269d7cb36b3d914a1b2969e316))
* **comp:tag:** 支持组合标签 ([#1779](https://github.com/IDuxFE/idux/issues/1779)) ([318d8ef](https://github.com/IDuxFE/idux/commit/318d8efa3700c1f8da8a39e11bf5fbd236e26626))

# 2.0.0-beta.4(2023-12-27)


### Bug Fixes

* **comp:select:** selectOptionFontSize 主题变量在css文件中引用错误 ([#1777](https://github.com/IDuxFE/idux/issues/1777)) ([3cd5982](https://github.com/IDuxFE/idux/commit/3cd5982632eb4eca1bb03d24c7b1f16976d1010f))


### Features

* **cdk:scroll:** 支持横向虚拟滚动 ([#1775](https://github.com/IDuxFE/idux/issues/1775)) ([4b39705](https://github.com/IDuxFE/idux/commit/4b39705af35cff3422dc7666777409c2f80030b1))
* **comp:table:** 支持横向虚拟滚动提升大量数据列渲染性能，使用 `virtualHorizontal` 配置 ([#1776](https://github.com/IDuxFE/idux/issues/1776)) ([bb77f91](https://github.com/IDuxFE/idux/commit/bb77f9138ee0b46408f07b9149092f7964babc64))


### BREAKING CHANGES

* **cdk:scroll:** itemHeight 已经废弃, 请使用 rowHeight
* **cdk:scroll:** itemRender 已经废弃, 请使用 rowRender

# 2.0.0-beta.3(2023-12-11)


### Bug Fixes

* **cdk:forms:** `interactions` trigger 表现异常 ([#1770](https://github.com/IDuxFE/idux/issues/1770)) ([c099b1a](https://github.com/IDuxFE/idux/commit/c099b1a50545ecc28c40a7610320614dbf23866e))
* **comp:pagination:** 修改 lg 尺寸下的字体大小为 fontSizeSm ([#1761](https://github.com/IDuxFE/idux/issues/1761)) ([076d924](https://github.com/IDuxFE/idux/commit/076d9242092735b71dc52d283b33c094ff592b5c))
* **pro:layout:** dark模式下的菜单浮层样式异常 ([#1771](https://github.com/IDuxFE/idux/issues/1771)) ([98c6d98](https://github.com/IDuxFE/idux/commit/98c6d98a30ae24c99913de4b3aafcd2ebe5ec595))
* **pro:layout:** logo的title文字颜色主题token引用不正确 ([#1759](https://github.com/IDuxFE/idux/issues/1759)) ([f44039d](https://github.com/IDuxFE/idux/commit/f44039d1dac65480ddde1a3b7afbaf3e9fefa6ba))
* **pro:layout:** 主题css没有配置自动注入时，样式异常 ([#1769](https://github.com/IDuxFE/idux/issues/1769)) ([f7bbf20](https://github.com/IDuxFE/idux/commit/f7bbf2072fdc1b84486882659a1e3c1515bd81f8))


### Features

* **cdk:forms:** 新增 `interactions` 的校验触发方式 ([#1766](https://github.com/IDuxFE/idux/issues/1766)) ([dcdbfb3](https://github.com/IDuxFE/idux/commit/dcdbfb3effa0461edb0806fe4b08b59c78e45833))
* **comp:drawer:** distance（多浮层的间距） 可以配置，并且会根据浮层的尺寸差自动计算 ([#1767](https://github.com/IDuxFE/idux/issues/1767)) ([949e855](https://github.com/IDuxFE/idux/commit/949e855c4d19caab5f174f96816a88f3203818f9))
* **comp:table:** 给表格容器的水平方向溢出的侧边加上内嵌阴影 ([#1768](https://github.com/IDuxFE/idux/issues/1768)) ([65a1aca](https://github.com/IDuxFE/idux/commit/65a1acac6de4c3cfc1116af54f45ceb4ac0562e6))
* **comp:table:** 修改 rowHeight 主题token为 padding，表格行不再指定高度，而是通过padding撑开 ([#1760](https://github.com/IDuxFE/idux/issues/1760)) ([48f0394](https://github.com/IDuxFE/idux/commit/48f03943b5adb6a3fb731d14077bc84fb0526884))
* **comp:theme:** 最外层的 IxThemeProvider 不再是必须的 ([#1765](https://github.com/IDuxFE/idux/issues/1765)) ([3565d49](https://github.com/IDuxFE/idux/commit/3565d49edc951dabfd6ea25150923be70d1777ff))
* 修改禁用背景颜色相关的主题token ([#1764](https://github.com/IDuxFE/idux/issues/1764)) ([29566d5](https://github.com/IDuxFE/idux/commit/29566d5867ea08db3d5a9efa902ebe5d29328d7d))

# 2.0.0-beta.2(2023-12-01)


### Bug Fixes

* **comp:checkbox:** 配置 `buttoned` 时，button的主题没有没正确注册 ([#1758](https://github.com/sallerli1/idux/issues/1758)) ([64bb7a3](https://github.com/sallerli1/idux/commit/64bb7a36d4656ac35119d0daed559073e3a4a8ba))
* 样式依赖在按需引入时有缺失 ([#1755](https://github.com/sallerli1/idux/issues/1755)) ([48b7e73](https://github.com/sallerli1/idux/commit/48b7e736963436ff4527d81af7dd89765c4aec93))


### Features

* 为按需引入增加组件的主题变量入口 ([#1756](https://github.com/sallerli1/idux/issues/1756)) ([67173bf](https://github.com/sallerli1/idux/commit/67173bf7e39371f7d039ada1d6aeab95e32ab6b9))

# 2.0.0-beta.1(2023-11-29)

### Features

* 新增暗黑主题 ([#1751](https://github.com/sallerli1/idux/issues/1751)) ([411ed2b](https://github.com/sallerli1/idux/commit/411ed2b90f15e3b8c7f1989429fa023065304143))

# 2.0.0-beta.0(2023-11-23)


### Features

* **cdk:theme:** 新增 cdk `useTheme` API ([#1739](https://github.com/sallerli1/idux/issues/1739)) ([f34f0e5](https://github.com/sallerli1/idux/commit/f34f0e573d294719abe216dd2f3fbf196bcd021b))
* 新增基于design token实现的动态主题支持 ([#1737](https://github.com/sallerli1/idux/issues/1737)) ([ea22a8f](https://github.com/sallerli1/idux/commit/ea22a8fa8fb863a4c546b9af62025718779d3463))
* 移除 typography 组件和指令 ([#1738](https://github.com/sallerli1/idux/issues/1738)) ([ed6462a](https://github.com/sallerli1/idux/commit/ed6462ac516a8aaec6cc9774f9ee7210e593ffc0))


### BREAKING CHANGES

* typography 已经被移除
* 原有的css变量和less变量被移除，现全部修改为token变量
* 原有的默认主题被移除，seer主题现在被作为默认主题 default
* 原有的样式入口被移除，现在的入口是 index.less、index.css、index.full.css

## 1.12.4(2024-01-02)


### Bug Fixes

* **pro:search:** 非multiple的搜索项，受控添加的新搜索项应当覆盖创建但未确认的搜索项 ([#1778](https://github.com/IDuxFE/idux/issues/1778)) ([617c192](https://github.com/IDuxFE/idux/commit/617c192e190ef902e591b4fb3e1de6227ee50946))

## 1.12.3(2023-12-05)


### Bug Fixes

* **cdk:drag-drop:** 去掉user-select none ([#1743](https://github.com/IDuxFE/idux/issues/1743)) ([d76dcda](https://github.com/IDuxFE/idux/commit/d76dcdabf443c1aa3399d82271fbbcbee79e260f))
* **comp:button:** 禁用时应该设置pointer events none([#1744](https://github.com/IDuxFE/idux/issues/1744)) ([2ca124d](https://github.com/IDuxFE/idux/commit/2ca124d5b8ee8a20496e67970d0e563fe2e8dba1))
* **comp:desc:** header插槽显示不正常 ([#1742](https://github.com/IDuxFE/idux/issues/1742)) ([dd1aab8](https://github.com/IDuxFE/idux/commit/dd1aab86dc429858d8919ff9c438839d7f688e32))
* **comp:desc:** 使用div包裹header解决布局问题 ([#1752](https://github.com/IDuxFE/idux/issues/1752)) ([dd31ee4](https://github.com/IDuxFE/idux/commit/dd31ee4aee432327eab90356625bbd8ed91c01af))
* **comp:input:** sufix 在有清除按钮时无法点击 ([#1745](https://github.com/IDuxFE/idux/issues/1745)) ([4769dcd](https://github.com/IDuxFE/idux/commit/4769dcd7f58f56662b6098e77ad9009aa2eafdea))
* **comp:radio:** gap 在配置 0px 时表现异常 ([#1740](https://github.com/IDuxFE/idux/issues/1740)) ([9ecd14a](https://github.com/IDuxFE/idux/commit/9ecd14aa5663399f1e3c92d3f40d8f5f05ad9dee))
* **pro:search:** 当key是0的时候表现不正常 ([#1748](https://github.com/IDuxFE/idux/issues/1748)) ([9d996ce](https://github.com/IDuxFE/idux/commit/9d996cedbfb1c6748911ae6e6e3e263177444737))
* **pro:table:** layoutool checkbox在禁用时不应当可点击 ([#1741](https://github.com/IDuxFE/idux/issues/1741)) ([0905872](https://github.com/IDuxFE/idux/commit/0905872941527f73d5acf56e0dc18d4768c2ad11))

## 1.12.2(2023-11-06)


### Bug Fixes

* **comp:table:** 没有相邻的下一个兄弟节点的树节点，不应当在节点下面展示连线 ([#1735](https://github.com/IDuxFE/idux/issues/1735)) ([bb75c13](https://github.com/IDuxFE/idux/commit/bb75c1337fe91c2372d07fb96b6c13b4d1734f7a))
* **pro:search:** 在没有任何搜索项溢出时，不应当显示溢出的数量 ([#1736](https://github.com/IDuxFE/idux/issues/1736)) ([a436e92](https://github.com/IDuxFE/idux/commit/a436e921ded880b9e2eecc88efef63d2d27e90aa))

## 1.12.1(2023-11-03)


### Bug Fixes

* **comp:table:** 表格展开收起列的单元格布局改为flex，解决垂直居中以及文字超长连线显示不正确的问题 ([#1729](https://github.com/IDuxFE/idux/issues/1729)) ([4589e83](https://github.com/IDuxFE/idux/commit/4589e83b8eb95712189f040ed28761807ac5e844))
* **comp:text:** 当文字中有换行，或者文字有多行（例如IP）组成时，ellipsis不生效 ([#1730](https://github.com/IDuxFE/idux/issues/1730)) ([ed78fe3](https://github.com/IDuxFE/idux/commit/ed78fe38b169d3413ff436fc06babc053421aa9c))
* **comp:text:** IxText组件根节点应当继承外部传递的attrs属性 ([#1731](https://github.com/IDuxFE/idux/issues/1731)) ([75b49bf](https://github.com/IDuxFE/idux/commit/75b49bf09e9d780ff7ef6ff225198640e90c485e))
* **pro:search:** 溢出的搜索项数量显示不正确 ([#1732](https://github.com/IDuxFE/idux/issues/1732)) ([2e8fc95](https://github.com/IDuxFE/idux/commit/2e8fc9500ed741cb297ea428bf0c0b346607767a))
* **pro:search:** 在快捷选择面板中的 select 不应当有初始的激活选项 ([#1733](https://github.com/IDuxFE/idux/issues/1733)) ([a967f9b](https://github.com/IDuxFE/idux/commit/a967f9b64276592d4d1173112f8b0992abea03db))

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
