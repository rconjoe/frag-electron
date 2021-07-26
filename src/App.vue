
<template>
    <h2> Fragadelphia 15 </h2>
    <h1> {{ time }} </h1>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
    </el-breadcrumb>
  <el-container>
    <router-view />
  </el-container>
</template>

<script>
  export default {
    data: () => ({
      title: 'Overview',
      interval: null,
      time: null,
      hosts: [
        {
          name: 'server name',
          ip: 'http://172.16.1.140:3000'
        }
      ]
    }),
    created() {
      // update the time every second
      this.interval = setInterval(() => {
        this.time = Intl.DateTimeFormat(navigator.language, {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }).format()
      }, 1000)
    },
    beforeUnmount() {
      clearInterval(this.interval)
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
