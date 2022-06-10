<template>
  <IxDivider labelPlacement="start" dashed>Normal</IxDivider>
  <IxRow>
    <IxCol :span="6" :order="4"> 1 order-4 </IxCol>
    <IxCol :span="6" :order="3"> 2 order-3 </IxCol>
    <IxCol :span="6" :order="2"> 3 order-2 </IxCol>
    <IxCol :span="6" :order="1"> 4 order-1 </IxCol>
  </IxRow>

  <IxDivider labelPlacement="start" dashed>Responsive</IxDivider>
  <IxRow>
    <IxCol :span="6" :xs="{ order: 1 }" :sm="{ order: 2 }" :md="{ order: 3 }" :lg="{ order: 4 }"> 1 </IxCol>
    <IxCol :span="6" :xs="{ order: 2 }" :sm="{ order: 3 }" :md="{ order: 4 }" :lg="{ order: 1 }"> 2 </IxCol>
    <IxCol :span="6" :xs="{ order: 3 }" :sm="{ order: 4 }" :md="{ order: 1 }" :lg="{ order: 2 }"> 3 </IxCol>
    <IxCol :span="6" :xs="{ order: 4 }" :sm="{ order: 1 }" :md="{ order: 2 }" :lg="{ order: 3 }"> 4 </IxCol>
  </IxRow>
</template>
