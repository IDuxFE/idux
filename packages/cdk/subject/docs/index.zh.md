---
category: cdk
type:
title: Subject
subtitle: 观察者
cover:
---



## 何时使用

## API

### Subject

#### Params

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `T` | 发布参数的类型 | `T` | `void` | 是一个泛型，起发布订阅参数类型保护 |
| `constructor` | - | `() => void` | - | - |
| `dispatch` | 发布事件 | `(value: T) => void` | - | - |
| `subscribe` | 订阅事件 | `(observer: Observer<T>) => Subscription` | - | 订阅事件，利用闭包生成事件id，返回退订事件 |
| `unsubscribeAll` | 退订所有事件 | `() => void` | - |

````typescript
interface Observer<T> {
  (value: T): void
}

interface Subscription {
  unsubscribe: () => void
}
````

## DEMO

```html
<template>
  <div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Subject } from '@idux/cdk/subject'

export default defineComponent({
  setup() {
    const subject1 = new Subject()
    subject1.subscribe(() => {
      // 订阅
    })

    subject1.dispatch() // 发布

    /* Subject是一个泛型类 */
    const subject2 = new Subject<number>()

    subject2.subscribe(value => {
      // value会被推导为number
      console.log(value)
    })

    subject2.dispatch(100) // ts类型保护，传参必须为number
  },
})
</script>
```
