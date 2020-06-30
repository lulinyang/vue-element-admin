<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <div>百度富文本</div>
        <vue-neditor-wrap v-model="content" :config="myConfig" :destroy="false" @ready="ready"></vue-neditor-wrap>
      </div>
    </div>
  </div>
</template>

<script>
import VueNeditorWrap from 'vue-neditor-wrap';
import editor from "@/config/editor";
export default {
  components: {
    VueNeditorWrap
  },
  data () {
    return {
      myConfig: editor.myConfig,
      content: '',
    }
  },
  methods: {
    ready (editorSetting) {
      console.log("editorSetting", editorSetting);
    },
  }
}
</script>