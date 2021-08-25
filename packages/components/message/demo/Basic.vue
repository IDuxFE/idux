<template>
  <IxSpace>
    <IxButton @click="info('Info message')">Info</IxButton>
    <IxButton @click="success('Success message')">Success</IxButton>
    <IxButton @click="warning('Warning message')">Warning</IxButton>
    <IxButton @click="error('Error message')">Error</IxButton>
    <IxButton @click="loading('Loading message')">Loading</IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const { info, success, warning, error, loading } = useMessage()
    return { info, success, warning, error, loading }
  },
})
</script>
