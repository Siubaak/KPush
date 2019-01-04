<template>
  <div class="kp-search-container">
    <div class="kp-search-nav">
      <kp-input class="kp-search-input" v-model="value"
        placeholder="请输入关键词..." @enter="handleSearch"/>
      <kp-button class="kp-search-button" @click="handleSearch">搜索</kp-button>
    </div>

    <div v-if="list.length" class="kp-search-result">
      <kp-card v-for="(book, idx) in list" :key="idx"
        :desc="book.desc" @push="handlePush(book.url)"/>
    </div>
    <p v-else-if="fail" class="kp-search-tips">出错了，重试一下吧...</p>
    <p v-else class="kp-search-tips">哎呀，没有相关图书哦...</p>

    <kp-dialog :visible="dialogVisible" :status="dialogStatus"></kp-dialog>
    <kp-mask :visible="dialogVisible" @click="handleDialogHide"></kp-mask>
  </div>
</template>

<script>
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import Dialog from '../components/Dialog'
import Mask from '../components/Mask'

import { push } from '../api'

export default {
  components: {
    'kp-input': Input,
    'kp-button': Button,
    'kp-card': Card,
    'kp-dialog': Dialog,
    'kp-mask': Mask
  },
  asyncData({ store, route }) {
    return store.dispatch('getList', route.query.query)
  },
  computed: {
    fail() {
      if (typeof this.$store.state.result.fail === 'boolean') {
        return this.$store.state.result.fail
      } else {
        return true
      }
    },
    list() {
      if (Array.isArray(this.$store.state.result.list)) {
        return this.$store.state.result.list
      } else {
        return []
      }
    }
  },
  data() {
    return {
      value: '',
      dialogStatus: 'ok',
      dialogVisible: false
    }
  },
  methods: {
    handleDialogHide() {
      if (this.dialogStatus !== 'loading') {
        this.dialogVisible = false
      }
    },
    handleSearch() {
      if (this.value) {
        this.$store.dispatch('getList', this.value)
      }
    },
    handlePush(url) {
      this.dialogVisible = true
      this.dialogStatus = 'loading'
      push(url).then(() => this.dialogStatus = 'ok')
        .catch(() => this.dialogStatus = 'fail')
    }
  }
}
</script>

<style lang="less" scoped>
.kp-search-container {
  padding-top: 60px;
  padding-bottom: 10px;
  text-align: center;
  .kp-search-nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(30,35,42,.06);
    box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
    background-clip: content-box;
    box-sizing: border-box;
    position: fixed;
    background: #fff;
    .kp-search-input {
      flex: 1;
    }
    .kp-search-button {
      width: 68px;
      margin-left: 8px;
    }
  }
  .kp-search-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .kp-search-tips {
    color: #8590a6
  }
}
</style>
