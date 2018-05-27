<template>
  <div>
    seems usage of non-exist counter creates a counter
    <nested-counters v-bind="counters1">
    </nested-counters>
  </div>
</template>

<script>
import {
  createElementCounter,
} from '../utils/counters'

import NestedCounters from './NestedCounters'

export default {
  name: 'CssCounters',
  components: {
    NestedCounters,
  },
  data() {
    return {
      counterConfig: {
        resets: [ { name: 'doc', value: 1 } ],
        usage: {
          counter: [ { name: 'doc' }, { name: 'chapter' }, { name: 'section' } ],
        },
        children: [
          {
            resets: [ { name: 'doc', value: 10 } ],
            usage: {
              counter: [ { name: 'doc' }, { name: 'chapter' }, { name: 'section' } ],
            },
            children: [],
          },
          {
            resets: [ { name: 'chapter', value: 1 } ],
            usage: {
              counter: [ { name: 'doc' }, { name: 'chapter' }, { name: 'section' } ],
            },
            children: [
              {
                resets: [ { name: 'section', value: 1 } ],
                usage: {
                  counter: [ { name: 'doc' }, { name: 'chapter' }, { name: 'section' } ],
                },
                children: [],
              },
              {
                increments: [ { name: 'section', value: 1 } ],
                usage: {
                  counter: [ { name: 'doc' }, { name: 'chapter' }, { name: 'section' } ],
                },
              },
              {
                resets: [ { name: 'section', value: 1 } ],
                usage: {
                  counter: [ { name: 'doc' }, { name: 'chapter' }, { name: 'section' } ],
                },
              },
              {
                resets: [ { name: 'section', value: 2 } ],
                increments: [ { name: 'section', value: 3 } ],
                usage: {
                  counter: [ { name: 'doc' }, { name: 'chapter' }, { name: 'section' } ],
                },
              },
            ],
          },
          {
            resets: [ { name: 'chapter', value: 10 } ],
            usage: {
              counter: [ { name: 'doc' }, { name: 'chapter' }, { name: 'section' } ],
            },
            children: [],
          },
        ],
      },
    }
  },
  computed: {
    counters1() {
      return createElementCounter(this.counterConfig, true)
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
