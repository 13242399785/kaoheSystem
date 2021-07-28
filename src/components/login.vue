<template>
  <div class="login">
  	<!--header-->
  	<hea :Toptitle=uploadSystem></hea>
  	<div class="bg">
  		<div class="auto">
  			<img src="../images/working_with_computer.png" class="bg-img"/>
  			<log></log>
  		</div>
  	</div>
  </div>
</template>

<script>
import hea from './header'
import log from './login_input'
export default {
  name: 'Login',
  data () {
    return {
     uploadSystem:"文件发布系统"
    }
  },
  components:{
  	hea,
  	log
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

	#app,.login{height: 100%;min-height: auto;}
	.login{overflow-y: hidden;}
.bg{
	height: 100%;
	width: 100%;
	background: #fcd6d1;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to top, #cecce9, #fcd6d1);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to top, #cecce9, #fcd6d1); 
}
.auto{height: 100%;}
.bg-img{
	/* position: absolute; */
	margin-top: 10%;
	left: 0px;
	width: 54%;
}
@media screen and (max-width: 1240px) {
			/* html,body{height: auto;} */
			.login{overflow-y: none;}
			.footer{margin-top: 20px;}
	}
</style>
