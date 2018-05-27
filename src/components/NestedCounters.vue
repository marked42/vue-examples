<template>
  <div :style="counterCssRule">
    <span>
      {{ countersText }}
      <ol class='tooltip'>
        <h3>counter process steps</h3>
        <li class="counter-step-inherit">{{inheritsText}}</li>
        <li class="counter-step-reset">{{resetsText}}</li>
        <li class="counter-step-set">{{setsText}}</li>
        <li class="counter-step-increment">{{incrementsText}}</li>
        <li class="counter-step-usage">{{usageText}}</li>
      </ol>
    </span>
    <nested-counters v-if="children" v-for="(child, index) in children" :key="index" v-bind="child">
    </nested-counters>

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
    usage: Object,
  },
  computed: {
    inheritsText() {
      const { inherits } = this

      const result = Object.keys(inherits).map(key => {
        return `${key} = ${inherits[key].join('.')}`
      })
      return `inherits: ${result.length > 0 ? result.join(',') : 'nothing'}`
    },
    resetsText() {
      const { resets } = this

      const result = resets.map(({name, value}) => {
        return `${name} ${value}`
      })
      return `resets: 'counter-reset: ${result.length > 0 ? result.join(' ') : 'none'};'`
    },
    setsText() {
      const { sets } = this

      const result = sets.map(({name, value}) => {
        return `${name} ${value}`
      })
      return `sets: 'counter-set: ${result.length > 0 ? result.join(' ') : 'none'};'`
    },
    incrementsText() {
      const { increments } = this

      const result = increments.map(({name, value}) => {
        return `${name} ${value}`
      })
      return `increments: 'counter-increment: ${result.length > 0 ? result.join(' ') : 'none'};'`
    },
    usageText() {
      const { usage } = this

      if (!usage) {
        return 'usage: '
      }

      const counterUsage = !usage.counter ? ''
        : usage.counter.map(({ name, style }) => {
          return `counter(${name}, ${style || 'none'})`
        }).join(' ')

      const countersUsage = !usage.counters ? ''
        : usage.counters.map(({ name, delimieter, style }) => {
          return `counters(${name}, ${delimieter},${style || 'none'})`
        }).join(' ')

      return `usage:\n\t${counterUsage}\n\t${countersUsage}`
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
    width fit-content
    z-index 1
    li
      white-space nowrap
  &>span
    position relative
    &:hover
      &>.tooltip
        display initial
        position absolute
        left 100%
        padding 10px
        background gray
        color white
        list-style-position inside
</style>
