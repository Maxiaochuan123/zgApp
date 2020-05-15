<template>
  <div class="test">
    <div class="contentBox">
      <div class="content-list" ref="moreBox">
        <!-- <div class="box" ref="box">
          <p v-for="(item, index) in 50" :key="index">{{index}}</p>
        </div> -->
        <!-- <div class="box" ref="moreBox"> -->
          <mu-button @click="getScroll">getScroll</mu-button>
          <mu-button @click="setScroll">setScroll</mu-button>
          <mu-load-more>
            <p @click="getScroll" v-for="(item, index) in 50" :key="index">{{index}}</p>
          </mu-load-more>
        <!-- </div> -->
          
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted () {
    this.setScroll()
  },
  methods: {
    getScroll(){
      console.log(this.$refs.moreBox.scrollTop);
    },
    setScroll(){
      this.$refs.moreBox.scrollTop = 200;
    }
  }
}
</script>

<style lang="less" scoped>
  .test{
    .box{
      height: 100%;
      overflow-y: scroll;
      border: 1px solid black;
    }
  }
</style>
