<template>
	<div class="video-m">
		<hea :isshow=1></hea>
		<navlist></navlist>
		<div class="auto">
			<p class="video-all">全部文件({{cities.length}})</p>
			<div class="m-top clearfix">
				<div class="m-left fl">
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" :checked="checkedNames.length===pages.pagesize" @change="handleCheckAllChange">全选</el-checkbox>
					<button class="button-auto" @click="checkDelect">删除</button>
					<span class="list-b move-left" v-show="false">移动到 <i class="el-icon-arrow-down"></i>
						<ul class="show-list">
							<li v-for="(item,index) in options" :key=index>{{item.name}}</li>
						</ul>
					</span>
				</div>
				<router-link to="/echartlist"><span class="fenxi">查看分析</span></router-link> 
				<div class="m-right fr">

					

					<!-- 文件类型 -->
					<span class="list-b move-middle">类型 <i class="el-icon-arrow-down"></i>
						<ul class="show-list">
							<li :class="{show_active:!typeActive}"  @click="typeAlls">全部</li>
							<li v-for="(type,index) in fileTypeList" :key="index" :class="{show_active:index==typeNowindex}" @click="typeShow(type.id,index,type.type)">{{type.typename}}</li>
						</ul>
					</span>
					<!-- 文件分类 -->
					<listclass :message="selectFile" :pages='pages' :pagecontrol="pagecontrol" :fileList="fileList" :listShow="listShow"></listclass>
					
					<span class="list-b move-middle">最近上传 <i class="el-icon-arrow-down"></i>
						<ul class="show-list">
							<li :class="{show_active:!listActive}"  @click="showAlls">全部</li>
							<li :class="{show_active:showmore1}" @click="latelyUpload">最近上传</li>
							<li :class="{show_active:showlazy1}" @click="moreLook">最多查看</li>
						</ul>
					</span>
					<!-- 查询 -->
					<el-input
							placeholder="请输入关键字"
							suffix-icon="el-icon-search"
							v-model="searchName"
							@keyup.enter.native="searchAll"
							onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false"
							>
					</el-input>
					<span class="serchButton" @click="searchAll"></span>
				</div>
			</div>

			<!--table-->
			<table class="clearfix video-table" width="100%" border="0">
				<tr class="th">
					<th class="table-list">文件</th>
					<th class="table-des">简介</th>
					<th class="table-is">状态</th>
					<th class="table-hot">热度</th>
					<th class="table-dom">操作</th>
				</tr>
				
				<tr v-for="(city,index) in video" class="video-td" :key=index>
					<td>
						<el-checkbox-group v-model="checkedNames" @change="handleCheckedCitiesChange">
						    <el-checkbox :label="city.id" :key="city.id"></el-checkbox>
						  </el-checkbox-group>
						  <p class="video-img">
						  	<img :src="srcCotrol(city)"/>
						  	<!-- <span class="video-show">超清</span>
						  	<span class="video-time">01：55</span> -->
						  </p>
						  <div class="video-text">
						  	<p class="video-text-title">
						  		{{city.name}}
						  	</p>
						  	<p class="video-text-time">
						  		{{format(city.inserttime)}}
						  	</p>
						  	<p class="video-text-dif">
						  		分类：{{city.filedirname}}
						  	</p>
						  </div>
					</td>
					<td>
						<p class="video-des">
							{{city.description}}
							<!-- {{city}} -->
						</p>
					</td>
					<td>
						<p class="video-state">已发布</p>
					</td>
					<td>
						<p class="video-hot"><i class="el-icon-view"></i> {{city.click?city.click:0}}</p>
							<div  class="video-control-top"></div>
							<p class="video-hot"><i class="el-icon-videoxiaoxi" @click="commentDelete(city.id)"></i> 
							<span @click="commentDelete(city.id)">{{city.comment}}</span>
						</p>
					</td>
					<td>
						<div class="video-control">
							<el-button type="text" @click="fileS(city.name,city.filedirectoryid,city.description,city.id,city.filedirname)">编辑信息</el-button>
							<div  class="video-control-top"></div>
							<el-button type="text" @click="delshow(city.id,city.path,city.filepic)">删除</el-button>
						</div>
					</td>
				</tr>    								
			</table>
			<!-- 没有文件事显示 -->
			<div class="notfile" v-show="total<=0">
				还没有文件呢，赶紧添加吧！
			</div>
			<!-- page -->
			<div class="page-control clearfix">
			    <el-pagination
			      @current-change="handleCurrentChange"
			      prev-text='上一页'
			      next-text='下一页'
			      :page-size="pages.pagesize"
			      layout="prev, pager, next"
			      :total="total">
			    </el-pagination>
			</div>
			<!-- page end -->
		</div>
		<!--editor-->
		<div class="editor">
			<el-dialog
			  title="编辑信息"
			  :visible.sync="dialogVisible"
			  width="30%"
			  :before-close="handleClose">
			  <p><span class="editor-span">标题</span> <el-input placeholder="不超过20字" maxlength=20 v-model="fileList.name"></el-input></p>
				<!-- 第一层 -->
			  <p class="lei"><span class="editor-span">分类</span>
			  	<el-select v-model="typeControl" placeholder="请选择" @change="selectOne($event)">
				    <el-option
				      v-for="(item,index) in options" :value="index+'/'+item.id"  :label="item.name" :key='index'	
				      >
				    </el-option>
				  </el-select>
			  </p>
				<!-- 第二层-->
				<p class="lei" v-show="sele1"><span class="editor-span">二级</span>
			  	<el-select v-model="values1" placeholder="请选择" @change="selectTow($event)">
				    <el-option
				      v-for="(item,index) in options1" :value="index+'/'+item.id"  :label="item.name" :key='index'							
				      >
				    </el-option>
				  </el-select>
			  </p>
				<!-- 第三层-->
				<p class="lei" v-show="sele2"><span class="editor-span">三级</span>
			  	<el-select v-model="values2" placeholder="请选择" @change="selectTree($event)">
				    <el-option
				      v-for="(item,index) in options2" :value="index+'/'+item.id"  :label="item.name" :key='index'
				      >
				    </el-option>
				  </el-select>
			  </p>
				<!-- 防止有四层-->
				<p class="lei" v-show="sele3"><span class="editor-span">四级</span>
			  	<el-select v-model="values3" placeholder="请选择" @change="selectFow($event)">
				    <el-option
				      v-for="(item,index) in options3" :value="index+'/'+item.id"  :label="item.name" :key='index'
				      >
				    </el-option>
				  </el-select>
			  </p>
			  <p><span class="editor-span des">简介</span> <el-input type="textarea" placeholder="不超过400字" maxlength=400 v-model="fileList.description"></el-input></p>
			  <span slot="footer" class="dialog-footer">
			  	<el-button class="cancel" type="primary" @click="fileUpdate()">保存</el-button>
			    <el-button class="save" @click="dialogVisible = false">取 消</el-button>
			  </span>
			</el-dialog>
		</div>	
		<!--editor end-->
		 
		<!--delect-->
		<div class="delect-wapper" v-show="delectShow">
			<div class="delect">
				<div class="delect-top">
					<span class="delect-left">提示</span>
					<span class="delect-right fr"><i  @click="delectH" class="el-icon-close"></i></span>
				</div>
				<div class="delect-text">
					<img src="../images/info.png"/>
					<span>确定删除所选项吗？</span>
				</div>
				<div class="delect-footer">
					<el-button type="primary" @click="delectS()">确定</el-button>
					<el-button @click="delectH">取消</el-button>
				</div>
			</div>
		</div>
		<!-- 选中 -->
		<!--delect-->
		<div class="delect-wapper" v-dialogDrag v-show="delectList">
			<div class="delect">
				<div class="delect-top">
					<span class="delect-left">提示</span>
					<span class="delect-right fr"><i  @click="delectH" class="el-icon-close"></i></span>
				</div>
				<div class="delect-text">
					<img src="../images/info.png"/>
					<span>确定删除所选项吗？</span>
				</div>
				<div class="delect-footer">
					<el-button type="primary" @click="delectC()">确定</el-button>
					<el-button @click="delectH">取消</el-button>
				</div>
			</div>
		</div>
		<!--delect end-->
		<!-- comment start -->
		<div class="delmock" v-show="delmockShow">		
			<div class="delcomment">
				<div class="delcomment-top"><span>评论管理</span><span class="fr"><i class="el-icon-close" @click="cloneComment"></i></span></div>
				<div class="comment-wapper">
					<div class="comment-top"><span class="comment-a">全部评论({{allComment}})</span>
					<!-- <span class="comment-l">分类</span> -->
					</div>
					<ul class="commentScoll">
						<li v-for="(item,index) in commentList" :key="index">
							<p class="comment-t"><span class="username">{{item.username}}</span><span class="dec-middle">发表于</span><span>{{format1(item.inserttime)}}</span></p>
							<p class="comment-b">{{item.content}}</p>
							<!-- <span class="delectCom">删除</span> -->
						</li>
					</ul>
					<!-- page -->
					<div class="page-control1 clearfix">
							<el-pagination
								@current-change="handleCurrentChange1"
								prev-text='上一页'
								next-text='下一页'
								:page-size="commentsNum"
								layout="prev, pager, next"
								:total="allComment">
							</el-pagination>
						<p class="buttomposi"> 
							<span class="buttondel delsave padding-r noselect" @click="saveComment">保存</span> 
							<span class="buttondel delclose noselect" @click="cloneComment">取消</span>
						</p>
					</div>
					<!-- page end -->
				</div>
			</div>
		</div>
		<!-- comment end -->
	</div>
