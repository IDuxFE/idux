<template>
  <IxSpace>
    <IxButton @click="confirmVisible = !confirmVisible">Confirm</IxButton>
    <IxButton @click="infoVisible = !infoVisible">Info</IxButton>
    <IxButton @click="successVisible = !successVisible">Success</IxButton>
    <IxButton @click="warningVisible = !warningVisible">Warning</IxButton>
    <IxButton @click="errorVisible = !errorVisible">Error</IxButton>
  </IxSpace>
  <IxModal v-model:visible="confirmVisible" type="confirm" title="Are you sure delete this task?">
    <p>Some descriptions...</p>
  </IxModal>
  <IxModal v-model:visible="infoVisible" type="info" title="This is a notification message">
    <p>Some messages...</p>
  </IxModal>
  <IxModal v-model:visible="successVisible" type="success" title="This is a success message">
    <p>Some messages...</p>
  </IxModal>
  <IxModal v-model:visible="warningVisible" type="warning" title="This is an warning message">
    <p>Some messages...</p>
  </IxModal>
  <IxModal v-model:visible="errorVisible" type="error" title="This is an error message">
    <p>Some messages...</p>
  </IxModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const confirmVisible = ref(false)
    const infoVisible = ref(false)
    const successVisible = ref(false)
    const warningVisible = ref(false)
    const errorVisible = ref(false)

    return { confirmVisible, infoVisible, successVisible, warningVisible, errorVisible }
  },
})
</script>
