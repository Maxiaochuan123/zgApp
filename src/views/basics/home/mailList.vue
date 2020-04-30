<template>
  <div class="mailList">
    <AppBar :isGoBack="false" pageTitle="公司部门"/>

    <div class="content">
      <SearchBar :list="serchUserList" placeholderText="搜索联系人" :isGoPage="true" pageLinkName="personalInfo"></SearchBar>
      <!-- 公司列表 -->
      <!-- <mu-paper :z-depth="0">
        <div class="listTitle">成都众汇车服集团有限公司</div>
      </mu-paper> -->
      <mu-paper :z-depth="0">
        <mu-list>
          <div v-for="(item ,index) in companyTree" :key="index">
            <mu-list-item button v-waves :class="index === companyActive ? 'active' : '' " @click="getCompanyItem(item,'company',index)">
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== companyTree.length"></mu-divider>
          </div>
        </mu-list>
      </mu-paper>

      <!-- 部门抽屉 -->
      <mu-drawer class="department" right :open.sync="drawerDepartment">
        <div class="listTitle">{{deptTitleName}}</div>
        <!-- <div class="listTitle">部门抽屉</div> -->
        <mu-list textline="two-line">
          <div v-for="(item ,index) in deptUserList" :key="index">
            <mu-list-item button v-waves @click="goPage('personalInfo',item)">
              <mu-avatar>
                <img src="@static/images/defaultHeadPortrait.png">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{item.realname}}</mu-list-item-title>
                <mu-list-item-sub-title>{{item.post}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== deptUserList.length"></mu-divider>
          </div>
        </mu-list>
        <mu-list v-if="deptList.length > 0">
          <div v-for="(item ,index) in deptList" :key="index">
            <mu-list-item button v-waves :class="index === deptActive ? 'active' : '' " @click="getCompanyItem(item,'dept', index)">
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== deptList.length"></mu-divider>
          </div>
        </mu-list>
        <Nothing  words="暂无数据" v-else-if="deptUserList.length == 0"></Nothing>
      </mu-drawer>

      <!-- 组抽屉 1 -->
      <mu-drawer class="group" right :open.sync="drawerGroup">
        <div class="listTitle">{{groupTitleName}}</div>
        <!-- <div class="listTitle">group</div> -->
        <mu-list textline="two-line">
          <div v-for="(item ,index) in groupUserList" :key="index">
            <mu-list-item button v-waves @click="goPage('personalInfo',item)">
              <mu-avatar>
                <img src="@static/images/defaultHeadPortrait.png">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{item.realname}}</mu-list-item-title>
                <mu-list-item-sub-title>{{item.post}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== groupUserList.length"></mu-divider>
          </div>
        </mu-list>
        <mu-list v-if="groupList.length > 0">
          <div v-for="(item ,index) in groupList" :key="index">
            <mu-list-item button v-waves :class="index === groupActive ? 'active' : '' " @click="getCompanyItem(item, 'group', index)">
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== groupList.length"></mu-divider>
          </div>
        </mu-list>
        <Nothing  words="暂无数据" v-else-if="groupUserList.length == 0"></Nothing>
      </mu-drawer>

      <!-- 子组抽屉  1 -->
      <mu-drawer class="group_1" right :open.sync="drawerGroup_1">
        <div class="listTitle">{{groupTitleName_1}}</div>
        <!-- <div class="listTitle">group_1</div> -->
        <mu-list textline="two-line">
          <div v-for="(item ,index) in group_1_UserList" :key="index">
            <mu-list-item button v-waves @click="goPage('personalInfo',item)">
              <mu-avatar>
                <img src="@static/images/defaultHeadPortrait.png">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{item.realname}}</mu-list-item-title>
                <mu-list-item-sub-title>{{item.post}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== group_1_UserList.length"></mu-divider>
          </div>
        </mu-list>
        <mu-list v-if="groupList_1.length > 0">
          <div v-for="(item ,index) in groupList_1" :key="index">
            <mu-list-item button v-waves :class="index === group_1_Active ? 'active' : '' " @click="getCompanyItem(item, 'group_1', index)">
              <mu-list-item-title >{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== groupList_1.length"></mu-divider>
          </div>
        </mu-list>
        <Nothing  words="暂无数据" v-else-if="group_1_UserList.length == 0"></Nothing>
      </mu-drawer>

      <!-- 子组抽屉  1-1 -->
      <mu-drawer class="group_1" :style="`width:60vw`" right :open.sync="drawerGroup_1_1">
        <div class="listTitle">{{groupTitleName_1_1}}</div>
        <!-- <div class="listTitle">group 1-1</div> -->
        <mu-list textline="two-line">
          <div v-for="(item ,index) in group_1_1_UserList" :key="index">
            <mu-list-item button v-waves @click="goPage('personalInfo',item)">
              <mu-avatar>
                <img src="@static/images/defaultHeadPortrait.png">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{item.realname}}</mu-list-item-title>
                <mu-list-item-sub-title>{{item.post}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== group_1_1_UserList.length"></mu-divider>
          </div>
        </mu-list>
        <mu-list v-if="groupList_1_1.length > 0">
          <div v-for="(item ,index) in groupList_1_1" :key="index">
            <mu-list-item button v-waves :class="index === group_1_1_Active ? 'active' : '' " @click="getCompanyItem(item ,'group_1_1',index)">
              <mu-list-item-title >{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== groupList_1_1.length"></mu-divider>
          </div>
        </mu-list>
        <Nothing  words="暂无数据"  v-else-if="group_1_1_UserList.length == 0"></Nothing>
      </mu-drawer>

      <!-- 联系人抽屉 -->
      <mu-drawer class="contacts" :style="`width:${drawerGroup_1_1 ? '50vw' : drawerGroup ? '60vw' : '70vw'}`" right :open.sync="drawerContacts">
        <div class="listTitle">联系人</div>
        <mu-list textline="two-line" v-if="contactsList.length > 0">
          <div v-for="(item ,index) in contactsList" :key="index">
            <mu-list-item button v-waves @click="drawerContacts = false;drawerDepartment = false; goPage('personalInfo',item)">
              <mu-avatar>
                <img src="@static/images/defaultHeadPortrait.png">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{item.realname}}</mu-list-item-title>
                <mu-list-item-sub-title>{{item.post}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== contactsList.length"></mu-divider>
          </div>
        </mu-list>
        <Nothing  words="暂无联系人" v-else></Nothing>

      </mu-drawer>
    </div>
  </div>
</template>

<script>
import AppBar from '@components/basics/AppBar'
import SearchBar from '@components/basics/SearchBar'
import Nothing from '@components/basics/Nothing'
import { mapMutations } from 'vuex'
export default {
  name:'organization',
  components:{ AppBar,SearchBar,Nothing },
  data(){
    return{
      companyTree:[], //组织架构 tree
      serchUserList:[], //搜索联系人列表

      drawerDepartment: false, //部门抽屉
      drawerGroup: false, //组抽屉
      drawerGroup_1: false, //子组抽屉
      drawerGroup_1_1: false, //子组抽屉
      drawerContacts: false, //联系人抽屉
      
      deptUserList:[],
      groupUserList:[],
      group_1_UserList:[],
      group_1_1_UserList:[],

      deptList:[],
      groupList:[],
      groupList_1:[],
      groupList_1_1:[],
      contactsList:[],

      // companyTitleName:'',
      deptTitleName:'',
      groupTitleName:'',
      groupTitleName_1:'',
      groupTitleName_1_1:'',

      companyActive:'',
      deptActive:'',
      groupActive:'',
      group_1_Active:'',
      group_1_1_Active:'',
      // contactsActive:''
    }
  },
  created(){
    this.api.getDeptTree({type:'tree'}).then(res => {
      this.companyTree = res.data;
    })
    this.api.getDeptContacts({deptId:'',shearch:'',needGroup:0}).then(res => {
      this.serchUserList = res.data.list;
    })
  },
  methods:{
    getCompanyItem(item,type,index){
      if(type === 'company'){
        this.companyActive = index;
        this.drawerDepartment = !this.drawerDepartment;

        this.deptTitleName = item.name;
        this.deptList = item.children;
        this.api.getDeptContacts({deptId:item.id,shearch:'',needGroup:0,pageType:0}).then(res => {
          this.deptUserList = res.data;
        })

        if(!this.drawerDepartment) {
          this.drawerGroup = false; this.drawerGroup_1 = false; this.drawerGroup_1_1 = false; this.drawerContacts = false;
          this.deptActive = ''; this.groupActive = ''; this.group_1_Active = ''; this.group_1_1_Active = '';
        }
      }else if(type === 'dept'){
        this.deptActive = index;
        this.drawerGroup = !this.drawerGroup;
        
        this.groupTitleName = item.name;
        this.groupList = item.children;
        this.api.getDeptContacts({deptId:item.id,shearch:'',needGroup:0,pageType:0}).then(res => {
          this.groupUserList = res.data;
        })

        if(!this.drawerGroup) {
          this.drawerGroup_1 = false; this.drawerGroup_1_1 = false; this.drawerContacts = false;
          this.groupActive = ''; this.group_1_Active = ''; this.group_1_1_Active = '';
        }
      }else if(type === 'group'){
        this.groupActive = index;
        this.drawerGroup_1 = !this.drawerGroup_1;

        this.groupTitleName_1 = item.name;
        this.groupList_1 = item.children;
        this.api.getDeptContacts({deptId:item.id,shearch:'',needGroup:0,pageType:0}).then(res => {
          this.group_1_UserList = res.data;
        })

        if(!this.drawerGroup_1) {
          this.drawerGroup_1_1 = false; this.drawerContacts = false;
          this.group_1_Active = ''; this.group_1_1_Active = '';
        }
      }else if(type === 'group_1'){
        this.group_1_Active = index;
        this.drawerGroup_1_1 = !this.drawerGroup_1_1;

        this.groupTitleName_1_1 = item.name;
        this.groupList_1_1 = item.children;
        this.api.getDeptContacts({deptId:item.id,shearch:'',needGroup:0,pageType:0}).then(res => {
          this.group_1_1_UserList = res.data;
        })

        if(!this.drawerGroup_1_1) {
          this.drawerContacts = false; 
          this.group_1_1_Active = '';
        }

      }else if(type === 'group_1_1'){
        this.group_1_1_Active = index;
        this.drawerContacts = !this.drawerContacts;
        this.api.getDeptContacts({deptId:item.id,shearch:'',needGroup:0,pageType:0}).then(res => {
          this.contactsList = res.data;
        })
      }
    }
  },
}
</script>

<style lang="less" scope>
  .mailList{
    height: 100vh;
    
    .content{
      // padding: 104px 0;
      background-color: transparent;
      .active{
        background-color: #d3d3d3;
      }
      // .mu-list{
      //   padding: 0;
      //   /deep/ .mu-item{
      //     height:46px;
      //   }
      // }
      .listTitle{
        color: @primary-text;
        font-size: @primary-size;
        font-weight: 600;
        line-height: 60px;
        padding-left: @primary-size;
        margin-bottom: 12px;
      }
      .mu-list{
        list-style: none; 
      }

      .mu-drawer{
        // width: 100vw;
        &.department{
          width: 90vw;
        }
        &.group{
          width: 80vw;
        }
        &.group_1{
          width: 70vw;
        }
        &.contacts{
          width: 60vw;
        }
        .mu-avatar{
          background-color: transparent;
        }
        .mu-item-sub-title{
          line-height: 20px;
        }
        .shallow-inset{
          margin-left: 20px;
        }
        
        .mu-item-title{
          font-weight: 400;
        }
        .mu-item-content{
          padding-left: 12px;
        }
        .nothing{
          height: calc(100% - 72px);
        }
      }
    }
  }
</style>