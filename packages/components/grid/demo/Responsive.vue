<template>
  <ix-row>
    <ix-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"> col </ix-col>
    <ix-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4"> col </ix-col>
    <ix-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"> col </ix-col>
  </ix-row>
  <br />
  <ix-row>
    <ix-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"> col </ix-col>
    <ix-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }"> col </ix-col>
    <ix-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"> col </ix-col>
  </ix-row>
</template>
