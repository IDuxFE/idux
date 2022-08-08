## API

### IxResult

#### ResultProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `icon` | 自定义图标 | `string \| VNode \| #icon` | - | ✅ | - |
| `status` | 当前结果的状态 | `ResultStatus` | - | ✅ | 结果的状态，决定图标和颜色 |
| `subtitle` | subtitle 文字 | `string \| #subtitle` | - | - | `slot`形式优先级高于`prop` |
| `title` | title文字 | `string \| #title` | - | - | `slot`形式优先级高于`prop` |

```typescript
type ResultStatus = 'success' | 'error' | 'info' | 'warning'
```

#### ResultSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 复杂的情况说明，用于显示更多的信息 | - | - |
| `extra` | 操作区 | - | - |
