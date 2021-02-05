<template>
    <div class="all-wapper">
        <hea :isshow=1></hea>
        <!-- <navlist></navlist> -->
        <!-- <div class="nav-wapper">
            <div class="auto">
                <ul>
                  <li @click="goAtive(item.index)" v-for="(item,index) in navWap" :key="index" :class="nowNav==item.index?'nav-ative':''">{{item.content}}</li>
                </ul>
            </div>
        </div> -->
        <sourceManagement></sourceManagement>
    </div>
</template>
<script>
import server from '@/server/server.js'
import ajax from "@/server/ajax.js";
import hea from '@/components/headers/stu_header'
import navlist from '@/components/nav'
import resources from './resources'
import sourceManagement from './sourceManagement'

// import userms from './user/user'
// import rolems from './role/role'
// import operatingms from './operating/operating'
export default {
    components:{
        hea,
        navlist,
        resources,sourceManagement
        // resources,userms,rolems,operatingms
        
    },
    data(){
        return{
            navWap:[
                {name:'resources',content:'资源发布',index:0},
                {name:'sourceManagement',content:'资源管理',index:1},
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