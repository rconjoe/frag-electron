<template>
  <div id="xterm"> </div>
</template>

<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import * as io from 'socket.io-client'
export default {
  data: () => ({
  }),
  mounted() {
    const socket = io('ws://172.16.1.140:8080')
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