<!--实训管理-->
<template>
  <div class="all-wapper" style="overflow:auto;">
    <hea :isshow="1" v-if="!nowChoose"></hea>
    <teahea :isshow="1" v-else></teahea>
    <div class="header-topimg">
      <div class="auto">
        <div class="felx-wapper list-tag">
          <p class="flex-wapper-width">
            <span>文件列表</span>&gt;<span>{{nowUrl=='Teaching'?nowData.teachingName:(nowUrl=='Training'?nowData.practiceName:nowData.competitionName)}}</span>
          </p>
          <p>
            <el-button type="primary" @click="down" v-if="nowData.classId==3&&!nowChoose||nowChoose"
              >下载<i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </p>
        </div>
        <div class="felx-wapper align-top">
          <div class="felx-wapper flex-wapper-width">
            <div class="felx-wapper-l">
              <img src="@/images/teacher.png" alt="" />
            </div>
            <div class="felx-wapper-r">
              <p><span>日期：</span>{{formateDatetime(nowData.createTime)}}</p>
              <p><span>分类：</span>{{formattterRole(nowData.classId)}}</p>
              <p><span>上传：</span>{{formattterName(nowData.createBy)}}</p>
            </div>
          </div>
          <!-- <div class="flex-wapper-content">发生的发大水发大水发大水发生的发的说法撒旦法撒旦法</div> -->
          <slot name="banner-right"></slot>
        </div>
      </div>
    </div>
    <div class="document-show-content">
        <div class="document-show-top" v-show="nowData.classId!==4" style="height:100%;">
          <div v-if="pdfShow"  style="height:100%;">
            <pdf 
            class="pdf-if" 
              ref="pdf"
              v-for="i in numPages"
              :key="i"
              :src="pdfUrl"
              :page="i">
            </pdf>
            <!-- <iframe class="pdf-if" :src="pdfUrl" align="center"  style="height:100%;"></iframe> -->
          </div>
          <div v-if="!pdfShow&&nowData.urlName">
            <img :src="srcCotrol(nowData.urlName)" alt="">
            <P><span>{{nowData.urlName}}</span></P>
          </div>
        </div>
        
        <div class="paf-waper" v-if="nowData.classId==4" >
           <pdf 
            class="pdf-if" 
              ref="pdf"
              v-for="i in numPages"
              :key="i"
              :src="pdfUrl"
              :page="i">
            </pdf>
          <!-- <iframe class="pdf-if" :src="pdfUrl" align="center"></iframe> -->
        </div>
    </div>
    <slot name="content"></slot>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
import hea from "@/components/headers/stu_header";
import teahea from "@/components/headers/header";
import navlist from "@/components/nav";
export default {
  components: {
    hea,
    navlist,teahea,pdf
  },
  data() {
    return {
      nowUrl:'',
      nowData:{},
      classList:[],
      pdfUrl:'',
      namelist:[],
      nowChoose:false,
      pdfShow:false,
      numPages:1
    };
  },
  mounted(){
    let url=window.location.href;
    console.log(url)
    if(url.indexOf('teacher')>-1){
      this.nowChoose=true
    }else{
      this.nowChoose=false
    }
    if(url.indexOf('teaching')>-1){//教学
      this.nowUrl='Teaching'
    }else if(url.indexOf('competition')>-1){//竞赛
      this.nowUrl='Competition'
    }else if(url.indexOf('training')>-1){//实训
      this.nowUrl='Training'
    }
    this.getNowtor()
    this.getClass()
    this.getNamelist()
  },
  methods: {
    //下载
    down(url) {
      window.location.href = this.$api.serverUrl+'/'+this.nowData.url;
    },
    //pdf资源
    pdfTask(pdfUrl){
        var that = this
        var loadingTask = pdf.createLoadingTask(pdfUrl)  
        loadingTask.promise.then(pdf => {
          that.pdfUrl = loadingTask
          that.numPages = pdf.numPages
        }).catch((err) => {
          console.error('pdf加载失败')
      })
      },
    //获取当前资源
    getNowtor(){
      let that=this
      this.$api[this.nowUrl].getSgTeaching(this.$route.params.id).then(res=>{
          that.nowData=res.data.result
          that.pdfUrl=that.$api.serverUrl+'/'+that.nowData.url;
          that.pdfTask(that.pdfUrl)
          if(this.nowData.urlName.indexOf('.pdf')>-1){
            this.pdfShow=true
          }
      }).catch((error) => {
          console.error(error);
      })
    },
    getClass(){
        let that=this;
        this.$api[this.nowUrl].getType().then(res=>{
            that.classList=res.data.result
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
    //缩略图
    srcCotrol(list){
        var type=list.slice(list.lastIndexOf('.'),list.length)
        var src=list;
        //给图片
        if(type=='.png'||type=='.PNG'||type=='.jpg'||type=='.JPG'||type=='.JPEG'||type=='.jpeg'){
          return this.$api.serverUrl+'/'+this.nowData.url;
        }else if(type=='.doc'||type=='.docx'){
            return require("../images/file_05.png")
        }else if(type=='.xs'){
            return require("../images/file_07.png")
        }else if(type=='.pptx'||type=='.ppt'){
            return require("../images/file_09.png")
        }else{
            return require("../images/file_11.png")
        }
    },
    //转换权限名称
    formattterRole(cellValue){
        for(let i=0;i<this.classList.length;i++){
            if(this.classList[i].classId==cellValue){
                return this.classList[i].className
            }
        }
    },
    formateDatetime(cellValue){
          return this.$api.formateDate(cellValue)
    },
  },
};
</script>
<style lang="scss">
.header-topimg{
  background: url('../images/banner.png');
}
.list-tag {
  padding: 30px 0;
}
.document-show-content {
  width: 80%;
  margin: 20px auto;
  text-align: center;
}
.paf-waper{
  // min-height: 500px;
  
}
.pdf-if{
    // min-height: 500px;
    -moz-user-select:none;
 -webkit-user-select: none;
-ms-user-select: none;
    width: 100%;
  }
</style>