<template>
    <div class="content-wapper auto-w">
        <div class="content-left">
            <builds></builds>
        </div>
        <div class="content-right content-right-mar">
            <div class="item-title item-title-marb">
                    树状菜单
                </div>
            <!--upload-->
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
				  :auto-upload="false"
				  :on-preview="handlePreview"
				  multiple>
				  <img src="../../../images/upload.png"/>
				  <div class="el-upload__text">
                    <p class="video-dra">或将文件拖拽至此处</p>		
				  	<p class="video-c">选择文件</p>		
                    <p class="video-bei">备注：发布视频、课件、模型</p>  	
				  </div>
				</el-upload>
				<!-- 先不要 -->
				<p class="upload-list" style="display: none">
					上传至:<span class="list-posi">
						{{value}} <i class="el-icon-arrow-down"></i>
					</span>
					<select name="upload-list" v-model='value'>
						<option v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.label"></option>
					</select>
				</p>
			</div>
			<!-- upload end -->
            <div class="load">
				<!-- <p class="load-upname">当前上传文件：{{filename}}</p> -->
				<div class="load-jindu">
					
				</div>
				<div class="load-title">
					<div class="load-left" id="selectwapper">
						<p class="load-input"><span>文件标题</span><el-input name="filename"  placeholder="请输入标题"></el-input></p>
                    </div>
					<div class="load-right">
						<span>文件简介</span><el-input min='100' name="filedescription"  type="textarea" placeholder="请输入文件描述"></el-input>
					</div>
				</div>
				<div class="save-text">
					<button class="save">保存发布</button>
					<button type="info" class="cancel">取消上传</button>
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
            nowTaskList:[
                {text:'发布任务书'},
                {text:'发布其它资源'},
            ],
            nowTaskIndex:0
        }
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