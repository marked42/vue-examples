<template>
  <div :class="selectClass">
    <!-- kos-select-input -->
    <input
      v-if="!multipleSelection"
      v-model="inputModel"
      class="'kos-select-input-single'"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
    >
    <template v-else>
      <div
        v-for="(item, index) in selectedItems"
        :key="item.label"
        class="kos-select-tag"
      >
        {{item.label}}
        <span
          @click="deselectItem(index)"
          class="kos-select-tag-remove-icon"
        >×</span>
      </div>
      <input
        class="kos-select-input-tag"
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
      v-show="inputFocused"
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
      default: 'large',
      validator(value) {
        return ['large', 'medium', 'small', 'default'].includes(value)
      },
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

        return !this.multipleSelection ? this.selectedItem.label : this.selectedItems
      },
      set(value) {
        this.input = value
      },
    },
    selectClass() {
      return {
        'kos-select': true,
        'kos-select-focused': this.inputFocused,
        'kos-select-large': this.size === 'large',
        'kos-select-small': this.size === 'small',
      }
    },
    selectInputSingleSelectionClass() {
      return {
        'kos-select-input': true,
        'kos-select-input-single': true,
        'kos-select-input-focused': this.inputFocused,
      }
    },
    selectInputMultipleSelectionClass() {
      return {
        'kos-select-input': true,
        'kos-select-input-multiple': true,
        'kos-select-input-focused': this.inputFocused,
      }
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
$TAG_BORDER_RADIUS

$SIZE_HEIGHT_SMALL = 24px
$SIZE_HEIGHT_MEDIUM = 32px
$SIZE_HEIGHT_LARGE = 40px

$SIZE_PADDING_Y_SMALL = 2px
$SIZE_PADDING_Y_MEDIUM = 3px
$SIZE_PADDING_Y_LARGE = 4px

$SIZE_PADDING_X_SMALL = $SIZE_PADDING_Y_SMALL * 2
$SIZE_PADDING_X_MEDIUM = $SIZE_PADDING_Y_MEDIUM * 2
$SIZE_PADDING_X_LARGE = $SIZE_PADDING_Y_LARGE * 2

$SIZE_FONT_SMALL = 14px
$SIZE_FONT_MEDIUM = 14px
$SIZE_FONT_LARGE = 16px

.kos-select
  position relative
  display inline-block
  box-sizing border-box
  border $BORDER_WIDTH solid #e8e8e8
  border-radius $SELECT_BORDER_RADIUS
  min-height 24px
  padding 0 6px
  // min-height $SIZE_HEIGHT_MEDIUM
  // padding 0 $SIZE_PADDING_X_MEDIUM
  transition all .3s cubic-bezier(.645,.045,.355,1)
  // &.kos-select-small
  //   min-height $SIZE_HEIGHT_SMALL
  //   padding 0 $SIZE_PADDING_X_SMALL
  // &.kos-select-large
  //   min-height $SIZE_HEIGHT_LARGE
  //   padding 0 $SIZE_PADDING_X_LARGE
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
  .kos-select-input-single
    margin 0
    outline none
    // position absolute
    // width "calc(100% + %s)" % $DOUBLE_BORDER_WIDTH
    // left $NEGATIVE_BORDER_WIDTH
    // top $NEGATIVE_BORDER_WIDTH
    // bottom $NEGATIVE_BORDER_WIDTH
    // box-sizing inherit
    // border inherit
    // border-radius inherit
    text-align left
    font-size $SIZE_FONT_MEDIUM
    // padding $SIZE_PADDING_MEDIUM 2 * $SIZE_PADDING_MEDIUM
  //   .kos-select-input-single
  //     white-space nowrap
  //     overflow hidden
  //     text-overflow ellipsis
  //     text-transform none
  //     outline none
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
