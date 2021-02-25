<template>
    <div class="">
        <div class="auto margin-bot">
            <div class="item-list">
                <span @click="getSub(0)" :class="parseInt(nowData.roleId)==0?'item-ative':''">全部({{mainData.length}})</span>
                <!-- <span  :class="parseInt(nowData.roleId)==parseInt(item.roleId)?'item-ative':''" @click="getSub(item.roleId)" v-for="(item,index) in roleList" :key="index">{{item.roleName}}</span> -->
            </div>
			<p class="video-all"></p>
			<div class="m-top clearfix">
				<div class="m-left fl">
					<!-- <el-checkbox >全选</el-checkbox> -->
					<!-- <button class="button-auto button-delete">删除</button> -->
					<button class="button-add margin-l6" @click="addUser">添加</button>
				</div>
				<div class="m-right fr">
					<el-input
					    placeholder="请输入关键字"
					    suffix-icon="el-icon-search"
                        v-model="searchData.Name"
					    >
					  </el-input>
                      <div class="sou-w" @click="fleeData">搜索</div>
				</div>
			</div>
			<!--table-->
            <el-table
                class="my_table my_table-h"
                :data="mainData" 
                height="560"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                type="selection"
                width="50">
                </el-table-column>
                <el-table-column
                type="index" 
                :index="getIndex"
                label="序号"
                width="50">
                </el-table-column>
                <el-table-column
                prop="loginId"
                label="用户名称">
                </el-table-column>
                <el-table-column
                prop="jobNo"
                label="学号/编号">
                </el-table-column>
                <el-table-column
                prop="loginPwd"
                label="登录密码">
                </el-table-column>
                <el-table-column
                prop="roleId"
                :formatter="formattterRole"
                label="用户权限">
                </el-table-column>
                <!-- <el-table-column
                prop="ammeterAdress"
                label="创建人">
                </el-table-column> -->
                <el-table-column
                prop="startTime"
                width="200"
                :formatter="formateDatetime"
                label="创建时间">
                </el-table-column>
                <el-table-column
                prop="updateTime"
                width="200"
                :formatter="formateDatetime"
                label="修改时间">
                </el-table-column>
                <el-table-column
                className="caozuo"
                width="100"
                label="操作">
                   <template slot-scope="scope">
                        <div class="video-control">
                            <el-button type="text" @click="setEm(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
                            <div  class="video-control-top"></div>
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
            :title="dialogText"
            :visible.sync="dialogVisible"
            
            width="400px" 
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                   <p class="flex-lr">
                        <span class="ml">用户登录名</span>
                        <el-input v-model="thisUser.loginId" placeholder="请输入用户登录名"></el-input>
                   </p>
                   <p  class="flex-lr">
                        <span class="ml">学号/编号</span>
                        <el-input v-model="thisUser.jobNo" placeholder="请输入学号/编号"></el-input>
                   </p>
                   <p class="flex-lr">
                        <span class="ml">初始密码</span>
                        <el-input v-model="thisUser.loginPwd" placeholder="请输入初始密码"></el-input>
                   </p>
                   <p class="flex-lr">
                        <span class="ml">用户权限</span>
                        <el-select v-model="thisUser.roleId" placeholder="请选择">
                            <el-option
                            v-for="item in roleList"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId">
                            </el-option>
                        </el-select>
                   </p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveUser">确 定</el-button>
                <el-button @click="dialogVisible=false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 删除框 -->
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
            mainData:[{}],
            dialogVisible:false,
            nowRole:'',
            roleList:[
                
            ],
            thisUser:{
                "loginId": "",
                "loginPwd": "",
                "roleId": null,
                "jobNo": "",
                "remarks": ""
            },
            dialogText:'添加用户',
            delVisible:false,
            nowUser:null,
            nowControl:0,
            nowData:{
                "roleId":0
            },
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 10,
                currentPage: 1,
                total:0
            },
            searchData:{
                Name:''
            },
            listData:[]
        }
    },
    mounted(){
        this.getRoleList()
        this.getList();
    },
    methods:{
        addUser(){
            this.nowControl=0;
            this.dialogVisible=true;
            this.thisUser={
                "userId": 0,
                "userName": "",
                "loginId": "",
                "loginPwd": "",
                "telNo": "",
                "email": "",
                "roleId": null,
                "organId": 0,
                "subjectId": 0,
                "userClassId": 0,
                "principalId": 0,
                "userType": 0,
                "sex": 0,
                "jobNo": "",
                "cardNo": "",
                "createTime": new Date(),
                "updateTime": new Date(),
                "startTime": new Date(),
                "endTime": new Date(),
                "status": 0,
                "isAdmin": 0,
                "remarks": ""
            };
        },
        getSub(id){
            console.log(id)
            this.nowData.roleId=id
        },
        //序号
        getIndex(index){
            return (this.pagination.currentPage-1)*this.pagination.size+index+1;
        },
        setEm(item){
            this.dialogVisible=true
            this.nowControl=1
            this.thisUser={
                "userId": item.userId,
                "userName": item.loginId,
                "loginId": item.loginId,
                "loginPwd": item.loginPwd,
                "telNo": item.telNo,
                "email": item.email,
                "roleId": item.roleId,
                "organId": item.organId,
                "subjectId": item.subjectId,
                "userClassId": item.userClassId,
                "principalId": item.principalId,
                "userType": item.userType,
                "sex":item.sex,
                "jobNo": item.jobNo,
                "cardNo": item.cardNo,
                "createTime": item.createTime,
                "updateTime": new Date(),
                "startTime": item.startTime,
                "endTime": item.endTime,
                "status": item.status,
                "isAdmin": item.isAdmin,
                "remarks": item.remarks  
            };
            
            console.log(item)
        },
        // 查找过滤
        fleeData(){
            
            let that=this,data;
            let str=this.searchData.Name;
            if(this.listData.length==0){
                data=[]
            }else if(str==''){
               data = that.listData.slice(0, that.pagination.size)
            }else if(str){
                data=[];
                that.listData.forEach(el => {
                    if(el.loginId.indexOf(str)!=-1){
                        data.push(el)
                    }
                });
            }
            // console.log(data)
            this.mainData=data   
        },
        saveUser(){
            let that=this;
            if(this.thisUser.loginId==''){
                this.$message('用户名称不能为空！')
                return false
            }
            if(this.thisUser.loginPwd==''){
                this.$message('密码不能为空！')
                return false
            }
            //新增
            if(!this.nowControl){
                this.thisUser.userName=this.thisUser.loginId
                this.$api.User.addUser(this.thisUser).then(res=>{
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
                this.$api.User.updateUser(this.thisUser).then(res=>{
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
            
            this.delVisible=true
            this.nowUser=item;
            console.log(item.userId)
            
        },
        delSave(){
            let that =this;
            this.$api.User.delUser(this.nowUser.userId).then(res=>{
                if(res.data.success){
                    that.$message.success('删除成功成功！')
                    that.getList()
                    that.delVisible=false
                }else{
                    that.$message(res.data.msg)
                }
            }).catch((error) => {
                console.error(error);
            })
        },
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
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
        handleCurrentChange(val) {
            //改变当前页
            this.pagination.currentPage = val;
            this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
        },
        getList(){
            let that=this;
            this.$api.User.getUserList().then(res=>{
                console.log(res.data)
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
        formateDatetime(row, column, cellValue, index){
            return this.$api.formateDate(cellValue)
        },
        formattterRole(row, column, cellValue, index){
            for(let i=0;i<this.roleList.length;i++){
                if(this.roleList[i].roleId==cellValue){
                    return this.roleList[i].roleName
                }
            }
        },
    }
}
</script>
<style lang="scss">
.my_table-h{
    height: 100%;
}
</style>