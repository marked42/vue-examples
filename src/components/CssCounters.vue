<template>
  <div>
    <div class="example example1">
      <h1>Example 1</h1>
      <div class="example-result">
        <ol>
          <span class="item-numbering">1</span>
          <span class="counter-nested-structure">item[0] = 0</span>,
          <span class="counter-process-inherit">inherit from parent</span>
          <span class="counter-process-reset">create</span> counter 'item'
          <span class="counter-process-set"></span>
          <span class="counter-process-increment"></span>
          <span class="counter-process-use"></span>
          <li>
            <span class="item-numbering">2</span>
            <span class="nested-counter">item[0] = 1</span>
            <span>inherit from parent</span>
            <span>incremet item[0] by 1</span>
          </li>
          <li>
            <span class="item-numbering">3</span>
            <span class="nested-counter">item[0] = 2</span>
            <span>inherit from parent</span>
            <span>increment item[0] by 1</span>
          </li>
          <li class="reset-item">
            <span class="item-numbering">4</span>
            <span class="nested-counter">item[0].item[1] = [2,1]</span>,
            <span class="counter-create">create</span>
            <span>increment item[1] by 1</span>
          </li>
          <li>
            <span class="item-numbering">5</span>
            <span class="nested-counter">item[0].item[1] = [2,2]</span>,
            <span class="counter-create">create</span>
            <span>increment item[1] by 1</span>
          </li>
          <li class="reset-item">
            <span class="item-numbering">6</span>
            <span class="nested-counter">item[0].item[1] = [2,1]</span>
            <span class="counter-create">create</span>
            <span>increment item[1] by 1</span>
          </li>
        </ol>
        <ol><span class="item-numbering">7</span> <span class="nested-counter">item[0] = 2</span>, inherit item[0] from previous sibling, inherit value from last element (2) with same level of counter depth,
          <li class="reset-item">
            <span class="item-numbering">8</span>
            <span class="nested-counter">item[0].item[2] = [2, 1]</span>,
            <span class="counter-inherit">inherit from parent</span>
            <span class="counter-reset">create nested 'item' counter item[2] = 0</span>
            <span class="counter-increment">increment item[0] by 1</span>
          </li>
          <li><span class="item-numbering">9</span> <span class="nested-counter">item[0] = 4</span>, inherit from parent, increment item[0] by 1</li>
          <li><span class="item-numbering">10</span> <span class="nested-counter">item[0] = 5</span>, inherit from parent, increment item[0] by 1</li>
        </ol>
      </div>
      <p style="text-align: left; margin-left: 30px">
        <strong>Inherit counter from parent or previous sibling, inherit counter value from immediately previous counter <em>in document order</em></strong><br/>
        counter 'item' is created at first <code>ol(1)</code>, child (1),(2),(3) inherits counter 'item' and increments by 1.
        second <code>ol(5)</code> inherits counter 'item' from previous sibling, and inherits value from (3), so value is still 3.
        Its children inherits counter 'item' from it and increments by 1.
      </p>
      <p>

      </p>
    </div>
    <div id="example1">
      <h1>Example 2</h1>
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
  </div>
</template>

<script>
export default {
  name: 'CssCounters',
  data() {
    return {
      example1: {
        counters: {

        },
        inherit: '',
        reset: '',
        set: '',
        increment: '',
        use: '',
      },
    }
  },
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
  .item-numbering
    color orange
  .nested-counter
    color darkgray
  .counter-create
    color green
  ol
    &:first-of-type
      counter-reset item 0
    &:before
      content counters(item, ".") " "
      color blue
    li
      margin-left 30px
      &:before
        counter-increment item 1
        content counters(item, ".", test) " "
        color blue
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
