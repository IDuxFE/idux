<template>
  <div class="footer-item">
    <IxTooltip :title="tooltip">
      <a :href="link" target="_blank" rel="noopener">
        <span v-if="icon" class="footer-item-icon">
          <IxIcon :name="icon"></IxIcon>
        </span>
        {{ title }}
        <slot></slot>
      </a>
      <template v-if="description">
        <span class="footer-item-separator">-</span>
        <span class="footer-item-description">{{ description }}</span>
      </template>
    </IxTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['icon', 'title', 'link', 'description', 'tooltip'],
})
</script>
