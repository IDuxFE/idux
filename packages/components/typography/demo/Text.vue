<template>
  <span v-typography>Text (default)</span>
  <span v-typography="'secondary'">Text (secondary)</span>
  <span v-typography="'success'">Text (success)</span>
  <span v-typography="'warning'">Text (warning)</span>
  <span v-typography="'error'">Text (error)</span>
  <span v-typography="{ disabled: true }">Text (disabled)</span>
  <span v-typography><mark>Text (mark)</mark></span>
  <span v-typography><code>Text (code)</code></span>
  <span v-typography><kbd>Text (keyboard)</kbd></span>
  <span v-typography><u>Text (underline)</u></span>
  <span v-typography><del>Text (delete)</del></span>
  <span v-typography><strong>Text (strong)</strong></span>
  <span v-typography><a href="https://github.com/IduxFE/idux" target="_blank">Text (link)</a></span>
</template>

<style scoped>
span.ix-typography {
  display: block;
}

span.ix-typography + span.ix-typography {
  margin-top: 8px;
}
</style>
