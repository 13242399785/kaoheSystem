<template>
    <div class="catalogue">
        <div class="auto margin-bot">
            <div class="catatop"><span class="catabtn" @click="addOne"><i class="el-icon-circle-plus-outline"></i> 添加一级目录</span>
            </div>
            <!-- 树状目录 -->
            <div class="tree-wapper">
                <el-tree
                :data="data"
                :props="defaultProps"
                accordion
                :expand-on-click-node="false"
                @node-click="handleNodeClick"
                :highlight-current="true"
                
                :render-content="renderContent">
                </el-tree>
                <!-- :default-expand-all='true' -->
            </div>
        </div>
        <!-- edirt -->
        <div class="cataedirt" v-show="edirtControl">
            <div class="cataedirt-wapper clearfix">
                <div class="cataedirt-catatop"><span>编辑</span><i @click="edirtHidden" class="el-icon-error fr"></i></div>
                <p class="cata-content"><span>名称：</span><el-input v-model="cataData.subjectName" placeholder="请输入内容" @keyup.enter.native="controlName"></el-input></p>
                <div class="delect-footer">
                  <el-button type="primary" @click="controlName">确定</el-button>
                  <el-button @click="edirtHidden">取消</el-button>
                </div>
            </div>
        </div>
        <!--delect-->
      <div class="delect-wapper" v-show="delectList">
        <div class="delect">
          <div class="delect-top">
            <span class="delect-left">提示</span>
            <span class="delect-right fr"><i  @click="delectH" class="el-icon-close"></i></span>
          </div>
          <div class="delect-text">
            <img src="../../../images/info.png"/>
            <span>确定删除所选项吗？</span>
          </div>
          <div class="delect-footer">
            <el-button type="primary" @click="del()">确定</el-button>
            <el-button @click="delectH">取消</el-button>
          </div>
        </div>
      </div>
		<!--delect end--> 
    </div>
