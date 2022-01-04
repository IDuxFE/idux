<template>
  <div>
    <div style="margin-left: 72px">
      <IxPopover header="Title" content="This is content..." placement="topStart">
        <IxButton>TS</IxButton>
      </IxPopover>
      <IxPopover header="Title" content="This is content..." placement="top">
        <IxButton>Top</IxButton>
      </IxPopover>
      <IxPopover header="Title" content="This is content..." placement="topEnd">
        <IxButton>TE</IxButton>
      </IxPopover>
    </div>
    <div style="float: left; width: 64px">
      <IxPopover header="Title" content="This is content..." placement="leftStart">
        <IxButton>LS</IxButton>
      </IxPopover>
      <IxPopover header="Title" content="This is content..." placement="left">
        <IxButton>Left</IxButton>
      </IxPopover>
      <IxPopover header="Title" content="This is content..." placement="leftEnd">
        <IxButton>LE</IxButton>
      </IxPopover>
    </div>
    <div style="margin-left: 288px; width: 64px">
      <IxPopover header="Title" content="This is content..." placement="rightStart">
        <IxButton>RS</IxButton>
      </IxPopover>
      <IxPopover header="Title" content="This is content..." placement="right">
        <IxButton>Right</IxButton>
      </IxPopover>
      <IxPopover header="Title" content="This is content..." placement="rightEnd">
        <IxButton>RE</IxButton>
      </IxPopover>
    </div>
    <div style="margin-left: 72px; clear: both">
      <IxPopover header="Title" content="This is content..." placement="bottomStart">
        <IxButton>BS</IxButton>
      </IxPopover>
      <IxPopover header="Title" content="This is content..." placement="bottom">
        <IxButton>Bottom</IxButton>
      </IxPopover>
      <IxPopover header="Title" content="This is content..." placement="bottomEnd">
        <IxButton>BE</IxButton>
      </IxPopover>
    </div>
  </div>
</template>

<style scoped lang="less">
.ix-button {
  width: 64px;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
