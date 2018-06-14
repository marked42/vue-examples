<template>
  <ol class="example-list">
    <li class="example-list-item">
      <strong>list</strong>
      <button @click="size = 'large'">large</button>
      <button @click="size = 'medium'">medium</button>
      <button @click="size = 'small'">small</button>
      <kos-select
        :items="items"
        :size="size"
      >
      </kos-select>
    </li>
    <li class="example-list-item">
      <strong>async list</strong>
      <kos-select
        :items="items"
        :size="size"
        :async-items="asyncItems"
      >
      </kos-select>
    </li>
    <li class="example-list-item">
      <strong>multiple selection list</strong>
      <kos-select
        :items="items"
        :multiple-selection="true"
        :size="size"
      ></kos-select>
    </li>
  </ol>
</template>

<script>
import KosSelect from './KosSelect'

export default {
  name: 'kos-select-example',
  components: {
    KosSelect,
  },
  data() {
    return {
      size: 'large',
      items: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
      ],
    }
  },
  methods: {
    asyncItems() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('failed!'))
          resolve([
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            },
            {
              label: '4',
              value: 4,
            },
          ])
        }, 1000)
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.example-list
  text-align left
  .example-list-item
    list-style-position inside
    height 100px
</style>
