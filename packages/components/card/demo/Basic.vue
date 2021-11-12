<template>
  <IxRow>
    <IxCol xs="24" sm="8">
      <IxCard :header="{ title: 'Card title', extra: 'setting' }" size="lg">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </IxCard>
    </IxCol>
    <IxCol xs="24" sm="8">
      <IxCard :header="{ title: 'Card title', extra: 'setting' }">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </IxCard>
    </IxCol>
    <IxCol xs="24" sm="8">
      <IxCard :header="{ title: 'Small card', extra: 'setting' }" size="sm">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </IxCard>
    </IxCol>
  </IxRow>
</template>
