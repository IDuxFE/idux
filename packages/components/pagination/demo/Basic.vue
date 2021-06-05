<template>
  <ix-pagination :pageIndex="1" :total="50" />
  <br />
  <ix-pagination disabled :pageIndex="1" :total="50" />
  <br />
  <ix-pagination :pageIndex="6" :total="500" />
</template>
