<template>
  <ix-row>
    <ix-col xs="24" sm="8">
      <ix-card :header="{ title: 'Card title', extra: 'setting' }" size="large">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </ix-card>
    </ix-col>
    <ix-col xs="24" sm="8">
      <ix-card :header="{ title: 'Card title', extra: 'setting' }">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </ix-card>
    </ix-col>
    <ix-col xs="24" sm="8">
      <ix-card :header="{ title: 'Small card', extra: 'setting' }" size="small">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </ix-card>
    </ix-col>
  </ix-row>
</template>
