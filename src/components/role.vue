<template>
	<div class="role">
		<hea :isshow=1></hea>
		<navlist></navlist>
		<div class="auto">
			<p class="video-all">用户数量(4)</p>
			<div class="m-top clearfix">
				<div class="m-left fl">
					<el-checkbox >全选</el-checkbox>
					<button class="button-auto">删除</button>
					<button class="button-add margin-l6" @click="roleTop=true">添加</button>
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
					<th class="table-id1">编号</th>
					<th class="table-name1">角色名称</th>
					<th class="table-permissions1">权限详情</th>
					<th class="table-create1">创建人</th>
					<th class="table-createtime1">创建时间</th>
					<th class="table-altertime1">修改时间</th>
					<th class="table-dom1">操作</th>
				</tr>
				<tr class="video-td video-td80">
					<td>
						<el-checkbox>1</el-checkbox>
					</td>
					<td>曾小全</td>
					<td><span class="detial">权限详情</span></td>
					<td>曾小全</td>
					<td>2018-02-15 14:15:20</td>
					<td>2018-02-15 14:15:20</td>
					<td>
						<div class="video-control">
							<el-button type="text" @click="roleTop=false">编辑信息</el-button>
							<div  class="video-control-top">
								
							</div>
							<el-button type="text">删除</el-button>
						</div>
					</td>
				</tr>
			</table>
			<!-- table end -->
		</div>
		<div class="role-wapper" v-show="roleControl">
			<div class="role-control">
				<div class="role-top"><span v-if="roleTop">添加角色</span>  <span v-else>编辑角色</span><i class="el-icon-error fr" @click="roleControl=false"></i></div>
				<div class="role-content scrollbarhidden">
					<div class="juesename">
						<span class="rolename">角色名称:</span>
						<input type="text" placeholder="请输入名称" class="mingc">
					</div>
					<div class="jueserole">
						<span class="rolename">角色权限:</span>
						<div class="roletree">
							<el-tree
							:data="data"
							show-checkbox
							node-key="id"
							ref="tree"
							:default-checked-keys="checkedOn"
							:props="defaultProps">
							</el-tree>
						</div>
					</div>		
				</div>
				<div class="role-button">
					<el-button type="primary" @click="getCheckedKeys">确认</el-button>
					<el-button @click="roleControl=false">取消</el-button>
				</div>	
			</div>	
		</div>
	</div>
</template>

<script>
	import hea from './header'
	import navlist from './nav'
	import server from '@/server/server.js'
	import ajax from "@/server/ajax.js";
	export default{
		name:'role',
	    components:{
	    	hea,
	    	navlist
	    },
	    data() {
			return {
				roleControl:true,
				data:[],
				defaultProps: {
					children: 'childList',
					label: 'name'
				},
				roleTop:true,
				checkedOn:[2],
				checkedSet:[]
			};
		},
		created(){
			this.getTree();
		},
		methods:{
			//获取目录结构
			getTree(){
				const _this=this;
				ajax({
					url:'filedirectory/tree',
				}).then(function(res){
					// console.log(res)
					_this.data=res;
				})
			},
			getCheckedKeys(){//选中的目录id数组
				console.log(this.$refs.tree.getCheckedKeys());
			},
			setCheckedKeys(){//设定目录的选中
				this.$refs.tree.setCheckedKeys(checkedSet);
			},
		}
	}
</script>

<style>
	.table-id1{width: 138px;}
	.table-name1{width:204px;}
	.table-permissions1{width: 190px;}
	.table-create1{width: 207px;}
	.table-createtime1{width: 252px;}
	.table-altertime1{width: 220px;}
	.table-dom1{width: 108px;}
	.detial{border-bottom: 1px solid #00409a;color: #00409a;cursor: pointer;display: inline-block;line-height: 22px;}
	.role-wapper{position: fixed;height: 100%;width: 100%;top: 0;left: 0;background: rgba(0,0,0,.3)}
	.role-top{background:#f1f1f1;color: #333;padding: 10px 8px;font-size: 14px;}
	.role-control{position: fixed;width:400px;left: 50%;top: 50%;transform: translate(-50%,-50%);box-shadow: 0 0 8px #ccc;background: #fff;}
	.jueserole span{vertical-align: top;}
	.roletree{display: inline-block;border:1px solid #ccc;width: 254px;padding: 8px 0;}
	.role-content{padding: 16px 26px;max-height: 300px;overflow-y: scroll;}
	.mingc{border: 1px solid #ccc;line-height: 25px;width: 254px;padding:0 8px;}
	.juesename,.jueserole{font-size: 0;}
	.juesename .rolename,.jueserole .rolename{font-size: 16px;width: 82px;display: inline-block;}
	.jueserole{margin-top: 14px;}
	.jueserole .rolename{padding-top: 4px;}
	/* .jueserole .el-icon-caret-right:before{content:'\e669'} */
	.jueserole .el-checkbox__input.is-checked .el-checkbox__inner,.jueserole .el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color: #f19149;border-color: #f19149;}
	.role-button{text-align: right;padding: 10px 8px 16px 8px;border-top:1px solid #eaeaea;}
	.role-button button{padding: 8px 20px;}
</style>