</template>

<script>
	import server from '@/server/server.js'
	import ajax from "@/server/ajax.js";
	import hea from './header'
	import navlist from './nav'	
	import page from './page/page'
	import comment from './comment/comment'
	import listclass from './listclass/listclass'
	export default{	
		name:'videomanagement',
		data(){
			return{
				toptitle:'文件发布系统',
				checkAll: false,
				checkedNames: [],
				checkList:'',//选中id
				cities: "",//列表
				isIndeterminate: false,
				serch:'',
				title:'',
				dialogVisible: false,
				options:[],//分类
				options1:[],//第二层
				options2:[],//第三层
				options3:[],//第四层
				values: '文件控制',//第一层
				values1:'',//第二层
				values2:'',//第三层
				values3:'',//第四层
				sele1:false,
				sele2:false,
				sele3:false,
				selename1:'',
				selename2:'',
				selename3:'',
				value:'',
				delectShow:false,//删除单个显示
				delectList:false,//删除选中显示
				pages:{
					currentPage:1, //初始页
					pagesize:10,   //每页的数据
				},
				selectFile:{//总数据
					id:'',
					type:'',
					name:'',
					page:1,
					size:10
				},
				total:0,//总条数
				video:[{}],
				//单个文件属性
				del:{
					id:'',
					file:'',
					pic:null
				},
				fileList:{
					name:'',
					filedirectoryid:0,
					description:"",
					id:0	
				},
				//分类显示
				listShow:{
					dirid:0,
					page:1,
					size:14
				},
				nowIndex:-1,
				nowIndex1:-1,
				nowIndex2:-1,
				typeNowindex:-1,
				delmockShow:false,
				listActive:false,
				listActive1:false,
				listActive2:false,
				searchName:'',//查询
				lately:[],//最近
				more:[],//最多
				showlazy1:true,
				showmore:true,//最近接口
				showmore1:true,
				showlazy:true,//最多接口
				commentList:'',//评论列表
				allComment:0,//评论数
				commentPage:1,
				commentId:'',
				commentsNum:5,
				fileTypeList:'',
				typeActive:false,
				typeControl:''
			}
		},
		components:{
			hea,
			navlist,
			comment,
			listclass
		},
		//组件完成加载
		mounted() {
			this.fileType();
		},
	//方法 
		methods:{
			//获取文件类型
			fileType(){
				const _this=this;
				ajax({
					url:'filetype/list',
				}).then(function(res){
					_this.fileTypeList=res.result
					// console.log(_this.fileTypeList)
				})
			},
			//all
			typeAlls(){
				const _this=this;
				this.typeActive=false;
				this.showmore=true;
				this.showlazy=true;
				this.typeNowindex=-1;
				this.selectFile.type='';
				this.pagecontrol(this.pages.currentPage,this.pages.pagesize);	
			},
			//多条件查询
			typeShow(id,index,type){
				// console.log(type)
				const _this=this;
				if(_this.typeActive==false){
					_this.typeActive=true;
					// _this.nowIndex=-1
					_this.typeNowindex=index;					
				}else{
					_this.typeNowindex=index;		
				}
				_this.selectFile.type=type;
				// console.log(this.selectFile)
				this.pagecontrol(this.pages.currentPage,this.pages.pagesize);	
			},
			//管理评论
			commentDelete(id){
				const _this=this;
				this.delmockShow=true;
				this.commentId=id;
				ajax({
					url:'comment/pageforComment',
					data:{fileid:id,page:_this.commentPage,size:_this.commentsNum},//请求当前id的评论分页，一页五条
				}).then(function(res){
					// console.log(res.result.list)
					_this.allComment=parseInt(res.result.total);
					_this.allComment=res.result.total;
					_this.commentList=res.result.list
				})
			},
			//评论分页
			handleCurrentChange1(val){
				// console.log(val)
				this.commentDelete(this.commentId,val)
				this.commentPage=val;
			},
			//关闭管理评论
			cloneComment(){
				this.delmockShow=false;
			},
			//保存评论
			saveComment(){

			},
			// 最近上传
			latelyUpload(){
				var _this=this;
				_this.showmore=false;
				this.listActive=true;
				this.pagecontrol(this.pages.currentPage,this.pages.pagesize);	
			},
			
			// 最多查看
			moreLook(){
					var _this=this;
					_this.showlazy=false;
					this.listActive=true;
					this.pagecontrol(this.pages.currentPage,this.pages.pagesize);	
			},
			//搜索查询
			 searchAll(){
				 var _this=this;
				 _this.selectFile.name=this.searchName;
				 this.pagecontrol(this.pages.currentPage,this.pages.pagesize);
				//  ajax({
				// 	 url:'file/selectlikename',
				// 	 data:{name:_this.searchName,page:_this.pages.currentPage,size:_this.pages.pagesize}
				//  }).then(function(res){
				// 	//  console.log(res.result.list)
				// 		 _this.video=res.result.list;
				// 		 _this.total=parseInt(res.result.total) 
				//  })
			 },
			 //第四层
			 selectFow(value){
				var id=value.split('/')[1],//获取当前选中的id
						selectIndexs=value.split('/')[0];//获取当前选中的下标
						this.fileList.dirid=id;
			},
			//第三层
			 selectTree(value){
				var id=value.split('/')[1],//获取当前选中的id
				selectIndexs=value.split('/')[0];//获取当前选中的下标
				if(this.options2[selectIndexs].childList==null){
					this.sele3=false;
					this.fileList.filedirectoryid=id;
				}else{
					this.sele3=true;
					this.fileList.filedirectoryid=this.options2[selectIndexs].childList[0].id;
				}
			},
			// 第二层
			selectTow(value){
				var id=value.split('/')[1],//获取当前选中的id
				selectIndexs=value.split('/')[0];//获取当前选中的下标
				if(this.options1[selectIndexs].childList==null){
					this.sele2=false;
					this.fileList.filedirectoryid=id;		
				}else{
					this.sele2=true;
					this.fileList.filedirectoryid=this.options1[selectIndexs].childList[0].id;
					this.options2=this.options1[selectIndexs].childList;
					this.values2=this.options2[0].name;	
				}
			},
			//获取分类
			fileLists(){
				const _this=this;
				ajax({
		   		url:'filedirectory/tree',
		   		// contentType:"application/json;charset=UTF-8"
		   	}).then(function(res){
					//  console.log(res)
					 _this.options=res;
					//  console.log(_this.fileList.filedirectoryid)
		   	})
				
			},
			//修改分类id
			selectOne(value){
				var id=value.split('/')[1],//获取当前选中的id
						selectIndexs=value.split('/')[0];//获取当前选中的下标

				const _this=this;
				// console.log(this.options[selectIndexs])
				
				if(_this.options[selectIndexs].childList!==null){
					this.options1=this.options[selectIndexs].childList;
					this.sele1=true;//第二层显示 
					this.values1=this.options1[0].name;		
					this.fileList.filedirectoryid=this.options1[0].id;//默认第一个
					
					if(this.options1[0].childList!=null){
						this.options2=this.options1[0].childList;
						this.sele2=true;//第三层显示 
						this.values2=this.options2[0].name;		
						this.fileList.filedirectoryid=this.options2[0].id;
						// console.log(this.fileList.filedirectoryid)
						if(this.options2[0].childList!=null){//防止第四层
							this.options3=this.options2[0].childList;
							this.sele3=true;//第四层显示 
							this.values3=this.options3[0].name;		
							this.fileList.filedirectoryid=this.options3[0].id;
						}
					}else{
						_this.sele2=false;
						_this.sele3=false;
					}
				}else{
					_this.sele1=false;
					_this.sele2=false;
					_this.sele3=false;
					_this.fileList.filedirectoryid=id;
					// console.log(this.fileList.filedirectoryid)	
				}
			},
			
			//全部分类
			showallList(){
				this.selectFile.id='';
				this.listActive=false;
				this.showmore=true;
				this.showlazy=true;
				this.nowIndex=-1
				this.pagecontrol(this.pages.currentPage,this.pages.pagesize);
			},
			//显示所有
			showAlls(){
				this.selectFile.id='';
				this.selectFile.name='';
				this.selectFile.type='';
				this.listActive=false;
				this.showmore=true;
				this.showlazy=true;
				this.nowIndex=-1
				this.pagecontrol(this.pages.currentPage,this.pages.pagesize);
			},

			handleCheckAllChange(val) {//全选

				if (this.checkedNames.length == this.cities.length) {
					// 全不选
					this.checkedNames = [];
					this.checkList="";
					this.isIndeterminate=false;
				}else {
					this.checkedNames = [];
					// 全选
					this.cities.forEach((item) => {
							this.checkedNames.push(item.id); //与checkbox的value统一
							// console.log(this.checkedNames)
							this.checkList=this.checkedNames.join(",")		
							// console.log(this.checkList)	
					})
					// console.log(this.checkedNames.join(','))
				}
			},			
			handleCheckedCitiesChange(value) {//单选当前id
				this.checkList=value.join(',');
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			//选中删除
			checkDelect(){
				if(this.checkList!=""){
					this.delectList=true;
				}else{
					this.$message.error('未选择要删除的文件!');
				}		
			},
			delectC(){
				const _this=this;
				
				ajax({
					url:'file/delbatch'+'?fileid='+_this.checkList,
					type:'DELETE',
				}).then(function(res){
					_this.pagecontrol(_this.pages.currentPage,_this.pages.pagesize);
					_this.delectList=false;
				})
			},
			//确认关闭
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//删除
			delshow(userid,userfile,userpic){	      	  
				this.del.id=userid
				this.del.file=userfile
				this.del.pic=userpic
				this.delectShow=true
			},
			delectS(){
				const _this=this;
				
				//单个删除
				ajax({
					url:'file/del'+'?id='+_this.del.id+'&file='+_this.del.file+'&pic='+_this.del.pic,
					type:'DELETE',
					// contentType:" x-www-form-urlencoded"
					}).then(function(res){
						_this.pagecontrol(_this.pages.currentPage,_this.pages.pagesize);
						_this.delectShow=false;
				},function(err){
					// _this.$message.error('列表加载失败');
				})	      	

				var cities = this.cities;
				var checkedNames = this.checkedNames;
					/*循环查找选中项*/
					checkedNames.forEach(function(item, index) {
							cities.forEach(function(music, i) {
									if (music.id == item) {
											cities.splice(i, 1);
									}
							});
					}) 
					this.cities = cities;
					this.checkedNames = []   
			},
			//单个取消
			delectH(){
				this.delectShow=false     
				this.delectList=false     
			},
			//show所有
			showall(){
				const _this=this;
				ajax({
					// url:'video/file/filelist',
					url:'file/filelist',
				}).then(function(res){
						_this.cities=res.result;
						console.log(res)
				},function(err){
					// _this.$message.error('列表加载失败');
				})
			},
			//当前时间
			CurentTime()
			{ 
				var now = new Date();
				var year = now.getFullYear();       //年
				var month = now.getMonth() + 1;     //月
				var day = now.getDate();            //日
				
				// var hh = now.getHours();            //时
				// var mm = now.getMinutes();          //分  
				var clock = year + "-";  
				if(month < 10)
						clock += "0";    
				clock += month + "-";      
				if(day < 10)
						clock += "0";           
				clock += day;
				// if(hh < 10)
				//     clock += "0";  
				// clock += hh + ":";
				// if (mm < 10) clock += '0'; 
				// clock += mm; 
				
				return(clock); 
			},
			//时间转化
			add0(m){
				return m<10?'0'+m:m;
			},
			format(shijianchuo)
			{
				var time = new Date(shijianchuo);
				var y = time.getFullYear();
				var m = time.getMonth()+1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y+'-'+this.add0(m)+'-'+d+'  '+h+':'+this.add0(mm);
			},
			format1(shijianchuo)
			{
				var time = new Date(shijianchuo);
				var y = time.getFullYear();
				var m = time.getMonth()+1;
				var d = time.getDate();
				return y+'-'+this.add0(m)+'-'+d;
			},

			//缩略图
			srcCotrol(list){
				var type=list.filetype
				var src=list.filepic;
				//给图片
				if(src!=null){
					//视频给了第一帧
					return "http://"+server.ip+":"+server.port+src
				}else if(type=='.doc'||type=='.docx'){
					return require("../images/file_05.png")
				}else if(type=='.xs'){
					return require("../images/file_07.png")
				}else if(type=='.pptx'||type=='.ppt'){
					return require("../images/file_09.png")
				}else{
					return require("../images/file_11.png")
				}
			},

			//分页show
			pagecontrol(pageCode,pagesize){
				var _this=this;
				// _this.selectFile.id='',
				// _this.selectFile.type=''
				// _this.selectFile.name=''
				if(_this.showmore==false){
					//最近上传分页
					ajax({
						url:'file/selectBydesc',
						data:{page:pageCode,size:pagesize}
					}).then(function(res){
						_this.video=res.result.list;
						_this.cities=res.result.list;
						_this.total=res.result.total
						_this.showmore=true
						_this.showmore1=true
						_this.showlazy1=false
					})
					
				}else if(_this.showlazy==false){//最多查看分页
					ajax({
						url:'file/selectByClick',
						data:{page:pageCode,size:pagesize}
					}).then(function(res){
						_this.video=res.result.list;
						_this.cities=res.result.list;
						_this.total=parseInt(res.result.total) 
						_this.total=res.result.total
						_this.showlazy=true
						_this.showlazy1=true
						_this.showmore1=false
					})
				}else{
					//正常上传分页
					_this.showlazy1=false;
					_this.showmore1=false;
					ajax({
						url:'file/selectFile',
						data:_this.selectFile,
					}).then(function(res){
						_this.video=res.result.list;
						_this.cities=res.result.list;
						_this.total=parseInt(res.result.total) 
						_this.total=res.result.total
					})
				}	
			},
			//分页换页面
			handleCurrentChange(val) {
				var _this=this;
				this.selectFile.page=val;
				this.pages.currentPage=val;
				this.pagecontrol(val,_this.pages.pagesize);//每页显示行
			},
			
			//select修改信息
			fileS(name,filedirectoryid,description,id,filedirname){
				const _this=this;
				_this.fileList.name=name;
				_this.fileList.filedirectoryid=filedirectoryid
				_this.fileList.description=description;
				_this.fileList.id=id;
				this.dialogVisible = true;
				this.typeControl=filedirname;
				_this.sele1=false;
				_this.sele2=false;
				_this.sele3=false;
				// console.log(_this.fileList.filedirectoryid)
			},
			//修改信息
			fileUpdate(){	
				const _this=this;							
				ajax({
					type:'PUT',
					url:'file/update',
					data:JSON.stringify(_this.fileList),
					contentType:"application/json;charset=UTF-8"
				}).then(function(res){
					_this.pagecontrol(_this.pages.currentPage,_this.pages.pagesize);
					// console.log(_this.pages.currentPage)
					_this.dialogVisible=false;   
				},function(err){
					// _this.$message.error('列表加载失败');
				})	
			}
			
		},
		//组件创建
		created() {
			this.showall();
			this.fileLists();
			this.pagecontrol(this.pages.currentPage,this.pages.pagesize);
		}
	}
</script>

<style>
	/* comment */
	.delmock{height: 100%;width: 100%;position: fixed;background: rgba(0,0,0,.2);top: 0;left: 0;z-index: 100}
	.delcomment{position: fixed;background: #fff;height: 464px;width:810px;box-shadow: 0 0 10px #ccc;z-index: 100;top: 50%;left: 50%;transform: translate(-50%,-50%)}
	.delcomment-top{background: #f7f7f7;line-height: 36px;padding: 0 12px;}
	.comment-wapper{padding: 16px 30px; }
	.comment-wapper li{padding: 22px 10px 22px 0;border-bottom: 1px solid #d6d6d5;position: relative;}
	.comment-wapper li:first-child{padding-top: 0;}
	.comment-a{color:#f0a56e;padding-right: 18px; }
	.comment-wapper .comment-b{padding-right:50px; }
	.comment-l{color: #a59fa5;}
  .comment-wapper .comment-t{color: #a59fa5;margin-bottom: 10px;}
  .comment-wapper .comment-t .username{color:#3c8be4;}
  .comment-wapper .comment-t .dec-middle{padding: 0 14px;}
	.commentScoll{max-height: 310px;overflow: auto;border-bottom: 1px solid #ccc;margin-top: 20px;margin-bottom: 20px;}
	.commentScoll::-webkit-scrollbar {display: none;/*隐藏滚动条*/}
	.delectCom{position:absolute;right: 12px;color: #f0a56e;top: 20px;cursor: pointer;}
	.page-control1{position: relative;}
	.buttomposi{position: absolute;right: 0;top:6px;font-size: 0;}
	.buttondel{padding: 5px 14px;cursor: pointer;font-size:14px;}
	.delsave{background: #2d8ded;color: #fff;}
	.delclose{background: #efefef;color: #333}
	.padding-r{margin-right: 10px;}
	.comment-wapper .page-control1 .number,.comment-wapper .page-control1 .more{padding-top: 0;border-bottom: none;}
	.noselect{/*禁止选中*/
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		-khtml-user-select: none; /* Konqueror */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently not supported by any browser */
	}
	/* comment end */
	.video-m{min-height: 100%}
	.el-checkbox{margin-right:12px ;}
	.video-all .el-checkbox__input.is-checked .el-checkbox__inner,.video-all .el-checkbox__input.is-indeterminate .el-checkbox__inner{color: #f19149;}
	.move-left{padding-left: 22px;}
	
	
	.m-right .el-input{
		width: 230px;
	}
	
	.table-list{min-width: 410px;padding-left: 20px;}
	.table-des{width: 605px;}
	.table-is{width: 102px;}
	.table-hot{width: 98px;}
	
	.video-img{margin-left:10px;vertical-align: top;width: 144px;height: 80px;position:relative;display: inline-block;}
	.el-checkbox-group{display: inline-block;vertical-align: top;padding-top:35px ;}
	.video-img img{width: 100%;height: 100%;}
	
	.video-m .video-td .el-checkbox__label{display: none;}
	.video-show,.video-time{color:#fff;position: absolute;font-size: 12px;}
	.video-show{padding:2px 5px;top: 0;right: 0;background: #725aca;color: #fff;}
	.video-time{bottom: 4px;right: 5px;padding: 4px;background: rgba(46,46,46,.8);}	
	.video-text{padding:5px 0 5px 10px;font-size: 12px;display: inline-block;width: 220px;}
	.video-text-title{font-size: 14px;color: #333;margin-bottom: 6px;
		overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
	}
	.video-text-dif,.video-text-time{color: #848484;}
	.video-text-time{margin-bottom: 4px;}
	.video-des{font-size: 12px;color:#848484;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;line-height: 20px;padding-right: 70px;text-align: justify;}
	.video-state{color: #848484;font-size: 12px;vertical-align: top;}
	.video-hot{font-size: 12px;color: #9c9c9c;}
	
	.editor{box-shadow: 0 0 15px #ADADAD;-webkit-box-shadow:0 0 15px #ADADAD;}
	.el-select-dropdown__item.selected{color: #f19149;}
	.editor .el-dialog{min-width: 480px;}
	.editor .el-textarea,.editor .el-input{min-width: 328px;width: 328px;}
	.editor .el-textarea__inner{height: 174px;resize: none;}
	
	.editor .lei{margin-bottom: 20px;}
	.editor .editor-span{display: inline-block;margin-right: 16px;width: 30px;}
	.editor .des{vertical-align: top;padding-top: 8px;}
	.el-dialog__footer{padding: 0 18px 12px 0;}
	/*delect*/
	.delect-wapper{width: 100%;height: 100%;background: rgba(0,0,0,.2);position: fixed;top: 0;}
	.delect{position: fixed;left:50%;top: 50%;width: 392px;box-shadow: 0 0 15px #ADADAD;transform: translate(-50%,-50%);background: #fff;}
	.delect-top{background: #e13f2a;color: #fff;height: 40px;line-height: 40px;padding: 0 14px;}
	.delect-text{text-align: center;color: #333;font-size: 18px;padding: 40px 0 32px;}
	.delect-text img{vertical-align: middle;}
	.delect-footer{text-align: right;padding-right: 18px;padding-bottom: 14px;}
	.delect-wapper .el-icon-close{cursor: pointer;color: #bebebc;}
	/*分页*/
	.page-control{text-align: center;margin: 50px 0 70px 0;}
  .page-control .el-pager li.active{background: #f2914a;color: #fff;}
  .page-control .el-pagination--small .btn-next, .el-pagination--small .btn-prev{
    background: #004098;
    color: #fff;
  }
  .page-control .el-pagination button:disabled{background: #d2d2d2;color: #fff;}
  .page-control .btn-prev{margin-right: 10px;}
  .page-control .btn-next{margin-left: 10px;}
</style>