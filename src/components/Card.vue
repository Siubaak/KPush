<template>
  <div class="kp-card">
    <img class="kp-card-img" :src="img" />
    <div class="kp-card-opr">
      <p class="kp-card-desc">{{desc}}</p>
      <kp-button class="kp-card-button" @click="$emit('push')">推送</kp-button>
    </div>
  </div>
</template>

<script>
import Button from './Button'

export default {
  props: {
    img: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  },
  components: {
    'kp-button': Button
  }
}
</script>

<style lang="less" scoped>
.kp-card {
  width: 95%;
  background: #fff;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .kp-card-img {
    width: 80px;
  }
  .kp-card-opr {
    width: 100%;
    padding: 12px;
    display: flex;
    align-items: center;
    .kp-card-desc {
      margin: 0;
      flex: 1;
      text-align: left;
    }
    .kp-card-button {
      margin-left: 8px;
    }
  }
}
.kp-card + .kp-card {
  margin-top: 10px;
}
</style>
