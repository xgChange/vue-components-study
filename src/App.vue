<template>
  <div id="app">
    <div
      class="parent"
      @drop="handle"
      @dragleave="dragLeave"
      @dragenter="dragEnter"
      @dragover="dragOver"
    >父元素</div>
    <div
      class="child"
      draggable="true"
      @drag="drag"
      @dragend="dragEnd"
      @dragstart="dragStart($event)"
    >子元素</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    dragStart(e) {
      this.dom = e.target.cloneNode(true)
    },
    handle(e) {
      console.log(e)
      // this.dom.style.position = 'absolute'
      // this.dom.style.left = 200 + 'px'
      e.target.appendChild(this.dom)
    },
    drag(e) {
      // console.log('drag')
    },
    dragOver(e) {
      // console.log('dragOver')
      e.preventDefault()

    },
    dragEnd(e) {

    },
    dragEnter(e) {
      // e.target.style.position = 'relative'

      // console.log('enter')
    },
    dragLeave() {
      // console.log('leave')
    }
  }
}
</script>

<style>
.parent {
  background: skyblue;
  width: 400px;
  height: 400px;
}
.child {
  background: palegoldenrod;
  width: 200px;
  height: 200px;
}
</style>
