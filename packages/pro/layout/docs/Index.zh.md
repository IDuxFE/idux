---
category: pro
type: 布局
title: LayoutPro
subtitle: 导航布局
order: 0
single: true
---



## API

### IxLayoutPro

| 名称                 | 说明                     | 类型                                                         | 默认值                | 全局配置 | 备注                                                         |
| -------------------- | ------------------------ | ------------------------------------------------------------ | --------------------- | -------- | ------------------------------------------------------------ |
| `v-model: collapsed` | 左侧菜单折叠收起         | `boolean`                                                    | `false`               | -        | 仅对于侧边菜单生效                                           |
| `v-model:activeKey`  | 当前激活的菜单           | `VKey`                                                       | `menus`第一个叶子节点 | -        | -                                                            |
| `mode`               | 布局模式                 | `'header' \| 'sider' \| 'mixin' \| 'both'`                   | `sider`               | -        | `header`：只有顶部导航栏，不存在侧边栏<br />`sider`：只有侧边导航栏，不存在顶部导航栏<br />`mixin`：同时存在顶部栏和侧边栏，导航栏只在侧边栏<br />`both`：同时存在顶部栏和侧边栏，导航栏在两边都存在，顶部导航栏只展示第一层节点，若该顶部菜单下无子菜单则不展示`sider` |
| `menus`              | 菜单数据                 | `MenuData[]`                                                 | `[]`                  | -        | -                                                            |
| `theme`              | 主题                     | `light \| dark \| {sider: light \| dark, header: light \| dark}` | `light`               | -        | -                                                            |
| `indent`             | 侧边导航栏的缩进         | `number`                                                     | `24`                  | -        | 不为`0`则导航栏展示为内嵌形式                                |
| `fixed`              | 固定                     | `boolean \| {sider: boolean, header: boolean}`               | `true`                | -        | -                                                            |
| `breakpoint`         | 触发侧边栏折叠收起的断点 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                       | -                     | -        | -                                                            |
| `onMenuClick`        | 点击菜单回调             | `(options: MenuClickOptions) => void>`                       | `() => {}`            | -        | -                                                            |

### IxLayoutProCollapse

左树展开收起按钮组件，不需要任何配置，按需放在对应位置即可

### IxLayoutProSlot

插槽

| 名称            | 说明                                     | 参数类型          | 备注                                                   |
| --------------- | ---------------------------------------- | ----------------- | ------------------------------------------------------ |
| `logo`    | 顶部区域左侧，适合放产品线logo和名称     | -                 | 宽度按照视觉规范限宽，特殊需求覆盖less变量             |
| `extra`     | 顶部区域右侧，适合放登录状态、系统消息等 | -                 | 宽度按照视觉规范限宽，特殊需求覆盖less变量             |
| `siderTop`      | 侧边栏顶部，适合放模块标题和icon         | -                 | -                                                      |
| `siderContent`  | 侧边栏主体，适合放左树导航               | -                 | 默认展示左树导航，若配置则不展示默认的左树导航                                       |
| `siderBottom`   | 侧边栏底部，工具类插件，如折叠左树按钮   | -                 | -                                                      |
| `default`       | 页面主体                                 | `ContentSlotProp` | 加上左侧导航最小宽度1366px，再小横向滚动               |

### ContentSlotProp

| 名称         | 说明                 | 类型       | 备注 |
| ------------ | -------------------- | ---------- | ---- |
| `activeMenu` | 当前激活的菜单树路径 | `MenuData` | -    |
