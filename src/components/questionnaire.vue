<template>
    <div class="questionnaire">
        <div class="questionnaire-wapper">
            <div class="questionnaire-title">{{titleName}}</div>
            <p class="thank">(感谢您能抽出时间参与本问卷的调查，你的意见和建议对此次调查非常重要，希望你能如实填写，谢谢。)</p>
            <!-- 问题 -->
            <div class="problem-control" v-for="(item1,index1) in qsList" :key="index1">
                <div class="problem-title">{{index1+1}}.{{item1.quesdesc}}</div>
                <div class="radios" v-for="(item2,index2) in item1.type.split(',')" :key="index2">
                    <p class="problem-label">
                        <label>
                            <input type="radio" :name="item1.id" @change="radioChange(item1.id,item1.type.split(',')[index2],index1)">
                            <span class="labledefalt"></span>
                            {{item2}}
                        </label>
                    </p>
                    <!-- <p class="problem-label"><el-radio v-model="radio" label="2">备选项</el-radio></p> -->
                </div>
            </div>
            <div class="problem-last">
                <p>(注)如您对问卷还有别的想法,请填写问题提交反馈：</p>
                <div class="problem-textarea">
                   
                    <textarea name="" cols="30" rows="10" placeholder="请输入问题...." v-model="otherQ"></textarea>
                    
                </div>
            </div>
            <p class="btn-commit">
                <button class="button-add" @click="admit()">完成提交</button>
            </p>
        </div>
        
    </div>
</template>
<script>
import storage from '../store.js'
import server from '@/server/server.js'
import ajax from "@/server/ajax.js"
export default {
    name:'questionnaire', 
    data(){
        return{
            radio:'',
            qsList:'',
            titleName:'',
            otherQ:'',
            listFrom:[],//问题数据
            addu:{
                qusdesc:'',
                surveryRreplies:''
            },
            localCortrol:'',
            commits:false,
            quesdesc:'',

        }
    },
    mounted(){
        this.showSurvey();  
    },
    created(){
    },
    methods:{
        //获取问卷
        showSurvey(){
            const _this=this;
            ajax({
                url:'surveryinfo/selectvplist',
                data:{id:this.$route.params.num}
            }).then(function(res){
                console.log(res)
                _this.qsList=res.result[0].infos;
                for(var i=0;i<_this.qsList.length;i++){//传参数据
                    _this.listFrom.push({
                        "answer": "",
                        "id": _this.qsList[i].id,
                        "inserttime": Date.parse(new Date()),
                        "questionid": _this.qsList[i].questionid,
                        "surveryid": _this.qsList[i].surveryinfoid
                    })    
                }  

                _this.titleName=res.result[0].name
            })
        },
        //单选框变化
        radioChange(num,type,index){
            this.listFrom[index].answer=type
        },
        //提交问卷
        admit(){
            const _this=this;
            this.addu.qusdesc=this.otherQ;
            this.addu.surveryRreplies=this.listFrom;
            // console.log(this.addu)
            
        //    if(localStorage.getItem('localCortrol')==this.$route.params.num){
        //        this.$message({
        //             showClose: true,
        //             message: '您已经提交过该问卷啦!',
        //             type: 'warning'
        //         })
        //    }else{
               for(let i=0;i<this.listFrom.length;i++){
                    if(this.listFrom[i].answer==""){
                        this.$message({
                            showClose: true,
                            message: '答案都是必选项喔!',
                            type: 'error'
                        });
                        return false;
                    }else{
                        this.commits=true;     
                    }
                }
                if(this.commits==true){
                    // console.log(_this.addu)
                    ajax({
                        type:'POST',
                        url:'surveryreply/add',
                        data:JSON.stringify(_this.addu),
                        contentType: "application/json;charset=UTF-8"
                    }).then(function(res){
                        // localStorage.setItem("localCortrol",_this.$route.params.num)//本地储存禁止用户反复提交 
                        for(let i=0;i<_this.listFrom.length;i++){
                            _this.listFrom[i].answer=""
                        }
                        window.location.reload();
                        alert("问卷提交成功! 感谢您的参与!")
                        return false;   
                    },function(err){
                        _this.$message.error('问卷提交失败!请联系管理员查明原因!');
                    })
                } 
        //    } 
        }
    },
}
</script>

<style>
 html{min-width: 300px;}
.questionnaire{max-width: 800px;margin: auto;margin-bottom: 50px;width: 100%;box-shadow: 0 0 10px #ccc;border-radius: 20px;color:#484848;background: #fbfbfb;border-bottom: 34px solid #f9d09d;border-top: 34px solid #f9d09d;}
.questionnaire-wapper{padding: 20px 14px;}
.questionnaire-wapper .problem-control p{margin-top: 10px;}
.questionnaire-wapper .problem-label label{border: 1px solid #ccc;padding: 8px 4px;display: block;border-radius: 5px;}
.questionnaire-wapper .problem-label label input[type='radio']:checked{background-color: red}
.questionnaire-wapper .problem-label .is-checked{border: 1px solid red;background-color: rgba(241, 199, 156, 0.2); } 
.questionnaire-title{color:#484848;font-size: 18px;font-weight:bold;text-align: center;margin-bottom: 18px;}
.problem-control{padding: 12px 0;margin-bottom: 10px;}
.problem-title{font-size: 18px;}
.problem-last{font-size: 0;}
.problem-last{margin-top:20px; }
.thank{font-size: 14px;border-bottom: 2px dashed #ccc;border-top: 2px dashed #ccc;padding: 18px 8px;margin-bottom: 18px;}
.problem-last p{font-size: 14px;line-height: 20px;margin-bottom: 8px;}
.problem-last .problem-textarea{width: 100%;border-radius: 20px;border: 1px solid #ccc;padding: 12px 8px;}
.problem-last .problem-textarea textarea{resize: none;border: none;width: 100%;font-size: 14px;color: #333;background: #fbfbfb;}
.btn-commit{padding: 20px 0;text-align: right;}
.btn-commit .button-add{border-radius: 5px;}
/* 修改单选框选中 */
.questionnaire input[type="radio"]+.labledefalt::before{
    content: "\a0";
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    border-radius: 50%;
    text-indent: .15em;
    margin-bottom: 4px;
    border: 1px solid #f9d09d;
}
.questionnaire input[type="radio"]:checked+.labledefalt::before{
    background-color: #f9d09d;
    background-clip: content-box;
    padding: 2px;
}
.questionnaire input[type="radio"]{
    position: absolute;
    clip: rect(0, 0, 0, 0);
}
.questionnaire .radio-inline{
    padding-left: 0;
}
.questionnaire input[type=radio][disabled]:checked+.labledefalt::before{
    background-color:#CCCCCC;
    background-clip: content-box;
    padding: 2px;
}

</style>
