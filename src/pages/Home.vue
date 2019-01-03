<template>
  <div class="kp-home-container">
    <h2 class="kp-home-title">KPush服务</h2>
    <kp-input class="kp-home-input" v-model="value" placeholder="请输入关键词..."
      @enter="handleSearch"/>
    <kp-button class="kp-home-button" @click="handleSearch">搜索</kp-button>
  </div>
</template>

<script>
import Input from '../components/Input'
import Button from '../components/Button'

export default {
  components: {
    'kp-input': Input,
    'kp-button': Button
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    handleSearch() {
      if (this.value) {
        this.$router.push('search?query=' + this.value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.kp-home-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .kp-home-title {
    margin-top: 0;
    color: #0d79d1;
  }
  .kp-home-input {
    width: 70%;
  }
  .kp-home-button {
    width: 70%;
    margin-top: 8px;
  }
}
</style>
