<template>
  <IxSpace vertical size="md">
    <IxSpace>
      <IxTagGroup :gap="0">
        <IxTag filled>未定级</IxTag>
        <IxTag>1.27</IxTag>
      </IxTagGroup>
      <IxTagGroup :gap="0">
        <IxTag status="success" filled>安全</IxTag>
        <IxTag status="success">2.33</IxTag>
      </IxTagGroup>
      <IxTagGroup :gap="0">
        <IxTag status="info" filled>信息</IxTag>
        <IxTag status="info">3.69</IxTag>
      </IxTagGroup>
      <IxTagGroup :gap="0">
        <IxTag status="warning" filled>低危</IxTag>
        <IxTag status="warning">5.13</IxTag>
      </IxTagGroup>
      <IxTagGroup :gap="0">
        <IxTag status="risk" filled>中危</IxTag>
        <IxTag status="risk">7.03</IxTag>
      </IxTagGroup>
      <IxTagGroup :gap="0">
        <IxTag status="error" filled>高危</IxTag>
        <IxTag status="error">9.21</IxTag>
      </IxTagGroup>
      <IxTagGroup :gap="0">
        <IxTag status="fatal" filled>严重</IxTag>
        <IxTag status="fatal">10.33</IxTag>
      </IxTagGroup>
    </IxSpace>
    <IxSpace>
      <IxTagGroup :gap="0">
        <IxTag filled style="--ix-tag-color: #f9dc97; --ix-tag-background-color: #5a616f">恶意病毒</IxTag>
        <IxTag>1.27</IxTag>
      </IxTagGroup>
      <IxTagGroup :gap="0">
        <IxTag filled style="--ix-tag-color: #fff; --ix-tag-background-color: #6f7785">ATTACK</IxTag>
        <IxTag style="--ix-tag-color: #6f7785; --ix-tag-background-color: #e1e5eb">持久化</IxTag>
      </IxTagGroup>
    </IxSpace>
  </IxSpace>
</template>
