<template>
	<div class="videolist">
		<hea :isshow=1></hea>
		<div class="auto">
			<div class="list-top border-b">{{toptitle}}</div> 
			<div class="m-top clearfix">
				<div class="m-left fl">
					<span class="video-num">文件数量({{video.length}})</span>
					<!-- <router-link to="/echartlist"><span class="fenxi">查看分析</span></router-link>  -->
				</div>
				<div class="m-right fr">
					<!-- 文件类型 -->
					<span class="list-b move-middle">类型 <i class="el-icon-arrow-down"></i>
						<ul class="show-list">
							<li :class="{show_active:!typeActive}"  @click="typeAlls">全部</li>
							<li v-for="(type,index) in fileTypeList" :key="index" :class="{show_active:index==typeNowindex}" @click="typeShow(type.id,index,type.type)">{{type.typename}}</li>
						</ul>
					</span>	
					<!-- 分类组件 -->
					<listclass :message="selectFile" :pages='pages' :pagecontrol="pagecontrol" :fileList="fileList" :listShow="listShow"></listclass>

					<span class="list-b move-middle">操作对象 <i class="el-icon-arrow-down"></i>
						<ul class="show-list">
							<li :class="{show_active:!listActive}" @click="showAlls">全部</li> 
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
			<!-- 没有文件事显示 -->
			<div class="notfile" v-show="total<=0">
				还没有文件呢，赶紧联系管理员添加吧！
			</div>
			<div class="list-all">
				<ul class="clearfix">
					<li v-for="(list,index) in video" :key='index'>					
						<div class="list-wapper">
							<div class="list-img">
								<img :src="srcCotrol(list)"/>
								<!-- <span class="type">清晰度</span> -->
								<!-- <span class="time">时长</span> -->
								<!-- <div class="mock" @click="showPlay(list)"> -->
								<div class="mock" @click="showPlay(list)">
									
								</div>
								<span class="mockdown mockdownl" @click="down(list)"><i class="el-icon-videoxiazai"></i>下载</span>
								<span class="mockdown mockdownr" @click="upqr(list)"><i class="el-icon-videofenxiang"></i>分享</span>
							</div>
							<div class="list-tile">{{video[index].name}}</div>
							<div class="list-bottom clearfix">
								<span class="list-list fl"><i class="el-icon-view"></i> {{video[index].click?video[index].click:0}}</span>
								<span class="list-time fr">{{format(video[index].inserttime)}}</span>
								<span><i class="el-icon-videoxiaoxi"></i> {{list.comment}}</span>
							</div>
						</div>				
					</li>
				</ul>
			</div>
			
			<!-- 组件page -->
			<!-- <page :total="total" :pageSize="pages.pagesize" @hand="handleCurrentChange"></page> -->

			<!-- page -->
			<div class="page-control clearfix" v-show="pagelist.length>18">
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
		<!--QR-->
		<div class="qrCode" v-show="showqr" id="target">
					<p class="qrdowload" ><span v-show="nomp4">手机扫描下载查看</span><span v-show="!nomp4">手机扫描在线观看</span><i class="el-icon-error fr" @click="qrHidden"></i></p>
	        <canvas id="canvas" ref="canva"></canvas>
					<p class="downqr" @click="downImg">下载二维码</p>
	    </div> 
	</div>
</template>

