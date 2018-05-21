<template>
  <div class="loader">
    <div class="hexagon-container">
      <div class="hexagon hex1"></div>
      <div class="hexagon hex2"></div>
      <div class="hexagon hex3"></div>
      <div class="hexagon hex4"></div>
      <div class="hexagon hex5"></div>
      <div class="hexagon hex6"></div>
      <div class="hexagon hex7"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverwatchLoading',
}
</script>

<style lang="stylus" scoped>
$border_width = 2px

.loader
  position fixed
  top 50%
  left 50%
  transform translate(-50%, -50%)
  width 160px
  height 160px
  border $border_width solid #e3e4dc
  border-radius 50%
  &:before
    position absolute
    width 100%
    height 100%
    left -2px
    top -2px
    content ''
    border $border_width solid #c1bebb
    border-radius 50%
    clip rect(0px, 164px, 150px, 0px)
    animation rotate1 infinite
    animation-duration 3s
    animation-timing-function linear
    z-index 9
  &:after
    position absolute
    width 100%
    height 100%
    left -2px
    top -2px
    content ''
    border $border_width solid #898a86
    border-radius 50%
    clip rect(0px, 35px, 35px, 0px)
    animation rotate2 infinite
    animation-duration 3s
    animation-timing-function linear
    z-index 10

  &>.hexagon-container
    position relative
    top 33px
    left 41px
    height 100%
    border-radius 50%
    .hexagon
      position absolute
      width 40px
      height 23px
      background-color #556C82
      &:before
        content ""
        position absolute
        top -11px
        left 0
        width 0
        height 0
        border-left 20px solid transparent
        border-right 20px solid transparent
        border-bottom 11.5px solid #556C82
      &:after
        content ''
        position absolute
        top 23px
        left 0
        width 0
        height 0
        border-left 20px solid transparent
        border-right 20px solid transparent
        border-top: 11.5px solid #556C82;
    positions = (1 0px 0px) (2 0px 42px) (3 36px 63px) (4 72px 42px) (5 72px 0px) (6 36px -21px) (7 36px 21px)
    for p in positions
      .hex{p[0]}
        duration = 3s
        top p[1]
        left p[2]
        animation Animasearch duration ease-in-out infinite
        animation-delay duration * (p[0] / 14)

@keyframes rotate1 {
  0% {
    transform: rotate(0deg);
    clip: rect(0px, 164px, 150px, 0px);
  }
  50% {
    clip: rect(0px, 164px, 0px, 0px);
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(720deg);
    clip: rect(0px, 164px, 150px, 0px);
  }
}

@keyframes rotate2 {
  0% {
    transform: rotate(0);
    clip: rect(0px, 35px, 35px, 0px);
  }
  50% {
    clip: rect(0px, 40px, 40px, 0px);
  }
  100% {
    transform: rotate(360deg);
    clip: rect(0px, 35px, 35px, 0px);
  }
}

@keyframes Animasearch {
  0% {
    transform scale(1)
    opacity 1
  }
  15%
  50% {
    transform scale(0.5)
    opacity 0
  }
  65% {
    transform scale(1)
    opacity 1
  }
}

</style>
