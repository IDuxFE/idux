<template>
  <IxPagination :pageIndex="1" :total="500" :pageSize="20" showSizeChanger />
  <br />
  <IxPagination :pageIndex="1" :total="500" :pageSizes="[10, 20, 30, 40]" showSizeChanger />
</template>
