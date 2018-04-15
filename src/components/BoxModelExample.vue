<template>
  <div class="container">
    <p>
      input width is not same as parent width when using <code>width: 100%</code>.
      because it uses <code>box-sizing: border-box</code> by default.
    </p>
    <input >
  </div>
</template>

<script>
export default {
  name: 'box-model-example',
}
</script>

<style lang="stylus">
.container
  border solid 1px black
  width 400px
  input
    width 100%
    border solid 1px blue
    box-sizing border-box
</style>
