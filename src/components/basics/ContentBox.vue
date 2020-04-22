<template>
  <div class="mybox">
    <div class="contentBox">
      <div :class="contentType">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type:{
      type: String,
      default: ""
    }
  },
  computed: {
    contentType(){
      switch (this.type) {
        case "appBar":
            return 'type-appBar'
          break;
        case "list":
            return 'type-list'
          break;
        case "tabs":
            return 'type-tabs'
          break;
      }
    }
  },
  created () {
    console.log(this.type, this.contentType)
  }
}
</script>

<style lang="less" scoped>
  .mybox{
    .contentBox{
      height: 100vh;
      overflow: hidden;
    }
    .type-appBar{
      height: 100vh;
      overflow-y: scroll;
      margin-top: 56px;
      padding-bottom: 12px;
    }
    .type-list{
      height: calc(100vh - 104px);
      overflow-y: scroll;
      margin-top: 104px;
      padding-bottom: 12px;
    }
    .type-tabs{
      height: calc(100vh - 92px);
      overflow-y: scroll;
      margin-top: 92px;
      padding-bottom: 12px;
    }
  }
</style>
