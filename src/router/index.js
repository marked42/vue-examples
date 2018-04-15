import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tweets from '@/components/Tweets'
import Watch from '@/components/Watch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: { name: 'watch' },
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
  ],
})
