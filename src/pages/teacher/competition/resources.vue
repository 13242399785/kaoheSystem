<template>
    <div class="content-wapper auto-w">
        <div class="content-left">
            <builds  @buildId="getBuildId" url='competition'></builds>
        </div>
        <div class="content-right content-right-mar content-right-auto">
            <div class="item-title item-title-marb">
                {{topName}}
            </div>
            <!--上传upload-->
            <div v-show='uploadShow' class="upload-all">
                <div class="upload-wapper">
                    <div class="posi-btn">
                        <span v-for="(item,index) in nowTaskList" @click="nowTaskIndex=index" :key="index" :class="nowTaskIndex==index?'active':''">{{item.text}}</span>
                    </div>
                    <el-upload
                    :data=fileData
                    class="upload-dra"
                    drag
                    ref="upload"
                    :on-success="handleVideoSuccess" 
                    :on-error="error"
                    :before-upload="beforeUploadVideo"			  
                    :action="upload_url"
                    :on-remove="handleRemove"
                    :on-preview="handlePreview"
                    multiple>
                    <img src="../../../images/upload.png"/>
                    <div class="el-upload__text">
                        <p class="video-dra">或将文件拖拽至此处</p>		
                        <p class="video-c">选择文件</p>		
                        <p class="video-bei">{{parseInt(nowTaskIndex)==0?'发布实训任务书':'发布实训模型、视频'}}</p>  	
                    </div>
                    </el-upload>
                    <!-- 先不要 -->
                </div>
            </div>
            <el-progress v-show="!uploadShow" :text-inside="true" :stroke-width="22" :percentage="percenSum" status="warning"></el-progress>
                <!-- upload end -->
                <div class="load"  v-show="parseInt(nowTaskIndex)==1&&!uploadShow">
                    <!-- <p class="load-upname">当前上传文件：{{filename}}</p> -->
                    <div class="load-jindu">
                        
                    </div>
                    <div class="load-title">
                        <div class="load-left" id="selectwapper">
                            <p class="load-input"><span>文件标题</span><el-input v-model="nowData.competitionName" name="filename"  placeholder="请输入标题"></el-input></p>
                        </div>
                        <p class="load-input"><span>文件分类</span>
                            <el-select v-model="nowData.classId"  placeholder="请选择">
                                <el-option
                                v-for="item in classList"
                                :key="item.classId"
                                :label="item.className"
                                :value="item.classId">
                                </el-option>
                            </el-select>
                        </p>
                        <div class="load-right">
                            <span>文件简介</span><el-input v-model="nowData.remarks" min='100' name="filedescription"  type="textarea" placeholder="请输入文件描述"></el-input>
                        </div>
                    </div>
                    <div class="save-text">
                        <button class="save" @click="getFile">保存发布</button>
                        <button type="info" @click="uploadShow=true" class="cancel">取消上传</button>
                        <p>请确认文件信息后 <span>保存</span>，以完成上传</p>
                    </div>
                </div>
            
            <!-- 发布任务书 -->
			<div class="upload-rw" v-show="parseInt(nowTaskIndex)==0&&!uploadShow">
                <div class="flex-between">
                    <div class="rw-top-l">
                        当前任务书：{{nowData.urlName}}
                    </div>
                    <div class="rw-top-r">
                        <span>重新上传任务书</span>
                        <input type="file" ref="fileFj" id="fileFj" @change="UploadStart" class="fu">
                    </div>
                </div>
                <div class="pdf-wapper">
                    <iframe class="pdf-if" :src ="pdfUrl" align="center"></iframe>
                </div>
                <div class="tortitle flex-between">
                    <span>任务书标题：</span>
                    <el-input v-model="torName"></el-input>
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
                        <div class="fen-list"  v-for="(scoing,index1) in item.children" :key="index1">
                            <div class="fen-list-left">
                                <span>评分描述:</span>
                                <el-input type="textarea" v-model="scoing.testQuestionsName" :rows="2" class="fen-input" resize='none'></el-input>
                            </div>
                            <div class="fen-list-right">
                                <div class="fen-list-rl">
                                    <span>分值：</span>
                                    <el-input v-model="scoing.points" type="number" :rows="2" class="fen-input number" resize='none'></el-input>
                                </div>
                                <div class="fen-list-rr" @click="delDec(scoing,index,index1)">
                                    删除
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fen-btn">
                         <el-button class="save-btn" @click="getFile(1)">保存发布</el-button>
                    </div>
                </div>
            </div>
        </div>
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
                        当前任务书：{{nowData.urlName}}
                    </div>
                    <div class="rw-top-r">
                        <span>重新上传任务书</span>
                    </div>
                </div>
                <div class="pdf-wapper">
                    <iframe class="pdf-if" :src="pdfUrl" align="center"></iframe>
                </div>
                <div class="tortitle flex-between">
                    <span>任务书标题：</span>
                    <el-input v-model="torName"></el-input>
                </div>
                <div class="addfen">
                    <span class="rw-top-r">增加试题及对应的评分标准</span>
                </div>
                <div class="fen-wapper">
                    <div class="fen-item" v-for="(item,index) in gradeList" :key="index">
                        <p class="fen-top">评分标准{{index+1}}</p>
                        <div class="fen-title">
                            <span class="ms">试题描述:</span>
                            <el-input v-model="item.remarks"></el-input>
                            <div class="fen-ad">
                                <span class="fen-add">增加评分项</span>
                                <span class="fen-add">移除试题</span>
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
                                <div class="fen-list-rr">
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
            nowTaskList:[
                {text:'发布任务书'},
                {text:'发布其它资源'},
            ],
            nowTaskIndex:0,
            topName:"",
            gradeList:[{
                "testQuestionsId": 0,
                "testQuestionsName": "",
                "notes": "",
                "points": 0,
                "parentId": 0,
                "competitionId": this.TorcompetitionId,
                "orderNo": 0,
                "remarks": "",
                "createBy": localStorage.getItem('userIds')||0,
                "children": []
            }],
            ediVisible:false,
            nowData:{
                'subjectId':null,
                "classID":null,
                "url": "",
                "urlName": "",
            },
            pdfUrl:'',
            classList:[],
            nowtext:'备注：发布视频、课件、模型',
            upload_url:'',
            uploadShow:true,
            percenSum:0,
            torName:'',//任务书标题
            TorcompetitionId:0
        }
    },
    mounted(){
        this.getClass()
    },
    methods:{
        getBuildId(data){
            console.log(data)
            this.nowData.subjectId=data;
            this.getNowsub(data)
            // this.initGetlist()
        },
        treSave(){
            console.log(this.gradeList)
        },
        //添加评分标准
        addStandard(){
            let params={
                "testQuestionsId": 0,
                "testQuestionsName": "",
                "notes": "",
                "points": 0,
                "parentId": 0,
                "competitionId": this.TorcompetitionId,
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
                "parentId": 0,
                "competitionId": this.TorcompetitionId,
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
        },
        //删除评分项
        delDec(item,prantI,nonwI){
            console.log(item,prantI,nonwI)
            this.gradeList[prantI].children.splice(nonwI,1); 
        },
        getClass(){
            let that=this;
            this.$api.Competition.getType().then(res=>{
                that.classList=res.data.result
                for(let i=0;i<that.classList.length;i++){
                    if(parseInt(that.classList[i].classId)==4){
                        that.classList.splice(i,1)
                        console.log(i)
                    }
                }
            }).catch((error) => {
                console.error(error);
            }) 
        },
        beforeUploadVideo(file){
            console.log(file)
            if(this.nowTaskIndex==0&&file.type!='application/pdf'){
                this.$message('任务书必须上传pdf文件！')
                return false;
            }
            if(file.name.indexOf('.7z')>-1){
                this.$message('当前不允许上传该类型文件！')
                return false;
            }
            this.uploadShow=false
            
            this.AjaxFile(file,0)
            console.log(this.nowTaskIndex)
            return false;
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
                        console.log(shardCount,i)   
                        if (result.mergeOk&&shardCount==i) {
                            console.log(result)
                            that.nowData.url=result.url
                            that.nowData.urlName=result.fileName
                            that.$refs.upload.clearFiles() 
                            that.$message.success('文件上传成功！') 
                            if(that.nowTaskIndex==0){
                                that.pdfUrl=that.$api.serverUrl+'/'+ encodeURI(that.nowData.url)
                            }  
                        }else if(result.msg&&!result.mergeOk){
                            that.uploadShow=true
                            that.$message(result.msg)
                        }else{
                            console.log('切片上传')
                        }
                    }
                }
            });
        },
        //上传任务书完成保存任务书
        saveTor(id){
            // 需先保存实训资源  实训id为subjectId=4
            //获取id同时新增实训试题
            // competitionId
            let that=this;
            this.TorcompetitionId=id
            console.log(this.TorcompetitionId)
            for(let i=0;i<this.gradeList.length;i++){
                this.gradeList[i].competitionId=this.TorcompetitionId
                for(let j=0;j<this.gradeList[i].children.length;j++){
                    this.gradeList[i].children[j].competitionId=this.TorcompetitionId
                }
            }
            console.log(this.gradeList)
            this.$api.Competition.addQuestions(this.gradeList).then(res=>{
               if(res.data.success){
                   that.$message.success('任务书发布成功！')
                   that.uploadShow=true
                   that.clearItem()
               }else{

               }
            }).catch((error) => {
                console.error(error);
            })
        },
        //保存文件
        getFile(nowitem){ 
            let that=this;
            let params={
                "competitionId": 0,
                "competitionName": this.nowData.competitionName,
                "url": this.nowData.url,
                "urlName": this.nowData.urlName,
                "classId": this.nowData.classId||0,
                "subjectId": this.nowData.subjectId,
                "status":1,
                "enabled": 0,
                "orderNo": 0,
                "remarks": this.nowData.remarks,
                "createBy": localStorage.getItem('userIds'),
                "createTime": new Date(),
                "updateTime": new Date()
            }
            if(this.nowTaskIndex==0){//当是任务书时
                params.competitionName=this.torName
                params.classId=4;//当前接口返回是 4
            }
            if(!params.url){
                this.$message('请先确保文件上传完成再确定保存！')
                return false
            } 
            if(!params.competitionName){
                this.$message('请输入文件标题')
                return false
            }
            this.$api.Competition.addTeaching(params).then(res=>{
                if(res.data.success){
                    if(nowitem){//当保存任务书时候 得到任务书id同时保存试题内容
                        let id=res.data.result.competitionId
                        that.saveTor(id)
                    }else{
                        that.$message.success('文件发布完成！')
                        that.uploadShow=true
                        that.clearItem()
                    }
                }else{
                   that.$message.error(res.data.msg) 
                }
            }).catch((error) => {
                console.error(error);
            })
            // console.log(this.$refs.upload.submit())
        },
        clearItem(){
            this.nowData={
                'competitionName':'',
                'subjectId':null,
                "classID":null,
                "url": "",
                "urlName": "",
            }
        },
        //获取当前课题
        getNowsub(id){
            let that=this
            this.$api.Competition.getSgSubject(id).then(res=>{
                that.topName=res.data.result.subjectName
                console.log(res.data)
            }).catch((error) => {
                console.error(error);
            }) 
        },
        //上传附件
        UploadStart(){
            var file = $("#fileFj")[0].files[0];
            if(this.nowTaskIndex==0&&file.type!='application/pdf'){
                this.$message('任务书必须上传pdf文件！')
                return false;
            }
            this.fuAjaxFile(file, 0);
            console.log(file)
            // this.AjaxFile(file,0);
        },
        fuAjaxFile(file,i){
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
                        that.fuAjaxFile(file, i);                  
                        if (result.mergeOk&&shardCount==i) {
                            console.log(result)
                            // that.initUpload=result;
                            that.$confirm('文件已上传完成，确认覆盖当前任务书?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                                }).then(() => {
                                    that.nowData.url=result.url
                                    that.nowData.urlName=result.fileName
                                    if(that.nowTaskIndex==0){
                                        that.pdfUrl=that.$api.serverUrl+'/'+ encodeURI(that.nowData.url)
                                    } 
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
    }
}
</script>
<style lang="scss">
    .upload-wapper{
        width: 100%;
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
        .load-title{
            span{
                margin-right: 10px;
            }
        }
    }
    .upload-rw{
        .pdf-wapper{
            margin-top: 12px;
            max-height: 300px;
            height: 300px;
            overflow: auto;
            box-shadow: 0 0 5px #ccc;
            .pdf-if{
                width: 100%;
                height: 100%;
            }
        }
        .addfen{
            margin: 20px 0;
        }
        
        .fen-wapper{
            // max-height: 270px;
            // height: 270px;
            // overflow: auto;
            .fen-item{
                // font-size: 16px;
                margin-bottom: 10px;
                .fen-top{
                    background: #f6f7f8;
                    color: #bcbdbd;
                    text-align: center;
                    padding: 10px 0;
                }
            }
            .fen-title{
                display: flex;
                align-items: center;
                margin: 18px 0 28px 0;
                .ms{
                    min-width: 100px;
                    padding-right: 15px;
                }
                .fen-add{
                    min-width: 100px;
                    padding-left: 20px;
                    cursor: pointer;
                    color: #f19149;
                }
            }
            .fen-list{
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                .fen-input{
                    height: 54px;
                }
                .fen-list-left{
                    width: 80%;
                    margin-right: 20px;
                }
                .fen-list-right{
                    display: flex;
                    align-items: center;
                    .fen-list-rr{
                        min-width: 100px;
                        padding-left: 20px;
                        cursor: pointer;
                        color: #f19149;
                    }
                }
            }
            .fen-btn{
                text-align: center;
                margin: 50px 0 40px 0;
                .save-btn{
                    background: #ec6941;
                    font-size:20px;
                    width: 200px;
                    color: #fff;
                }
                // span{
                //     background: #ec6941;
                //     color: #fff;
                //     font-size:28px;
                //     padding: ;
                // }
            }
        }
    }
</style>