<template>
  <button class="kp-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
.kp-button {
  height: 34px;
  padding: 4px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  text-align: center;
  border: 1px solid #0f88eb;
  border-radius: 5px;
  box-sizing: border-box;
  background: #0f88eb;
  &:hover {
    background: #0d79d1;
  }
}
</style>
