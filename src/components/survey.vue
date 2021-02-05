<template>
    <div class="survey">
        <hea :isshow=1></hea> 
        <navlist></navlist> 
        <div class="auto">
            <div class="surveyNav">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="问题答库" name="first">
                    <surveyku></surveyku>  
                </el-tab-pane>
                <el-tab-pane label="其他问题反馈" name="third">
                    <surveyproblem></surveyproblem> 
                </el-tab-pane>
            </el-tabs>
            </div>     
        </div>
        
    </div>
</template>

<script>
import hea from './header'
import server from '@/server/server.js'
import ajax from "@/server/ajax.js"
import navlist from './nav'
import surveyku from './survey/surveyku'
import surveyproblem from './survey/surveyproblem'
export default {
    name:'survey',
    data(){
        return{
            activeName: 'first'
        }
    },
    components:{
        navlist,
        hea,
        surveyproblem,
        surveyku,
    },
    methods:{
        handleClick(tab, event) {
            // console.log(tab, event);
        }
    }
}
</script>

<style>
    .survey{min-height: 100%;} 
    .surveyNav .el-tabs__item.is-active{color: #f19149;} 
    .surveyNav .el-tabs__active-bar{background-color:#ec6941;}
    .surveyNav .el-tabs__item{font-size: 16px;}
    .surveyNav .el-tabs__nav{line-height: 48px;}

</style>