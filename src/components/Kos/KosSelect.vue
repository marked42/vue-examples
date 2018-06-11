<template>
  <div class="kos-select">
    <input
      v-if="!multipleSelection"
      v-model="inputModel"
      class="kos-select-input"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
    >
    <div
      v-else
      class="kos-select-tags-box"
    >
      <div
        v-for="(item, index) in selectedItems"
        :key="item.label"
        class="kos-select-tag"
      >
        {{item.label}}
        <span
          @click="deselectItem(index)"
          class="kos-select-tag-remove-icon"
        >x</span>
      </div>
      <input @focus="handleInputFocus" @blur="handleInputBlur">
      <div class="input">s</div>
    </div>
    <div
      v-if="listType === listTypes.FETCHING"
      class="kos-select-list-fetching"
    >
      fetching...
    </div>
    <div
      v-else-if="listType === listTypes.ERROR"
      class="kos-select-list-error"
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
.kos-select
  position relative
  .kos-select-input
    width 100%
    box-sizing border-box
  .kos-select-list
  .kos-select-list-fetching
  .kos-select-list-error
    position absolute
    top 100%
    left 0
    min-width 100%
    margin-top 3px
    z-index 1
  .kos-select-list-fetching
  .kos-select-list-error
    box-sizing border-box
    border-radius 4px
    border 1px solid #ccc
  .kos-select-list-error
    border-color red
  .kos-select-tags-box
    display inline-block
    width 100%
    height auto
    padding 2px 4px
    text-align left
    border-radius 4px
    box-sizing border-box
    border 1px solid black
    vertical-align middle
    .kos-select-tag
      display inline-block
      border 1px solid black
      border-radius 2px
      margin 0 3px 0 0
      padding 3px
      &:last-child
        margin 0
      .kos-select-tag-remove-icon
        // display inline-block
        cursor pointer
    input
    .input
      display inline-block
      max-width 100%
      width 30px
      height 20px
      border none
      &:focus
        outline none
</style>
