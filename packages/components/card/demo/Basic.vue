<template>
  <IxRow>
    <IxCol xs="24" sm="8">
      <IxCard :header="{ title: 'Card title', suffix: 'setting' }" size="lg">
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </IxCard>
    </IxCol>
    <IxCol xs="24" sm="8">
      <IxCard :header="{ title: 'Card title', suffix: 'setting' }">
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </IxCard>
    </IxCol>
    <IxCol xs="24" sm="8">
      <IxCard :header="{ title: 'Small card', suffix: 'setting' }" size="sm">
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </IxCard>
    </IxCol>
  </IxRow>
</template>
