<template>
  <ix-textarea autoRows placeholder="textarea autoRows" />
  <br /><br />
  <ix-textarea :autoRows="{ minRows: 3, maxRows: 6 }" placeholder="textarea autoRows" />
</template>
