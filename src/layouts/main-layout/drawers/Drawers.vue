<template>
  <KTMessengerDrawer />
  <KTToolButtons />
  <KTHelpDrawer />
  <KTCustomize />

</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTMessengerDrawer from "@/layouts/main-layout/extras/MessengerDrawer.vue";
import KTHelpDrawer from "@/layouts/main-layout/extras/HelpDrawer.vue";
import KTToolButtons from "@/layouts/main-layout/extras/ToolButtons.vue";
import KTCustomize from "@/layouts/main-layout/extras/Customize.vue";

export default defineComponent({
  name: "global-drawers",
  components: {
    KTMessengerDrawer,
    KTHelpDrawer,
    KTToolButtons,
    KTCustomize,


  },
});
</script>
