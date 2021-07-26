<template>
  <el-row>
    <el-col :span='12'>
      <div v-if="output !== ''"> {{ output }} </div>
      <Terminal :url='url' :key='url' />
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
import Terminal from './Terminal.vue'
import { onBeforeMount, ref } from 'vue'
export default {
  name: 'Tests',
  components: {
    Terminal,
  },
  props: ['url'],
  setup(props) {
    const output = ref('')
    async function testCall() {
      try {
        const resp = await axios.get('http://172.16.1.140:3000/test')
        output.value = resp.data
        return console.log(resp.data)
      }
      catch (error) {
        console.error(error)
      }
    }
    return { output, testCall }
  },
  watch: {
    url(val) {

    }
  }
}
</script>

<style>

</style>