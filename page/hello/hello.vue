<!--
@file hello.vue
@author kashao@anonymous.cn
@since 2018/12/15 17:46:14
-->

<template>
  <div class="hello">
    <c-title :text="title"></c-title>
    <img class="logo" src="../assets/images/logo.png">
    <p class="welcome">欢迎使用 vue</p>
    <div v-html="content"></div>
  </div>
</template>

<script src='./hello.js' type="text/ecmascript-6">
</script>
<style lang="less" src='./hello.less' rel="stylesheet/less" scoped>
</style>

