<template>
  <h1>{{ msg }}</h1>
  <h4 v-if="stdout"> {{ stdout }} </h4>
  <p>
    <el-button @click='testCall'> Butyon </el-button>
  </p>

  <button type="button" @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import axios from 'axios'
import { defineProps, reactive } from 'vue'
defineProps({
  msg: String
})

const state = reactive({ count: 0 })
const stdout = reactive({ stdout: '' })
const testCall = async () => {
  try {
    const resp = await axios.get('http://172.16.1.140:3000')
    stdout.stdout = resp.data
    return console.log(resp.data)
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
