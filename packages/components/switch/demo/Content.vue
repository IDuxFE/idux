<template>
  <IxSpace>
    <IxSwitch checked :labels="['开', '关']"></IxSwitch>
    <IxSwitch :labels="['1', '0']"></IxSwitch>
    <IxSwitch checked>
      <template #label="{ checked }">
        <IxIcon :name="checked ? 'check' : 'close'" />
      </template>
    </IxSwitch>
  </IxSpace>
</template>
