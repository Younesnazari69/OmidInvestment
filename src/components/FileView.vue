<template>
  <div v-if="Item.contentType == 'image/jpeg'">
    <a :href="url" :download="Item.formFileType + ' ' + Item.titel + ' ' + Item.company" target="_blank"
      rel="noopener noreferrer">
      <img :width="100" :src="url" />
    </a>
  </div>
  <div v-else>
    <a v-if="url != ''" :href="url" :download="Item.formFileType" target="_blank" rel="noopener noreferrer">
      <button class="btn btn-sm btn btn-light-info">
        <McFileDownloadLine />
      </button>
    </a>
    <a v-else href="#">
      <button id="kt_sign_in_submit" class="btn btn-sm btn btn-light-info" data-kt-indicator="on">
        <span class="indicator-progress">
          درحال بارگذاری...
          <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      </button>
    </a>
  </div>

  <!-- <div v-if="Item.contentType == 'application/pdf'">
    <a :href="url" :download="Item.formFileType + ' ' + Item.titel + ' ' + Item.company" target="_blank"
      rel="noopener noreferrer">
      <VsFileTypePdf :width=" 200 " />
    </a>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from "vue";
import { useDataStore } from "@/stores/Data";
import { McFileDownloadLine, VsFileTypePdf } from '@kalimahapps/vue-icons';
export default defineComponent({
  name: "FileView",
  props: {
    Item: { type: Object, required: true },
  },
  components: {
    McFileDownloadLine, VsFileTypePdf
  },
  setup(props) {
    debugger
    const url = ref<string>('');
    const store = useDataStore();
    onBeforeMount(() => {
      store.FechFile(props.Item.urlFileName).then(res => {
        var blob = new Blob([res.data], {
          type: props.Item.contentType,
        });
        url.value = URL.createObjectURL(blob);
      });
    });
    return {
      url
    };
  },
});
</script>
