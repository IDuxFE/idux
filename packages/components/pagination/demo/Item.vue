<template>
  <IxPagination :pageIndex="1" :total="500">
    <template #item="{ type, original }">
      <IxButton v-if="type === 'prev'" mode="text" size="sm">Previous</IxButton>
      <IxButton v-else-if="type === 'next'" mode="text" size="sm">Next</IxButton>
      <component :is="original" v-else />
    </template>
  </IxPagination>
</template>
