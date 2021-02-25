<template>
	<div class="login-input">
		<div class="login-wapper">
			<div class="login-list">
				<p class="login-name">账号登录</p>
				<el-input placeholder="请输入用户名" prefix-icon="el-icon-videouser" v-model="username"></el-input>
				<el-input placeholder="请输入密码" prefix-icon="el-icon-videounie65b" type='password'  v-model="userpassword" @keyup.enter.native="login"></el-input>
				<el-radio v-model="radio" class="fl" label="user_max">老师</el-radio>
	  			<el-radio v-model="radio" class="fr" label="user_list">学生</el-radio>
	  			<button class="sub" @click="login">登录</button>		
  			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'login-input',
		data(){
			return{
				username:null,
				userpassword:null,
				radio: localStorage.getItem("userRadio")||'user_max',
				remember:false,
			}
		},
		mounted:function(){
				this.username=localStorage.getItem("username");  
				// this.userpassword=localStorage.getItem("password");
				this.remember = true;
	    }, 
	  	methods: {
		    login() {
		      const that = this;
//		      console.log(that);
		      if (!that.username) {
		        that.$message.error('请输入用户名');
		        return false;
		      }
		      if (!that.userpassword) {
		        that.$message.error('请输入密码');
		        return false;
			  }
			  let params={'LoginId':that.username,'LoginPwd':that.userpassword}
		      this.$api.getLogin(params).then(res=>{
				  console.log(res.data)
					if(res.data.success){
						
						console.log(that.radio)
						if(res.data.user.roleId==3&&that.radio=='user_max'){
							this.$message('当前用户是学生权限，选择学生登录！')
							return false 
						}
						if(res.data.user.roleId!=3&&that.radio=='user_list'){
							this.$message('当前用户是教师权限，选择教师登录！')
							return false 
						}
						localStorage.setItem('sessionId',res.data.token)
						that.$message.success('登录成功！')
						localStorage.setItem("userRadio",that.radio)
						localStorage.setItem("userIds",res.data.user.userId)
						localStorage.setItem("userName",that.username)
						localStorage.setItem("roleId",res.data.user.roleId)
						if(res.data.user.roleId==3){
							this.$router.push({
							　　name: 'teachingStudent', //
							　　params:{
							　　   user:'student'
							　　 }
						　　});
						}else{
							this.$router.push({
							　　name: 'homeTeacher', //
							　　params:{
							　　   user:'teacher'
							　　 }
						　　});
						}
						
					}else{
						that.$message(res.data.msg)
					}
				}).catch((error) => {
					that.$message('操作错误！')
					console.error(error);
				})
		    }
	  }
	}
</script>

<style>
	.login-input .el-radio__input.is-checked .el-radio__inner{background:#fff;border-color: #979797;}
	.el-radio__input.is-checked .el-radio__inner::after{
		background: #f19149;
	}
	.el-radio__inner::after{height: 6px;width: 6px;}
	.login-input .el-radio__input.is-checked+.el-radio__label{color: #333;}
	.login-input .el-input{margin-bottom: 28px;}
	.login-input{height: 344px;width: 450px;background: #fff;border-radius: 8px;position: absolute;
		top: 330px;
		left: 832px;
		padding: 5px;
		text-align: center;
	}
	.login-wapper{
		background: #f5ecf0;
		height: 100%;
		width: 100%;
		border-radius: 8px;
	}
	.login-list{width: 246px;margin: auto;}
	.login-list .fl{float: left;}
	.login-list .fr{margin-right: 0;}
	.login-name{font-size: 18px;color: #333;text-align: center;padding: 35px 0;}
	.sub{font-size: 14px;color: #fff;display: inline-block;padding: 8px 36px;background: #004098;margin-top: 28px;}
	@media screen and (max-width: 800px) {
    .login-input{left:750px;}
	}
</style>