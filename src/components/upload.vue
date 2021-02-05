<template slot-scope="scope">
	<div class="upload">
		<hea :isshow=1></hea>
		<navlist></navlist>
		<div class="auto margin-bot">
			<!--upload-->
			<div class="upload-wapper">
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
				  <img src="../images/upload.png"/>
				  <div class="el-upload__text">
				  	<p class="video-dra">或将文件拖拽至此处</p>
				  	<p class="video-c">选择文件</p>				  	
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
				<div class="load-title clearfix">
					<div class="load-left fl" id="selectwapper">
						<p class="load-input"><span>文件标题</span><el-input name="filename" v-model="fileData.name" placeholder="请输入标题"></el-input></p>
						<p class="load-input" ><span>文件分类</span>
							<el-select v-model="value" @change="selectOne($event)" id="sel"> 
							    <el-option v-for="(item,index) in options" :value="index+'/'+item.id"  :label="item.name" :key='index' :v-model="index+'/'+item.id">
							    </el-option>
						  </el-select>
						</p>
						<!-- 第二级 -->
						<p class="load-input" v-show="sele1"><span>二级目录</span>
							<el-select v-model="value1" @change="selectTow($event)" id="sel1"> 
							    <el-option v-for="(item,index) in options1" :value="index+'/'+item.id"  :label="item.name" :key='index' :v-model="index+'/'+item.id">
							    </el-option>
						  </el-select>
						</p>
						<!-- 第三级 -->
						<p class="load-input" v-show="sele2"><span><!-- {{selename2}} -->三级目录</span>
						
							<el-select v-model="value2" @change="selectTre($event)" id="sel2"> 
							    <el-option v-for="(item,index) in options2" :value="index+'/'+item.id"  :label="item.name" :key='index' :v-model="index+'/'+item.id">
							    </el-option>
						  </el-select>
						</p>
						<!-- 第四级 -->
						<p class="load-input" v-show="sele3"><span><!--{{selename3}}-->四级目录</span>
							<el-select v-model="value3" @change="selectFow($event)" id="sel3"> 
							    <el-option v-for="(item,index) in options3" :value="index+'/'+item.id"  :label="item.name" :key='index' :v-model="index+'/'+item.id">
							    </el-option>
						  </el-select>
						</p>
						<div v-html="todo"></div>	
					</div>
					<div class="load-right fr">
						<span>文件简介</span><el-input name="filedescription" v-model="fileData.description" type="textarea" placeholder="请输入文件描述"></el-input>
					</div>
				</div>
				<div class="save-text clearfix">
					<button class="save" @click="uploadFile">保存发布</button>
					<el-button type="info" class="cancel"  @click="cancelUpload">取消上传</el-button>
					<p>请确认文件信息后 <span>保存</span>，以完成上传</p>
				</div>
				
			</div>
			
			<!--looding-->
			<div class="looding">
				<p class="video-all">用户数量(4)</p>
				<div class="m-top clearfix">
					<div class="m-left fl">
						<el-checkbox >全选</el-checkbox>
						<button class="button-auto">开始</button>
						<button class="button-auto margin-l6">暂停</button>
					</div>
					<div class="m-right fr">
						
						<button class="button-add">继续上传</button>
					</div>
				</div>
			</div>		
			<!-- looding end-->
		</div>
		
	</div>
</template>

