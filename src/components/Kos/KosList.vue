<template>
  <ul
    class="kos-list"
    @mouseleave="handleListMouseLeave"
  >
    <li v-if="items.length === 0">
      <slot name='empty'>
        empty list
      </slot>
    </li>
    <!-- notice that v-for is processed before v-if, so order of these two li should not be reversed -->
    <li
      v-else
      v-for="(item, index) in items"
      :key="item.label"
      :tabindex="-1"
      :class="getItemClassObject(index)"
      @mouseenter="handleItemMouseEnter(index)"
      @mousedown="handleItemMouseDown(index)"
      @keyup.enter="handleItemKeyupEnter"
      @keyup.up="handleItemKeyupUp(index)"
      @keyup.down="handleItemKeyupDown(index)"
    >
      <slot
        :items="items"
        :index="index"
        :item="item"
        :active="isItemActive(index)"
        :selected="isItemSelected(index)"
      >
        {{`index: ${index}, name: ${item.label}, value: ${JSON.stringify(item.value)}`}}
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'kos-list',
  props: {
    items: {
      type: Array,
      required: false,
      default() {
        return []
      },
      validator(items) {
        if (!Array.isArray(items)) {
          return false
        }

        function isItemValid(item) {
          return item !== null && typeof item === 'object' && typeof item.label === 'string' && item.value
        }

        return items.every(item => isItemValid(item))
      },
    },
    multipleSelection: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  model: {
    prop: 'selectedItemIndexes',
    event: 'item-select',
  },
  data() {
    return {
      activeItemIndex: -1,
      selectedItemIndexes: [],
    }
  },
  methods: {
    isItemActive(index) {
      return this.activeItemIndex === index
    },
    isItemSelected(index) {
      return this.selectedItemIndexes.includes(index)
    },
    getItemClassObject(index) {
      return {
        'kos-list-item': true,
        'kos-list-item-active': this.isItemActive(index),
        'kos-list-item-selected': this.isItemSelected(index),
      }
    },
    handleListMouseLeave() {
      this.activeItemIndex = -1
    },
    handleItemMouseEnter(index) {
      this.activeItemIndex = index
    },
    handleItemMouseDown(index) {
      this.selectItem(index)
    },
    selectItem(index) {
      const selected = this.isItemSelected(index)

      if (!this.multipleSelection) {
        if (!selected) {
          this.selectedItemIndexes = [index]
          this.$emit('item-select', this.selectedItemIndexes)
        }
        return
      }

      if (selected) {
        this.selectedItemIndexes = this.selectedItemIndexes.filter(selectedItemIndex => selectedItemIndex !== index)
      } else {
        this.selectedItemIndexes = [...this.selectedItemIndexes, index]
      }

      this.$emit('item-select', this.selectedItemIndexes)
    },
    handleItemKeyupEnter() {
      this.selectItem(this.activeItemIndex)
    },
    handleItemKeyupUp(index) {
      this.activeItemIndex = this.activeItemIndex === 0 ? this.items.length - 1 : this.activeItemIndex - 1
    },
    handleItemKeyupDown(index) {
      this.activeItemIndex = this.activeItemIndex === this.items.length - 1 ? 0 : this.activeItemIndex + 1
    },
  },
}
</script>

<style lang="stylus" scoped>
$LIST_BORDER_WIDTH = 1px
$LIST_BORDER_RADIUS = 4px
$ITEM_BORDER_RADIUS = 3px
$ITEM_PADDING_TOP_BOT = 3px
$ITEM_PADDING_LEFT_RIGHT = 2 * $ITEM_PADDING_TOP_BOT

.kos-list
  margin 0
  padding 0
  box-sizing border-box
  border-radius $LIST_BORDER_RADIUS
  border $LIST_BORDER_WIDTH solid #ccc
  text-align left
  .kos-list-item
    list-style none
    margin 0
    padding $ITEM_PADDING_TOP_BOT $ITEM_PADDING_LEFT_RIGHT
    box-sizing border-box
    border 1px solid transparent
    &:focus
      outline none
    &:first-child
      border-radius $ITEM_BORDER_RADIUS $ITEM_BORDER_RADIUS 0 0
    &:last-child
      border-radius 0 0 $ITEM_BORDER_RADIUS $ITEM_BORDER_RADIUS
    &:first-child:last-child
      border-radius $ITEM_BORDER_RADIUS
    &:nth-child(n+2):nth-last-child(n+2)
      border-radius 0
    &.kos-list-item-active
      background lightgray
      border 1px dashed yellow
    &.kos-list-item-selected
      background lightblue
</style>
