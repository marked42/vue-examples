<template>
  <div>
    <div>
      <h3>list</h3>
      <kos-select :items="items"></kos-select>
    </div>
    <div>
      <h3>async list</h3>
      <kos-select :items="items" :async-items="asyncItems"></kos-select>
    </div>
  </div>
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
