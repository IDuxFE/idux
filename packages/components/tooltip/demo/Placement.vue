<template>
  <div style="margin-left: 60px">
    <IxTooltip title="This is a very long prompt text." placement="topStart">
      <IxButton>TS</IxButton>
    </IxTooltip>
    <IxTooltip title="This is a very long prompt text." placement="top">
      <IxButton>Top</IxButton>
    </IxTooltip>
    <IxTooltip title="This is a very long prompt text." placement="topEnd">
      <IxButton>TE</IxButton>
    </IxTooltip>
  </div>
  <div style="float: left; width: 60px">
    <IxTooltip title="This is a very long prompt text." placement="leftStart">
      <IxButton>LS</IxButton>
    </IxTooltip>
    <IxTooltip title="This is a very long prompt text." placement="left">
      <IxButton>Left</IxButton>
    </IxTooltip>
    <IxTooltip title="This is a very long prompt text." placement="leftEnd">
      <IxButton>LE</IxButton>
    </IxTooltip>
  </div>
  <div style="margin-left: 270px; width: 60px">
    <IxTooltip title="This is a very long prompt text." placement="rightStart">
      <IxButton>RS</IxButton>
    </IxTooltip>
    <IxTooltip title="This is a very long prompt text." placement="right">
      <IxButton>Right</IxButton>
    </IxTooltip>
    <IxTooltip title="This is a very long prompt text." placement="rightEnd">
      <IxButton>RE</IxButton>
    </IxTooltip>
  </div>
  <div style="margin-left: 60px; clear: both">
    <IxTooltip title="This is a very long prompt text." placement="bottomStart">
      <IxButton>BS</IxButton>
    </IxTooltip>
    <IxTooltip title="This is a very long prompt text." placement="bottom">
      <IxButton>Bottom</IxButton>
    </IxTooltip>
    <IxTooltip title="This is a very long prompt text." placement="bottomEnd">
      <IxButton>BE</IxButton>
    </IxTooltip>
  </div>
</template>

<style scoped lang="less">
.ix-button {
  width: 80px;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
