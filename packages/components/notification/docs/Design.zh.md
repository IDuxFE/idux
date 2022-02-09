## 组件定义

全局的、非打断性的通知消息提示。

## 使用场景

- 用于系统主动推送但不希望打断用户的消息（如”报表已成功导出“、”探针版本已更新，5分钟后将重启设备“等）。  
- 若提示的信息较重要或需要用户确认和决策，请使用【Modal对话框】组件。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 通知概要 | 通知的概要内容。 |
| 消息类型图标 | 与文本搭配使用，用于区分消息类型 |
| 关闭按钮 | 点击可关闭通知提示。 |
| 通知详情（可选） | 用于进一步说明通知的详情内容，应保持简洁，不应超过三行，允许附带文本按钮。 |

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 信息提示 | 用于提示辅助性的、不带感情色彩的信息。 |
| 成功提示 | 用于提示一个操作或任务的完成。 |
| 警告提示 | 用于提示用户操作或系统状态可能得到不合意的结果。 |
| 错误提示 | 用于提示系统错误和异常，通常收到此类提示时用户无法进行到下一步。 |

## 组件状态

1. 通知提示在页面默认停留5s后自动消失，停留时长可配置，也可以设置为不自动消失。  
2. 当多条提示同时出现时，纵向堆叠，最新的在最底部，当旧的消失时，其余的整体往上移动；堆叠不应超过页面2/3的高度，超出后，旧的消息应自动消失（例如页面的2/3高度可承载6条消息，则再出现第七条消息时，自动将第一条挤走）。

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@notification-padding` | `8px 8px 8px 16px` | - | - |
| `@notification-margin` | `0 0 16px 0` | - | - |
| `@notification-width` | `384px` | - | - |
| `@notification-max-width` | `calc(100vw - 48px)` | - | - |
| `@notification-font-size` | `@font-size-md` | - | - |
| `@notification-line-height` | `@line-height-base` | - | - |
| `@notification-bg-color` | `@background-color-component` | - | - |
| `@notification-border-radius` | `@border-radius-sm` | - | - |
| `@notification-box-shadow` | `@shadow-bottom-md` | - | - |
| `@notification-icon-font-size` | `@font-size-lg` | - | - |
| `@notification-icon-margin` | `4px 8px 0 0` | - | - |
| `@notification-icon-flex-direction` | `row` | - | - |
| `@notification-icon-wrap-width` | `44px` | - | - |
| `@notification-close-width` | `14px` | - | - |
| `@notification-close-font-size` | `@font-size-sm` | - | - |
| `@notification-close-right` | `8px` | - | - |
| `@notification-close-top` | `8px` | - | - |
| `@notification-title-font-size` | `@font-size-lg` | - | - |
| `@notification-title-line-height` | `@line-height-base` | - | - |
| `@notification-title-margin` | `0 16px 8px 0` | - | - |
| `@notification-content-font-size` | `@font-size-md` | - | - |
| `@notification-content-color` | `@color-graphite-d10` | - | - |
| `@notification-footer-margin` | `8px 0 0 0` | - | - |
| `@notification-wrapper-zindex` | `@zindex-l4-1` | - | - |
