<template>
  <div :style="counterCssRule">
    {{ countersText }}
    <nested-counters v-if="children" v-for="(child, index) in children" :key="index" v-bind="child">
    </nested-counters>

    <ol class='tooltip'>
      <li class="counter-step-inherit">{{inheritsText}}</li>
      <li class="counter-step-reset">{{resetsText}}</li>
      <li class="counter-step-set">{{setsText}}</li>
      <li class="counter-step-increment">{{incrementsText}}</li>
      <li class="counter-step-use">{{countersText}}</li>
    </ol>
  </div>
</template>

<script>
import {
  getCountersString,
  generateCounterAllCssRule,
} from '../utils/counters'
export default {
  name: 'NestedCounters',
  props: {
    counters: Object,
    children: Array,
    inherits: Object,
    resets: Array,
    sets: Array,
    increments: Array,
  },
  computed: {
    inheritsText() {
      return `inherit: `
    },
    resetsText() {
      return ','
    },
    setsText() {
      return ''
    },
    incrementsText() {
      return ''
    },
    counterCssRule() {
      const { resets, sets, increments } = this
      return generateCounterAllCssRule({resets, sets, increments})
    },
    countersText() {
      const counters = this.counters

      return Object.keys(counters).map(key => {
        return `${key}: ${getCountersString(counters, key, '.')}`
      }).join(', ')
    },
  },
}
</script>

<style lang="stylus" scoped>
div
  position relative
  left 20px
  margin 5px 0
  text-align left
  &:before
    content "(doc: "counters(doc, '.')" ) " "(chapter: "counters(chapter, '.')" ) " "(section: "counters(section, '.')" )"
    color blue
  .tooltip
    display none
  &:hover
    &>.tooltip
      display initial
      position absolute
      left 10%
      padding 10px
      background gray
      // border 1px solid lightblue
      list-style inside
</style>
