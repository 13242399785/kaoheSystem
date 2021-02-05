<template>
	<div class="user-m">
		<hea :isshow=1></hea>
		<navlist></navlist>
		<div class="auto margin-bot">
			<p class="video-all">用户数量({{userList}})</p>
			<div class="m-top clearfix">
				<div class="m-left fl">
					<el-checkbox >全选</el-checkbox>
					<button class="button-auto">删除</button>
					<button class="button-add margin-l6" @click="dialogVisible=true">添加</button>
				</div>
				<div class="m-right fr">
					
					<el-input
					    placeholder="请输入关键字"
					    suffix-icon="el-icon-search"
					    >
					  </el-input>
				</div>
			</div>
			<!--table-->
			<table class="clearfix video-table" width="100%" border="0">
				<tr class="th">
					<th class="table-id">编号</th>
					<th class="table-name">用户登录名</th>
					<th class="table-password">登录密码</th>
					<th class="table-permissions">权限</th>
					<th class="table-create">创建人</th>
					<th class="table-createtime">创建时间</th>
					<th class="table-altertime">修改时间</th>
					<th class="table-dom">操作</th>
				</tr>
				<tr class="video-td video-td80" v-for="(user,index) in allUser" :key=index>
					<td>
						<el-checkbox>{{index+1}}</el-checkbox>
					</td>
					<td>{{user.loginname}}</td>
					<td>{{user.password}}</td>
					<td>{{user.usertype}}</td>
					<td>{{user.username}}</td>
					<td>{{format(user.inserttime)}}</td>
					<td>{{format(user.updatetime)}}</td>
					<td>
						<div class="video-control">
							<el-button type="text" @click='editor(user.id,user.loginname,user.password,user.role,user.inserttime,user.updatetime,user.usertype)'>编辑信息</el-button>
							<div  class="video-control-top">
							</div>
							<el-button type="text" @click="takeid(user.id)">删除</el-button>
						</div>
					</td>					
				</tr>				
			</table>
		</div>
		<!--adduser-->
		<div class="editor1">
			<el-dialog
			  title="编辑信息"
			  :visible.sync="dialogVisible"
			  class="body-padding"
			  width="30%"
			  >
			  <p><span class="editor1-span1">用户登录名</span> <el-input v-model="addu.loginname" class='max-width' placeholder="不超过20字" maxlength=20></el-input></p>
			  <p class="lei"><span class="editor1-span1">初始密码</span>
			  	<el-input v-model="addu.password" class='max-width' placeholder="不超过20字" maxlength=20 ></el-input>
			  </p>
			  <p><span class="editor1-span1">用户权限</span> 
			  	<el-select class='max-width' v-model="addu.role" placeholder="请选择" @change="addEditor">
			    	<el-option v-for="(item,index) in option" :key=index :label='item.label' :value='item.name'></el-option>
			    </el-select>
			  </p>
			  <span slot="footer" class="dialog-footer">
			  	<el-button class="cancel" type="primary" @click="addUser">保存</el-button>
			    <el-button class="save" @click="dialogVisible = false">取 消</el-button>    
			  </span>
			</el-dialog>
		</div>
		<!--adduser End-->
		<!--editoruser-->
		<div class="editor1">
			<el-dialog
			  title="编辑信息"
			  :visible.sync="dialogVisible1"
			  class="body-padding"
			  width="30%"
			  >
			  <p><span class="editor1-span1">用户登录名</span> <el-input v-model="editoru.loginname" class='max-width' placeholder="不超过20字" maxlength=20></el-input></p>
			  <p class="lei"><span class="editor1-span1">初始密码</span>
			  	<el-input v-model="editoru.password" class='max-width' placeholder="不超过20字" maxlength=20 ></el-input>
			  </p>
			  <p><span class="editor1-span1">用户权限</span> 
			  	<el-select class='max-width' v-model="editoru.usertype" placeholder="请选择" @change="controlEditor">
			    	<el-option v-for="(item,index) in option" :key=index :label='item.label' :value='item.name'></el-option>
			    </el-select>
			  </p>
			  <span slot="footer" class="dialog-footer">
			  	<el-button class="cancel" type="primary" @click="editorc">保存</el-button>
			    <el-button class="save" @click="dialogVisible1 = false">取 消</el-button>    
			  </span>
			</el-dialog>
		</div>
		<!--editoruser End-->
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
					<el-button type="primary" @click="(delUser(userId))">确定</el-button>
					<el-button @click="delectH">取消</el-button>
				</div>
			</div>
		</div>
		<!--delect end-->
	</div>
