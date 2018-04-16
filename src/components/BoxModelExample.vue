<template>
  <div class="container">
    <p>
      input width is not same as parent width when using <code>width: 100%</code>.
      because it uses <code>box-sizing: border-box</code> by default.
    </p>
    <input >
    <div v-html="content"/>
  </div>
</template>

<script>
export default {
  name: 'box-model-example',
  data() {
    return {
      currentContent: '<h1>订单重复支付</h1><p>同种支付方式重复扣款是因网络延迟情况而产生，重复扣款金额于1个工作日退回原支付账号。如超时未收到，请联系在线客服。</p > < div > < ul > < li > 例： 使用支付宝中的农行卡支付， 金额退回到农行卡 < /li></ul > < /div><br/ > < p > 不同支付方式重复扣款（ 一笔支付宝支付、 一笔微信支付） 需提供订单号、 该笔订单付款截图联系薯队长处理。 < /p><br />',
      content: '<h1>订单重复支付</h1><p>同种支付方式重复扣款是因网络延迟情况而产生，重复扣款金额于1个工作日退回原支付账号。如超时未收到，请联系在线客服。</p><div><ul><li>例：使用支付宝中的农行卡支付，金额退回到农行卡</li></ul></div><br/><p>不同支付方式重复扣款（一笔支付宝支付、一笔微信支付）需提供订单号、该笔订单付款截图联系薯队长处理。</p>',
    }
  },
}
</script>

<style lang="stylus">
.container
  border solid 1px black
  width 400px
  input
    width 100%
    border solid 1px blue
    box-sizing border-box
</style>
