<template>
  <div>
    <IxProgress :percent="30" />
    <IxProgress :percent="50" status="active" />
    <IxProgress :percent="70" status="exception" />
    <IxProgress :percent="100" />
    <IxProgress :percent="50" hide-info />
  </div>
</template>
