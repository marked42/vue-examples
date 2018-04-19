<template>
  <div>
    {{ JSON.stringify(this.$options.props)}}
  </div>
</template>

<script>
export default {
  name: 'Props',
  props: {
    name: {
      type: String,
      required: false,
      default() {
        console.log('get prop default value')
        return 'Jhon'
      },
      validation(value) {
        return value.length > 0
      },
    },
  },
}
</script>

<style lang="stylus">
div
  -webkit-overflow-scrolling auto
</style>