</template>
<script>
import hea from '@/components/header'
import navlist from '@/components/nav'
export default {
    name:'catalogue',
    components:{
        hea,
        navlist,
    },
    props:["type"],
    data() {
      return {
        data:[],
        defaultProps: {
          children: 'children',
          label: 'subjectName'
        },
        delectList:false,
        edirtControl:false,
        cataData:{
            "childList": [
                {}
            ],
            "id": 0,
            "inserttime": "",
            "name": "",
            "pid": 0,
            "updatetime": ""
        },
        level:1,
        catalogueId:'',
        catalogueName:'',
        addControl:'',
        nowType:'',
        nowNav:0
      };
    },
    mounted(){
      console.log(this.type)
    },
    methods: {
      //当前目录
      handleNodeClick(data,node,da) {
        this.level=node.level;//获取当前目录的层级
        // console.log(this.level)
      },
      //获取目录结构
      getTree(){
          let that=this;
          if(this.type=='teaching'){
            this.nowType='Teaching'
          }else if(this.type=='training'){
            this.nowType='Training'
          }else{
            this.nowType='Competition'
          }
          console.log('当前'+this.nowType)
          console.log(this.$api[this.nowType])
          this.$api[this.nowType].getThree().then(res=>{
              if(res.data.success){
                  that.data=res.data.result
              }else{
                  that.$message(res.data.msg)
              }
          }).catch((error) => {
              console.error(error);
          })
      },
      // 跳转目录
      goAtive(ind){
        this.nowNav=ind
      },
      //目录编辑
      renderContent(h,{node,data,store}) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span class="showcontrol">
                <el-button type="primary" on-click={() => this.append(data)} icon="el-icon-plus">新增</el-button>
                <el-button type="info" on-click={() => this.edirt(data)} icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" on-click={() => this.delects(data)} icon="el-icon-delete">删除</el-button>
            </span>
          </span>);
      },
      //弹出框
      edirtHidden(){
        this.edirtControl=false;
      },
      //提交弹窗
      controlName(){
          this.edirtControl=false;
          const that=this;
          if(this.addControl=="add"){//添加
            this.$api[this.nowType].addSubject(this.cataData).then(res=>{
                if(res.data.success){
                  that.$message.success('新增成功！')
                    that.getTree()
                }else{
                    that.$message(res.data.msg)
                }
            }).catch((error) => {
                console.error(error);
            })
            
          }else if(this.addControl=="edirt"){//编辑
            this.$api[this.nowType].edirtSubject(this.cataData).then(res=>{
                if(res.data.success){
                   that.$message.success('修改成功！')
                    that.getTree()
                }else{
                    that.$message(res.data.msg)
                }
            }).catch((error) => {
                console.error(error);
            })
          }else{
            return false;
          }
        // this.edirtControl=false;
      },
      //添加一级目录
      addOne(){
          this.edirtControl=true;
          this.cataData.pid=0;
          this.cataData.name='';  
          this.addControl="add"  
      },
      //添加
      append(item){
        console.log(item)
        const _this=this;
        this.addControl="add";  
        setTimeout(function(){
          if(_this.level>=3){
            _this.$message({
                  showClose: true,
                  message: '目录层级暂时开发三层!',
                  type: 'warning'
              });
          }else{
            _this.edirtControl=true;
            _this.cataData={
              "subjectId": 0,
              "subjectName": "",
              "parentId": item.subjectId,
              "enabled": 0,
              "orderNo": 0,
              "remarks": ""
            }
            // _this.cataData.pid=id; 
            // _this.cataData.name=''; 
          }  
        },100)
    
      },
      //编辑
      edirt(item){
        console.log(item)
          this.addControl="edirt"
          this.edirtControl=true;
          this.cataData={
              "subjectId": item.subjectId,
              "subjectName": item.subjectName,
              "parentId": item.parentId,
              "enabled": item.enabled,
              "orderNo": item.orderNo,
              "remarks": item.remarks
          }
      },
      //删除
      delects(data){
          this.delectList=true;
          this.cataData.subjectId=data.subjectId;
      },
      del(){
        const that=this;
        this.delectList=false;
        this.$api[this.nowType].delSubject(this.cataData.subjectId).then(res=>{
          that.getTree()
            if(res.data.success){
                that.$message.success('删除成功！')
                that.getTree()
            }else{
                that.$message(res.data.msg)
            }
        }).catch((error) => {
            console.error(error);
        })
        
      },
      //删除取消
        delectH(){ 
            this.delectList=false     
        },
      
    },
    mounted(){
        this.getTree();
    }
}
</script>
<style lang="css">
.catalogue{    height: 82%;overflow: auto;}
.catatop{color:#f19149;border-bottom: 1px dashed #ccc;padding-bottom: 20px;margin-bottom: 20px;margin-top: 20px;}
.catabtn{border:1px solid #f19149;padding: 5px 12px;cursor: pointer;display: inline-block;font-size: 16px;}
.catalogue .el-tree-node__expand-icon{color: #f19149;font-size: 24px;} 
.catalogue .el-tree-node__expand-icon.is-leaf{color: transparent;}
.catalogue .el-tree-node__label{font-size: 18px;}
.catalogue .el-tree-node__content{height: 32px;}
/* .tree-wapper{max-width: 800px;} */
.tree-wapper .el-button{padding: 4px 20px;}
.showcontrol{display: none;}
.el-tree-node__content:hover .showcontrol{display: block;}
.catalogue .el-input__inner{height: 33px;vertical-align: middle;}
.cataedirt{height: 100%;width: 100%;position: fixed;background:rgba(0,0,0,.3);top: 0;left: 0;color:#333;}
.cataedirt-wapper{position: fixed;top: 50%;left: 50%;width: 500px;box-shadow: 0 0 10px #ccc;transform:translate(-50%,-50%);background: #fff;}
.cataedirt-catatop{line-height: 35px;background: #f7f7f7;font-size: 16px;padding: 5px 8px;color: #303133}
.cataedirt-catatop .el-icon-error{padding-top: 6px;font-size: 18px;color: #707173}
.cata-content{padding: 10px 30px;color: #707173;padding-top: 28px;}
.cata-content .el-input{width: 390px;}
.cataedirt-wapper .delect-footer{padding-right: 32px;}
</style>
