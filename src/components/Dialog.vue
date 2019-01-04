<template>
  <div class="kp-dialog" :style="dialogStyle">
    <p v-if="status === 'ok'" class="kp-dialog-tips">推送成功</p>
    <p v-else-if="status === 'fail'" class="kp-dialog-tips">哎呀，推送失败了</p>
    <p v-else-if="status === 'loading'" class="kp-dialog-tips">稍等，正在下载和推送哦...</p>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: 'ok',
      validator: status => ['ok', 'fail', 'loading'].indexOf(status) > -1
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogStyle() {
      return {
        top: this.visible ? '0px' : '-102px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.kp-dialog {
  position: fixed;
  width: 100%;
  padding: 24px 8px;
  transition: top 0.3s;
  box-sizing: border-box;
  background: #fff;
  z-index: 100;
  .kp-dialog-tips {
    margin: 0;
    color: #8590a6;
  }
}
</style>
