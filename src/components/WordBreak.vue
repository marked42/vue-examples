<template>
  <div class="box">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'WordBreak',
  data() {
    return {
      text: '中文老地方啦拉三等奖法律！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！',
    }
  },
}
</script>

<style lang="stylus" scoped>
.box
  margin 0 auto
  text-align left
  border 1px solid black
  width 400px
  height 4em
</style>
