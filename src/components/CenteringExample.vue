<template>
  <ul>
    <li>
      <h1>Centering Inline Element</h1>
      <ul>
        <li>
          <h2>&lt;img&gt;</h2>
          <div class="inline-box">
            <img class="inline-element" :src="logo" alt="inline element">
          </div>
        </li>
        <li>
          <h2>&lt;input&gt;</h2>
          <div class="inline-box">
            <input class="inline-element">
          </div>
        </li>
        <li>
          <h2>text</h2>
          <div class="inline-box">
            Integer elementum massa at nulla placerat varius.
            Suspendisse in libero risus, in interdum massa.
            Vestibulum ac leo vitae metus faucibus gravida ac in neque.
            Nullam est eros, suscipit sed dictum quis, accumsan a ligula.
          </div>
        </li>
      </ul>
    </li>
    <li>
      <h1>Centering Block Element</h1>
      <ul>
        <li>
          <h2><code>margin: auto</code></h2>
          <div class="block-box">
            <p class="block-element">block element: block centered, inherits <code>text-align: left</code>, so text not centered</p>
          </div>
          <h2><code>text-align: -webkit-center -moz-center</code></h2>
          <div class="block-box-text-align-center">
            <p class="block-element">block element: inherits text-align property, so text is also centered</p>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import logo from '../assets/logo.png'

export default {
  name: 'centering-example',
  data() {
    return {
      logo,
    }
  },
}
</script>

<style lang="stylus" scoped>

li
  text-align left

.inline-box
  border solid 1px red
  text-align center

.block-box
  border solid 1px lightblue
  .block-element
    border solid 1px black
    width 50%
    margin auto

.block-box-text-align-center
  text-align -moz-center
  text-align -webkit-center
  .block-element
    border solid 1px black
    width 50%
    margin auto
</style>
