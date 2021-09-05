<template>
  <IxSpace>
    <IxDropdown>
      <a class="ix-dropdown-trigger">Hover me</a>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
    <IxDivider type="vertical" />
    <IxDropdown trigger="click">
      <a class="ix-dropdown-trigger">Click me</a>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
    <IxDivider type="vertical" />
    <IxDropdown trigger="contextmenu">
      <a class="ix-dropdown-trigger">Right click me</a>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
  </IxSpace>
  <br />
  <IxDropdown :visible="visible" trigger="manual">
    <IxSwitch v-model:checked="visible"></IxSwitch>
    <template #overlay>
      <IxMenu>
        <IxMenuItem> Item 1 </IxMenuItem>
        <IxMenuItem> Item 2 </IxMenuItem>
        <IxMenuDivider />
        <IxMenuItem disabled> Item 3 </IxMenuItem>
      </IxMenu>
    </template>
  </IxDropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    return { visible }
  },
})
</script>
