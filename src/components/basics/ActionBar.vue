<template>
  <div class="actionBar topShadow">
    <mu-button flat class="secondary" @click="secondaryCallback">{{secondaryTest}}</mu-button>
    <mu-button flat class="confirm" @click="confirmCallback">{{confirmTest}}</mu-button>
  </div>
</template>

<script>
export default {
  props: {
    secondaryTest:{
      type: String,
      default: ""
    },
    confirmTest:{
      type: String,
      default: ""
    }
  },
  data() {
    return {

    }
  },
  methods: {
    secondaryCallback(){
      this.$emit("secondaryCallback");
    },
    confirmCallback(){
      this.$emit("confirmCallback");
    }
  }
}
</script>

<style lang="less" scoped>
  .actionBar{
    position: fixed;
    width: 100vw;
    bottom: 0;
    padding: 20px 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    
    .secondary, .confirm{
      border-radius:6px;
      padding: 22px 0;
    }
    .secondary{
      color: @primary-text;
      background-color: #EDEDED;
      width: 34%;
    }
    .confirm{
      background-color: @primary;
      color: #fff;
      width: 60%;
    }
  }
</style>
