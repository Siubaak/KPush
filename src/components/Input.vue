<template>
  <div class="kp-input">
    <input v-model="internalVal" :placeholder="placeholder"
      @input="$emit('input', internalVal)" @keyup.enter="$emit('enter')"/>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      internalVal: this.value
    }
  }
}
</script>

<style lang="less" scoped>
.kp-input {
  background: #f7f8fa;
  height: 34px;
  padding: 4px 10px;
  font-size: 14px;
  border: 1px solid #e7eaf1;
  border-radius: 5px;
  box-sizing: border-box;
  input {
    height: 100%;
    width: 100%;
    padding: 0;
    overflow: hidden;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
  }
}
</style>
