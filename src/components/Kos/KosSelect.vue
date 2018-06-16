<template>
  <div
    :class="selectClass"
    @click="handleSelectClick"
  >
    <!-- kos-select-input -->
    <template v-if="!multipleSelection">
      <input
        ref="input"
        v-model="inputModel"
        :class="selectInputSingleClass"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      ><span class="kos-select-input-arrow"></span>
    </template>
    <template v-else>
      <div
        v-for="(item, index) in selectedItems"
        :key="item.label"
        :class="selectTagsClass"
      >
        {{item.label}}
        <span
          @click="deselectItem(index)"
          class="kos-select-tag-remove-icon"
        >×</span>
      </div>
      <input
        ref="input"
        v-model="inputModel"
        :class="selectInputMultipleClass"
        :style="selectInputMultipleStyle"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      >
    </template>

    <!-- kos-select-list -->
    <div
      v-if="listType === listTypes.FETCHING"
      v-show="inputFocused"
      :class="['kos-select-list', 'kos-select-list-fetching']"
    >
      fetching...
    </div>
    <div
      v-else-if="listType === listTypes.ERROR"
      v-show="inputFocused"
      :class="['kos-select-list', 'kos-select-list-error']"
    >
      {{stateErrorMessage}}
    </div>
    <kos-list
      v-else
      :show="inputFocused"
      v-model="selectedItemIndexes"
      :items="listItems"
      class="kos-select-list"
      :multiple-selection="multipleSelection"
    >
      <div slot="empty">
        <slot name="empty">
          empty select list
        </slot>
      </div>
    </kos-list>
  </div>
</template>

<script>
import KosList from './KosList'
import { listItemsValidator, itemValidator } from './listUtils'

export default {
  name: 'kos-select',
  components: {
    KosList,
  },
  props: {
    items: {
      type: Array,
      required: false,
      default() {
        return []
      },
      validator: listItemsValidator,
    },
    asyncItems: {
      type: Function,
      required: false,
    },
    multipleSelection: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator(value) {
        return ['large', 'medium', 'small', 'default'].includes(value)
      },
    },
    showSearch: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      input: '',
      inputFocused: false,
      listItems: [],
      selectedItemIndexes: [],
      stateType: 'initial',
      stateErrorMessage: '',
      stateTypes: {
        INITIAL: 'initial',
        FETCHING: 'fetching',
        FETCHING_SUCCESS: 'fetching-success',
        FETCHING_RESULT_INVALID: 'fetching-result-invalid',
        FETCHING_FAILED: 'fetching-failed',
      },
      listTypes: {
        EMPTY: 'empty',
        VALID: 'valid',
        FETCHING: 'fetching',
        ERROR: 'error',
      },
    }
  },
  computed: {
    inputModel: {
      get() {
        if (this.inputFocused) {
          return this.input
        }

        return !this.multipleSelection ? this.selectedItem.label : ''
      },
      set(value) {
        this.input = value
      },
    },
    isLarge() {
      return this.size === 'large'
    },
    isSmall() {
      return this.size === 'small'
    },
    selectClass() {
      return {
        'kos-select': true,
        'kos-select-focused': this.inputFocused,
        'kos-select-large': this.isLarge,
        'kos-select-small': this.isSmall,
        'kos-select-show-search': this.showSearch,
      }
    },
    selectInputSingleClass() {
      return {
        'kos-select-input': true,
        'kos-select-input-single': true,
        'kos-select-input-single-large': this.isLarge,
        'kos-select-input-single-small': this.isSmall,
      }
    },
    selectTagsClass() {
      return {
        'kos-select-tag': true,
        'kos-select-tag-large': this.isLarge,
        'kos-select-tag-small': this.isSmall,
      }
    },
    selectInputMultipleClass() {
      return {
        'kos-select-input': true,
        'kos-select-input-multiple': true,
        'kos-select-input-multiple-large': this.isLarge,
        'kos-select-input-multiple-small': this.isSmall,
      }
    },
    selectInputMultipleStyle() {
      // TODO: calculate length of characters with fixed font-size and content, em is not accurate
      return `width: ${Math.max(1, this.input.length)}em;`
    },
    selectedItem() {
      const defaultItem = { label: '', value: undefined }

      if (this.selectedItemIndexes.length === 0) {
        return defaultItem
      }

      const item = this.items[this.selectedItemIndexes[0]]

      return item || defaultItem
    },
    selectedItems() {
      return this.selectedItemIndexes.map(index => this.items[index]).filter(itemValidator)
    },
    useAsyncItems() {
      return typeof this.asyncItems === 'function'
    },
    listType() {
      const { stateType, stateTypes, listTypes } = this

      switch (stateType) {
        case stateTypes.INITIAL:
        case stateTypes.FETCHING_RESULT_INVALID:
        default:
          return listTypes.EMPTY

        case stateTypes.FETCHING:
          return listTypes.FETCHING

        case stateTypes.FETCHING_FAILED:
          return listTypes.ERROR

        case stateTypes.FETCHING_SUCCESS:
          return listTypes.FETCHING_SUCCESS
      }
    },
  },
  methods: {
    fetchAsyncItems() {
      this.stateType = this.stateTypes.FETCHING

      this.asyncItems(this.input).then(items => {
        const valid = listItemsValidator(items)
        console.log('items')

        if (valid) {
          this.listItems = items
          this.stateType = this.stateTypes.FETCHING_SUCCESS
        } else {
          this.stateType = this.stateTypes.FETCHING_RESULT_INVALID
        }
      }).catch(error => {
        this.stateType = this.stateTypes.FETCHING_FAILED
        this.stateErrorMessage = error.message
      }).finally(() => {
        this.selectedItemIndexes = []
      })
    },
    handleSelectClick() {
      this.$refs.input.focus()
    },
    handleInputFocus() {
      this.inputFocused = true
    },
    handleInputBlur() {
      this.inputFocused = false
    },
    deselectItem(index) {
      this.selectedItemIndexes.splice(index, 1)
    },
  },
  created() {
    if (this.useAsyncItems) {
      this.fetchAsyncItems()
    } else {
      this.listItems = [...this.items]
    }
  },
}
</script>