<script>
	import server from '@/server/server.js'
	import ajax from "@/server/ajax.js";
	import hea from './header'
	import navlist from './nav'
	var selectwapper=document.getElementById('selectwapper');
	export default{	
		name:'upload',
		data(){
			return {
				toptitle:'文件发布系统',
				options:[],
				options1:[],
				options2:[],
				options3:[],
				fileData:{
					name:"",
					filesize:'',
					description:'',
					filedirectoryid:'',
					inseryby:'1111'
				},
				value: '文件控制',//第一层
				value1:'',//第二层
				value2:'',//第三层
				value3:'',//第四层
				video:false,
				upload_url:'',
				todo:'',
				sele1:false,
				sele2:false,
				sele3:false,
				selename1:'',
				selename2:'',
				selename3:'',

			}
		},
		computed:{

		},
		mounted(){
			this.fileList();
		},
		methods:{
			//上传
			uploadFile(){
				const _this=this;
				_this.fileData.filedirectoryid=_this.filedirectoryid
				
				_this.upload_url="http://"+server.ip+":"+server.port+"/file/upload?filename="+_this.fileData.name+"&filesize="+_this.fileData.filesize+"&filedes="+_this.fileData.description+"&filedirectoryid="+_this.fileData.filedirectoryid+"&fileinseryby="+_this.fileData.inseryby+""
				// console.log(_this.upload_url)
				// console.log(_this.fileData.filesize)

				if(_this.fileData.name==""||_this.fileData.description==""){
					 this.$message.error('请填入信息后再上传');
				}else{
					setTimeout(function(){
						_this.$refs.upload.submit();						
					},300)
				}				
				
			},
			//上传取消
			cancelUpload(){
				this.$refs.upload.clearFiles();
			},
			showall(){
				// console.log(11)
			},
			selectc(){
				// console.log(this.$refs.selectWapper.value)
			},
			//分类id
			selectOne(value){//用户点击的分类id	上传		
				var sel=document.getElementById('sel'),
						id=value.split('/')[1],//获取当前选中的id
						selectIndexs=value.split('/')[0];//获取当前选中的下标
				// this.filedirectoryid=id;
				const _this=this;
				ajax({
		   		url:'filedirectory/tree',
		   		// contentType:"application/json;charset=UTF-8"
				 }).then(function(res){//成功回调判断
					if(res[selectIndexs].childList!==null){
						// console.log(res[selectIndexs].childList)
						_this.options1=res[selectIndexs].childList;//第二层数据
						_this.sele1=true;//第二层显示
						_this.value1=_this.options1[0].name;
						_this.selename1=_this.options1[0].name;
						_this.filedirectoryid=_this.options1[0].id;//第一层如果没有子类id就给当前父级的目录
						// console.log(_this.filedirectoryid)
						if(_this.options1[0].childList!==null){//判断显示第三层select
							_this.sele2=true;
							_this.options2=_this.options1[0].childList;
							_this.selename2=_this.options2[0].name;
							_this.value2=_this.options2[0].name;
							_this.filedirectoryid=_this.options2[0].id;
							// console.log(_this.filedirectoryid)
							if(_this.options2[0].childList!==null){//防止有第四层结构
								_this.sele3=true;
								_this.options3=_this.options2[0].childList;
								_this.selename3=_this.options3[0].name;
								_this.value3=_this.options3[0].name;
								_this.filedirectoryid=_this.options3[0].id;
							}
						}else{
							_this.sele2=false;
						}
					}else{
						_this.sele1=false;
						_this.sele2=false;
						_this.sele3=false;
						_this.filedirectoryid=id;
						
						// console.log(_this.filedirectoryid)
					}
		   	})
			},
			selectTow(value){//第二层点击
				var id=value.split('/')[1],//获取当前选中的id
						selectIndexs=value.split('/')[0];//获取当前选中的下标
	
						if(this.options1[selectIndexs].childList==null){
							this.sele2=false;
							this.filedirectoryid=id;
						}else{
							this.sele2=true;
							this.filedirectoryid=this.options1[selectIndexs].childList[0].id;
							// console.log(this.filedirectoryid)
							// console.log(this.options1[selectIndexs])
							this.options2=this.options1[selectIndexs].childList;
							this.value2=_this.options2[0].name;
							// this.options3=this.options2[selectIndexs].childList
						}
			},
			selectTre(value){//第三层点击
					var id=value.split('/')[1],//获取当前选中的id
							selectIndexs=value.split('/')[0];//获取当前选中的下标
							this.filedirectoryid=id;//分类给到当前id文件
					if(this.options2[selectIndexs].childList==null){
						this.sele3=false;
						this.filedirectoryid=id;
					}else{
						this.sele3=true;
						this.filedirectoryid=this.options2[selectIndexs].childList[0].id;
						this.options3=this.options2[selectIndexs].childList;
						this.value3=_this.options3[0].name;
					}
			},
			selectfow(value){//第四层点击
				var id=value.split('/')[1],//获取当前选中的id
						selectIndexs=value.split('/')[0];//获取当前选中的下标
						this.filedirectoryid=id;//分类给到当前id文件
						// console.log(this.filedirectoryid)
			},
			//获取分类
			fileList(){
				const _this=this;
				ajax({
		   		url:'filedirectory/tree',
		   		// contentType:"application/json;charset=UTF-8"
		   	}).then(function(res){
					//  console.log(res)
					 _this.options=res;
					//  console.log(_this.filedirectoryid)
		   	})
				
			},
			handlePreview(file) {//点击文件触发
		        // console.log(file);
		    },
			handleRemove(file, fileList) {//移走文件触发
		        // console.log(file, fileList);
		        // console.log(111)
		      },
			beforeUploadVideo(file) { //文件上传之前判断大小
				const _this=this;
				_this.video=true;
				_this.fileData.filesize=file.size;
				_this.urlname=file.name;

				_this.fileData.filesize=file.size/1024/1024;			
					const isLt10M = file.size/1024/1024<1000;
		      if (!isLt10M) {
		        this.$message.error('上传文件大小不能超过1个G哦!');
		        return false;
		      }
			 },
			 //得到文件
			tirggerFile(event) {
			  var file = event.target.files; 
			  // do something...
			},
			//上传失败
			error(file){
				this.$message.error('上传过程中出现错误啦');
			},			
		   handleVideoSuccess(res, file) {  //文件上传成功之后返回
		      this.videoFlag = false;
		      this.videoUploadPercent = 0;
		      if(res.result=="上传成功"){
		      	this.$message({
		      		message: '上传成功',
		          type: 'success'
						});
						this.fileData.name='';
						this.fileData.description='';
						this.value='';
						this.sele1=false;
						this.sele2=false;
						this.sele3=false;
		      }else if(res.result=="上传失败"){
		      	 this.$message.error('上传失败');
		      }else{
		      	this.$message.error('上传中出现错误');
		      }
		    },
		},
	    components:{
	    	hea,
	    	navlist
	    }
	}
