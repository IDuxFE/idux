<template>
  <div style="width: 300px">
    <IxCheckbox v-model:checked="checked">
      Checked
      <template #fieldset>
        <IxFormItem>
          <IxInput control="username" prefix="user"></IxInput>
        </IxFormItem>
        <IxFormItem>
          <IxInput control="password" prefix="lock" suffix="eye-invisible" type="password"> </IxInput>
        </IxFormItem>
      </template>
    </IxCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
