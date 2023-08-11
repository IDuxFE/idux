<template>
  <h3>Without Header</h3>
  <IxSpace>
    <IxButton @click="confirmNoHeaderVisible = !confirmNoHeaderVisible">Confirm</IxButton>
    <IxButton @click="infoNoHeaderVisible = !infoNoHeaderVisible">Info</IxButton>
    <IxButton @click="successNoHeaderVisible = !successNoHeaderVisible">Success</IxButton>
    <IxButton @click="warningNoHeaderVisible = !warningNoHeaderVisible">Warning</IxButton>
    <IxButton @click="errorNoHeaderVisible = !errorNoHeaderVisible">Error</IxButton>
  </IxSpace>
  <br />
  <br />
  <h3>With Header</h3>
  <IxSpace>
    <IxButton @click="confirmVisible = !confirmVisible">Confirm</IxButton>
    <IxButton @click="infoVisible = !infoVisible">Info</IxButton>
    <IxButton @click="successVisible = !successVisible">Success</IxButton>
    <IxButton @click="warningVisible = !warningVisible">Warning</IxButton>
    <IxButton @click="errorVisible = !errorVisible">Error</IxButton>
  </IxSpace>
  <IxModal v-model:visible="confirmVisible" header="Title" type="confirm" title="Are you sure delete this task?">
    <p>Some descriptions...</p>
  </IxModal>
  <IxModal v-model:visible="infoVisible" header="Title" type="info" title="This is a notification message">
    <p>Some messages...</p>
  </IxModal>
  <IxModal v-model:visible="successVisible" header="Title" type="success" title="This is a success message">
    <p>Some messages...</p>
  </IxModal>
  <IxModal v-model:visible="warningVisible" header="Title" type="warning" title="This is an warning message">
    <p>Some messages...</p>
  </IxModal>
  <IxModal v-model:visible="errorVisible" header="Title" type="error" title="This is an error message">
    <p>Some messages...</p>
  </IxModal>

  <IxModal v-model:visible="confirmNoHeaderVisible" type="confirm" title="Are you sure delete this task?">
    <p>Some descriptions...</p>
  </IxModal>
  <IxModal v-model:visible="infoNoHeaderVisible" type="info" title="This is a notification message">
    <p>Some messages...</p>
  </IxModal>
  <IxModal v-model:visible="successNoHeaderVisible" type="success" title="This is a success message">
    <p>Some messages...</p>
  </IxModal>
  <IxModal v-model:visible="warningNoHeaderVisible" type="warning" title="This is an warning message">
    <p>Some messages...</p>
  </IxModal>
  <IxModal v-model:visible="errorNoHeaderVisible" type="error" title="This is an error message">
    <p>Some messages...</p>
  </IxModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const confirmVisible = ref(false)
const infoVisible = ref(false)
const successVisible = ref(false)
const warningVisible = ref(false)
const errorVisible = ref(false)

const confirmNoHeaderVisible = ref(false)
const infoNoHeaderVisible = ref(false)
const successNoHeaderVisible = ref(false)
const warningNoHeaderVisible = ref(false)
const errorNoHeaderVisible = ref(false)
</script>
