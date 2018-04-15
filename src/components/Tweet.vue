<template>
  <div class="tweet-box">
    <div class="top">
      <img :src="tweet.img" :alt="icon" />
      <div class="content">
        <p>
          <b>{{tweet.name}}</b>{{tweet.handle}}
        </p>
        <p class="tweet-content">{{tweet.tweet}}</p>
        <p class="tweet-likes">♥{{tweet.likes}}</p>
      </div>
    </div>
    <input type='text'>
  </div>
</template>

<script>
export default {
  name: 'tweet',
  props: {
    tweet: {
      type: Object,
    },
  },
}
</script>

<style lang="stylus" scoped>
.tweet-box
  margin 2em 0
  .top
    display flex
    justify-content space-around
    align-items center
    border solid 1px
    img
      width 64px
      height 64px
      border-radius 50%
      flex 0 0 64px
      margin auto 2em
    .content
      flex 1 0 200px
      text-align left
      .tweet-likes
        color green
  input
    width 100%
    box-sizing border-box
</style>