<style lang="stylus" scoped>
$BORDER_WIDTH = 1px
$DOUBLE_BORDER_WIDTH = 2 * $BORDER_WIDTH
$NEGATIVE_BORDER_WIDTH = -1 * $BORDER_WIDTH

$SELECT_BORDER_RADIUS = 4px
$TAG_BORDER_RADIUS = 4px

$SIZE_HEIGHT_SMALL = 24px
$SIZE_HEIGHT_MEDIUM = 32px
$SIZE_HEIGHT_LARGE = 40px

$SIZE_GAP_Y_SMALL = 2px
$SIZE_GAP_Y_MEDIUM = 3px
$SIZE_GAP_Y_LARGE = 4px

$SIZE_GAP_X_SMALL = $SIZE_GAP_Y_SMALL * 2
$SIZE_GAP_X_MEDIUM = $SIZE_GAP_Y_MEDIUM * 2
$SIZE_GAP_X_LARGE = $SIZE_GAP_Y_LARGE * 2

$ICON_SIZE = 12px

$SIZE_FONT_SMALL = 14px
$SIZE_FONT_MEDIUM = 14px
$SIZE_FONT_LARGE = 16px

$SELECT_WIDTH_SMALL = 200px
$SELECT_WIDTH_MEDIUM = 300px
$SELECT_WIDTH_LARGE = 400px

