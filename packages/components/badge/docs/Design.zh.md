## 组件定义

- 出现在按钮、图标、文字旁的数字或状态标记。  
- 提示用户有该模块有新内容，用户可通过点击下钻等方式查看徽标对应的内容时，徽标消失。

## 使用场景

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 数字用法 | 当需要让用户精确了解有多少条更新且新内容有多条时使用，常用于消息、邮件或互动类内容的未读提醒。 |
| 大数字 | 由于应用内部界面显示空间有限，一般信息达到100后均以99+展示，如MOA；由于邮件存在1000+的场景，因此仅邮件场景下可以出现999+，如安全邮箱。 |
| 小红点 | 路径清晰可见：小红点不是孤立使用的，一项功能或业务的运营涉及多个层级多个入口，所以小红点需要有清晰的路径导向，而且包含路径树的概念，父路径的小红点为子路径小红点的并集。<br />事件触发逐层反馈：当任意子路径有红点触发事件时，父路径也需显示红点。而当所有子路径的红点事情都清除后，父路径的红点才能清除。 |
| 自定义徽标内容 | 适用场景：推广运营活动的引流。文字型与点状型一样，都只需要用户知道大致有内容、功能、版本等的更新；与点状型不同的是，文字型可以展示更多扩展的信息。 |
