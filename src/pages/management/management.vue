<template>
    <div class="catalogue">
        <hea :isshow=1></hea>
        <!-- <navlist></navlist> -->
        <div class="nav-wapper">
            <div class="auto">
                <ul>
                  <li @click="goAtive(item.index)" v-for="(item,index) in navWap" :key="index" :class="nowNav==item.index?'nav-ative':''">{{item.content}}</li>
                </ul>
            </div>
        </div>
        <!-- 用户管理 -->
        <userms v-if="nowNav==0"></userms>
        <!-- 角色管理 -->
        <rolems v-if="nowNav==1"></rolems>
        <!-- 操作记录 -->
        <operatingms v-if="nowNav==2"></operatingms>
        <!-- 目录管理 -->
        <!-- <catalogue v-if="nowNav==3"></catalogue> -->
    </div>
</template>
<script>
import server from '@/server/server.js'
import ajax from "@/server/ajax.js";
import hea from '@/components/headers/header'
import navlist from '@/components/nav'
import catalogue from './catalogue/catalogue'
import userms from './user/user'
import rolems from './role/role'
import operatingms from './operating/operating'
export default {
    name:'management',
    components:{
        hea,
        navlist
        ,userms,rolems,operatingms
        
    },
    data() {
      return {
        data:[],
        defaultProps: {
          children: 'childList',
          label: 'name'
        },
        delectList:false,
        edirtControl:false,
        cataData:{
            "childList": [
                {}
            ],
            "id": 0,
            "inserttime": "",
            "name": "",
            "pid": 0,
            "updatetime": ""
        },
        level:1,
        catalogueId:'',
        catalogueName:'',
        addControl:'',
        navWap:[
					{name:'vmanagement',content:'用户管理',index:0},
					{name:'upload',content:'角色管理',index:1},
					{name:'user',content:'操作记录',index:2},
					// {name:'catalogue',content:'目录管理',index:3},
        ],
        nowNav:0
      };
    },
   
    methods: {
      // 跳转目录
      goAtive(ind){
        this.nowNav=ind
        console.log(this.nowNav)
      },
    }
}
</script>
<style lang="css">
.catalogue{min-height: 100%;}
.catatop{color:#f19149;border-bottom: 1px dashed #ccc;padding-bottom: 20px;margin-bottom: 20px;margin-top: 20px;}
.catabtn{border:1px solid #f19149;padding: 5px 12px;cursor: pointer;display: inline-block;font-size: 16px;}
.catalogue .el-tree-node__expand-icon{color: #f19149;font-size: 24px;} 
.catalogue .el-tree-node__expand-icon.is-leaf{color: transparent;}
.catalogue .el-tree-node__label{font-size: 18px;}
.catalogue .el-tree-node__content{height: 32px;}
/* .tree-wapper{max-width: 800px;} */
.tree-wapper .el-button{padding: 4px 20px;}
.showcontrol{display: none;}
.el-tree-node__content:hover .showcontrol{display: block;}
.catalogue .el-input__inner{height: 33px;vertical-align: middle;}
.cataedirt{height: 100%;width: 100%;position: fixed;background:rgba(0,0,0,.3);top: 0;left: 0;color:#333;}
.cataedirt-wapper{position: fixed;top: 50%;left: 50%;width: 500px;box-shadow: 0 0 10px #ccc;transform:translate(-50%,-50%);background: #fff;}
.cataedirt-catatop{line-height: 35px;background: #f7f7f7;font-size: 16px;padding: 5px 8px;color: #303133}
.cataedirt-catatop .el-icon-error{padding-top: 6px;font-size: 18px;color: #707173}
.cata-content{padding: 10px 30px;color: #707173;padding-top: 28px;}
.cata-content .el-input{width: 390px;}
.cataedirt-wapper .delect-footer{padding-right: 32px;}
</style>
