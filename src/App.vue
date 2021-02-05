<template>
  <div id="app">
    	<router-view></router-view>
    <!-- <div class="footer">
    	Copyright©2019 yada.com/gaopu.com ALL Right Reserved.
    </div> -->
  </div>
</template>
<script src="server/ajax.js" type="text/javascript" charset="utf-8"></script>
<script>
export default {
	name: 'App',
	mounted(){
		document.getElementById('appLoading').style.display = 'none';
		function find(str,cha,num){
			var x=str.indexOf(cha);
			for(let i=0;i<num;i++){
				x=str.indexOf(cha,x+1);
			}
			return x;
		}
		
		var url=window.location.href,
			// pathn=window.location.pathname,
			nogo=url.substring(url.lastIndexOf('/')-13,url.lastIndexOf('/')),//获取问卷名
			login=url.substring(url.length-5,url.length),
			urlSlashCount=url.split('/#/').length,//统计‘/’
			rolve=url.substring(url.lastIndexOf('/#/')+3,url.length)
			// console.log(pathn)
			if(url.length>30){
				var	first=find(url,"/",3),
					last=find(url,"/",4)	
				var qrlink=url.substring(first+1,last)
			}

		// if(!localStorage.getItem("username")){
		// 	// window.location.href="/"; //用户没登录跳转登录页面 
		// 	if(nogo=='questionnaire'||qrlink=='linkqr'){
		// 		//正常跳转
		// 		return false;
		// 	}else if(login=="login"){
		// 		return false;
		// 	}else{
		// 		this.$router.push({ path:'/login'  }) //用户没登录跳转登录页面 
		// 		return false;
		// 	}
		// 	return false;
		// 	//  if(rolve=='vmanagement'||rolve=='upload'||rolve=='user'||rolve=='catalogue'||rolve=='survey'||rolve=='surveylist')
		// }
	}
}
</script>
<style lang="scss">
	 @import "../static/scss/common";
</style>
<style>
#app{height:100%;min-height: 100%;overflow: hidden;}
.footer{
	text-align: center;
	font-size: 12px;
	color: #adadad;
	/*position: absolute;
	bottom: 30px;*/
	margin-top: -30px;
	width: 100%;
	bottom: 0;
}
</style>
