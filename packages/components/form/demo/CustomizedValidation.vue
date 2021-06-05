<template>
  <ix-form class="demo-form" hasFeedback labelCol="6">
    <ix-form-item label="Valid" status="valid" :message="messageMap">
      <ix-input v-model:value="formValue.valid"></ix-input>
    </ix-form-item>
    <ix-form-item label="Validating" status="validating" :message="messageMap">
      <ix-input v-model:value="formValue.validating"></ix-input>
    </ix-form-item>
    <ix-form-item label="Invalid" status="invalid" :message="messageMap">
      <ix-input v-model:value="formValue.invalid"></ix-input>
    </ix-form-item>
    <ix-form-item label="Dynamic" :status="status" :message="messageMap">
      <ix-input v-model:value="formValue.dynamic"></ix-input>
    </ix-form-item>
    <ix-form-item :controlCol="{ offset: 6 }">
      <ix-button @click="changeStatus">Change Status</ix-button>
    </ix-form-item>
  </ix-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'

interface FormValue {
  valid?: string
  validating?: string
  invalid?: string
  dynamic?: string
}

export default defineComponent({
  setup() {
    const formValue = reactive<FormValue>({})
    watch(formValue, value => console.log('formValue', value), { deep: true })

    const status = ref('valid')
    const messageMap = {
      valid: 'This is valid field!',
      validating: 'This is validating field!',
      invalid: 'This is invalid field!',
    }

    const changeStatus = () => {
      const currStatus = status.value
      if (currStatus === 'valid') {
        status.value = 'validating'
      } else if (currStatus === 'validating') {
        status.value = 'invalid'
      } else {
        status.value = 'valid'
      }
    }

    return { formValue, status, messageMap, changeStatus }
  },
})
</script>

<style lang="less" scoped>
.demo-form {
  max-width: 400px;
}
</style>
