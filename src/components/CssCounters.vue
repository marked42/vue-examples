<template>
  <div>
    <div class="example example1">
      <h1>Example 1</h1>
      <div class="example-result">
        <ol>1 item[0] = 0, create counter 'item'
          <li>2  item[0] = 1, inherit from parent, incremet item[0] by 1</li>
          <li>3  item[0] = 2, inherit from sibling, increment item[0] by 1</li>
          <li class="new-item">3 item[0].item[1] = [2,1], create nested 'item' counter item[1] = 0, increment item[1] by 1</li>
          <li>4 item[0].item[1] = [2,2], inherit from previous sibling, increment item[1] by 1</li>
          <li class="reset-item">5 4 item[0].item[1] = [2,1], inherit from previous sibling, reset item[1] = 0, increment item[1] by 1</li>
        </ol>
        <ol>5
          <li>6</li>
          <li>7</li>
          <li>8</li>
        </ol>
      </div>
      <p>
        <strong>Inherit counter from parent or previous sibling, inherit counter value from immediately previous counter <em>in document order</em></strong><br/>
        counter 'item' is created at first <code>ol(1)</code>, child (1),(2),(3) inherits counter 'item' and increments by 1.
        second <code>ol(5)</code> inherits counter 'item' from previous sibling, and inherits value from (3), so value is still 3.
        Its children inherits counter 'item' from it and increments by 1.
      </p>
    </div>
    <div id="example1">
      <h1>Example 1</h1>
      <ol> item[0] is created, set to 0
        <li> item[0] is incremented to 1</li>
        <li> item[0] is incremented to 2
          <ol> item[1] is created, set to 0, nested in item[0]
            <li> item[1] is incremented to 1</li>
            <li> item[1] is incremented to 2</li>
            <li> item[1] is incremented to 3
              <ol> item[2] is created, set to 0, nested in item[1]
                <li> item[2] is incremented to 1</li>
              </ol>
            </li>
            <li> item[1] is incremented to 4
              <ol> item[3] is created, set to 0, nested in item[1]
                <li> item[3] is incremented to 1</li>
              </ol>
            </li>
            <li> item[1] is incremented to 5</li>
          </ol>
        </li>
        <li> item[0] is incremented to 3</li>
        <li> item[0] is incremented to 4</li>
      </ol>
      <ol> item[4] is created, set to 0
        <li> item[4] is incremented to 1</li>
        <li> item[4] is incremented to 2</li>
      </ol>
    </div>
    <div id="example2">
      <h1>Example 2</h1>
      <ul id="root">
        <li>1
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
        </li>
        <li>2
        </li>
      </ul>
    </div>
    <p>
      <code>
        counter-reset
        counter-increment
        counters(name, style)
        counter(name, string, style)
        are used in combination to control numbering labeling.
      </code>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CssCounters',
}
</script>

<style lang="stylus" scoped>
ol
ul
  text-align left
  list-style-type none
li
  margin-left 30px

.example
  border 1px solid brown

.example-code
.example-result
  border 1px solid black
  display inline-block
  box-sizing border-box
  width 90%

.example1
  ol
    &:first-of-type
      counter-reset item 0
    &:before
      content counters(item, ".") "| "
      color green
    li
      margin-left 30px
      &:before
        counter-increment item 1
        content counters(item, ".") "| "
        color blue
      &.new-item
        counter-reset item 0
      &.reset-item
        counter-reset item 0

#example1
  ol
    counter-reset item
    text-align left
    &:before
      content counters(item, "-") " | " counter(item) " new -"
      color green
    li
      display block
      margin-left 30px
      &:before
        counter-increment item 1
        content counters(item, ".") " | " counter(item) " increment -"
        color blue

#example2
  ul
    counter-reset section 0
    list-style-type none
    text-align left
    &:before
      content counters(section, '-') " new -"
      color green
    li
      counter-increment section 1
      margin-left 30px
      &:before
        content counters(section, '.') " increment -"
        margin-right 20px
        color blue
</style>
