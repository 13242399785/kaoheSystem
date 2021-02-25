<template>
    <div class="auto">
        <div class="auto margin-bot">
            <div class="item-list">
                <span @click="getSub(0)" :class="parseInt(nowData.roleId)==0?'item-ative':''">全部({{listData.length}})</span>
                <!-- <span  :class="parseInt(nowData.roleId)==parseInt(item.roleId)?'item-ative':''" @click="getSub(item.roleId)" v-for="(item,index) in roleList" :key="index">{{item.roleName}}</span> -->
            </div>
			<p class="video-all"></p>
			<div class="m-top clearfix">
				<div class="m-left fl">
					<!-- <el-checkbox >全选</el-checkbox> -->
					<!-- <button class="button-auto button-delete">删除</button> -->
					<!-- <button class="button-add margin-l6" @click="dialogVisible=true">添加</button> -->
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
            <el-table
                class="my_table"
                :data="mainData" 
                height="550"
                style="width: 100%">
                <el-table-column
                type="selection"
                width="50">
                </el-table-column>
                <el-table-column
                type="index" 
                :index="getIndex"
                label="序号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="userId"
                width="150"
                label="操作用户名称">
                </el-table-column>
                <!-- <el-table-column
                prop="tagCode"
                label="操作对象">
                </el-table-column> -->
                <el-table-column
                prop="describe"
                label="操作内容">
                </el-table-column>
                <el-table-column
                prop="logTime"
                width="180"
                :formatter="formateDatetime"
                label="操作时间">
                </el-table-column> 
                <el-table-column
                className="caozuo"
                width="180"
                label="操作">
                    <template slot-scope="scope">
                        <div class="video-control">
                            <el-button type="text" @click="delEm(scope.row)">删除<i class="el-icon-delete"></i></el-button>
                        </div>
                    </template>     
                </el-table-column>
            </el-table>
            <div class="page-control clearfix" v-show="pagination.total>3">
                <el-pagination
                    @current-change="handleCurrentChange"
                    prev-text='上一页'
                    next-text='下一页'
                    :page-size="pagination.size"
                    layout="prev, pager, next"
                    :total="pagination.total">
                </el-pagination>
            </div>
		</div>
         <!-- 弹出层 -->
        <el-dialog
            v-dialogDrag
            title="警告"
            :visible.sync="delVisible"
            class="delete-dialog"
            width="400px" 
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                    <div class="delect-text">
                        <img src="../../../images/info.png"/>
                        <span>确定删除所选项吗？</span>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delSave">确 定</el-button>
                <el-button @click="delVisible=false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            mainData:[],
            roleList:[],
            listData:[],
            nowData:{
                "roleId":0
            },
            delVisible:false,
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
            },
            nowId:0
        }
    },
    mounted(){
        this.getList()
        this.getRoleList()
    },
    methods:{
        getList(){
            let that=this;
            this.$api.Log.getLogList().then(res=>{
                if(res.data.success){
                    that.listData=res.data.result
                    that.pagination.total=res.data.result.length
                    that.mainData = that.listData.slice((that.pagination.currentPage - 1) * that.pagination.size,that.pagination.currentPage * that.pagination.size);
                }else{
                    that.$message(res.data.msg)
                }
            }).catch((error) => {
                console.error(error);
            })
        },
        delEm(id){
            this.delVisible=true
            this.nowId=id.logId;
            console.log(id)
        },
        delSave(){
            let that=this;
            this.$api.Log.delLog(this.nowId).then(res=>{
                if(res.data.success){
                    that.$message.success('删除成功！')
                    that.delVisible=false
                    that.getList()
                }else{
                    that.$message(res.data.msg)
                }
            }).catch((error) => {
                console.error(error);
            })
        },
        formateDatetime(row, column, cellValue, index){
            return this.$api.formateDate(cellValue)
        },
        handleCurrentChange(val) {
            //改变当前页
            this.pagination.currentPage = val;
            this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
        },
        getSub(id){
            console.log(id)
            this.nowData.roleId=id
        },
        // 获取权限列表
        getRoleList(){
            let that=this;
            this.$api.Role.getRoleList().then(res=>{
                if(res.data.success){
                    that.roleList=res.data.result
                }else{
                    that.$message(res.data.msg)
                }
            }).catch((error) => {
                console.error(error);
            })
        },
    },

}
</script>
<style lang="scss">

</style>