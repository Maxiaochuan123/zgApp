<template>
  <div class="home">
    <div class="content">
      <mu-paper :z-depth="0" class="blockNav" ></mu-paper>
    </div>
  </div>
</template>

<script>
import Api from "@api";
import tool from "@static/js/tool.js";
import { mapState } from 'vuex'
export default {
  components: {
    
  },
  data() {
    return {

    };
  },
  created() {
    
  },
  computed:{
    
  },
  methods: {
    
  }
};
</script>
<style scope lang="less">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 54px 15px 70px;
  }
  /deep/ .app-bar {
    box-shadow: 0px 2px 6px 0px #ededed;
  }
  .plan {
    img {
      filter: grayscale(1);
    }
  }
}
</style>