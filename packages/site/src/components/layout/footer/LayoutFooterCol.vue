<template>
  <div class="footer-column">
    <h3>
      <span v-if="icon" class="footer-column-icon">
        <IxIcon :name="icon" />
      </span>
      {{ title }}
    </h3>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['icon', 'title'],
})
</script>
