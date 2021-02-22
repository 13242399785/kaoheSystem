<template>
    <div class="content-wapper auto-w">
        <div class="content-left">
            <builds  @buildId="getBuildId" url='training'></builds>
        </div>
        <div class="content-right content-right-mar">
            <div class="margin-bot ">
                <div class="item-title">
                    {{topName}}
                </div>
                <div class="m-top clearfix">
                    <div class="m-left fl">
                        <!-- <el-checkbox >全选</el-checkbox> -->
                        <!-- <button class="button-auto button-delete">删除</button> -->
                        <button class="button-auto button-export margin-l6" @click="exportData">导出</button>
                    </div>
                    <div class="m-right fr">
                        <el-input
                            placeholder="请输入关键字"
                            suffix-icon="el-icon-search"
                            v-model="nowData.resultName"
                            >
                        </el-input>
                        <div class="sou-w" @click="initGetlist">搜索</div>
                    </div>
                </div>
                <!--table-->
                <el-table
                    class="my_table"
                    :data="mainData" 
                    max-height='550'
                    height='550'
                    >
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
                    prop="userName"
                    width="100"
                    label="学生名称">
                    </el-table-column>
                    <el-table-column
                    prop="jobNo"
                    label="学号/编号">
                    </el-table-column>
                    <el-table-column
                    prop="resultName"
                    width="200"
                    label="实训任务名称">
                    </el-table-column>
                    <el-table-column
                    prop="totalScore"
                    width="100"
                    label="成绩">
                    </el-table-column>
                    <el-table-column
                    prop="updateTime"
                    :formatter="formateDatetime"
                    width="200"
                    label="时间">
                    </el-table-column>
                    <el-table-column
                    className="caozuo"
                    width="100"
                    label="操作">
                        <template slot-scope="scope">

                            <div class="video-control">
                                <el-button type="text" @click="getTest(scope.row)">查看</el-button>
                                <div  class="video-control-top"></div>
                                <el-button type="text" @click="delEm(scope.row)">删除<i class="el-icon-delete"></i></el-button>
                            </div>
                            <!--<span class="bor1" title="修改" @click="setEm(scope.row)">编辑信息 
                                <i class="el-icon-edit"></i>
                            </span> -->
                            <!-- <span class="bor1" title="删除" @click="delEm(scope.row)">删除 
                                <i class="el-icon-delete"></i>
                            </span>-->
                        </template>     
                    </el-table-column>
                </el-table>
                <div class="page-control clearfix" v-show="pagination.total>=5">
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
        </div>
        <!-- 弹出层 -->
        <el-dialog
            v-dialogDrag
            title="查看"
            :visible.sync="ediVisible"
            width="65%" 
            class="edior-wapper"
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                    <div class="ediro-fen">
                        <el-button :type="scoreEdir?'primary':'danger'" @click="scoreEdir=!scoreEdir" size="small" >{{scoreEdir?'编辑分数':'取消编辑分数'}}</el-button>
                    </div>
                    <div class="flex-between">
                    <div class="rw-top-l">
                        当前任务书：{{setData.resultName}}
                    </div>
                </div>
                <div class="pdf-wapper">
                    <iframe class="pdf-if" :src ="pdfUrl" align="center"></iframe>
                </div>
                <!-- <div class="addfen">
                    <span class="rw-top-r">增加试题及对应的评分标准</span>
                </div> -->
                <div class="fen-wapper fen-table-w">
                    <div class="fen-item" v-for="(item,index) in gradeList" :key="index">
                        <div class="flex-between fen-title-be">
                            <span class="title-l">评分表{{index+1}}:{{item.testQuestionsName}}</span>
                            <span class="title-r">评分老师：{{formattterName(item.scoreBy)}}</span>
                        </div>
                        <table class="fen-table" border="0">
                            <tr>
                                <th style="width:80px">序号</th>
                                <th style="width:70%">评分项</th>
                                <th style="width:120px">分值</th>
                                <th style="width:120px">得分</th>
                            </tr>
                            <tr v-for="(scoing,index1) in item.children" :key="index1">
                                <td>{{index1+1}}</td>
                                <td>{{scoing.testQuestionsName}}</td>
                                <td>{{scoing.points}}</td>
                                <td>
                                    <el-input type="number" v-if="!scoreEdir" :disabled='scoreEdir' style="width:100%;text-align:center;" v-model="scoing.score"></el-input>
                                    <span v-if="scoreEdir">{{scoing.score}}</span>
                                </td>
                            </tr>
                            <tr class="content-all">
                                <td colspan="2" class="content-tent">合计</td>
                                <td v-if='item.children.length==0'>{{ item.points}}</td>
                                <td v-if='item.children.length==0'>{{item.score }}</td>
                                <td v-if='item.children.length!=0'>{{ sumScore(item.children, "points") }}</td>
                                <td v-if='item.children.length!=0'>{{ sumScore(item.children, "score") }}</td>
                            </tr>
                        </table>
                        
                    </div>
                    <div class="fuj">
                        附件：
                        <a target='blank' :href="$api.serverUrl+'/'+nowTor.url">{{nowTor.urlName}}</a>
                    </div>
                </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="treSave">确 定</el-button>
                <el-button @click="ediVisible=false">取 消</el-button>
            </span>
        </el-dialog>
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
import builds from '@/components/build/build'
export default {
    components:{
        builds
        // resources,userms,rolems,operatingms
        
    },
    data(){
        return{
            mainData:[],
            topName:"",
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
            },
            total:0,
            dialogVisible:false,
            gradeList:[],
            ediVisible:false,
            nowData:{
                'subjectId':0,
                'resultName':''
            },
            pdfUrl:'',
            delVisible:false,
            setData:{},
            scoreEdir:true,
            nowTor:{},
            namelist:[]
        }
    },
    created(){
        this.getNamelist()
    },
    methods:{
        getBuildId(data){
            console.log(data)
            this.nowData.subjectId=data;
            this.getNowsub(this.nowData.subjectId)
            this.initGetlist()
        },
        //初始化列表
        initGetlist(){
            this.pagination.size=10
            this.pagination.currentPage=1
            this.getList()
        },
        getList(){
            let that=this;
            let params={
                "resultName": this.nowData.resultName,
                "subjectId": this.nowData.subjectId,
                "pageSize": this.pagination.size,
                "pageIndex": this.pagination.currentPage
            }
            this.$api.Training.getScoreResultList(params).then(res=>{
               that.mainData=res.data.result
                that.pagination.total=res.data.total
            }).catch((error) => {
                console.error(error);
            })
        },
        //获取用户列表
        getNamelist(){
            let that=this;
            this.$api.User.getUserList().then(res=>{
                if(res.data.success){
                    that.namelist=res.data.result
                }else{
                    that.$message(res.data.msg)
                }
            }).catch((error) => {
                console.error(error);
            })
        },
        //用户id对应名称
        formattterName(cellValue){
            for(let i=0;i<this.namelist.length;i++){
                if(this.namelist[i].userId==cellValue){
                    return this.namelist[i].loginId
                }
            }
        },
        //获取成绩
        getPractice(){
            let that=this;
            this.$api.Training.getSgTeaching(this.setData.practiceId).then(res=>{
               console.log(res.data)
               that.nowTor=res.data.result;
               if(that.nowTor.urlName.indexOf('.pdf')<0){
                   that.$message('当前任务书不是pdf文件不能展示！')
               }else{
                   that.pdfUrl=that.$api.serverUrl+'/'+ encodeURI(this.nowTor.url)
               }
            }).catch((error) => {
                console.error(error);
            })
        },
        //导出成绩
        exportData(){
            let params={
                "ResultName":this.nowData.resultName,   
                "SubjectId":this.nowData.subjectId,
                "ScoreBy":localStorage.getItem('userIds'),
                "pageSize":0,
                "pageIndex":0
            }
            if(this.mainData.length==0){
                this.$message('当前数据为空！')
            }else{
                window.location.href=`${this.$api.serverUrl}/Practice/ExportExcelScoreResult?ResultName=${params.ResultName}&SubjectId=${params.SubjectId}&UserId=${params.UserId}&pageSize=${params.pageSize}&pageIndex=${params.pageIndex}`
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
        //获取任务书评分
        getTest(item){
            this.ediVisible=true;
            let that=this;
            this.setData=item
            this.getPractice();//获取资源路径
            let params={
                "PracticeId":item.practiceId,
                "UserId":item.userId
            }
            console.log(this.setData)
            this.$api.Training.getScoreTreeList(params).then(res=>{
               console.log(res.data)
               that.gradeList=res.data.result
            }).catch((error) => {
                console.error(error);
            })
        },
        //编辑分数
        treSave(){
            let that=this;
            console.log(this.gradeList)
            this.$api.Training.updatecore(this.gradeList).then(res=>{
                if(res.data.success){
                    console.log(res.data)
                    that.$message.success("已修改评分分数！");
                    that.ediVisible=false;
                    that.initGetlist()
                }else{
                    that.$message.success(res.data.msg);
                }
            }).catch((error) => {
                console.error(error);
            })
        },
        //删除成绩
        delEm(item){
            this.delVisible=true;
            this.setData=item
            console.log(item)
        },
        delSave(){
            let that=this;
            this.$api.Training.deleteScoreresult(this.setData.scoreResultId).then(res=>{
               console.log(res.data)
               if(res.data.success){
                    that.delVisible=false
                    that.initGetlist()
                    that.$message.success('删除成功！')
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
        format(shijianchuo){
            function add0(m){
				return m<10?'0'+m:m;
			}
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+add0(m)+'-'+d+'  '+h+':'+add0(mm);
        },
        //获取当前课题
        getNowsub(id){
            let that=this
            this.$api.Training.getSgSubject(id).then(res=>{
                that.topName=res.data.result.subjectName
                console.log(res.data)
            }).catch((error) => {
                console.error(error);
            }) 
        },
    }
}
</script>
<style lang="scss">
    .load{
        margin: auto;
        padding-top: 22px;
        text-align: center;
        .el-input{
            display: inline-block;
            width: 415px;
            margin-bottom: 20px;
        }
        .el-textarea {
            width: 415px;
            height:100px;
            display: inline-block;
            vertical-align: top;
        }
        .save{
            background: #ed6842;
            color: #fff;
            padding: 10px 42px;
            clear: both;
            margin-bottom: 5px;
        }
        .cancel{
            margin-left: 20px;
            padding: 10px 42px;
            background: #909399;
            color: #fff;
            span{
                color: #fff;
            }
        }
        .save-text{
            color: #acacac;
            font-size: 12px;
            margin-top: 20px;
            span{
                color: #ed6842;
            }
        }
    }
    .table-left{
        .cell{
            display: flex;
            align-items: center;
        }
        .video-img{
            vertical-align: top;
            width: 144px;
            height: 80px;
            position: relative;
            display: inline-block;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .video-text{
            padding: 5px 0 5px 10px;
            font-size: 12px;
            display: inline-block;
            width: 220px;
            .video-text-title{
                font-size: 14px;
                color: #333;
                margin-bottom: 6px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .video-text-time {
                margin-bottom: 4px;
            }
            .video-text-dif, .video-text-time {
                color: #848484;
            }
        }
    }
</style>