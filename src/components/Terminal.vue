<template>
<div class="box">
  <div id="xterm"> </div>
  <el-input></el-input>
  </div>
</template>

<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
import io from 'socket.io-client'
export default {
  data: () => ({
    term: '',
    socket: '',
  }),
  mounted() {
    let url = 'http://172.16.1.140:3000'
    this.init(url)
  },
  methods: {
    initXTerm() {
      this.term = new Terminal({
        rendererType: "canvas", //Rendering type
        rows: 35, //Rows
        convertEol: true, //When enabled, the cursor will be set to the beginning of the next line
        scrollback: 10, //The amount of rollback in the terminal
        disableStdin: false, //Whether input should be disabled
        cursorStyle: "block", //Cursor style
        cursorBlink: true, //Cursor blinks
        theme: {
          foreground: "yellow", //Font
          background: "#060101", //Background color
        }
      })
      this.term.open(document.getElementById('xterm'))
      const fitaddon = new FitAddon()
      this.term.loadAddon(fitaddon)
      const attachaddon = new AttachAddon(this.socket)
      this.term.loadAddon(attachaddon)
      this.term.onData((key) => {
        this.send(key)
      })
    },
    init(url) {
      // instantiate socket.io connection
      this.socket = io(url)
      // monitor connect event
      this.socket.on('connect', () => {
        this.open()
      })
      // monitor error
      this.socket.on('error', (error) => {
        this.error()
      })
      // monitor messages
      this.socket.on('message', (data) => {
        this.term.write(data)
        console.log(data)
      })
    },
    open() {
      this.initXTerm()
    },
    error() {
      console.error('error connecting')
    },
    getMessage(message) {
      this.term.write(JSON.parse(message.data)[1])
    },
    send(order) {
      this.socket.send(order)
    }
  }
}
</script>

<style>
.box {
  width: 100%;
  height: 100%;
}

</style>