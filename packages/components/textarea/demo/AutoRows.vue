<template>
  <IxSpace vertical>
    <IxTextarea autoRows placeholder="textarea autoRows" />
    <IxTextarea :autoRows="{ minRows: 3, maxRows: 6 }" placeholder="textarea autoRows" />
  </IxSpace>
</template>
