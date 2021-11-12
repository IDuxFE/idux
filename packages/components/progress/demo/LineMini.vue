<template>
  <div style="width: 170px">
    <IxProgress :percent="30" size="sm" />
    <IxProgress :percent="50" size="sm" status="active" />
    <IxProgress :percent="70" size="sm" status="exception" />
    <IxProgress :percent="100" size="sm" />
  </div>
</template>
