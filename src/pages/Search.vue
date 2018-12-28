<template>
  <div class="kp-search-container">
    <div class="kp-search-nav">
      <kp-input class="kp-search-input" v-model="value" placeholder="请输入关键词..."/>
      <kp-button class="kp-search-button" @click="handleSearch">搜索</kp-button>
    </div>

    <div v-if="list.length" class="kp-search-result">
      <kp-card v-for="book in list" class="" :key="book.id" :img="book.img" :desc="book.desc" @push="handleFetchUrls"/>
    </div>
    <p v-else class="kp-search-no-result">哎呀，没有相关图书哦...</p>

    <kp-dialog :visible="dialogVisible" :urls="urls" @submit="handlePush"></kp-dialog>
    <kp-mask :visible="dialogVisible" @click="handleDialogHide"></kp-mask>
  </div>
</template>

<script>
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import Dialog from '../components/Dialog'
import Mask from '../components/Mask'

import { getUrls, push } from '../api'

export default {
  components: {
    'kp-input': Input,
    'kp-button': Button,
    'kp-card': Card,
    'kp-dialog': Dialog,
    'kp-mask': Mask
  },
  asyncData ({ store, route }) {
    return store.dispatch('getList', route.query.query)
  },
  computed: {
    list () {
      return this.$store.state.list
    }
  },
  data() {
    return {
      value: '',
      urls: [],
      dialogVisible: false
    }
  },
  methods: {
    handleDialogHide() {
      this.dialogVisible = false
    },
    handleSearch() {
      if (this.value) {
        this.$router.push('search?query=' + this.value)
      }
    },
    handleFetchUrls(id) {
      this.dialogVisible = true
      getUrls(id).then(urls => this.urls = urls)
    },
    handlePush(url) {
      push(url).then(() => this.dialogVisible = false)
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
  .kp-search-no-result {
    color: #8590a6
  }
}
</style>
