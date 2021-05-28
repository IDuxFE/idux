<template>
  <ix-divider position="left" dashed>Normal</ix-divider>
  <ix-row>
    <ix-col :span="6" :order="4"> 1 order-4 </ix-col>
    <ix-col :span="6" :order="3"> 2 order-3 </ix-col>
    <ix-col :span="6" :order="2"> 3 order-2 </ix-col>
    <ix-col :span="6" :order="1"> 4 order-1 </ix-col>
  </ix-row>

  <ix-divider position="left" dashed>Responsive</ix-divider>
  <ix-row>
    <ix-col :span="6" :xs="{ order: 1 }" :sm="{ order: 2 }" :md="{ order: 3 }" :lg="{ order: 4 }"> 1 </ix-col>
    <ix-col :span="6" :xs="{ order: 2 }" :sm="{ order: 3 }" :md="{ order: 4 }" :lg="{ order: 1 }"> 2 </ix-col>
    <ix-col :span="6" :xs="{ order: 3 }" :sm="{ order: 4 }" :md="{ order: 1 }" :lg="{ order: 2 }"> 3 </ix-col>
    <ix-col :span="6" :xs="{ order: 4 }" :sm="{ order: 1 }" :md="{ order: 2 }" :lg="{ order: 3 }"> 4 </ix-col>
  </ix-row>
</template>