<script>
	import server from '@/server/server.js'
	import qrcode from 'qrcode';
	import ajax from "@/server/ajax.js";
	import control from "@/server/control.js";
	import hea from './header'
	import navlist from './nav'
	import page from './page/page'
	import listclass from './listclass/listclass'
	export default{
		name:'handle',
		components:{
	    	hea,
	    	page,
				navlist,
				listclass
	   },
	   data(){			 
	   	return{
				// comment:'',
	   		toptitle:'文件列表',
	   		video:[{}],
	   		pagelist:[{name:1},{id:2}],
	   		download:{
	   			path:'',
	   			name:''
	   		},
	   		pages:{
	   			currentPage:1, //初始页
      		pagesize:24,   //每页的数据
	   		},
	   		showqr:false,
	   		qrSrc:'dfs',  		 	
				userList: [],
				options:[],//分类
				options1:[],//第二层
				options2:[],//第三层
				options3:[],//第四层
				total:0,
				currentPage4: 4,
				//分类显示
				listShow:{
					dirid:0,
					page:1,
					size:14
				},
				nowIndex:-1,
				listActive:false,
				searchName:'',//搜索
				//评论数
				allComment:'',
				Parameters:{
					fileid:'',//文件id
					page:1,  //当前页码
					size:10  //每页显示评论条数
				},
				showlazy:true,//最多接口
				showlazy1:true,
				showmore:true,//最近接口
				showmore1:true,
				
				downqr:'',//图片地址
				downimgname:'',//图片
				play:{
					click:'',//点击数
					surl:'',
					filepic:'',
					description:'',
					name:'',
					inserttime:'',
					inseryby:'',
				},
				controlClassify:0,//记录当前选择的分类
				fileTypeList:'',
				typeActive:false,
				nomp4:true,
				typeNowindex:-1,
				selectFile:{//总数据
					id:'',
					type:'',
					name:'',
					page:1,
					size:24
				},
				fileList:{
					name:'',
					filedirectoryid:0,
					description:"",
					id:0	
				},
			}
								 
		 },
		 watch:{
			 
		 },
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
				this.selectFile.type='';//文件类型
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
				//全部分类
			showallList(){
				this.selectFile.id='';
				this.listActive=false;
				this.showmore=true;
				this.showlazy=true;
				this.nowIndex=-1
				this.pagecontrol(this.pages.currentPage,this.pages.pagesize);
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
			 },
			 //显示所有
			showAlls(){
				this.selectFile.id='';
				this.selectFile.name='';
				this.selectFile.type='';
				this.listActive=false;
				this.showmore=true;
				this.showlazy=true;
				this.nowIndex=-1;
				// console.log(this.pagelist)
				this.pagecontrol(this.pages.currentPage,this.pages.pagesize);
			},
			 //分类id
			selectOne(value){
				this.fileList.dirid=value;

			},

		showPlay(list){
			const _this=this;
			var id=list.id;
			var path=list.path;//地址
			var name=list.name;//文件名
			var dec=list.description;//描述
			var length=path.length;//
			var type=list.filetype//
			var time=list.inserttime;
			var click=list.click,
					pointerImg=list.filepic;
			_this.play.surl=list.path;
			// console.log(list)
			ajax({
				type:'GET',
		   		url:'file/sumclick',
		   		data:{fileid:id},
		   		// contentType:"application/json;charset=UTF-8"
		   	}).then(function(res){
		   		// console.log('得到所有的')
		   	})
			//跳转路由
			
			if(type=='.mp4'){
				this.$router.push({name:'play',params:{id:id,name:name,src:path,dec:dec,inserttime:time,click:click,pointerImg:pointerImg,type:type,}})	
			}else{
				this.$router.push({name:'filedetail',params:{id:id,name:name,src:path,dec:dec,inserttime:time,type:type,click:click}})
				// setTimeout(function(){
				// 	ajax({
				//    		url:'file/sumclick',
				//    		data:JSON.stringify({"fileid":id}),
				//    		contentType:"application/json;charset=UTF-8"
				//    	}).then(function(res){
				//    	})
				// },200)		
			}
		},
		//缩略图
		srcCotrol(list){

			var type=list.filetype
			var src=list.filepic;
			//不同文件给图片
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
			return y+'-'+this.add0(m)+'-'+this.add0(d);
		},
		//二维码生成
		upqr(list){
			let canvas = document.getElementById('canvas');
			// console.log(list)
			if(list.filetype=='.mp4'){
				this.nomp4=false
			}else{
				this.nomp4=true;
			}
			var _this=this,
			  	path=list.path,
					type=list.filetype;
					// _this.qrSrc="http://"+control.ip+":"+server.port+"/file/downloads/?path="+path+"&type="+type+"" 
					//修改
					this.qrSrc="http://"+control.ip+":"+control.port+"/#/linkqr/"+list.id;
					this.$router.push({name:'linkqr',params:{id:list.id}})

					// console.log(this.qrSrc)    
			_this.showqr=true;
			qrcode.toCanvas(canvas, _this.qrSrc, function (error) {
					if (error) console.error(error)

			})
			// qrcodejs(canvas,_this.qrSrc)
			this.downqr=canvas.toDataURL("image/png");//canvas得到图片地址
			this.downimgname=list.name;
		},
		//下载二维码
		downImg(){
			var alink = document.createElement("a");
			alink.href = this.downqr;//图片地址
			alink.download = this.downimgname;//图片名
			alink.click();
			// console.log(this.downqr)
		},
		qrHidden(){//二维码隐藏
			this.showqr=false;
		},
		//下载
		down(list){
			var _this=this,
					path=list.path,
					name=encodeURI(list.name),
					type=list.filetype;
			_this.qrSrc="http://"+server.ip+":"+server.port+"/file/downloads/?path="+path+"&type="+type+"&filenames="+name
			// console.log(this.qrSrc)
      		window.open(_this.qrSrc)//打开下载网址
		},
	   	showall(){//展示所有
				 const _this=this;

	   		ajax({
	   			url:'file/filelist',
	   		}).then(function(res){
	   			_this.userList=res;
					_this.pagelist=res.result;
					// console.log(_this.pagelist)

	   		},function(err){
	   			_this.$message.error('列表加载失败');
	   		})
	   	},
	   	//分页展示
   		pagecontrol(pageCode,pagesize){
				 var _this=this;
				 if(_this.showmore==false){//最近上传分页	
				 	// console.log(_this.showmore)
					ajax({
						url:'file/selectBydesc',
						data:{page:pageCode,size:pagesize}
					}).then(function(res){
						// var arr=_this.lately.filter(function(item){//遍历查找上传的文件
						// 	return item.click>5;
						// })
						// var arr1=_this.lately.slice(0,18);//返回前十条
						_this.video=res.result.list;
						_this.total=res.result.total
						_this.showmore=true
						_this.showmore1=true
						_this.showlazy1=false
						// _this.showlazy=false
					})					
				}else if(_this.showlazy==false){//最多查看分页
					// console.log(_this.showmore)
					ajax({
						url:'file/selectByClick',
						data:{page:pageCode,size:pagesize}
					}).then(function(res){
						_this.video=res.result.list;
						_this.total=parseInt(res.result.total) 
						_this.total=res.result.total
						// _this.showmore=false
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
						_this.total=parseInt(res.result.total) 
						_this.total=res.result.total
						
					})
				}	
		   },

	      handleCurrentChange(val) {
					var _this=this;
					this.selectFile.page=val;
	        this.pagecontrol(val, _this.pages.pagesize);
				},
				//评论数
				getnum(){
					return 33;
				},
				getComment(id){
					const _this=this;
					_this.Parameters.fileid=id;
					ajax({
								url:'comment/pageforComment',
								data:_this.Parameters,
								// contentType: "application/json;charset=UTF-8"
							}).then(function(res){
								_this.allComment=res.result.total
								// console.log(_this.allComment)
								return _this.allComment;
							},function(err){
								// _this.$message.error('列表加载失败');
							})
				}
	   },
	   
		//pageSize改变时触发的函数
		// handleSizeChange(val) {
		//     this.pagecontrol(this.pages.pageCode, val);
		// },
		//当前页改变时触发的函数
		// handleCurrentChange(val) {
		//     this.pagecontrol(val, this.pages.pageSize);
		// },
		mounted(){
			// this.getComment(this.Parameters.fileid)
		},
	  created() {
			this.showall();//显示全部
			this.pagecontrol(this.pages.currentPage,this.pages.pagesize);//分页显示
			this.fileType();
	  }
	}
