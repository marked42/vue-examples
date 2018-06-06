import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tweets from '@/components/Tweets'
import Watch from '@/components/Watch'
import CenteringExample from '@/components/CenteringExample'
import BoxModelExample from '@/components/BoxModelExample'
import PropsWrapper from '@/components/Vue/PropsWrapper'
import WatchComputed from '@/components/Vue/WatchComputed'
import WordBreak from '@/components/WordBreak'
import TouchEvents from '@/components/TouchEvents'
import CssCounters from '@/components/CssCounters'
import KosSelect from '@/components/Kos/Select'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: { name: 'KosSelect' },
      component: HelloWorld,
    },
    {
      path: '/word_break',
      name: 'WordBreak',
      component: WordBreak,
    },
    {
      path: '/tweets',
      name: 'tweets',
      component: Tweets,
    },
    {
      path: '/watch',
      name: 'watch',
      component: Watch,
    },
    {
      path: '/centering',
      name: 'centering',
      component: CenteringExample,
    },
    {
      path: '/box',
      name: 'BoxModelExample',
      component: BoxModelExample,
    },
    {
      path: '/props',
      name: 'PropsWrapper',
      component: PropsWrapper,
    },
    {
      path: '/watch_computed',
      name: 'WatchComputed',
      component: WatchComputed,
    },
    {
      path: '/touch_events',
      name: 'TouchEvents',
      component: TouchEvents,
    },
    {
      path: '/css_counters',
      name: 'CssCounters',
      component: CssCounters,
    },
    {
      path: '/kos_select',
      name: 'KosSelect',
      component: KosSelect,
    },
  ],
})
