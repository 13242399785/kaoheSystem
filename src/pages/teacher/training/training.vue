<!--实训管理-->
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
        <!-- 成绩管理 -->
        <gradeManagement v-if="nowNav==2"></gradeManagement>
        <!-- 目录管理 -->
        <catalogue type='training' v-if="nowNav==3"></catalogue>
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
import gradeManagement from './grade'
export default {
    components:{
        hea,
        navlist,
        resources,sourceManagement,gradeManagement,catalogue
        
    },
    data(){
        return{
            navWap:[
                {name:'resources',content:'资源发布',index:0},
                {name:'sourceManagement',content:'资源管理',index:1},
                {name:'gradeManagement',content:'成绩管理',index:2},
                {name:'catalogue',content:'目录管理',index:3},
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