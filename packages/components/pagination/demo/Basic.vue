<template>
  <IxPagination :pageIndex="1" :total="50" />
  <br />
  <IxPagination disabled :pageIndex="1" :total="50" />
  <br />
  <IxPagination :pageIndex="6" :total="500" />
</template>
