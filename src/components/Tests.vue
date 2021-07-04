<template>
  <div> {{ output }} </div>
  <p> <el-button @click='testCall()' > Butyon </el-button> </p>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
export default {
  setup() {
    const output = ref('')
    async function testCall() {
      try {
        const resp = await axios.get('http://172.16.1.140:3000')
        output.value = resp.data
        return console.log(resp.data)
      }
      catch (error) {
        console.error(error)
      }
    }
    return { output, testCall }
  }
}
</script>

<style>

</style>