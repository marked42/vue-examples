<template>
  <vue-editor v-model="content" style="height: 320px;"></vue-editor>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'TextEditor',

  components: {
    VueEditor,
  },

  data() {
    return {
      content: '<h1>Some initial content</h1>',
    }
  },
}
</script>
