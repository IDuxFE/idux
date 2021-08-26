<template>
  <IxRow>
    <IxCol :xs="2" :sm="4" :md="6" :lg="8" :xl="10"> col </IxCol>
    <IxCol :xs="20" :sm="16" :md="12" :lg="8" :xl="4"> col </IxCol>
    <IxCol :xs="2" :sm="4" :md="6" :lg="8" :xl="10"> col </IxCol>
  </IxRow>
  <br />
  <IxRow>
    <IxCol :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"> col </IxCol>
    <IxCol :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }"> col </IxCol>
    <IxCol :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"> col </IxCol>
  </IxRow>
</template>
