<template>
  <div class="home">Home</div>
</template>

<script>
export default {
  created() {
    this.$http.post(this.$api.storeUrl.list).then(data=>{
      // console.log(data)
    })
  }
}
</script>

<style lang="less" scoped>
</style>