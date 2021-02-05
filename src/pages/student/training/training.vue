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
        <!-- 资源管理 -->
        <sourceManagement v-if="nowNav==0"></sourceManagement>
        <!-- 成绩管理 -->
        <gradeManagement v-if="nowNav==1"></gradeManagement>
    </div>
</template>
<script>
import server from '@/server/server.js'
import ajax from "@/server/ajax.js";
import hea from '@/components/headers/stu_header'
import navlist from '@/components/nav'
import resources from './resources'
import sourceManagement from './sourceManagement'
import gradeManagement from './grade'
export default {
    components:{
        hea,
        navlist,
        resources,sourceManagement,gradeManagement
        
    },
    data(){
        return{
            navWap:[
                {name:'sourceManagement',content:'资源管理',index:0},
                {name:'gradeManagement',content:'查看成绩',index:1},
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