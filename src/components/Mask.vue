<template>
  <div class="kp-mask" :style="maskStyle" @click="$emit('click')"></div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maskStyle() {
      if (this.visible) {
        return {
          zIndex: 1,
          opacity: 0.4
        }
      } else {
        return {
          zIndex: -100,
          opacity: 0
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.kp-mask {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #0f0f0f;
  position: fixed;
}
</style>
