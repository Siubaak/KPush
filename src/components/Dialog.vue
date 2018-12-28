<template>
  <div class="kp-dialog" :style="dialogStyle">
    <div v-if="urls.length">
      <kp-button v-for="(link, idx) in urls" :key="idx" @click="$emit('submit', link.url)">{{link.desc}}</kp-button>
    </div>
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
      height: 0
    }
  },
  computed: {
    dialogStyle() {
      return {
        height: this.height + 'px',
        bottom: this.visible ? '0px' : -this.height + 'px'
      }
    }
  },
  mounted() {
    this.height = parseFloat(getComputedStyle(this.$el).height)
  },
}
</script>

<style lang="less" scoped>
.kp-dialog {
  position: fixed;
  width: 100%;
  padding: 8px;
  border-top: 1px solid rgba(30,35,42,.06);
  box-shadow: 0 -1px 3px 0 rgba(0,34,77,.05);
  background-clip: content-box;
  box-sizing: border-box;
  transition: bottom 0.3s;
  background: #fff;
  z-index: 100;
}
</style>
