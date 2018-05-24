<template>
  <div>
    <h2>'touch' &amp; 'wheel' event</h2>
    <p>
      Finger touching and moving on track pad triggers 'wheel' event instead of 'touchmove' event.
      'mousewheel' event is depracted version of 'wheel' event.
      1. Firefox doesn't support 'mousewheel' event.
      1. Chrome and Safari on Mac supports 'mousewheel' but if 'mousewheel' and 'wheel' events have listeners at
      the same time, only 'wheel' event is dispatched and takes effect, thus 'mousewheel' event handler is ignored.
    </p>
    <div class="parent" ref="wheelOnly">
      <h3>'wheel' listened only</h3>
      <div class="child">
        {{ `wheel: ${ counters.wheelOnly }`}}
      </div>
    </div>
    <div class="parent" ref="mousewheelOnly">
      <h3>'mousewheel' listened only. Support: Chrome,Safari(Yes), Firefox(No)</h3>
      <div class="child">
        {{ `mousewheel: ${ counters.mousewheelOnly }`}}
      </div>
    </div>
    <div class="parent" ref="wheelAndMousewheel">
      <h3>'wheel' and 'mousewheel' listened</h3>
      <div class="child">
        {{ `wheel: ${ counters.wheelAndMousewheel.wheel }, mousewheel: ${ counters.wheelAndMousewheel.mousewheel }`}}
      </div>
    </div>
    <div class="parent" ref="scrollPrevented">
      <h3>use <code>preventDefault()</code> to disable scroll behavior</h3>
      <div class="child">
        {{ `wheel: ${ counters.wheelPrevented } `}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TouchEvents',
  data() {
    return {
      counters: {
        wheelOnly: 0,
        mousewheelOnly: 0,
        wheelAndMousewheel: {
          wheel: 0,
          mousewheel: 0,
        },
        wheelPrevented: 0,
      },
    }
  },
  created() {
    this.$nextTick(() => {
      // 1
      this.$refs.wheelOnly.addEventListener('wheel', (e) => {
        this.counters.wheelOnly++
      }, { passive: true })

      // 2
      this.$refs.mousewheelOnly.addEventListener('mousewheel', (e) => {
        this.counters.mousewheelOnly++
      }, { passive: true })

      // 3
      this.$refs.wheelAndMousewheel.addEventListener('wheel', (e) => {
        this.counters.wheelAndMousewheel.wheel++
      }, { passive: true })
      this.$refs.wheelAndMousewheel.addEventListener('mousewheel', (e) => {
        this.counters.wheelAndMousewheel.mousewheel++
      }, { passive: true })

      // 4
      this.$refs.scrollPrevented.addEventListener('wheel', (e) => {
        this.counters.wheelPrevented++
        e.preventDefault()
      }, { passive: false })
    })
  },
}
</script>

<style lang="stylus" scoped>
p
  text-align left
.parent
  height 400px
  overflow-y scroll
  border 1px solid black
  margin 10px 0
  &:before
    content counter()
  .child
    border 1px solid black
    height 600px
    margin 10px
    background lightgray
</style>
