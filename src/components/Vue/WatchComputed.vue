<template>
  <div>
    <input v-model="name" />
    <input v-model="email" />
    <p ref="message">{{form}}</p>
    <p>
      computed watchers are notified only when there're any dependency, dependecies are updated when
      value changes or value is object or deeply watched
      <pre>
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        value !== this.value ||
        isObject(value) ||
        this.deep
      </pre>
    </p>
  </div>
</template>

<script>
export default {
  name: 'WatchComputed',
  data() {
    return {
      name: 'kos',
      email: 'red',
      obj: {},
    }
  },
  computed: {
    form: {
      get() {
        // eslint-disable-next-line
        const { name, email } = this

        return []
      },
      set(newValue) {
        const [name, email] = newValue.split('-')

        this.name = name
        this.email = email
      },
    },
  },
  watch: {
    form(newValue, oldValue) {
      console.log(newValue, oldValue)
    },
  },
}
</script>