</template>

<script>
	import ajax from '@/server/ajax.js'
	import hea from './header'
	import navlist from './nav'
	export default{
		name:'upload',
		components:{
	    	hea,
	    	navlist
	   },
	   data(){
	   	return{
	   		// toptitle:'文件发布系统',
	   		delectShow:false,
	   		userId:'',
	   		dialogVisible: false,
	   		dialogVisible1:false,
	   		allUser:"",
	   		loginPasworld:'',
	   		loginName:'',
				 name:'',
				 userList:'',
	   		option:[
	   			{name:'超级用户',label:'超级权限'},
	   			{name:'普通用户',label:'普通权限'}
	   		],
	   		addu:{
				id: '',
				inserttime:'',
				loginname: "",
				password: '',
				rightid: 0,
				role: "",
				telno: 0,
				updatetime:'',
				username: "",
				usertype: ""
			},
			editoru:{
				id: '',
				inserttime:'',
				loginname: "",
				password: '',
				rightid: 0,
				role: "",
				telno: 0,
				updatetime:'',
				username: "",
				usertype: ""
			},
			repUser:[],//user名字集合
	   	}
	   },
	   mounted(){
	   		this.showUser();
	   },
	   methods:{
	   	//显示所有用户
	   	showUser(){
	   		const _this=this;

	   		ajax({
	   			url:'user/list',
	   		}).then(function(res){
					 _this.allUser=res.result
					 _this.userList=res.result.length;
				console.log(_this.allUser)
	   		},function(err){
	   			// _this.$message.error('列表加载失败');
	   		})
	   	},
	   	//编辑用户
	   	editor(id,loginname,password,role,inserttime,updatatime,usertype){				 
	   		const _this=this;
	   		_this.editoru.id=id;	   		
	   		_this.editoru.loginname=loginname;
	   		_this.editoru.password=password;
	   		_this.editoru.inserttime=inserttime;	   		
			_this.editoru.usertype=usertype;
			// console.log(_this.editoru.usertype)
			_this.editoru.username=localStorage.getItem("username");
	   		_this.editoru.updatetime=this.CurentTime();	   		
	   		// _this.editoru.username=username;	   		
	   		_this.dialogVisible1=true;   
				 // console.log(_this.editoru.role)	
				//  console.log(this.editoru)	
	   	},
	   	editorc(){
			const _this=this;   
	   		ajax({
	   			type:'PUT',
	   			url:'user/update',
	   			data:JSON.stringify(_this.editoru),
	   			contentType:"application/json;charset=UTF-8"
	   		}).then(function(res){
	   			_this.showUser();
	   			// console.log("修改成功")
	   			_this.dialogVisible1=false;   
	   		},function(err){
	   			_this.$message.error('err');
	   		})
	   	},
	   	//添加用户
	   	addUser(id){
				 const _this=this;
				 this.addu.updatetime=this.CurentTime();
				 _this.addu.username=localStorage.getItem("username");
				 console.log(this.addu)
			   // console.log(_this.userId)
			   if(_this.addu.loginname==""||_this.addu.password==""){
					_this.$message.error('用户名和密码不能为空！');
				}else if(this.addu.usertype==''){
				   this.$message.error('权限不能为空!');
			   }else{
				   _this.dialogVisible=false;
					ajax({
						type:'POST',
						url:'user/add',
						data:JSON.stringify(_this.addu),
							contentType: "application/json;charset=UTF-8"
					}).then(function(res){
						_this.showUser();
						
					},function(err){
						// _this.$message.error('列表加载失败');
					})
			   }
			//    if(this.addu.usertype==''){
			// 	   this.$message.error('权限不能为空!');
			//    }else{
			// 	   if(_this.addu.loginname==""||_this.addu.password==""){
			// 			_this.$message.error('用户名和密码不能为空！');
			// 		}else{
			// 			_this.dialogVisible=false;
			// 			ajax({
			// 				type:'POST',
			// 				url:'user/add',
			// 				data:JSON.stringify(_this.addu),
			// 					contentType: "application/json;charset=UTF-8"
			// 			}).then(function(res){
			// 				_this.showUser();
							
			// 			},function(err){
			// 				// _this.$message.error('列表加载失败');
			// 			})
			// 		}
			//    }	   					   		
	   	},
	   	takeid(num){
	   		this.delectShow=true;
	   		this.userId=num;
	   		// console.log(this.userId)//拿到id值
		},
		controlEditor(num){
			this.editoru.usertype=num;
		},
		addEditor(num){
			this.addu.usertype=num;	
		},
	   	//删除用户
	   	delUser(num){
			   console.log(num)
	   		const _this=this;
	   		_this.delectShow=false;
	   		ajax({
	   			type:'DELETE',
	   			url:'user/deluser?id='+num,
	   		}).then(function(res){
	   			_this.showUser();
		        // console.log(_this.allUser)
	   		},function(err){
	   			_this.$message.error('删除失败，您没有这个权限');
	   		})
	   	},
	   	 delectH(){
	      	this.delectShow=false     
		  },
		  //当前时间
		CurentTime()
		{ 
			var now = new Date();
			// var year = now.getFullYear();       //年
			// var month = now.getMonth() + 1;     //月
			// var day = now.getDate();            //日
			
			// var hh = now.getHours();            //时
			// var mm = now.getMinutes();          //分  
			// var clock = year + "-";  
			// if(month < 10)
			// 		clock += "0";    
			// clock += month + "-";      
			// if(day < 10)
			// 		clock += "0";           
			// clock += day;
			// if(hh < 10)
			//     clock += "0";  
			// clock += hh + ":";
			// if (mm < 10) clock += '0'; 
			// clock += mm; 
			
			return(now); 
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
		  
	   },
	   
	}
</script>

<style scoped="scoped">
	.user-m{min-height: 100%;}
	.table-id{width: 104px;}
	.table-name{width:134px;}
	.table-password{width: 166px;}
	.table-permissions{width: 190px;}
	.table-create{width: 148px;}
	.table-createtime{width: 252px;}
	.table-altertime{width: 220px;}
	.editor1 .editor1-span1{display: inline-block;width: 90px;margin-right: 0;}
	.editor1 .el-select,.editor1 .el-textarea, .editor1 .el-input,.editor1 .el-select .el-input .el-input__inner{min-width: 288px;width: 288px;}
	.editor1 .el-input{min-width: 288px;width: 288px;}
	.editor .editor-span1,.editor .editor-span{font-size: 14px;}
	/*delect*/
	.delect-wapper{width: 100%;height: 100%;background: rgba(0,0,0,.2);position: fixed;top: 0;}
	.delect{position: fixed;left:50%;top: 50%;width: 392px;box-shadow: 0 0 15px #ADADAD;transform: translate(-50%,-50%);background: #fff;}
	.delect-top{background: #e13f2a;color: #fff;height: 40px;line-height: 40px;padding: 0 14px;}
	.delect-text{text-align: center;color: #333;font-size: 18px;padding: 40px 0 32px;}
	.delect-text img{vertical-align: middle;}
	.delect-footer{text-align: right;padding-right: 18px;padding-bottom: 14px;}
	.delect-wapper .el-icon-close{cursor: pointer;color: #bebebc;}
</style>