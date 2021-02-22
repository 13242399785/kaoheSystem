<template>
    <div class="content-wapper auto-w">
        <div class="content-left">
            <builds @buildId="getBuildId" url='teaching'></builds>
        </div>
        <div class="content-right content-right-mar">
            <div class="margin-bot ">
                <div class="item-title">
                    {{topName}}
                </div>
                <div class="item-list">
                    <span @click="getSub(0)" :class="parseInt(nowData.classId)==0?'item-ative':''">全部({{pagination.total}})</span>
                    <span :class="parseInt(nowData.classId)==parseInt(item.classId)?'item-ative':''" @click="getSub(item.classId)" v-for="(item,index) in classList" :key="index">{{item.className}}</span>
                    <!-- <span>教学视频</span>
                    <span>教学课件</span>
                    <span>教学模型</span> -->
                </div>
                <p class="video-all"></p>
                <div class="m-top clearfix">
                    <div class="m-left fl">
                        <!-- <el-checkbox >全选</el-checkbox> -->
                        <button class="button-auto button-delete" @click="chooseDel">删除</button>
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
                <!--table-->
                <el-table
                    class="my_table"
                    :data="mainData" 
                    max-height="1000"
                    height='75%'
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column
                    type="selection"
                    width="50">
                    </el-table-column>
                   
                    <el-table-column
                    className="table-left"
                    label="文件">
                        <template slot-scope="scope" class="dsf">
                            <p class="video-img" @click="showPlay(scope.row)">
                                <img :src="srcCotrol(scope.row)"/>
                                <!-- <span class="video-show">超清</span>
                                <span class="video-time">01：55</span> -->
                            </p>
                            <div class="video-text">
                                <p class="video-text-title" @click="showPlay(scope.row)">
                                    {{scope.row.teachingName}}
                                </p>
                                <p class="video-text-time">
                                    {{format(scope.row.createTime)}}
                                </p>
                                <p class="video-text-dif">
                                    分类：{{formattterRole(scope.row.classId)}}
                                </p>
                            </div> 
                        </template>  
                    </el-table-column>
                    <el-table-column
                    prop="remarks"
                    label="简介">
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    width="100"
                    :formatter="formateStatus"
                    label="状态">
                    </el-table-column>
                    <el-table-column
                    className="caozuo"
                    width="180"
                    label="操作">
                        <template slot-scope="scope">

                            <div class="video-control">
                                <el-button type="text" @click="setEm(scope.row)">编辑信息<i class="el-icon-edit"></i></el-button>
                                <div  class="video-control-top"></div>
                                <el-button type="text" @click="delEm(scope.row)">删除<i class="el-icon-delete"></i></el-button>
                            </div>
                        </template>     
                    </el-table-column>
                </el-table>
                <div class="page-control clearfix" v-show="pagination.total>10">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        prev-text='上一页'
                        next-text='下一页'
                        :page-size="pagination.size"
                        layout="prev, pager, next"
                        :total="pagination.total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 删除框 -->
        <el-dialog
            v-dialogDrag
            title="警告"
            :visible.sync="delVisible"
            class="delete-dialog"
            width="400px" 
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                    <div class="delect-text">
                        <img src="../../../images/info.png"/>
                        <span>确定删除所选项吗？</span>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delSave">确 定</el-button>
                <el-button @click="delVisible=false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 删除框 -->
        <el-dialog
            v-dialogDrag
            title="警告"
            :visible.sync="allDelVisible"
            class="delete-dialog"
            width="400px" 
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                    <div class="delect-text">
                        <img src="../../../images/info.png"/>
                        <span>确定删除所选项吗？</span>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="alldelSave">确 定</el-button>
                <el-button @click="allDelVisible=false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 修改弹窗 -->
        <!-- 弹出层 -->
        <el-dialog
            v-dialogDrag
            title="修改资源"
            :visible.sync="dialogVisible"
            width="400px" 
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                   <p class="flex-lr">
                        <span class="ml">标题</span>
                        <el-input v-model="setData.teachingName" placeholder="请输入标题名称"></el-input>
                   </p>
                   <p class="flex-lr">
                        <span class="ml">分类</span>
                        <el-select v-model="setData.classId" placeholder="请选择">
                            <el-option
                            v-for="item in classList"
                            :key="item.classId"
                            :label="item.className"
                            :value="item.classId">
                            </el-option>
                        </el-select>
                   </p>
                   <p  class="flex-lr">
                        <span class="ml">简介</span>
                        <el-input type="textarea" :rows="2" v-model="setData.remarks" placeholder="请输入简介"></el-input>
                   </p>
                   <!-- <p class="flex-lr">
                        <span class="ml">初始密码</span>
                        <el-input v-model="nowRole.loginPwd" placeholder="请输入初始密码"></el-input>
                   </p> -->
                  
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveRole">确 定</el-button>
                <el-button @click="dialogVisible=false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import builds from '@/components/build/build'
