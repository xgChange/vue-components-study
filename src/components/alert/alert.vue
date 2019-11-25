<template>
  <div class="alert">
    <div class="alert-box" v-for="(item, index) in notices" :key="index">
      <div class="alert-content" v-html="item.message"></div>
      <span class="closeIcon" v-if="item.close" @click="closeMsg(item.name)">关闭</span>
    </div>
  </div>
</template>

<script>
let seed = 0
function getUuid() {
  return 'alert_' + (seed++)
}
export default {
  data() {
    return {
      notices: [],
      name: 0
    }
  },
  methods: {
    add(notice) {
      let { duration } = notice
      let name = getUuid()
      let _notice = Object.assign({ // 合并增加的name属性和notice
        name
      }, notice)
      this.notices.push(_notice)
      if (duration) {
        setTimeout(() => {
          this.remove(name)
        }, duration * 1000);
      }
    },
    remove(name) {
      const notice = this.notices
      for (let i = 0;i < notice.length;i++) {
        if (notice[i].name === name) {
          notice.splice(i, 1)
          break
        }
      }
    },
    closeMsg(name) {
      this.remove(name)
    }
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
}

.alert-box {
  background: #cccccc;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 8px;
}

.closeIcon {
  font-size: 12px;
  color: red;
  padding: 0 0 0 10px;
}

.alert-content {
  display: inline-block;
}

.alert-content::before {
  content: '"图标"';
  padding: 5px;
  display: inline-block;
  font-size: 12px;
}
</style>