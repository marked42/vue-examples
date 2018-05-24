<template>
  <div id="root">
    <h2>'wheel' events</h2>
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
    <h2>'touch' events</h2>
    <div id="touchable" ref="touchable">
      This element is touchable
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

      // touchable - touchstart
      this.$refs.touchable.addEventListener('touchstart', (e) => {
        if (e.touches.item(0) === e.targetToches.item(0)) {
          this.$refs.touchable.appendChild(document.createTextNode('Hello Touch Events'))
        } else if (e.touches.length === e.targetTouches.length) {
          this.$refs.touchable.appendChild(document.createTextNode('All touch points on target element'))
        } else if (e.touches.length > 1) {
          this.$refs.touchable.appendChild(document.createTextNode('support multiple touches'))
        }
      }, false)

      // touchable - touchend
      this.$refs.touchable.addEventListener('touchend', (e) => {
        this.$refs.touchable.appendChild(document.createTextNode(`Touch points removed: ${e.changedTouches.length}`))
        this.$refs.touchable.appendChild(document.createTextNode(`Touch points remaining on element: ${e.targetTouches.length}`))
        this.$refs.touchable.appendChild(document.createTextNode(`Touch points remaining on document: ${e.touches.length}`))
      })
    })
  },
}
</script>

<style lang="stylus" scoped>
#root
  counter-reset chapter_counter 1
p
  text-align left
.parent
  height 400px
  overflow-y scroll
  border 1px solid black
  margin 10px 0
  position relative
  &:before
    display inline-block
    position absolute
    background lightblue
    content counter(chapter_counter)
    counter-increment chapter_counter 1
    padding 3px
    width 20px
    height 20px
    left 0
    text-align center
  .child
    border 1px solid black
    height 600px
    margin 10px
    background lightgray
#touchable
  height 400px
  border 1px solid black
</style>
