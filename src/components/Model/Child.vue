<template>
  <div class="yam-tool-bar clearfix">
      <input v-model="model.value">
  </div>
</template>

<script>
export default {
  name: 'YamToolBar',

  data() {
    return {
      model: null,
    }
  },
  props: {
    value: {
      default: null,
    },
  },

  watch: {
    value() {
      this.model = JSON.parse(JSON.stringify(this.value))
    },

    model: {
      deep: true,
      handler(newModel) {
        debugger
        const value = JSON.parse(JSON.stringify(newModel))
        this.$emit('input', value)
      },
    },
  },

  created() {
    console.log('child created')
    window.child = this
    // this.model = JSON.parse(JSON.stringify(this.value))
    this.model = {
      value: this.value.value,
      valuw1: 2,
    }
  },
}
</script>
