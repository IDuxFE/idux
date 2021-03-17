<template>
  <div>
    <ix-progress :percent="30" />
    <ix-progress :percent="50" status="active" />
    <ix-progress :percent="70" status="exception" />
    <ix-progress :percent="100" />
    <ix-progress :percent="50" hide-info />
  </div>
</template>
