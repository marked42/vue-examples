import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tweets from '@/components/Tweets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: { name: 'tweets' },
      component: HelloWorld,
    },
    {
      path: '/tweets',
      name: 'tweets',
      component: Tweets,
    },
  ],
})
