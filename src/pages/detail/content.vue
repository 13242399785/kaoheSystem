<!--实训管理-->
<template>
  <detail>
    <div class="flex-wapper-content"  slot="banner-right" v-show="nowData.classId!=4">{{nowData.remarks}}</div>
    <div class="flex-wapper-btn" v-if="nowRole==3" v-show="nowData.classId==4" slot="banner-right">
      <p class="fujian-up" ><el-button @click="uploadFu">{{fuShow?'重新上传附件':'上传附件'}}
          <input type="file" ref="fileFj" id="fileFj" @change="UploadStart" class="fu">
        </el-button><span class="fujian" v-show="fuShow" @click="downFu">{{nowData.urlName}}</span></p>
      <p><el-button class="pin" @click="setScore">老师评分</el-button></p>
    </div>
    <template slot="content" >
      <div class="fen-content fen-table-w" v-show="nowData.classId==4" >
        <div class="fen-item" v-for="(item, index) in gradeList" :key="index">
          <div class="flex-between fen-title-be">
            <span class="title-l">评分表{{ index + 1 }}:{{ item.testQuestionsName }}</span>
            <!-- <span class="title-r">评分老师</span> -->
          </div>
          <table class="fen-table gray-table" border="0">
            <tr>
              <th style="width: 80px">序号</th>
              <th>评分项</th>
              <th style="width: 150px">分值</th>
              <th style="width: 150px">得分</th>
            </tr>
            <tr v-if='item.children.length==0'>
                <td>{{1 }}</td>
                <td>{{ item.testQuestionsName }}</td>
                <td>{{ item.points }}</td>
                <td>
                  {{item.score}}
                </td>
              </tr>
            <tr v-for="(scoing, index1) in item.children" :key="index1">
              <td>{{ index1 + 1 }}</td>
              <td>{{ scoing.testQuestionsName }}</td>
              <td>{{ scoing.points }}</td>
              <td>{{ scoing.score }}</td>
            </tr>
            <tr class="content-all" v-if="item.children">
              <td colspan="2" class="content-tent">合计</td>
              <td v-if='item.children.length==0'>{{ item.points}}</td>
              <td v-if='item.children.length==0'>{{item.score }}</td>
              <td v-if='item.children.length!=0'>{{ sumScore(item.children, "points") }}</td>
              <td v-if='item.children.length!=0'>{{ sumScore(item.children, "score") }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="delect-wapper" v-show="resetScoreVisible">
        <div class="delect">
          <div class="delect-top">
            <span class="delect-left">提示</span>
            <span class="delect-right fr" @click="resetScoreVisible = false"
              ><i class="el-icon-close"></i
            ></span>
          </div>
          <div class="delect-text">
            <img src="@/images/info.png" />
            <span>是否重新评分？</span>
          </div>
          <div class="delect-footer">
            <el-button type="primary" @click="resetScore">确定</el-button>
            <el-button @click="resetScoreVisible = false">取消</el-button>
          </div>
        </div>
      </div>
      <el-dialog
        title="评分"
        v-dialogDrag
        :visible.sync="accountVisible"
        width="400px"
      >
        <div class="dialog-wapper">
          <div class="dialog-list">
            <el-form ref="form" :model="teacherAccount" label-width="50px">
              <el-form-item label="账号">
                <el-input v-model="teacherAccount.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  v-model="teacherAccount.loginPwd"
                  show-password
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="login">确 定</el-button>
          <el-button @click="accountVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="老师评分"
        :visible.sync="scoreVisible"
        width="800px"
        v-dialogDrag
      >
        <div class="fen-wapper fen-table-w">
          <div class="fen-item" v-for="(item, index) in gradeList" :key="index">
            <div class="flex-between fen-title-be">
              <span class="title-l">评分表{{ index + 1 }}:{{ item.testQuestionsName }}</span>
              <!-- <span class="title-r">评分老师</span> -->
            </div>
            <table class="fen-table" border="0">
              <tr>
                <th style="width: 80px">序号</th>
                <th>评分项</th>
                <th style="width: 150px">分值</th>
                <th style="width: 150px">得分</th>
              </tr>
              <tr v-if='item.children.length==0'>
                <td>{{1 }}</td>
                <td>{{ item.testQuestionsName }}</td>
                <td>{{ item.points }}</td>
                <td>
                  <el-input size="mini" v-model="item.score"> </el-input>
                </td>
              </tr>
              <tr v-for="(scoing, index1) in item.children" :key="index1">
                <td>{{ index1 + 1 }}</td>
                <td>{{ scoing.testQuestionsName }}</td>
                <td>{{ scoing.points }}</td>
                <td>
                  <el-input size="mini" v-model="scoing.score"> </el-input>
                </td>
              </tr>
              <tr class="content-all">
                <td colspan="2" class="content-tent">合计1</td>
                <td v-if='item.children.length==0'>{{ item.points}}</td>
                <td v-if='item.children.length==0'>{{item.score }}</td>
                <td v-if='item.children.length!=0'>{{ sumScore(item.children, "points") }}</td>
                <td v-if='item.children.length!=0'>{{ sumScore(item.children, "score") }}</td>
              </tr>
            </table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateScore">确 定</el-button>
          <el-button @click="scoreVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </template>
  </detail>
</template>
<script>
import detail from "@/components/detail";
export default {
  components: {
    detail,
  },
  data() {
    return {
      resetScoreVisible: false,
      accountVisible: false,
      teacherAccount: {},
      gradeList: [],
      editGradeList: [],
      scoreVisible: false,
      nowUrl:'',
      classList:[],
      file:null,
      fuShow:false,
      scoreNow:{},
      nowTeacher:{},
      nowData:{},
      nowPoint:this.$api.serverUrl,
      nowFu:null,
      nameList:[],
      nowRole:0
    };
  },
  created(){
    let url=window.location.href;
    this.nowRole=localStorage.getItem('roleId')
    if(url.indexOf('teaching')>-1){//教学
      this.nowUrl='Teaching'
    }else if(url.indexOf('competition')>-1){//竞赛
      this.nowUrl='Competition'
    }else if(url.indexOf('training')>-1){//实训
      this.nowUrl='Training'
    }
  },
  mounted(){
    this.nowPoint=this.$api.serverUrl
    
    // console.log(this.nowData)
    this.getNowtor()
    this.getClass()
  },
  methods: {
    
    // 重新评分窗口点击确定
    resetScore() {
      this.resetScoreVisible = false;
      this.accountVisible = true;
    },
    //获取当前资源
    getNowtor(){
      let that=this
      console.log(this.nowUrl)
      this.$api[this.nowUrl].getSgTeaching(this.$route.params.id).then(res=>{
          that.nowData=res.data.result
          console.log(this.nowData)
          if(that.nowData.classId==4){
            that.getTorlist();//获取评分列表
            this.getScoremodel()
          }
      }).catch((error) => {
          console.error(error);
      })
    },
    
    //下载附件
    downFu(){
      window.location.href=this.$api.serverUrl+'/'+this.scoreNow.url
    },
    //上传附件
    UploadStart(){
      var file = $("#fileFj")[0].files[0];
      let that=this;
      if(file.name.indexOf('.7z')>-1){
          this.$message('当前不允许上传该类型文件！')
          return false;
      }
      this.AjaxFile(file, 0);
      
      // this.AjaxFile(file,0);
    },
    AjaxFile(file,i){
        let that=this;
        var name = file.name, //文件名
        size = file.size, //总大小shardSize = 2 * 1024 * 1024, 
        shardSize = 2 * 1024 * 1024,//以2MB为一个分片
        shardCount = Math.ceil(size / shardSize); //总片数
        if (i >= shardCount) {
            return;
        }
        //计算每一片的起始与结束位置
        var start = i * shardSize,
        end = Math.min(size, start + shardSize);
        var upText='上传'
        if(this.fuShow){
          upText='覆盖'
        }else{
          upText='上传'
        }
        //构造一个表单，FormData是HTML5新增的
        var form = new FormData();
        form.append("data", file.slice(start, end)); //slice方法用于切出文件的一部分
        form.append("lastModified", file.lastModified);
        form.append("fileName", name);
        form.append("total", shardCount); //总片数
        form.append("index", i + 1); //当前是第几片
        this.UploadPath = file.lastModified;
        
        //Ajax提交文件
        $.ajax({
            url: that.$api.serverUrl+"/Upload/UploadFile",
            type: "POST",
            data: form,
            async: true, //异步
            processData: false, //很重要，告诉jquery不要对form进行处理
            contentType: false, //很重要，指定为false才能形成正确的Content-Type
            success: function (result) {
                if (result != null) {
                    i = result.number++;
                    var num = Math.ceil(i * 100 / shardCount);
                    that.percenSum=num
                    that.AjaxFile(file, i);
                    console.log(shardCount,i)   
                    
                    if (result.mergeOk&&shardCount==i) {
                        that.$confirm('文件已上传完成，确认'+upText+'当前附件?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                          that.nowData.url=result.url
                          that.nowData.urlName=result.fileName
                          that.file=null
                          that.addScoremodel()
                        }).catch(() => {
                          that.$message({
                            type: 'info',
                            message: '已取消'+upText+'当前附件'
                          });         
                        });
                        // that.$refs.fileFj.clearFiles()
                        // that.$message.success('文件上传成功！') 
                        // if(that.nowTaskIndex==0){
                        //     that.pdfUrl=that.$api.serverUrl+'/'+ encodeURI(that.nowData.url)
                        // }  
                    }else if(result.msg&&!result.mergeOk){
                        that.uploadShow=true
                        that.$message(result.msg)
                    }else{
                        console.log('切片上传')
                    }
                }
            }
        });
    },
    //获取提交附件
    getScoremodel(){
      let that=this;
      let params={
        "ScoreModelId":0,
        "CreateBy":localStorage.getItem('userIds')||0,
      }
      if(this.nowUrl=='Training'){
        params.PracticeId=this.$route.params.id
      }else if(this.nowUrl=='Competition'){
        params.CompetitionId=this.$route.params.id
      }else{
        params.PracticeId=this.$route.params.id
      }
      console.log('dagnqianzhi :')
      console.log(params)
      this.$api[this.nowUrl].getScoremodel(params).then(res=>{
        console.log("当前资源")
        console.log(res.data.result)
        if(res.data.result){
          that.nowData.urlName=res.data.result.urlName;
          that.scoreNow=res.data.result
          that.fuShow=true
        }else{

        }
      }).catch((error) => {
          console.error(error);
      })
    },
    //确认提交附件
    addScoremodel(){
      let that=this;
      let params={
        "scoreModelId": 0,
        "scoreModelName": this.nowData.urlName,
        "url":this.nowData.url,
        "urlName": this.nowData.urlName,
        "createBy":localStorage.getItem('userIds'),
        "updateTime": new Date()
      }
      if(this.nowUrl=='Training'){
        params.practiceId=this.$route.params.id
      }else{
        params.competitionId=this.$route.params.id
      }
      if(this.fuShow){//修改附件
        params.scoreModelId=this.scoreNow.scoreModelId
        this.$api[this.nowUrl].updateScoremodel(params).then(res=>{
            if(res.data.success){
              that.$message.success('附件上传成功！')
              that.fuShow=true;
            }else{
              that.$message(res.data.msg)
            }
          }).catch((error) => {
            console.error(error);
        })
      }else{
        this.$api[this.nowUrl].addScoremodel(params).then(res=>{
            if(res.data.success){
              that.$message.success('附件上传成功！')
              that.fuShow=true;
            }else{
              that.$message(res.data.msg)
            }
          }).catch((error) => {
            console.error(error);
        })
      }
      
    },
    //获取任务书评分列表
    getTorlist(){
      console.log('获取')
        let that=this;
        let params={
            "UserId":localStorage.getItem('userIds')||0
        }
        if(this.nowUrl=='Training'){
          params.PracticeId=this.$route.params.id
        }else{
          params.CompetitionId=this.$route.params.id
        }
        this.$api[this.nowUrl].getScoreTreeList(params).then(res=>{
            console.log(res.data)
            that.gradeList=res.data.result
        }).catch((error) => {
            console.error(error);
        })
    },
    setScore() {
      //判断是否已经评分的语句
      // this.accountVisible = true;
      if(!this.fuShow){
        this.$message('当前未上传学习附件，请先上传附件！')
        return false
      }
      if (this.gradeList[0].isScore) {
        // 已经评分，弹出提示
        this.resetScoreVisible = true;
      } else {
        // 未评分，弹出教师账号密码输入窗口
        this.accountVisible = true;
      }
    },
    login() {
      // 账号密码正确，弹出评分窗口
      let that=this;
      
      let params={
        'LoginId':this.teacherAccount.userName,
        'LoginPwd':this.teacherAccount.loginPwd
      }
      if(params.LoginId==''||params.LoginPwd==''){
        this.$message('账号密码不能为空！')
        return false
      }
      this.$api.getLogin(params).then(res=>{
          if(res.data.user.roleId!=2){
            that.$message('当前需老师权限来评分，请登录老师账号')
            return false 
          }else{
            that.nowTeacher=res.data.user;
            that.accountVisible = false;
            that.scoreVisible = true;
            that.teachergetTorlist()
          }
          res.data.user
      }).catch((error) => {
          console.error(error);
      })
    },
    //老师获取评分列表
    teachergetTorlist(){
        let that=this;
        let params={
            "UserId":this.nowTeacher.userId
        }
        if(this.nowUrl=='Training'){
          params.PracticeId=this.$route.params.id
        }else{
          params.CompetitionId=this.$route.params.id
        }
        this.$api[this.nowUrl].getScoreTreeList(params).then(res=>{
            console.log(res.data)
            that.editGradeList=res.data.result
        }).catch((error) => {
            console.error(error);
        })
    },
    //确定评分
    updateScore() {
      let that=this
      // console.log(this.editGradeList)
      this.editGradeList=this.gradeList;

      for(let i=0;i<this.editGradeList.length;i++){
          this.editGradeList[i].createBy=parseInt(localStorage.getItem('userIds'))
          this.editGradeList[i].scoreBy=parseInt(this.nowTeacher.userId)
          for(let j=0;j<this.editGradeList[i].children.length;j++){
              this.editGradeList[i].children[j].createBy=parseInt(localStorage.getItem('userIds'))
              this.editGradeList[i].children[j].scoreBy=parseInt(this.nowTeacher.userId)
          }
      }
      if(this.gradeList[0].isScore){//已评分
        this.$api[this.nowUrl].updatecore(this.gradeList).then(res=>{
          console.log(res.data)
          that.$message.success("完成评分");
          that.scoreVisible = false;
          that.teachergetTorlist()
        }).catch((error) => {
            console.error(error);
        })
      }else{
        //新增评分
        this.$api[this.nowUrl].addScore(this.editGradeList).then(res=>{
          console.log(res.data)
          that.$message.success("完成评分");
          that.scoreVisible = false;
          that.teachergetTorlist()
        }).catch((error) => {
            console.error(error);
        })
      }
      
    },
    // 求和，参数（当前表格数据，求和对应字段）
    sumScore(data, key) {
      return data
        .map((row) => row[key])
        .reduce((total, currentNum) => {
          if (currentNum) {
            return parseInt(currentNum) + total;
          } else {
            return total;
          }
        }, 0);
    },
    getClass(){
        let that=this;
        this.$api[this.nowUrl].getType().then(res=>{
            that.classList=res.data.result
            console.log(res.data)
        }).catch((error) => {
            console.error(error);
        }) 
    },
  },
};
</script>
<style lang="scss">
.fen-content {
  width: 80%;
  margin: 20px auto;
}
.fen-table-w .fen-table.gray-table tr th {
  background: #8b8c8d;
}
.fujian-up{
  position: relative;
  .fu{
    // background: #fff;
    width: 120px;
    height: 30px;
    position: absolute;
    left:0;
    top: 0;
    opacity: 0;
  }
  .fujian{
    padding-left:4px;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>