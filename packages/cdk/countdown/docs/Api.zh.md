### useCountdown

```ts

export type Precision = 0 | 1 | 2 | 3

export interface Countdown {
  hours: Ref<string>
  minutes: Ref<string>
  seconds: Ref<string>
  milliseconds: Ref<string>
  active: Ref<boolean>
  reset: () => void
}

export interface Options {
  immediate?: boolean
  precision?: Precision | Ref<Precision>
  fps?: number
  onFinish?: () => void
}

function useCountdown(time: number, options?: Options): Countdown
```

#### 参数

| 名称 | 说明 | 类型  | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| time | 倒计时持续时间 | `number` | - | 必填，单位毫秒 |
| options.immediate | 是否立即执行 | `boolean` | `false` | - |
| options.precision | 毫秒位精确度 | `Ref<Precision> \| Precision` | `0` | 当传入响应式数据时，可以动态改变位数 |
| options.fps | 刷新频率 | `number` | `1000 / 30` | - |
| options.onFinish | 倒计时完成时的回调 | `() => void` | - | - |

#### 返回值

| 名称 | 说明 | 类型  | 备注 |
| --- | --- | --- | --- |
| hours | 小时 | `Ref<string>`  | - |
| minutes | 分钟 | `Ref<string>` | - |
| seconds | 秒 | `Ref<string>` | - |
| milliseconds | 毫秒 | `Ref<string>` | - |
| active | 是否开启倒计时 | `Ref<boolean>` | 通过`options.immediate`来设置此值的默认值；改变此值可以用来暂停和开启倒计时 |
| reset | 重置 | `() => void` | 重置不受`active`状态影响 |
