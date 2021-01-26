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
