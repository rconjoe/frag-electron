<template>
<el-row>
  <el-col :span='24'>
  <div class="box">
    <h4> {{ hostname }} </h4>
    <div>
      <!-- <el-input
        v-model='command'
        > </el-input> -->
    </div>
    <el-button @click="ls"> ls </el-button>
    <!-- <el-button @click="installLGSMDeps"> Install LGSM Deps </el-button> -->
    <p> {{ output }} </p>
    <div id="xterm"> </div>
  </div>
  </el-col>
</el-row>
</template>

<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
import io from 'socket.io-client'
import axios from 'axios'
export default {
  props: ['url'],
  data: () => ({
    term: '',
    socket: '',
    output: '',
    command: '',
    hostname: '',
  }),
  mounted() {
    this.init(this.url)
    this.fetchHostname(this.url)
  },
  methods: {
    async fetchHostname(url) {
      await axios.get('http://172.16.1.140:3000/hostname')
      .then((response) => {
        this.hostname = response.data.stdout
      })
    },
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
      fitaddon.fit()
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
    async ls() {
      await axios.get('http://172.16.1.140:3000/ls')
      .then((response) => {
        console.log(response.data.stdout)
        this.output = response.data.stdout
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
    },
    async exec() {
      await axios.post('http://172.16.1.140:3000/exec', {
        command: this.command
      })
      .then((response) => {
        console.log(response.data.stdout)
        this.output = response.data.stdout
      })
      .catch(error => {
        console.error(error)
      })
    },
    installLGSMDeps() {
      this.send("./.install_lgsm_deps.sh \n")
    }
  }
}
</script>

<style>
.box {
  width: 700px;
  height: 1000px;
  position: absolute;
}
</style>