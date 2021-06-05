<template>
  <ix-divider position="left" dashed>Percentage columns</ix-divider>
  <ix-row>
    <ix-col :flex="2">2 / 5</ix-col>
    <ix-col :flex="3">3 / 5</ix-col>
  </ix-row>

  <ix-divider position="left" dashed>Fill rest</ix-divider>
  <ix-row>
    <ix-col flex="100px">100px</ix-col>
    <ix-col flex="auto">Fill Rest</ix-col>
  </ix-row>

  <ix-divider position="left" dashed>Raw flex style</ix-divider>
  <ix-row>
    <ix-col flex="1 1 200px">1 1 200px</ix-col>
    <ix-col flex="0 1 300px">0 1 300px</ix-col>
  </ix-row>

  <ix-divider position="left" dashed>No wrap</ix-divider>
  <ix-row :wrap="false">
    <ix-col flex="none"> <div :style="{ padding: '0 16px' }">none</div></ix-col>
    <ix-col flex="auto">auto with no-wrap</ix-col>
  </ix-row>
</template>
