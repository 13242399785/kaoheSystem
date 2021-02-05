<template>
	<div class="navlist">
		<div class="auto border-b">
			<router-link v-for='(item,index) in items' :key='index' :to="item.name">
				{{item.content}}
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		name:'navlist',
		data(){
			return{
				items:[
					{name:'vmanagement',content:'文件管理'},
					{name:'upload',content:'上传文件'},
					{name:'user',content:'用户管理'},
					// {name:'role',content:'角色管理'},
					{name:'catalogue',content:'目录管理'},
					{name:'survey',content:'问题答库'},
					{name:'surveylist',content:'问卷管理'},
					// {name:'handle',content:'操作记录'},
				]
			}
		}
	}
</script>

<style>
	.navlist{
		font-size: 20px;
	}
	.navlist a{
		display: inline-block;
		color: #333333;
		margin-top: 12px;
		line-height: 50px;
		margin-right: 68px;
	}
	.navlist a:last-child{margin-right: 0;}
	.navlist .router-link-active{color: #f19149;border-bottom: 4px solid #ec6941;border-bottom-left-radius: 1px;border-bottom-right-radius: 1px;;}
</style>