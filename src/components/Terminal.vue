<template>
  <div id="xterm"> </div>
</template>

<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import io from 'socket.io-client'
export default {
  data: () => ({
  }),
  mounted() {
    const socket = io('http://172.16.1.140:3000')
    console.log(socket)
    const term = new Terminal()
    term.open(document.getElementById("xterm"))
    const addon = new FitAddon()
    term.loadAddon(addon)
  }
}
</script>

<style>

</style>