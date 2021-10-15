<template>
  <IxSpace direction="vertical" :size="40">
    <IxTabs selectedKey="tab1">
      <IxTab key="tab1" title="Tab 1"> Content of Tab 1 </IxTab>
      <IxTab key="tab2" title="Tab 2" disabled> Content of Tab 2 </IxTab>
      <IxTab key="tab3" title="Tab 3"> Content of Tab 3 </IxTab>
    </IxTabs>
    <IxTabs selectedKey="tab1" type="line">
      <IxTab key="tab1" title="Tab 1"> Content of Tab 1 </IxTab>
      <IxTab key="tab2" title="Tab 2" disabled> Content of Tab 2 </IxTab>
      <IxTab key="tab3" title="Tab 3"> Content of Tab 3 </IxTab>
    </IxTabs>
    <IxTabs selectedKey="tab1" type="segment">
      <IxTab key="tab1" title="Tab 1"> Content of Tab 1 </IxTab>
      <IxTab key="tab2" title="Tab 2" disabled> Content of Tab 2 </IxTab>
      <IxTab key="tab3" title="Tab 3"> Content of Tab 3 </IxTab>
    </IxTabs>
  </IxSpace>
</template>
