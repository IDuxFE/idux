<template>
  <div style="width: 170px">
    <IxProgress :percent="30" size="small" />
    <IxProgress :percent="50" size="small" status="active" />
    <IxProgress :percent="70" size="small" status="exception" />
    <IxProgress :percent="100" size="small" />
  </div>
</template>
