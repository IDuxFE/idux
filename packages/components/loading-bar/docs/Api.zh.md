## API

使用 LoadingBar 只有一种方法，在 IxLoadingBarProvider 组件里面嵌套使用 `useLoadingBar`

### IxLoadingProviderBar

如果你想通过 `useLoadingBar` 来创建提示框，则你需要把组件包裹在 `IxLoadingBarProvider` 内部，因为这样才不会丢失应用的上下文信息。

#### LoadingBarProviderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| mask | `start()`后是否同时显示遮罩 | - | false | ✅ | - |

#### LoadingBarProviderMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `start` | 开始  | (LoadingBarOptions) => void | 加载并显示进度条到80%暂停 |
| `finish` | 结束 | - | 继续加载进度条到100%，然后隐藏 |
| `error` | 错误 | - | 加载并显示，进度条继续加载到100，然后隐藏 |
