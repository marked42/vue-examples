<template>
  <div class="example-container">
    <div>
        <h2>Vertical Align</h2>
        <p><code>vertical-align</code> applies to inline and inline-block elements and aligns element boxes vertically inside <b>line box</b> of inline element or table-cell element</p>
        <div class="example example1">
          inline block
        </div>
        <p class="example example2">
          a line of text <span class="vertical-middle">vertical-align: middle</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlignCenter',
}
</script>

<style lang="stylus" scoped>
.example-container
  text-align initial

.example
  width 600px
  height 100px
  border 1px solid #ccc

.example1
  display inline-block

.example2
  span
    border 1px solid #ccc
    padding 5px
  .vertical-middle
    // height 50px
    // width 200px
    // display inline-block
    font-size 32px
    vertical-align middle
  .vertical-bottom
    // font-size 40px
    vertical-align bottom
</style>
