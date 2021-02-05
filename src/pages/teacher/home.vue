<template>
    <div class="all-wapper">
        <hea :isshow=1></hea>
        <div class="content-wapper content-wapper-notop">
            <div class="content-left">
                <builds  @buildId="getBuildId" url='teaching'></builds>
            </div>
            <div class="content-right content-right-mar">
                <div class="margin-bot notop-list">
                    <!-- <div class="item-title">
                        树状菜单
                    </div> -->
                    <p class="video-all"></p>
                    <div class="m-top clearfix">
                        <div class="m-left fl">
                            <!-- <el-checkbox >全选</el-checkbox> -->
                            <div class="item-list">
                                <span @click="getSub(0)" :class="parseInt(nowData.classId)==0?'item-ative':''">全部({{mainData.length}})</span>
                                <span :class="parseInt(nowData.classId)==parseInt(item.classId)?'item-ative':''" @click="getSub(item.classId)" v-for="(item,index) in classList" :key="index">{{item.className}}</span>
                            </div>
                            <!-- <button class="button-add margin-l6" @click="dialogVisible=true">添加</button> -->
                        </div>
                        <div class="m-right fr">
                            <el-input
                                placeholder="请输入关键字"
                                suffix-icon="el-icon-search"
                                v-model="nowData.nowName"
                                >
                            </el-input>
                            <div class="sou-w" @click="initGetlist">搜索</div>
                        </div>
                    </div>
                    <div class="my-public">
                         <el-checkbox v-model="radio" label="1">我发布的</el-checkbox>
                    </div>
                    <!--list-->
                    <!-- 没有文件事显示 -->
                    <div class="notfile" v-if="parseInt(total)==0">
                        还没有文件呢，赶紧联系管理员添加吧！
                    </div>
                    <div class="list-all">
                        <ul class="clearfix list-ul" style="overflow:hidden;">
                            <li v-for="(list,index) in mainData" :key='index'>					
                                <div class="list-wapper">
                                    <div class="list-img">
                                        <img :src="srcCotrol(list)"/>
                                        <!-- <span class="type">清晰度</span> -->
                                        <!-- <span class="time">时长</span> -->
                                        <div class="mock">
                                            
                                        </div>
                                        <span class="mockdown mockdownl" @click="down(list)"><i class="el-icon-videoxiazai"></i>下载</span>
                                        <span class="mockdown mockdownr" @click="showPlay(list)"><i class="el-icon-videofenxiang"></i>查看</span>
                                    </div>
                                    <div class="list-tile">{{list.teachingName}}</div>
                                    <div class="list-bottom clearfix">
                                        <span class="list-list fl"></span>
                                        <span class="list-time fr">{{format(list.createTime)}}</span>
                                        <!-- <span><i class="el-icon-videoxiaoxi"></i> {{list.comment}}</span> -->
                                    </div>
                                </div>				
                            </li>
                        </ul>
                    </div>
                    <div class="page-control clearfix" v-show="total>8">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            prev-text='上一页'
                            next-text='下一页'
                            :page-size="pagination.size"
                            layout="prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import builds from '@/components/build/build'
import hea from '@/components/headers/header'
import navlist from '@/components/nav'
export default {
    components:{
        builds,hea,navlist
        // resources,userms,rolems,operatingms
        
    },
    data(){
        return{
            mainData:[],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
            },
            total:0,
            nowData:{
                "nowName":'',
                "subjectId":0,
                "classId":0
            },
            classList:[]
        }
    },
    mounted(){
        this.getClass()
        this.getList()
    },
    
    methods:{
        getBuildId(data){
            console.log(data)
            this.nowData.subjectId=data;
            this.initGetlist()
        },
        getSub(id){
            console.log(id)
            this.nowData.classId=id;
            this.initGetlist()
        },
        showPlay(item){
            console.log(item)
            let type=item.url.slice(item.url.indexOf('.'),item.url.length)
            console.log(type)
            if(type=='.mp4'){
                this.$router.push({name:'teacherPlay',params:{id:item.teachingId}})	
            }
        },
        // 下载
        down(item){
            console.log(item)
            window.location.href=this.$api.serverUrl+'/'+item.url
        },
        //缩略图
        srcCotrol(list){
            var type=list.urlName.slice(list.urlName.indexOf('.'),list.urlName.length)
            var src=list.url;
            //给图片
            if(type=='.jpg'||type=='.png'||type=='.jpeg'||type=='.PNG'){
                return this.$api.serverUrl+'/'+src
            }else if(type=='.doc'||type=='.docx'){
                return require("../../images/file_05.png")
            }else if(type=='.xs'){
                return require("../../images/file_07.png")
            }else if(type=='.pptx'||type=='.ppt'){
                return require("../../images/file_09.png")
            }else{
                return require("../../images/file_11.png")
            }
        },
        format(shijianchuo){
            function add0(m){
				return m<10?'0'+m:m;
			}
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+add0(m)+'-'+d+'  '+h+':'+add0(mm);
        },
        setEm(item){
            console.log(item)
        },
        delEm(item){
            console.log(item)
        },
        initGetlist(){
            this.pagination.size=10
            this.pagination.currentPage=1
            this.getList()
        },
        getList(){
            let that=this;
            let params={
                "teachingName":this.nowData.nowName,
                "subjectId":this.nowData.subjectId,
                "classId":this.nowData.classId,
                "pageSize":this.pagination.size,
                "pageIndex":this.pagination.currentPage
            }
            this.$api.Teaching.getTeachingAll(params).then(res=>{
                that.mainData=res.data.result
                that.total=res.data.total
                console.log(res.data)
            }).catch((error) => {
                console.error(error);
            }) 
        },
        getClass(){
            let that=this;
            this.$api.Teaching.getType().then(res=>{
                that.classList=res.data.result
                console.log(res.data)
            }).catch((error) => {
                console.error(error);
            }) 
        }
    }
}
</script>
<style lang="scss">
    .my-public{
        margin: 20px 0;
        text-align: right;
    }
</style>