<template>
  <div class="container">
    <a href="https://github.com/hkx930919/h-cli" target="_blank">
      {{ msg }}
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '开发前请仔细阅读脚手架使用说明'
    }
  },
  methods: {
    todo() {
      console.log('111')
    }
  }
}
</script>
<style scoped lang="less">
.container {
  font-size: 20px;
  text-align: center;
  padding: 20px;
  > a {
    display: block;
    color: #0080ff;
    text-decoration: underline;
  }
  > img {
    margin-top: 15px;
  }
}
</style>
