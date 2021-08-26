<template>
  <div style="margin-left: 60px">
    <IxPopover title="Title" content="Content..." placement="topStart">
      <IxButton>TS</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." placement="top">
      <IxButton>Top</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." placement="topEnd">
      <IxButton>TE</IxButton>
    </IxPopover>
  </div>
  <div style="float: left; width: 60px">
    <IxPopover title="Title" content="Content..." placement="leftStart">
      <IxButton>LS</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." placement="left">
      <IxButton>Left</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." placement="leftEnd">
      <IxButton>LE</IxButton>
    </IxPopover>
  </div>
  <div style="margin-left: 270px; width: 60px">
    <IxPopover title="Title" content="Content..." placement="rightStart">
      <IxButton>RS</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." placement="right">
      <IxButton>Right</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." placement="rightEnd">
      <IxButton>RE</IxButton>
    </IxPopover>
  </div>
  <div style="margin-left: 60px; clear: both">
    <IxPopover title="Title" content="Content..." placement="bottomStart">
      <IxButton>BS</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." placement="bottom">
      <IxButton>Bottom</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." placement="bottomEnd">
      <IxButton>BE</IxButton>
    </IxPopover>
  </div>
</template>

<style scoped lang="less">
.ix-button {
  width: 80px;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
