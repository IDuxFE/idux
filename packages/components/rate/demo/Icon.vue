<template>
  <IxSpace direction="vertical">
    <IxRate :value="3" icon="star" />
    <IxRate :value="3">
      <template #icon>A</template>
    </IxRate>
    <IxRate :value="3">
      <template #icon="{ index }">{{ index + 1 }}</template>
    </IxRate>
  </IxSpace>
</template>
