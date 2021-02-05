<template>
    <div class="auto">
        <div class="auto margin-bot">
            <div class="item-list">
                <span class="item-ative">角色数量({{mainData.length}})</span>
            </div>
			<p class="video-all"></p>
			<div class="m-top clearfix">
				<div class="m-left fl">
					<!-- <el-checkbox >全选</el-checkbox> -->
					<button class="button-auto button-delete">删除</button>
					<button class="button-add margin-l6" @click="addRole">添加</button>
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
                prop="roleName"
                label="角色名称">
                </el-table-column>
                <!-- <el-table-column
                label="权限详情">
                <template slot-scope="scope">
                    <div class="video-control video-control-d">
                        <el-button type="text" @click="roleD(scope.row)">权限详情</el-button>
                    </div>
                </template> 
                </el-table-column> -->
                
                <!-- <el-table-column
                prop="registerAdress"
                label="创建时间">
                </el-table-column> -->
                <el-table-column
                prop="update_dt"
                :formatter="formateDatetime"
                label="修改时间">
                </el-table-column>
                <el-table-column
                prop="remarks"
                label="备注">
                </el-table-column> 
                <el-table-column
                className="caozuo"
                width="100"
                label="操作">
                    <template slot-scope="scope">
                        <div class="video-control">
                            <el-button type="text" @click="editorRole(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
                            <div  class="video-control-top"></div>
                            <el-button type="text" @click="delEm(scope.row)">删除<i class="el-icon-delete"></i></el-button>
                        </div>
                    </template>    
                </el-table-column>
            </el-table>
		</div>
        <!-- 弹出层 -->
        <el-dialog
            v-dialogDrag
            :title="dialogText"
            :visible.sync="dialogVisible"
            width="400px" 
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                   <p class="flex-lr">
                        <span class="ml">角色名称</span>
                        <el-input v-model="nowRole.roleName" placeholder="请输入角色名称"></el-input>
                   </p>
                   <p  class="flex-lr">
                        <span class="ml">备注</span>
                        <el-input v-model="nowRole.remarks" placeholder="请输入备注"></el-input>
                   </p>
                   <!-- <p class="flex-lr">
                        <span class="ml">初始密码</span>
                        <el-input v-model="nowRole.loginPwd" placeholder="请输入初始密码"></el-input>
                   </p> -->
                  
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveRole">确 定</el-button>
                <el-button @click="dialogVisible=false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 删除框 -->
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
            mainData:[{}],
            dialogVisible:false,
            delVisible:false,
            nowControl:0,
            nowRole:{
                "roleId": 0,
                "roleName": "",
                "roleType": 0,
                "update_by": 0,
                "update_dt": new Date(),
                "remarks": ""
            },
            dialogText:'',
            
        }
    },
    mounted(){
        // console.log('更新了')
        this.getList()
    },
    methods:{
        addRole(){
            this.dialogText='新增'
            this.nowControl=0;
            this.dialogVisible=true;
            this.nowRole={
                "roleId": 0,
                "roleName": "",
                "roleType": 0,
                "update_by": 0,
                "update_dt": new Date(),
                "remarks": ""
            }
        },
        
        editorRole(item){
            this.dialogText='修改新增'
            this.nowControl=1;
            this.dialogVisible=true;
            this.nowRole={
                "roleId": item.roleId,
                "roleName": item.roleName,
                "roleType":item.roleType,
                "update_by": item.update_by,
                "update_dt": item.update_dt,
                "remarks": item.remarks
            }
        },
        saveRole(){
            let that=this;
            if(!this.nowControl){//新增
                this.$api.Role.addRole(this.nowRole).then(res=>{
                    // console.log(res.data)
                    if(res.data.success){
                        that.$message.success('新增成功！')
                        that.getList()
                        that.dialogVisible=false;
                    }else{
                        that.$message(res.data.msg)
                    }
                }).catch((error) => {
                    console.error(error);
                })
            }else{
                this.$api.Role.updateRole(this.nowRole).then(res=>{
                    // console.log(res.data)
                    if(res.data.success){
                        that.$message.success('修改成功！')
                        that.getList()
                        that.dialogVisible=false;
                    }else{
                        that.$message(res.data.msg)
                    }
                }).catch((error) => {
                    console.error(error);
                })    
            }
            
        },
        delEm(item){
            console.log(item)
            this.nowRole=item;
            this.delVisible=true;
        },
        delSave(){
            let that=this;
            this.$api.Role.delRole(this.nowRole.roleId).then(res=>{
                    if(res.data.success){
                        that.$message.success('删除成功！')
                        that.getList()
                        that.delVisible=false;
                    }else{
                        that.$message(res.data.msg)
                    }
                }).catch((error) => {
                    console.error(error);
                }) 
        },
        getList(){
            let that=this;
            this.$api.Role.getRoleList().then(res=>{
                console.log(res.data)
                if(res.data.success){
                    that.mainData=res.data.result
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
        roleD(item){
            this.$api.getNowRole(item.roleId).then(res=>{
                console.log(res.data)
                // if(res.data.success){
                //     that.mainData=res.data.result
                // }else{
                //     that.$message(res.data.msg)
                // }
            }).catch((error) => {
                console.error(error);
            })
        }
    }
}
</script>
<style lang="scss">

</style>