<template>
  <Tests url='http://172.16.1.140:3000' />
</template>

<script>
import Tests from './Tests.vue'
import axios from 'axios'

export default {
  components: {
    Tests,
  },

  data: () => ({
  }),

  mounted() {
    this.ipTest()
  },

  methods: {
    async ipTest() {
      const ip = await axios.get('http://172.16.1.140:3000/hostState')
      console.log(ip.data)
    }
  }
}
</script>

<style>
</style>