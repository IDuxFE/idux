---
category: components
type: 数据展示
order: 0
title: Comment 评论
subtitle:
---

## API

### IxComment

#### CommentProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
|`author` |评论作者名字的元素 |`string \| #author` | - | - | - |
|`avatar` |评论头像的元素 |`string \| object \| #avatar` | - | - | 当参数为`object`时，参考 [Avatar](/components/avatar/zh) |
|`content` |评论的主要内容 |`string \| #content` | - | - | - |
|`datetime` |展示时间描述 |`string \| #datetime` | - | - | - |

#### CommentSlots

|名称 |说明 |参数类型 |备注
| --- | --- | --- | --- |
|`default` |嵌套评论的子项 |- |-
|`actions` |在评论内容下面呈现的操作项列表 |- |- |- -

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@comment-padding-md` | `@spacing-md 0` | - | - |
| `@comment-margin-right` | `@spacing-md` | - | - |
| `@comment-font-size-md` | `@font-size-md` | - | - |
| `@comment-font-size-sm` | `@font-size-sm` | - | - |
| `@comment-author-margin-bottom` | `@spacing-xs` | - | - |
| `@comment-content-padding-right` | `@spacing-sm` | - | - |
| `@comment-author-name-color` | `@text-color-secondary` | - | - |
| `@comment-author-time-color` | `#ccc` | - | - |
| `@comment-actions-margin-top` | `@margin-md` | - | - |
| `@comment-actions-margin-bottom` | `inherit` | - | - |
| `@comment-action-color` | `@text-color-secondary` | - | - |
| `@comment-action-hover-color` | `#595959` | - | - |
| `@comment-content-detail-p-margin-bottom` | `inherit` | - | - |
| `@comment-nest-indent` | `44px` | - | - |
<!--- insert less variable end  --->