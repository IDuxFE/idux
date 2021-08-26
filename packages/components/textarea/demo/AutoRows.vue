<template>
  <IxTextarea autoRows placeholder="textarea autoRows" />
  <br /><br />
  <IxTextarea :autoRows="{ minRows: 3, maxRows: 6 }" placeholder="textarea autoRows" />
</template>
