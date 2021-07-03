<template>
  <ix-space>
    <ix-button @click="confirmVisible = !confirmVisible">Confirm</ix-button>
    <ix-button @click="infoVisible = !infoVisible">Info</ix-button>
    <ix-button @click="successVisible = !successVisible">Success</ix-button>
    <ix-button @click="warningVisible = !warningVisible">Warning</ix-button>
    <ix-button @click="errorVisible = !errorVisible">Error</ix-button>
  </ix-space>
  <ix-modal v-model:visible="confirmVisible" type="confirm" title="Are you sure delete this task?">
    <p>Some descriptions...</p>
  </ix-modal>
  <ix-modal v-model:visible="infoVisible" type="info" title="This is a notification message">
    <p>Some messages...</p>
  </ix-modal>
  <ix-modal v-model:visible="successVisible" type="success" title="This is a success message">
    <p>Some messages...</p>
  </ix-modal>
  <ix-modal v-model:visible="warningVisible" type="warning" title="This is an warning message">
    <p>Some messages...</p>
  </ix-modal>
  <ix-modal v-model:visible="errorVisible" type="error" title="This is an error message">
    <p>Some messages...</p>
  </ix-modal>
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
