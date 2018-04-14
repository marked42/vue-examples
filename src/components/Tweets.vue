<template>
  <div>
    <button @click="shuffle">shuffle</button>
    <transition-group name="tweets" tag="div">
      <tweet v-for="tweet in tweets" :tweet="tweet" :key="tweet.id"/>
    </transition-group>
  </div>
</template>

<script>
import Tweet from './Tweet'

export default {
  name: 'tweets',
  components: {
    Tweet,
  },
  methods: {
    shuffle () {
      this.tweets = this.tweets.sort(() => Math.random() > 0.5)
    },
  },
  data () {
    return {
      tweets: [
        {
          id: 1,
          name: 'James',
          handle: '@jokerjames',
          img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
          tweet: "If you don't succeed, dust yourself off and try again.",
          likes: 10,
        },
        {
          id: 2,
          name: 'Fatima',
          handle: '@fantasticfatima',
          img: 'https://semantic-ui.com/images/avatar2/large/molly.png',
          tweet: 'Better late than never but never late is better.',
          likes: 12,
        },
        {
          id: 3,
          name: 'Xin',
          handle: '@xeroxin',
          img: 'https://semantic-ui.com/images/avatar2/large/elyse.png',
          tweet: 'Beauty in the struggle, ugliness in the success.',
          likes: 18,
        },
      ],
    }
  },
}
</script>

<style lang="stylus">
.test {
  position: relative;
  background: lightgray;
  height: 30px;
  width: 200px;
}

.test .fit {
  position: absolute;
  display: block;
  background: lightsalmon;
  color: red;
  margin-left: 1em;
  margin-right: 1em;
}

.tweets-move {
  transition: transform 1s;
}
</style>
