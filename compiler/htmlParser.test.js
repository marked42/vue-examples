var parser = require('./htmlParser')

var html = `<div>
  <p>
    hehe
  </p>
</div>`

var str = `<div namespace:local.sync='value'></div>`

var str2 = `<html>
<script>
  var test = document.createElement('div')
</script>
<body title='test' v-model="value">
  test
</body>
</html>`

var str3 = `<div v-model="test" show>
  <p>
    <span>test</span>
  </p>
  <table>
    <thead><tr>row</tr></thead>
  </table>
</div>`

var str4 = `<div></div><p>test</p>`

var str5 = `<p><address>china</address><span>test</span></p>`

// parser.parse(str)
parser.parse(str5)
// parser.parse(html)

describe('html parser', () => {
})
