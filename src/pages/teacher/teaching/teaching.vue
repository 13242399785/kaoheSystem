<template>
    <div class="all-wapper">
        <hea :isshow=1></hea>
        <!-- <navlist></navlist> -->
        <div class="nav-wapper">
            <div class="auto">
                <ul>
                  <li @click="goAtive(item.index)" v-for="(item,index) in navWap" :key="index" :class="nowNav==item.index?'nav-ative':''">{{item.content}}</li>
                </ul>
            </div>
        </div>
        <!-- 资源发布管理 -->
        <resources v-if="nowNav==0"></resources>
        <!-- 资源发布 -->
        <sourceManagement v-if="nowNav==1"></sourceManagement>
        <!-- 目录管理 -->
        <catalogue type='teaching' v-if="nowNav==2"></catalogue>
    </div>
</template>
<script>
import server from '@/server/server.js'
import ajax from "@/server/ajax.js";
import hea from '@/components/headers/header'
import navlist from '@/components/nav'
import resources from './resources'
import sourceManagement from './sourceManagement'
import catalogue from '@/pages/management/catalogue/catalogue'

// import userms from './user/user'
// import rolems from './role/role'
// import operatingms from './operating/operating'
export default {
    components:{
        hea,
        navlist,
        resources,sourceManagement,catalogue
        
    },
    data(){
        return{
            navWap:[
                {name:'resources',content:'资源发布',index:0},
                {name:'sourceManagement',content:'资源管理',index:1},
                {name:'catalogueManagement',content:'目录管理',index:2},
            ],
            nowNav:0
        }
    },
    methods:{
        // 跳转目录
        goAtive(ind){
            this.nowNav=ind
            console.log(this.nowNav)
        },
    }
}
</script>
<style lang="scss">
    
</style>