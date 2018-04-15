import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tweets from '@/components/Tweets'
import Watch from '@/components/Watch'
import CenteringExample from '@/components/CenteringExample'
import BoxModelExample from '@/components/BoxModelExample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: { name: 'BoxModelExample' },
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
  ],
})
