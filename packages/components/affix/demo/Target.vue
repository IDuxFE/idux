<template>
  <div class="container">
    <div class="background">
      <IxAffix target=".container" :offset="{ top: 0, left: 0 }">
        <IxButton mode="primary">Custom target container</IxButton>
      </IxAffix>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  height: 100px;
  overflow: scroll;

  .background {
    padding-top: 20px;
    padding-left: 20px;
    height: 300px;
    width: 120%;
    background: rgb(200, 200, 200);
  }
}
</style>
