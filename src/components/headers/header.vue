<template>
	<div class="header-wapper">
		<div class="header border-b">
			<div class="auto clearfix">
				<div class="header-left fl">
					<img class="logo-img" src="../../images/logo.png" width="200" height="46" />
					<!-- <img class="img-mar" src="../images/video.png" width="56" height="40" /> -->
					<span style="padding-left:12px;">{{Toptitle}}</span>
				</div>
				
				<div v-show="isshow" class="header-right fr">
					<div class="header-m">
						<span :class="nowUrl.indexOf(item.nowtext)>-1?'active-s':''" v-for='(item,index) in navList' :key='index' @click="goRoter(item.name)">
							{{item.content}}
						</span>
						<!-- <ul>
							<li v-for='(item,index) in navList' :key='index' :to="item.name">{{item.content}}</li>
						</ul> -->
					</div>
					
					<!-- <span class="unlogin" v-show="unlogin" @click="removeS"><router-link to="/login">退出登录</router-link></span> -->

					<span class="info-list" v-if="false"></span>
					<div class="user-control" @click="quit">
						<span class="user-name">{{username}}</span>
						<img src="../../images/user.jpg" height="31" width="31" class="user-img"/>
						<i class="el-icon-caret-bottom"></i>
						<div class="loout">
							<!-- <p>使用教程</p> -->
							<!-- <p @click="goAbout">关于我们</p> -->
							<p @click="loginOut">退出登录</p>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<div class="mar-header"></div>
	</div>
</template>

<script>
	export default{
		name:'hea',
		data(){
			return{
				user:false,
				unlogin:false,
				Toptitle:"智能制造数字孪生仿真与调试系统",
				username:localStorage.getItem('userName'),
				navList:[
					{name:'homeTeacher',text:'/home/teacher',nowtext:'home',content:'首页'},
					{name:'teachingTeacher',text:'/teaching/teacher',nowtext:'teaching',content:'教学系统'},
					{name:'trainingTeacher',text:'/training/teacher',nowtext:'training',content:'实训系统'},
					{name:'competitionTeacher',text:'/competition/teacher',nowtext:'competition',content:'竞赛系统'},   
					{name:'management',text:'management',nowtext:'management',content:'后台管理'}, 
					// {name:'teachingStudent',text:'/teaching/student',nowtext:'teaching',content:'教学系统'},
					// {name:'trainingStudent',text:'/training/student',nowtext:'training',content:'实训系统'},
					// {name:'competitionStudent',text:'/competition/student',nowtext:'competition',content:'竞赛系统'},
				],
				nowUrl:''
			}
		},
		watch:{
			'$router.path':function(newVal,oldVal){
				console.log(newVal+"---"+oldVal);
				// if(newVal === '/login'){
				console.log('欢迎进入登录页面');
				// } else if(newVal === '/register'){
				// console.log('欢迎进入注册页面');
				// }
			}
		},
		props:['isshow'],//传输是否显示用户，标题头的名称
		created(){
			let nowUser=this.$route.params.user
			
		},
		mounted(){
			this.nowUrl=this.$route.path
			// console.log(this.$route.path)
		},
		methods:{
			quit(){
				this.unlogin=!this.unlogin;
			},
			removeS(){
				localStorage.removeItem("userRadio")
				localStorage.removeItem("userIds")
			},
			loginOut(){
				this.$router.push({name:'login'});
			},
			goRoter(name){
				console.log(this.nowUrl)
				this.$router.push({name:name})
			}
		}
	}
</script>
<style lang="scss">
	.header-m{
		span{
			margin-right: 40px;
			cursor: pointer;
			color: #222;
		}
		.router-link-active{color: #f19149;border-bottom-left-radius: 1px;border-bottom-right-radius: 1px;;}
		ul{
			display: flex;
			padding-right: 100px;
			li{
				margin-right: 40px;
				cursor: pointer;
			}
		}
		.active-s{
			color: #f19149;border-bottom-left-radius: 1px;border-bottom-right-radius: 1px;
		}
	}
	.user-control{cursor: pointer;position: relative;}
	.loout{
      height: 0;
      overflow: hidden;
      opacity: 0;
      top: 31px;
      z-index: 99;
      right: 0;
      transition: all ease 0.5s;
      position: absolute;
      width: 150px;
      line-height: 0;
      text-align: center;
      background: #ffffff;
      cursor: pointer;
      color: #222;
      p{
        font-size: 14px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 0;
        padding: 10px 20px;
        cursor: pointer;
      }
      p:last-child{
        border-bottom: none;
      }
      p:hover{   
        background: #f1f1f1;
      }
    }
    .user-control:hover .loout{
      height: auto;
      line-height: 40px;
      opacity: 1;
      border: 1px solid #ccc;
    }
</style>
<style>
	.header{
		height: 60px;
		width: 100%;
		position: absolute;
		top: 0;
		background: #fff;
		z-index: 999;
	}
	.mar-header{height: 60px;}
	.header-left{
		font-size: 0;
		color: #585858;
		height: 100%;
	}
	.img-mar{margin: 11px 24px 0px 30px;}
	.header-left span{
		font-size: 24px;
		color: #585858;
		line-height: 60px;
	}
	.header-left span,.header-left img{vertical-align: top;}
	.header-right{margin-top: 12px;position: relative;display: flex;align-items: center;}
	.header-right .el-icon-caret-bottom{color: #f19149;font-size: 20px;}
	.info{vertical-align: top;color: #585858;padding-right: 25px;}
	.info-list{height: 13px;width: 13px;background: #e60012;border-radius: 50%;display: inline-block;position: absolute;left: 15px;top:5px;}
	
	.unlogin{font-size: 14px;background: rgba(0,0,0,0.3);padding:5px 12px;position: absolute;right: 0px;top:32px;}
	.unlogin a{color: #fff;}
	.user-img{vertical-align: middle;border-radius: 50%;}
	.user-name{font-size: 18px;color: #585858;}
</style>