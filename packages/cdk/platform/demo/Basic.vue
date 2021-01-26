<template>
  <h2>Platform:</h2>
  <p>Is Browser: {{ isBrowser }}</p>
  <p>Is Blink: {{ isBlink }}</p>
  <p>Is Webkit: {{ isWebKit }}</p>
  <p>Is iOS: {{ isIOS }}</p>
  <p>Is Android: {{ isAndroid }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isBrowser, isBlink, isWebKit, isIOS, isAndroid } from '@idux/cdk/platform'

export default defineComponent({
  setup() {
    return { isBrowser, isBlink, isWebKit, isIOS, isAndroid }
  },
})
</script>
