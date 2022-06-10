<template>
  <IxDivider labelPlacement="start" dashed>Percentage columns</IxDivider>
  <IxRow>
    <IxCol :flex="2">2 / 5</IxCol>
    <IxCol :flex="3">3 / 5</IxCol>
  </IxRow>

  <IxDivider labelPlacement="start" dashed>Fill rest</IxDivider>
  <IxRow>
    <IxCol flex="100px">100px</IxCol>
    <IxCol flex="auto">Fill Rest</IxCol>
  </IxRow>

  <IxDivider labelPlacement="start" dashed>Raw flex style</IxDivider>
  <IxRow>
    <IxCol flex="1 1 200px">1 1 200px</IxCol>
    <IxCol flex="0 1 300px">0 1 300px</IxCol>
  </IxRow>

  <IxDivider labelPlacement="start" dashed>No wrap</IxDivider>
  <IxRow :wrap="false">
    <IxCol flex="none"> <div :style="{ padding: '0 16px' }">none</div></IxCol>
    <IxCol flex="auto">auto with no-wrap</IxCol>
  </IxRow>
</template>
