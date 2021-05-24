<template>
  <div class="kp-card">
    <img class="kp-card-cover" v-if="cover" :src="cover"/>
    <div class="kp-card-cover kp-card-cover-default" v-else>KPush</div>
    <p class="kp-card-desc">{{desc}}</p>
    <kp-button class="kp-card-button" @click="$emit('push')">推送</kp-button>
  </div>
</template>

<script>
import Button from './Button'

export default {
  props: {
    desc: {
      type: String,
      default: ''
    },
    cover: {
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 12px;
  .kp-card-cover {
    width: 50px;
    height: 72px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    &.kp-card-cover-default {
      background-color: rgba(15, 136, 235, .4);
      color: rgba(255, 255, 255, .6);
      font-size: 10px;
      padding-top: 12px;
      box-sizing: border-box;
    }
  }
  .kp-card-desc {
    margin: 0 0 0 8px;
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .kp-card-button {
    margin-left: 8px;
  }
}
.kp-card + .kp-card {
  margin-top: 10px;
}
</style>