export default {
    components:{
        builds
        // resources,userms,rolems,operatingms
        
    },
    data(){
        return{
            mainData:[],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 15,
                currentPage: 1,
                total:0
            },
            classList:[],
            nowName:'',
            nowData:{
                "nowName":'',
                "subjectId":0,
                "classId":0
            },
            uploadShow:false,
            nowTeachingId:null,
            topName:'',
            tableHeight:'100',
            delVisible:false,
            setData:{
                "teachingId": 0,
                "teachingName": "",
                "url": "",
                "urlName": "",
                "classId": 0,
                "subjectId": 0,
                "status": 0,
                "enabled": 0,
                "orderNo": 0,
                "remarks": "",
                "createBy": localStorage.getItem('userIds')||0,
                "createTime": "",
                "updateTime": ""
            },
            dialogVisible:false,
            allDelVisible:false,
            listData:[],
            chooseList:[],
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
            this.getNowsub(data)
        },
        //获取当前课题
        getNowsub(id){
            let that=this
            this.$api.Teaching.getSgSubject(id).then(res=>{
                that.topName=res.data.result.subjectName
                console.log(res.data)
            }).catch((error) => {
                console.error(error);
            }) 
        },
        formateStatus(row, column, cellValue, index){
            if(parseInt(cellValue)==1){
                return '已发布'
            }else{
                return '待审核'
            }
        },
        //选中
        handleSelectionChange(val) {
            this.chooseList=[];
            for(let i=0;i<val.length;i++){
                this.chooseList.push(val[i].teachingId)
            }    
            console.log(this.chooseList)
        },
        //删除选中
        chooseDel(){
            if(this.chooseList.length==0){
                this.$message('请先选中要删除的节点！')
                return false;
            }
            this.allDelVisible=true;
        },
        alldelSave(){
            let that=this;
            this.$api.Teaching.chooseDelTeaching(this.chooseList).then(res=>{
                if(res.data.success){
                    that.$message.success('删除成功！')
                    that.allDelVisible=false;
                    that.initGetlist()
                }else{
                    that.$message(res.data.msg)
                }
                // console.log(res.data)
            }).catch((error) => {
                console.error(error);
            })
        },
        getSub(id){
            console.log(id)
            this.nowData.classId=id;
            this.initGetlist()
        },
        handleSizeChange(val) {
            //改变每页长度
            this.pagination.size = val;
            this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
        },
        handleCurrentChange(val) {
            //改变当前页
            this.pagination.currentPage = val;
            this.getList()
            // this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
        },
        //缩略图
        srcCotrol(list){
            var type=list.urlName.slice(list.urlName.indexOf('.'),list.urlName.length)
            // console.log(type)
            var src=list.url;
            //给图片
            if(type=='.jpg'||type=='.png'||type=='.jpeg'||type=='.PNG'){
                return this.$api.serverUrl+'/'+src
            }else if(type=='.doc'||type=='.docx'){
                return require("../../../images/file_05.png")
            }else if(type=='.xs'){
                return require("../../../images/file_07.png")
            }else if(type=='.pptx'||type=='.ppt'){
                return require("../../../images/file_09.png")
            }else{
                return require("../../../images/file_11.png")
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
            this.setData={
                "teachingId":item.teachingId,
                "teachingName": item.teachingName,
                "url": item.url,
                "urlName":item.urlName,
                "classId": item.classId,
                "subjectId": item.subjectId,
                "status": item.status,
                "enabled": item.enabled,
                "orderNo": item.orderNo,
                "remarks": item.remarks,
                "createBy": item.createBy,
                "createTime": item.createTime,
                "updateTime": new Date()
            };
            this.dialogVisible=true
        },
        saveRole(){
            let that=this;
            if(this.setData.teachingName==''){
                this.$message('当前标题不能为空！')
                return false
            }
            console.log(this.setData.classId)
            this.$api.Teaching.edirtTeaching(this.setData).then(res=>{
                if(res.data.success){
                    that.$message.success('修改成功！')
                    that.dialogVisible=false;
                    that.initGetlist()
                }else{
                    that.$message(res.data.msg)
                }
                // console.log(res.data)
            }).catch((error) => {
                console.error(error);
            })
        },
        delEm(item){
            console.log(item)
            this.nowTeachingId=item.teachingId
            this.delVisible=true
        },
        delSave(){
            let that=this;
            // if(!this.nowTeachingId){

            //     return false;
            // }
            this.$api.Teaching.delTeaching(this.nowTeachingId).then(res=>{
                if(res.data.success){
                    that.$message.success('删除成功！')
                    that.delVisible=false;
                    that.initGetlist()
                }else{
                    that.$message(res.data.msg)
                }
                // console.log(res.data)
            }).catch((error) => {
                console.error(error);
            })
        },
        initGetlist(){
            this.pagination.size=15
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
                that.pagination.total=res.data.total
                // that.mainData = that.listData.slice((that.pagination.currentPage - 1) * that.pagination.size,that.pagination.currentPage * that.pagination.size);
                if(res.data.total>0){
                    that.tableHeight='900'
                }else{
                    that.tableHeight='100'
                }
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
        },
        //转换权限名称
        formattterRole(cellValue){
            for(let i=0;i<this.classList.length;i++){
                if(this.classList[i].classId==cellValue){
                    return this.classList[i].className
                }
            }
        },
        showPlay(item){
            let type=item.url.slice(item.url.indexOf('.'),item.url.length)
            console.log(type)
            if(type=='.mp4'){
                this.$router.push({name:'teacherTeachingPlay',params:{id:item.teachingId}})	
            }else{
                this.$router.push({name:'teacherTeaching',params:{id:item.teachingId}})	
            }
        }
    }
}
</script>
<style lang="scss">
    .upload-wapper{
        width: 80%;
        margin: auto;
        margin-top: 40px;
        padding-top: 32px;
        border: 1px solid #e5e5e5;
        padding-bottom: 20px;
        .el-upload-dragger,.el-upload{
            height: auto;
            display: block;
            width: 100%;
            border: none;
        }
        .video-dra {
            padding-top: 28px;
            line-height: 20px;
        }
        .video-c{
            display: inline-block;
            // border: 1px solid #d2d2d2;
            color: #fff;
            background: #de8039;
            padding: 10px 30px;
            font-size: 16px;
        }
        .video-bei{
            color: #b2b2b2;
            margin-top: 20px;
        }
    }
    .load{
        margin: auto;
        padding-top: 22px;
        text-align: center;
        .el-input{
            display: inline-block;
            width: 415px;
            margin-bottom: 20px;
        }
        .el-textarea {
            width: 415px;
            height:100px;
            display: inline-block;
            vertical-align: top;
        }
        .save{
            background: #ed6842;
            color: #fff;
            padding: 10px 42px;
            clear: both;
            margin-bottom: 5px;
        }
        .cancel{
            margin-left: 20px;
            padding: 10px 42px;
            background: #909399;
            color: #fff;
            span{
                color: #fff;
            }
        }
        .save-text{
            color: #acacac;
            font-size: 12px;
            margin-top: 20px;
            span{
                color: #ed6842;
            }
        }
    }
    .table-left{
        .cell{
            display: flex;
            align-items: center;
        }
        .video-img{
            vertical-align: top;
            min-width: 130px;
            width: 144px;
            height: 80px;
            position: relative;
            display: inline-block;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .video-text{
            padding: 5px 0 5px 10px;
            font-size: 12px;
            display: inline-block;
            width: 220px;
            .video-text-title{
                font-size: 14px;
                color: #333;
                margin-bottom: 6px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .video-text-time {
                margin-bottom: 4px;
            }
            .video-text-dif, .video-text-time {
                color: #848484;
            }
        }
    }
</style>