</script>

<style>
	.videolist{min-height: 100%;}
	
	.video-num{color: #f29248;font-size: 14px;}
	.list-all{min-width: 1310px;}
	.list-all li{position: relative;}
	
	
	.list-all li{font-size:0;display:inline-block;width: 200px;margin-right: 22px;overflow: hidden;margin-bottom: 24px;}
	.list-all li:nth-of-type(6n){margin-right: 0;}
	.list-img{width: 100%;height: 110px;overflow: hidden;position: relative;font-size: 12px;}
	.list-img .mock{height: 100%;width: 100%;background: rgba(0,0,0,.5);position: absolute;top: -100%;left: -100%;transition: all ease .5s;cursor: pointer;}
	.list-img .mockdown{transition: all ease .5s;position: absolute;cursor: pointer;font-size: 14px;color: #fff;top: 44px;z-index: 99;}
	.mockdownl{left:-100%; }
	.mockdownr{right:-100%; }
	.list-img:hover .mock{
		top:0;
		left: 0;
	}
	.list-img:hover .mockdownl{left:30px;}
	.list-img:hover .mockdownr{right:30px;}
	.list-img img{width: 100%;}
	.list-img .type{position: absolute;top: 0;background: rgba(0,0,0,.2);padding: 2px 6px;right: 10px;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;color: #c8ad68;}
	.list-img .time{position: absolute;bottom: 6px;right: 10px;background: rgba(124,124,124,0.8);color: #fff;padding: 2px 5px;}
	.list-all .list-tile{font-size: 16px;color: #333;margin: 6px 0 8px 0;overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;}
	.list-all .list-bottom{font-size: 14px;color: #c0c0c0;text-align: center;overflow: hidden;white-space: nowrap;text-overflow: hidden;}
	.list-bottom .el-icon-videoxiaoxi{vertical-align: top;}
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