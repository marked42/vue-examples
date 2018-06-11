<template>
  <div>
    list example
    <kos-list
      v-model="selectedItemIndexes"
      :items="items"
      :multiple-selection="true"
    >
      <span slot="empty">
        hehe
      </span>
    </kos-list>
  </div>
</template>

<script>
import KosList from './KosList'

export default {
  name: 'kos-list-example',
  components: {
    KosList,
  },
  data() {
    return {
      selectedItemIndexes: [],
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
      ],
    }
  },
}
</script>
