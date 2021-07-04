<template>
  <div class="ix-message-container">
    <transition-group-stub
      ><div class="ix-message ix-message-info">
        <div class="ix-message-content">
          <i class="ix-icon ix-icon-info-circle" role="img" aria-label="info-circle"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="64 64 896 896"
              width="1em"
              height="1em"
              focusable="false"
              fill="currentColor"
              aria-hidden="true"
              data-icon="info-circle"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
              ></path>
              <path
                d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
              ></path></svg></i
          ><span class="ix-message-content-text">3</span>
        </div>
      </div>
      <div class="ix-message ix-message-info">
        <div class="ix-message-content">
          <i class="ix-icon ix-icon-info-circle" role="img" aria-label="info-circle"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="64 64 896 896"
              width="1em"
              height="1em"
              focusable="false"
              fill="currentColor"
              aria-hidden="true"
              data-icon="info-circle"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
              ></path>
              <path
                d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
              ></path></svg></i
          ><span class="ix-message-content-text">4</span>
        </div>
      </div></transition-group-stub
    >
  </div>
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
