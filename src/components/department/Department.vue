<template>
  <div class="department">
    <AppBar :isGoBack="!isTopPage" pageTitle="通讯录" :occupyBtn="!isTopPage" />

    <div class="contentBox">
      <div class="content-list">
        <SearchInputBar ref="bar" placeholderText="输入关键字 姓名 / 手机号" @searchInputBarChange="searchInputBarChange" isCandidate :candidateList="candidateList">
          <li slot="candidateList" v-for="(item, index) in candidateList" :key="index" @click="goPage('personalInfo',item);$refs.bar.close()">
            <img src="../../../static/images/defaultHeadPortrait.png"><span>{{item.userName}}</span><span>{{item.roles.map(val=>val.name).join(", ")}}</span>
          </li>
        </SearchInputBar>

          <div class="breadBar" v-show="breadBarList.length > 0">
            <span v-for="(item, index) in breadBarList" :key="index" 
                  :class="index === breadBarList.length - 1 ? 'active' : 'noactive' "
                  @click="breadTap(item, index)"
            >{{ `${item.title} ${index != breadBarList.length-1 ? ' > ' : ''} ` }}</span>
          </div>

          <div>
            <mu-list v-if="departmentList.length > 0">
              <div v-for="(item ,index) in departmentList" :key="index">
                <mu-list-item button @click="getNextDep(item,index)">
                  <mu-list-item-title>{{item.name}}</mu-list-item-title>
                  <mu-list-item-action>
                    <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
                  </mu-list-item-action>
                </mu-list-item>
                <mu-divider shallow-inset v-show="index + 1 !== departmentList.length"></mu-divider>
              </div>
            </mu-list>

            <Nothing words="无子部门" v-else></Nothing>
          </div>
          

      </div>
    </div>

    <UserList ref="userList" :departmentItem="departmentItem" @getUserListId="getUserListId"></UserList>
  </div>
</template>

<script>
import AppBar from "@components/basics/AppBar";
import SearchInputBar from "@components/basics/SearchInputBar";
import UserList from "@components/department/UserList";
import Nothing from "@components/basics/Nothing";
export default {
  components: { AppBar, SearchInputBar, UserList, Nothing },
  props: {
    isTopPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      departmentList: [], //部门列表
      breadBarList: [], //面包屑列表
      departmentItem: {}, //当前点击的部门对象
      candidateList: [] //搜索候选列表
    }
  },
  created () {
    this.api.seeDepartment().then(res => {
      if(res.message === "success"){
        this.departmentList = res.data[0].children;
        this.breadBarList.push({id: res.data[0].id, title: res.data[0].name, children: res.data[0].children})
      }
    })
  },
  methods: {
    searchClose(){
      console.log(111)
      // this.apiMethods.getListCallback(this,"search");
    },

    getUserListId(ids){
      console.log(ids)
    },

    searchInputBarChange(val){
      // 设置搜索候选列表
      this.api.seeUserInfo({pageSize:30,pageIndex:1,param:val}).then(res=>{
        this.candidateList = res.data.results;
      })
    },

    // 获取下一个 部门
    getNextDep(item,index){
      this.departmentItem = item;
      this.breadBarList.push({
        id: item.id,
        title: item.name,
        children: item.children,
      })
      this.departmentList = item.children;
      this.$refs.userList.show();
    },

    // 点击当前面包屑
    breadTap(row, index){
      this.departmentList = row.children;
      this.breadBarList.splice(index + 1, this.breadBarList.length-1 - index);
    },
  }
}
</script>

<style lang="less" scoped>
  .department{
        
    .breadBar{
      padding: 8px 14px;
      background-color: #fff;
      overflow-x: scroll;
      color: @regular-text;

      .active{
        color: @primary;
      }
      .noactive{
        color: @regular-text;
      }
    }

    .content-list{
      height: calc(100vh - 160px);
      // height: 50vh;
      // background-color: #ff6600;
    }

    .mu-list{
      background-color: #fff;
      margin-top: 4px;
    }
  }
</style>
