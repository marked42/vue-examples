<template>
  <div>
    <button @click="incrementNest">+</button><span>{{nested.value}}</span>
    <child v-model="nested"></child>
  </div>
</template>

<script>
import Child from './Child'

export default {
  name: 'Parent',

  components: {
    Child,
  },

  methods: {
    // incrementValue() {
    //   this.nested.value = this.nested.value + 1
    // },

    incrementNest() {
      this.nested = { value: this.nested.value + 2 }
    },
  },

  data() {
    return {
      nested: {
        value: 0,
      },
    }
  },

  created() {
    console.log('parent created')

    window.parent = this
  },
}
</script>
