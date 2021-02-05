<template>
	<div class="handle">
		<hea :isshow=1></hea>
		<navlist></navlist>
		<div class="auto">
			<p class="video-all">用户数量(4)</p>
			<div class="m-top clearfix">
				<div class="m-left fl">
					<el-checkbox >全选</el-checkbox>
					<button class="button-auto">删除</button>
				</div>
				<div class="m-right fr">
					
					<span class="list-b">操作内容 <i class="el-icon-arrow-down"></i>
						<ul class="show-list">
							<li class="show-active">全部</li>
							<li>流量控制类</li>
							<li>流量控制类</li>
							<li>流量控制类</li>
						</ul>
					</span>
					<span class="list-b move-middle">操作对象 <i class="el-icon-arrow-down"></i>
						<ul class="show-list">
							<li>全部</li>
							<li>最近上传</li>
							<li>最多播放</li>
						</ul>
					</span>
					<!--date-->
					 <el-date-picker
				      v-model="dates"
				      type="daterange"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      default-value="2010-10-01"
				      class="dates">
				    </el-date-picker>
					<!--data end-->
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
					<th class="table-id2">编号</th>
					<th class="table-name2">操作用户名称</th>
					<th class="table-permissions2">操作对象</th>
					<th class="table-create2">操作内容</th>
					<th class="table-createtime2">操作时间</th>
					<th class="table-dom2">操作</th>
				</tr>
				<tr class="video-td video-td80">
					<td>
						<el-checkbox>1</el-checkbox>
					</td>
					<td>曾小全</td>
					<td>曾小全</td>
					<td>曾小全</td>
					<td>2018-02-15 14:15:20</td>
					<td>
						<div class="video-control">
							
							<el-button type="text" >删除</el-button>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import hea from './header'
	import navlist from './nav'
	export default{
		name:'handle',
		components:{
	    	hea,
	    	navlist
	    },
	    data(){
	    	return {
	    		toptitle:'文件发布系统',
	    		dates: '',
	    		
	    	}
	    },
	    methods:{
	    	
	    }
	}
</script>

<style>
	.table-id2{width: 138px;}
	.table-name2{width:214px;}
	.table-permissions2{width: 382px;}
	.table-create2{width: 256px;}
	.table-createtime2{width: 220px;}
	.table-dom2{width: 108px;}
	.m-right .el-input{
		width: 230px;
	}
	.m-right .dates {vertical-align: top;padding: 0 15px;margin-right: 36px;}
</style>