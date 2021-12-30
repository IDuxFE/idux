<template>
  <IxPagination :total="500" :showTotal="false" />
  <br />
  <IxPagination :total="500">
    <template #total="{ total, range, prefix, suffix }">
      <span> {{ range[0] }}-{{ range[1] }} {{ prefix }} {{ total }} {{ suffix }}</span>
    </template>
  </IxPagination>
</template>
