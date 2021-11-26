<template>
  <div style="margin-left: 60px">
    <IxPopconfirm placement="topStart" title="Are you sure to delete this task?">
      <IxButton>TS</IxButton>
    </IxPopconfirm>
    <IxPopconfirm placement="top" title="Are you sure to delete this task?">
      <IxButton>Top</IxButton>
    </IxPopconfirm>
    <IxPopconfirm placement="topEnd" title="Are you sure to delete this task?">
      <IxButton>TE</IxButton>
    </IxPopconfirm>
  </div>
  <div style="float: left; width: 60px">
    <IxPopconfirm placement="leftStart" title="Are you sure to delete this task?">
      <IxButton>LS</IxButton>
    </IxPopconfirm>
    <IxPopconfirm placement="left" title="Are you sure to delete this task?">
      <IxButton>Left</IxButton>
    </IxPopconfirm>
    <IxPopconfirm placement="leftEnd" title="Are you sure to delete this task?">
      <IxButton>LE</IxButton>
    </IxPopconfirm>
  </div>
  <div style="margin-left: 270px; width: 60px">
    <IxPopconfirm placement="rightStart" title="Are you sure to delete this task?">
      <IxButton>RS</IxButton>
    </IxPopconfirm>
    <IxPopconfirm placement="right" title="Are you sure to delete this task?">
      <IxButton>Right</IxButton>
    </IxPopconfirm>
    <IxPopconfirm placement="rightEnd" title="Are you sure to delete this task?">
      <IxButton>RE</IxButton>
    </IxPopconfirm>
  </div>
  <div style="margin-left: 60px; clear: both">
    <IxPopconfirm placement="bottomStart" title="Are you sure to delete this task?">
      <IxButton>BS</IxButton>
    </IxPopconfirm>
    <IxPopconfirm placement="bottom" title="Are you sure to delete this task?">
      <IxButton>Bottom</IxButton>
    </IxPopconfirm>
    <IxPopconfirm placement="bottomEnd" title="Are you sure to delete this task?">
      <IxButton>BE</IxButton>
    </IxPopconfirm>
  </div>
</template>

<style scoped lang="less">
.ix-button {
  width: 80px;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
