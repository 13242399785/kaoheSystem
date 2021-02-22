<template>
    <div class="content-wapper auto-w">
        <div class="content-left">
            <builds @buildId="getBuildId" url='teaching'></builds>
        </div>
        <div class="content-right content-right-mar">
            <div class="item-title">
                    {{topName}}
                </div>
            <!--upload-->
			<div class="upload-wapper" v-show="uploadShow">
				<el-upload
				  class="upload-dra"
				  drag
				  ref="upload"
				  :on-error="error"
				  :before-upload="beforeUploadVideo"				  
				  :on-remove="handleRemove"
				  :on-preview="handlePreview"
				  :multiple="false">
				  <img src="../../../images/upload.png"/>
				  <div class="el-upload__text">
                    <p class="video-dra">或将文件拖拽至此处</p>		
				  	<p class="video-c">选择文件</p>		
                    <p class="video-bei">备注：发布视频、课件、模型</p>  	
				  </div>
				</el-upload>
			</div>

            <el-progress v-show="!uploadShow" :text-inside="true" :stroke-width="22" :percentage="percenSum" status="warning"></el-progress>
			<!-- upload end -->
            <div class="load" v-show="!uploadShow">
				<!-- <p class="load-upname">当前上传文件：{{filename}}</p> -->
				<div class="load-jindu">
					
				</div>
				<div class="load-title">
					<div class="load-left" id="selectwapper">
						<p class="load-input"><span>文件标题</span><el-input v-model="nowData.teachingName" name="filename"  placeholder="请输入标题"></el-input></p>
                    </div>
                    <div class="load-left" id="selectwapper">
						<p class="load-input"><span>文件分类</span>
                            <el-select v-model="nowData.classId"  placeholder="请选择">
                                <el-option
                                v-for="item in classList"
                                :key="item.classId"
                                :label="item.className"
                                :value="item.classId">
                                </el-option>
                            </el-select>
                            <!-- <el-input name="filename"  placeholder="请输入标题"></el-input> -->
                        </p>
                    </div>
					<div class="load-right">
						<span>文件简介</span><el-input min='100' v-model="nowData.remarks" name="filedescription"  type="textarea" placeholder="请输入文件描述"></el-input>
					</div>
				</div>
				<div class="save-text">
					<button class="save" @click="getFile">保存发布</button>
					<button type="info" @click="uploadShow=true" class="cancel">取消上传</button>
					<p>请确认文件信息后 <span>保存</span>，以完成上传</p>
				</div>
			</div>
        </div>
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
            upload_url:this.$api.serverUrl+'/Upload/UploadFile',
            UploadPath:'',
            percenSum:0,
            fileNow:null,
            uploadShow:true,
            nowData:{
                'subjectId':null,
                "classID":null,
                "url": "",
                "urlName": "",
            },
            classList:[],
            topName:'',
            nowClass:null
        }
    },
    mounted(){
        console.log(this.upload_url)
        this.getClass()
    },
    methods:{
         getBuildId(data){
            console.log(data)
            this.nowData.subjectId=data;
            this.getNowsub(data)
            // this.initGetlist()
        },
        // handleVideoSuccess(response, file, fileList){
        //     console.log(response)
        // },
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
                        if (result.mergeOk) {
                            console.log(result)
                            that.nowData.url=result.url
                            that.nowData.urlName=result.fileName
                            that.$refs.upload.clearFiles() 
                            that.$message.success('文件上传成功！')
                            
                        }else if(result.msg&&!result.mergeOk){
                            that.uploadShow=true
                            that.$message(result.msg)
                        }else{
                            console.log('切片上传中')
                        }
                    }
                }
            });
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
        getClass(){
            let that=this;
            this.$api.Teaching.getType().then(res=>{
                that.classList=res.data.result
                console.log(res.data)
            }).catch((error) => {
                console.error(error);
            }) 
        },
        beforeUploadVideo(file){
            this.uploadShow=false
            if(file.name.indexOf('.7z')>-1){
                this.$message('当前不允许上传该类型文件！')
                return false;
            }
            this.AjaxFile(file,0)
            return false;
        },
        getFile(){ 
            let that=this;
            let params={
                "teachingId": 0,
                "teachingName": this.nowData.teachingName,
                "url": this.nowData.url,
                "urlName": this.nowData.urlName,
                "classId": this.nowData.classId||0,
                "subjectId": this.nowData.subjectId,
                "status":1,
                "enabled": 0,
                "orderNo": 0,
                "remarks": this.nowData.remarks,
                "createBy": localStorage.getItem('userIds')||0,
                "createTime": new Date(),
                "updateTime": new Date()
            }
            if(!params.url){
                this.$message('请先确保文件上传完成再确定保存！')
                return false
            } 
            if(!params.teachingName){
                this.$message('请输入文件标题')
                return false
            }
             
            this.$api.Teaching.addTeaching(params).then(res=>{
                if(res.data.success){
                    that.$message.success('文件发布完成！')
                    that.uploadShow=true
                    that.clearItem()
                }
            }).catch((error) => {
                console.error(error);
            })
            // console.log(this.$refs.upload.submit())
        },
        clearItem(){
            this.nowData={
                'teachingName':'',
                'subjectId':null,
                "classID":null,
                "url": "",
                "urlName": "",
            }
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
</style>