import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tweets from '@/components/Tweets'
import Watch from '@/components/Watch'
import CenteringExample from '@/components/CenteringExample'
import BoxModelExample from '@/components/BoxModelExample'
import PropsWrapper from '@/components/Vue/PropsWrapper'
import OverwatchLoading from '@/components/OverwatchLoading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: { name: 'OverwatchLoading' },
      component: HelloWorld,
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
      path: '/overwatch_loading',
      name: 'OverwatchLoading',
      component: OverwatchLoading,
    },
  ],
})
