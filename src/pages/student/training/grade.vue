<template>
    <div class="content-wapper auto-w">
        <div class="content-left">
            <builds @buildId="getBuildId" url='training'></builds>
        </div>
        <div class="content-right content-right-mar">
            <div class="margin-bot ">
                <div class="item-title">
                    {{topName}}
                </div>
                <div class="m-top clearfix">
                    <div class="m-left fl">
                        <!-- <el-checkbox >全选</el-checkbox> -->
                        <button class="button-auto button-delete">删除</button>
                        <!-- <button class="button-add margin-l6" @click="dialogVisible=true">添加</button> -->
                    </div>
                    <div class="m-right fr">
                        <el-input
                            placeholder="请输入关键字"
                            suffix-icon="el-icon-search"
                            v-model="nowData.resultName"
                            >
                            <div class="sou-w" @click="initGetlist">搜索</div>
                        </el-input>
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
                    type="index" 
                    :index="getIndex"
                    label="序号"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="userName"
                    width="150"
                    label="学生名称">
                    </el-table-column>
                    <el-table-column
                    prop="resultName"
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
                    label="时间">
                    </el-table-column>
                    <el-table-column
                    className="caozuo"
                    width="80"
                    label="操作">
                        <template slot-scope="scope">

                            <div class="video-control">
                                <el-button type="text" @click="setEm(scope.row)">查看</el-button>
                                <!-- <div  class="video-control-top"></div> -->
                                <!-- <el-button type="text" @click="delEm(scope.row)">删除<i class="el-icon-delete"></i></el-button> -->
                            </div>
                        </template>     
                    </el-table-column>
                </el-table>
                <div class="page-control clearfix" v-show="total>=0">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        prev-text='上一页'
                        next-text='下一页'
                        :page-size="pagination.size"
                        layout="prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 弹出层 -->
        <el-dialog
            v-dialogDrag
            title="查看详情"
            :visible.sync="dialogVisible"
            width="40%"
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                   fsdafasf
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEm">确 定</el-button>
                <el-button @click="dialogVisible=false">取 消</el-button>
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
            mainData:[{}],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
            },
            total:0,
            nowData:{
                "subjectId":0,
                "resultName":''
            },
            topName:'',
            dialogVisible:false,
        }
    },
    methods:{

        getBuildId(data){
            console.log(data)
            this.nowData.subjectId=data;
            this.getList()
            this.getNowsub(data)
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
        setEm(item){
            this.$router.push({name:'trainingDetail',params:{id:item.practiceId}})	
        },
        initGetlist(){
            this.pagination.currentPage=1
            this.pagination.size=20
            this.getList();
        },
        getList(){
            let that=this;
            let params={
                "resultName": this.nowData.resultName,
                "subjectId": this.nowData.subjectId,
                "pageSize": this.pagination.size,
                "userId": localStorage.getItem('userIds'),
                "pageIndex": this.pagination.currentPage
            }
            this.$api.Training.getScoreResultList(params).then(res=>{
               that.mainData=res.data.result
                that.pagination.total=res.data.total
            }).catch((error) => {
                console.error(error);
            })
        },
        formateDatetime(row, column, cellValue, index){
            return this.$api.formateDate(cellValue)
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