<template>
  <ix-form class="demo-form" :control="formGroup" labelCol="8">
    <ix-row gutter="24">
      <ix-col v-for="index in controlLength" :key="index" span="8">
        <ix-form-item v-show="showMore || index < 7" :control="'field' + index" :label="'Field ' + index">
          <ix-input></ix-input>
        </ix-form-item>
      </ix-col>
    </ix-row>
    <ix-row>
      <ix-col span="24" class="text-right">
        <ix-space>
          <ix-button mode="primary" @click="onSearch">Search</ix-button>
          <ix-button @click="onClear">Clear</ix-button>
          <ix-button mode="link" :icon="showMore ? 'up' : 'down'" @click="showMore = !showMore">Collapse</ix-button>
        </ix-space>
      </ix-col>
    </ix-row>
  </ix-form>
</template>

<script lang="ts">
import { useFormControl, useFormGroup } from '@idux/cdk/forms'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const controlLength = 12
    const showMore = ref(false)
    const formGroup = useFormGroup({})

    for (let index = 1; index <= controlLength; index++) {
      const control = useFormControl()
      formGroup.addControl(`field${index}`, control)
    }

    const onSearch = () => console.log('search', formGroup.getValue())
    const onClear = () => formGroup.reset()

    return { controlLength, showMore, formGroup, onSearch, onClear }
  },
})
</script>

<style lang="less" scoped>
.demo-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.text-right {
  text-align: right;
}
</style>
