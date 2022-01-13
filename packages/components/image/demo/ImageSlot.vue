<template>
  <IxImage src="/images/example/html.png" width="200">
    <template #previewIcon>
      <IxIcon name="eye" class="preview"></IxIcon>
    </template>
    <template #fallback>
      <div class="fallback">Failed!</div>
    </template>
    <template #placeholder>
      <div>loading...</div>
    </template>
  </IxImage>
</template>

<style scoped lang="less">
.preview {
  font-size: 24px;
  color: #ffffff;
}
.fallback {
  color: #cf171d;
}
</style>
