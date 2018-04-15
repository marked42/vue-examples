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
    <div class="bottom">
      <input type='text'>
    </div>
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
.tweet-box img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.tweet-box .top {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tweet-box img {
  flex: 0 0 64px;
  margin: auto 2em;
}

.tweet-box .content {
  flex: 1 0 200px;
}

.tweet-box .content p {
  text-align: left;
}

.tweet-box .bottom input {
  width: 100%;
}

.tweet-likes {
  color: green;
}

.bottom {
  margin-left: 2em;
  margin-right: 2em;
}
</style>