.kos-select
  position relative
  display inline-block
  box-sizing border-box
  border $BORDER_WIDTH solid #e8e8e8
  border-radius $SELECT_BORDER_RADIUS
  min-height $SIZE_HEIGHT_MEDIUM
  width $SELECT_WIDTH_MEDIUM
  padding 0 $SIZE_GAP_X_MEDIUM
  font-size $SIZE_FONT_MEDIUM
  line-height $SIZE_HEIGHT_MEDIUM - 2 * $BORDER_WIDTH - 2 * $SIZE_GAP_Y_MEDIUM
  // cursor pointer
  cursor text
  transition all .3s cubic-bezier(.645,.045,.355,1)
  &.kos-select-show-search
    cursor text
  &.kos-select-small
    min-height $SIZE_HEIGHT_SMALL
    width $SELECT_WIDTH_SMALL
    padding 0 $SIZE_GAP_X_SMALL
    font-size $SIZE_FONT_SMALL
    line-height $SIZE_HEIGHT_SMALL - 2 * $BORDER_WIDTH - 2 * $SIZE_GAP_Y_SMALL
  &.kos-select-large
    min-height $SIZE_HEIGHT_LARGE
    width $SELECT_WIDTH_LARGE
    padding 0 $SIZE_GAP_X_LARGE
    font-size $SIZE_FONT_LARGE
    line-height $SIZE_HEIGHT_LARGE - 2 * $BORDER_WIDTH - 2 * $SIZE_GAP_Y_LARGE
  &:hover
    border $BORDER_WIDTH solid #1890ff
  // &.kos-select-focused
  //   border $BORDER_WIDTH solid red
    // TODO: box-shadow
    // &.kos-select-input-small
    //   padding $SIZE_PADDING_SMALL 2 * $SIZE_PADDING_SMALL
    //   font-size $SIZE_FONT_SMALL
    // &.kos-select-input-large
    //   padding $SIZE_PADDING_LARGE 2 * $SIZE_PADDING_LARGE
    //   font-size $SIZE_FONT_LARGE
  .kos-select-input
    display inline-block
    border none
    outline none
    text-align left
    padding 0
    max-width 100%
    font-size inherit
    line-height inherit
  .kos-select-input-arrow
    cursor pointer
    &:before
      // TODO: unicode support ?
      // content "\E61D"
      content "+"
      display inline-block
      position absolute
      top 50%
      transform translateY(-50%)
      width 12px
      height 12px
  .kos-select-input-single
    margin $SIZE_GAP_Y_MEDIUM 0
    width "calc(100% - %s)" % $ICON_SIZE
    &.kos-select-input-single-small
      margin $SIZE_GAP_Y_SMALL 0
    &.kos-select-input-single-large
      margin $SIZE_GAP_Y_LARGE 0
  .kos-select-tag
    display inline-block
    box-sizing border-box
    background gray
    border-radius 4px
    padding 2px 4px
    margin $SIZE_GAP_Y_MEDIUM $SIZE_GAP_Y_MEDIUM $SIZE_GAP_Y_MEDIUM 0
    height $SIZE_HEIGHT_MEDIUM - 2 * $BORDER_WIDTH - 2 * $SIZE_GAP_Y_MEDIUM
    &.kos-select-tag-small
      margin $SIZE_GAP_Y_SMALL $SIZE_GAP_Y_SMALL $SIZE_GAP_Y_SMALL 0
      height $SIZE_HEIGHT_SMALL - 2 * $BORDER_WIDTH - 2 * $SIZE_GAP_Y_SMALL
    &.kos-select-tag-large
      margin $SIZE_GAP_Y_LARGE $SIZE_GAP_Y_LARGE $SIZE_GAP_Y_LARGE 0
      height $SIZE_HEIGHT_LARGE - 2 * $BORDER_WIDTH - 2 * $SIZE_GAP_Y_LARGE
  .kos-select-input-multiple
    margin $SIZE_GAP_Y_MEDIUM $SIZE_GAP_Y_MEDIUM $SIZE_GAP_Y_MEDIUM 0
    width 1em
    &.kos-select-input-multiple-small
      margin $SIZE_GAP_Y_SMALL $SIZE_GAP_Y_SMALL $SIZE_GAP_Y_SMALL 0
    &.kos-select-input-multiple-large
      margin $SIZE_GAP_Y_LARGE $SIZE_GAP_Y_LARGE $SIZE_GAP_Y_LARGE 0
    // &.kos-select-tag-small
    // &.kos-select-tag-large
  //   .kos-select-input-multiple
  //     display inline-block
  //     .kos-select-tag
  //       display inline-block
  //       margin 0 3px 0 0
  //       padding 3px
  //       border-radius 3px
  //       background #e8e8e8
  //       &:last-child
  //         margin 0
  //       .kos-select-tag-remove-icon
  //         // display inline-block
  //         cursor pointer
  //     input
  //       display inline-block
  //       max-width 100%
  //       width 30px
  //       height 20px
  //       border none
  //       &:focus
  //         outline none
  .kos-select-list
    position absolute
    top 100%
    left $NEGATIVE_BORDER_WIDTH
    min-width "calc(100% + %s)" % $DOUBLE_BORDER_WIDTH
    margin-top 3px
    z-index 1
    background white
    &.kos-select-list-fetching
      box-sizing border-box
      border-radius 4px
      border 1px solid #ccc
    &.kos-select-list-error
      box-sizing border-box
      border-radius 4px
      border 1px solid #ccc
      border-color red
</style>
