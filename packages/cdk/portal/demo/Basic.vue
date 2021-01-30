<template>
  <ix-portal target="ix-container">
    <div>Portal</div>
  </ix-portal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxPortal } from '@idux/cdk/portal'

export default defineComponent({
  name: 'Basic',
  components: { IxPortal },
})
</script>
