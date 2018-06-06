<template>
  <div class="kos-select">
    <input class="kos-select-input">
    <ul class="kos-select-dropdown-list">

    </ul>
  </div>
</template>

<script>
export default {
  name: 'kos-select',
}
</script>

<style lang="stylus" scoped>
.kos-select
  width 100px
  position relative
  .kos-select-input
    border 1px solid #ccc
  .kos-select-dropdown-list
    position absolute
    width 100%
    height 200px
    border 1px solid #ccc
</style>