</script>

<style>
	.upload-wapper{width: 1016px;margin: auto; margin-top:40px;padding-top: 32px;border: 1px solid #e5e5e5;padding-bottom: 20px;}
	.upload-wapper .el-upload-dragger,.upload-wapper .el-upload{height:auto;display:block;width:100%;border: none;}
	.video-c{display: inline-block;border: 1px solid #d2d2d2;color: #333333;padding: 10px 30px;font-size: 16px;}
	.video-dra{padding-top: 28px;line-height: 20px;}
	.upload-list{text-align: center;margin: 19px 0 36px 0;color: #606266;font-size: 12px;position: relative;}
	.upload-list select{border: none;opacity: 0;}
	.upload-list select option{line-height: 30px;}
	.list-posi{position: absolute;padding-left:10px;left: 47%;color: #f19149;top: 50%;transform: translateY(-50%);}
	.looding{display: none;}
	.load{width: 1016px;margin: auto;padding-top: 22px;}
	.save-text {text-align: center;}
	.load-upname{padding: 34px 0 20px 0}
	.save-text .save{background:#ed6842;color:#fff;padding: 10px 42px;clear: both;margin-bottom: 5px;}
	.save-text p{color: #acacac;font-size: 12px;}
	.save-text span{color: #ed6842;}
	.load .el-input__inner,.load .el-input--suffix,.load .el-textarea{width: 415px;display: inline-block;vertical-align: top}
	.load .el-textarea__inner{resize: none;height: 100px}
	.load .el-input__inner,.load .el-input--suffix{vertical-align: middle;}
	.load .el-input{display: inline-block;width: 415px;margin-bottom: 20px;}
	.load-right,.load-input{font-size:0;}
	.load-right span,.load-input span{font-size: 16px;display: inline-block;width: 70px;color: #333}
	.save-text .cancel span{color: #fff;}
	.save-text .cancel{margin-left: 20px;padding: 10px 42px;}
</style>