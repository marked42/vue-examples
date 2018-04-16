<template>
  <div>
    <button @click="createWatcher">
      create watcher
    </button>
    <button @click="fullName = 'Mike-Beth'">
      use computed setter
    </button>
    <div>
      {{ fullName }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'watch',
  data() {
    return {
      firstName: 'Jhon',
      lastName: 'Green',
    }
  },
  props: {
    family: 'Royal',
  },
  methods: {
    createWatcher() {
      console.log('create watcher called')
      this.$watch('firstName', () => console.log('create watcher on firstName'), { deep: true })
    },
  },
  computed: {
    fullName: {
      get() {
        return `${this.firstName} - ${this.lastName}`
      },
      set(value) {
        console.log('set computed property')
        const [first, last] = value.split('-')
        this.firstName = first
        this.lastName = last
      },
      cache: true,
    },
  },
}
</script>
