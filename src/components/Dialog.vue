<template>
  <div class="kp-dialog" :style="dialogStyle">
    <div v-if="urls.length">
      <kp-button class="kp-dialog-button" v-for="(link, idx) in urls" :key="idx" @click="$emit('submit', link.url)">{{link.desc}}</kp-button>
      <kp-button class="kp-dialog-button kp-dialog-button_opr" @click="$emit('hide')">取消</kp-button>
    </div>
    <kp-button v-else class="kp-dialog-button kp-dialog-button_opr" @click="$emit('hide')">出错了，点击返回...</kp-button>
  </div>
</template>

<script>
import Button from './Button'

export default {
  props: {
    urls: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'kp-button': Button
  },
  data() {
    return {
      bottom: '-83px'
    }
  },
  watch: {
    visible() {
      this.bottom = '-' + getComputedStyle(this.$el).height
    }
  },
  computed: {
    dialogStyle() {
      return {
        bottom: this.visible ? '0px' : this.bottom
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
  border-top: 1px solid rgba(30,35,42,.06);
  box-shadow: 0 -1px 3px 0 rgba(0,34,77,.05);
  background-clip: content-box;
  box-sizing: border-box;
  transition: bottom 0.3s;
  background: #fff;
  z-index: 100;
  .kp-dialog-button {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &.kp-dialog-button_opr {
      background: #fff;
      color: #0f88eb;
    }
  }
  .kp-dialog-button + .kp-dialog-button {
    margin-top: 8px;
  }
}
</style>
