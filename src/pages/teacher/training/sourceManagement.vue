<template>
    <div class="content-wapper auto-w">
        <div class="content-left">
            <builds @buildId="getBuildId" url='training'></builds>
        </div>
        <div class="content-right content-right-mar">
            <div class="margin-bot ">
                <div class="item-title">
                    {{topName}}
                </div>
                <div class="item-list">
                    <span @click="getSub(0)" :class="parseInt(nowData.classId)==0?'item-ative':''">全部({{mainData.length}})</span>
                    <span :class="parseInt(nowData.classId)==parseInt(item.classId)?'item-ative':''" @click="getSub(item.classId)" v-for="(item,index) in classList" :key="index">{{item.className}}</span>
                    <!-- <span>教学视频</span>
                    <span>教学课件</span>
                    <span>教学模型</span> -->
                </div>
                <p class="video-all"></p>
                <div class="m-top clearfix">
                    <div class="m-left fl">
                        <!-- <el-checkbox >全选</el-checkbox> -->
                        <button class="button-auto button-delete">删除</button>
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
                    max-height='500'
                    :height='tableHeight'
                    >
                    <el-table-column
                    type="selection"
                    width="50">
                    </el-table-column>
                   
                    <el-table-column
                    className="table-left"
                    label="文件">
                        <template slot-scope="scope" class="dsf">
                            <p class="video-img">
                                <img :src="srcCotrol(scope.row)"/>
                                <!-- <span class="video-show">超清</span>
                                <span class="video-time">01：55</span> -->
                            </p>
                            <div class="video-text">
                                <p class="video-text-title">
                                    {{scope.row.practiceName}}
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
                <div class="page-control clearfix" v-show="pagination.total>3">
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
                        <el-input v-model="setData.practiceName" placeholder="请输入标题名称"></el-input>
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
        <!-- 弹出层 -->
        <el-dialog
            v-dialogDrag
            title="编辑信息"
            :visible.sync="ediVisible"
            width="65%" 
            class="edior-wapper"
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                    <div class="flex-between">
                    <div class="rw-top-l">
                        当前任务书：{{nowTor.urlName}}
                    </div>
                    <div class="rw-top-r">
                        <span>重新上传任务书</span>
                        <input type="file" ref="fileFj" id="fileFj" @change="UploadStart" class="fu">
                    </div>
                </div>
                <div class="pdf-wapper">
                    <iframe class="pdf-if" :src="pdfUrl" align="center"></iframe>
                </div>
                <div class="tortitle flex-between">
                    <span>任务书标题：</span>
                    <el-input v-model="nowTor.practiceName"></el-input>
                </div>
                <div class="addfen">
                    <span class="rw-top-r" @click="addStandard">增加试题及对应的评分标准</span>
                </div>
                <div class="fen-wapper">
                    <div class="fen-item" v-for="(item,index) in gradeList" :key="index">
                        <p class="fen-top">评分标准{{index+1}}</p>
                        <div class="fen-title">
                            <span class="ms">试题描述:</span>
                            <el-input v-model="item.testQuestionsName"></el-input>
                            <div class="fen-ad">
                                <span class="fen-add" @click="addItem(item,index)">增加评分项</span>
                                <span class="fen-add" @click="removeItem(item,index)">移除试题</span>
                            </div>
                            
                        </div>
                        <div class="fen-list" v-for="(scoing,index1) in item.children" :key="index1">
                            <div class="fen-list-left">
                                <span>评分描述:</span>
                                <el-input type="textarea" v-model="scoing.testQuestionsName" :rows="2" class="fen-input" resize='none'></el-input>
                            </div>
                            <div class="fen-list-right">
                                <div class="fen-list-rl">
                                    <span>分值：</span>
                                    <el-input type="textarea"  v-model="scoing.points"  :rows="2" class="fen-input" resize='none'></el-input>
                                </div>
                                <div class="fen-list-rr" @click="delDec(scoing,index,index1)">
                                    删除
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="treSave">确 定</el-button>
                <el-button @click="ediVisible=false">取 消</el-button>
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
                size: 20,
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
                "practiceId": 0,
                "practiceName": "",
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
            ediVisible:false,
            gradeList:[],
            nowTor:{//当前任务书
                url:'',
                urlName:'',
                practiceName:''
            },
            pdfUrl:'',
            initUpload:null,//重新上传
            TorpracticeId:0,
            listData:[]
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
            this.$api.Training.getSgSubject(id).then(res=>{
                that.topName=res.data.result.subjectName
                console.log(res.data)
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
            this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
        },
        formateStatus(row, column, cellValue, index){
            if(parseInt(cellValue)==1){
                return '已发布'
            }else{
                return '待审核'
            }
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
                "practiceId": item.practiceId,
                "practiceName": item.practiceName,
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
            if(item.classId===4){//任务书
                this.ediVisible=true;
                this.nowTor.url=item.url;
                this.nowTor.urlName=item.urlName;
                this.nowTor.practiceName=item.practiceName;
                this.TorpracticeId=item.practiceId
                this.pdfUrl=this.$api.serverUrl+'/'+ encodeURI(this.nowTor.url)
                // console.log(this.pdfUrl)
                this.getTorlist(item.practiceId)
            }else{
                this.dialogVisible=true
            }
            
        },
        //修改保存任务书
        treSave(){
            //若文件和评分两个都变化时需改两个
            let that=this;
            // let params={
            //     "PracticeId":id,
            //     "UserId":localStorage.getItem('userIds')||0
            // }
            console.log(this.gradeList)
            this.saveRole()
            this.$api.Training.updateQuestions(this.gradeList).then(res=>{
               console.log(res.data)
               that.ediVisible=false;
            //    that.gradeList=res.data.result
            }).catch((error) => {
                console.error(error);
            })
        },
        //获取任务书评分
        getTorlist(id){
            let that=this;
            let params={
                "PracticeId":id,
                "UserId":localStorage.getItem('userIds')||0
            }
            this.$api.Training.getTestQuestionsTreeList(params).then(res=>{
               console.log(res.data)
               that.gradeList=res.data.result
            }).catch((error) => {
                console.error(error);
            })
        },
        //添加评分标准
        addStandard(){
            let params={
                "testQuestionsId": 0,
                "testQuestionsName": "",
                "notes": "",
                "points": 0,
                "parentId": 0,
                "practiceId": this.TorpracticeId,
                "orderNo": 0,
                "remarks": "",
                "createBy": localStorage.getItem('userIds')||0,
                "children": []
            }
            this.gradeList.push(params)
        },
        //添加评分项
        addItem(item,i){
             let params={
                "testQuestionsId": 0,
                "testQuestionsName": "",
                "notes": "",
                "points":0,
                "parentId": item.testQuestionsId,
                "practiceId": 0,
                "orderNo": 0,
                "remarks": "",
                "createBy":localStorage.getItem('userIds')||0,
                "children": []
            }
            console.log(item,i)
            this.gradeList[i].children.push(params)
        },
        //移除评分项
        removeItem(item,i){
            // this.gradeList[i].children.push(params)
            this.gradeList.splice(i,1); 
            // console.log(item.testQuestionsId)
            if(item.testQuestionsId){
                this.removeScore(item.testQuestionsId)
            }else{

            }
        },

        //删除评分项
        delDec(item,prantI,nonwI){
            console.log(item,prantI,nonwI)
            this.gradeList[prantI].children.splice(nonwI,1); 
            if(item.testQuestionsId){
                this.removeScore(item.testQuestionsId)
            }else{

            }
        },
        //移除评分题目
        removeScore(id){
            let that=this;
            this.$api.Training.deleteTestQuestions(id).then(res=>{
                
            }).catch((error) => {
                console.error(error);
            })
        },
        //保存修改
        saveRole(){
            let that=this;
            if(this.setData.practiceName==''){
                this.$message('当前标题不能为空！')
                return false
            }
            if(this.setData.classId==4){//任务书
                this.setData.urlName=this.nowTor.urlName;
                this.setData.url=this.nowTor.url;
                this.setData.practiceName=this.nowTor.practiceName;
            }
            this.$api.Training.edirtTeaching(this.setData).then(res=>{
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
            this.practiceId=item.practiceId
            this.delVisible=true
        },
        delSave(){
            let that=this;
            // if(!this.nowTeachingId){

            //     return false;
            // }
            this.$api.Training.delTeaching(this.practiceId).then(res=>{
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
        //初始化列表
        initGetlist(){
            this.pagination.size=10
            this.pagination.currentPage=1
            this.getList()
        },
        getList(){
            let that=this;
            let params={
                "practiceName":this.nowData.nowName,
                "subjectId":this.nowData.subjectId,
                "classId":this.nowData.classId,
                "pageSize":this.pagination.size,
                "pageIndex":this.pagination.currentPage
            }
            this.$api.Training.getTeachingAll(params).then(res=>{
                that.listData=res.data.result
                that.pagination.total=res.data.result.length
                that.mainData = that.listData.slice((that.pagination.currentPage - 1) * that.pagination.size,that.pagination.currentPage * that.pagination.size);
                if(res.data.total>0){
                    that.tableHeight='500'
                }else{
                    that.tableHeight='100'
                }
                console.log(res.data)
            }).catch((error) => {
                console.error(error);
            }) 
        },
        //获取分类
        getClass(){
            let that=this;
            this.$api.Training.getType().then(res=>{
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
        //上传附件
        UploadStart(){
            var file = $("#fileFj")[0].files[0];
            this.AjaxFile(file, 0);
            console.log(file)
            // this.AjaxFile(file,0);
        },
        AjaxFile(file,i){
            let that=this;
            var name = file.name, //文件名
            size = file.size, //总大小shardSize = 2 * 1024 * 1024, 
            shardSize = 2 * 1024 * 1024,//以2MB为一个分片
            shardCount = Math.ceil(size / shardSize); //总片数
            if (i >= shardCount) {
                return;
            }
            //计算每一片的起始与结束位置
            var start = i * shardSize,
            end = Math.min(size, start + shardSize);
            //构造一个表单，FormData是HTML5新增的
            var form = new FormData();
            form.append("data", file.slice(start, end)); //slice方法用于切出文件的一部分
            form.append("lastModified", file.lastModified);
            form.append("fileName", name);
            form.append("total", shardCount); //总片数
            form.append("index", i + 1); //当前是第几片
            this.UploadPath = file.lastModified
            //Ajax提交文件
            $.ajax({
                url: that.$api.serverUrl+"/Upload/UploadFile",
                type: "POST",
                data: form,
                async: true, //异步
                processData: false, //很重要，告诉jquery不要对form进行处理
                contentType: false, //很重要，指定为false才能形成正确的Content-Type
                success: function (result) {
                    if (result != null) {
                        i = result.number++;
                        var num = Math.ceil(i * 100 / shardCount);
                        that.percenSum=num
                        that.AjaxFile(file, i); 
                        if (result.mergeOk&&shardCount==i) {
                            console.log(result)
                            // that.nowData.url=result.url
                            // that.nowData.urlName=result.fileName
                            that.initUpload=result;
                            that.file=null
                            that.$confirm('文件已上传完成，确认覆盖当前任务书?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                                }).then(() => {
                                    that.resultRw()
                                }).catch(() => {
                                that.$message({
                                    type: 'info',
                                    message: '已取消上传当前任务书'
                                });         
                            });
                        }else if(result.msg&&!result.mergeOk){
                            // that.uploadShow=true
                            that.$message(result.msg)
                        }else{
                            console.log('切片上传')
                        }
                    }
                }
            });
        },
        //重置任务书
        resultRw(){
            this.nowTor.urlName=this.initUpload.fileName
            this.nowTor.url=this.initUpload.url
            this.pdfUrl=this.$api.serverUrl+'/'+ encodeURI(this.nowTor.url);
            
            // this.nowTor.urlName=this.initUpload.fileName
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