<template>
  <div style="width: 170px">
    <ix-progress :percent="30" size="small" />
    <ix-progress :percent="50" size="small" status="active" />
    <ix-progress :percent="70" size="small" status="exception" />
    <ix-progress :percent="100" size="small" />
  </div>
</template>
