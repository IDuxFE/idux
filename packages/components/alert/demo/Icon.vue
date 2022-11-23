<template>
  <IxSpace block vertical>
    <IxAlert icon="alert" title="每次我不知道该说什么的时候就不知道该说什么。" type="success"></IxAlert>
    <IxAlert title="你说的这话，抛开内容来说，我十分赞同。" type="info">
      <template #icon>
        <IxIcon name="check-circle-filled" />
      </template>
    </IxAlert>
    <IxAlert closable title="但凡你这话有点道理，也不至于一点道理没有。" type="warning">
      <template #closeIcon>
        <IxIcon name="close-circle" />
      </template>
    </IxAlert>
  </IxSpace>
</template>
