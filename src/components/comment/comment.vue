<template>
  <div class="comment clearfix">
      <div class="comment-detail">
       <el-input name="filedescription" v-model="comments.content" type="textarea" placeholder="期待您的评论"></el-input>
      </div>
      <p class="text-r">
        <button class="save" @click="addComment">发表评论</button>
      </p>
      <div class="comment-all border-b" @click="callMethod">
        全部评论({{allComment}})
      </div>
      <div class="comment-none" v-show="!commentShow">
        该文件还没有相关评论，快来坐前排吧！
      </div>
      <ul class="comment-dec" v-show="commentShow">
        <li v-for="(list,index) in commentList" :key=index :data="commentList.slice((pages.currentPage-1)*pages.pagesize,pages.currentPage*pages.pagesize)">
          <p class="comment-t"><span class="username">{{list.username}}</span><span class="dec-middle">发表于</span><span>{{format(list.inserttime)}}</span></p>
          <p class="comment-b">{{list.content}}</p>
        </li>
      </ul>
      <!-- page -->
			<div class="page-control clearfix" v-show="total>5">
			    <el-pagination
			      @current-change="handleCurrentChange"
			      prev-text='上一页'
			      next-text='下一页'
			      :page-size="pages.pagesize"
			      layout="prev, pager, next"
			      :total="total">
			    </el-pagination>
			</div>
			<!-- page end -->
  </div>
</template>

<script>
import server from '@/server/server.js'
import ajax from "@/server/ajax.js";
import page from '../page/page'
export default {
  name: 'page',
  data () {
    return {
       detail:22,
       commentShow:false,
       allComment:'',
       commentList:'',
       total:0,
       comments:{
        "avatar": "string",
        "content": "",
        "fileid": 53,
        "id": 0,
        "inserttime": "",
        "state": 0,
        "userid": 16,
        "username": localStorage.getItem('username')
       },
       //评论数
       Parameters:{
         fileid:41,//文件id
         page:1,  //当前页码
         size:10  //每页显示评论条数
       },
       pages:{
	   			currentPage:1, //初始页
      		pagesize:10,   //每页的数据
	   	},
    }
  },
  props:{//父组件传过来的值
    fileid:Number,
    required: true
  },
  created(){
    // this.showcomment();
    // 
    // this.getComment();
    this.getComment(this.pages.currentPage,this.pages.pagesize);
  },
  mounted(){
    var that=this;
    setTimeout(function(){
      that.callMethod();
    },600)
    
  },
  methods:{
    //子传父
    callMethod(){
        const that=this;
        this.$emit('childMethod',that.allComment); //组件传参传方法  
        // console.log(that.allComment)          
    },
    //添加评论
    addComment(){
      const _this=this;
      _this.comments.fileid=_this.fileid;//当前文件id
      _this.comments.inserttime=_this.CurentTime();
      // console.log(_this.comments.fileid)
      //评论不能为空
      if(_this.comments.content.length<=0){
          _this.$message.error('请输入评论内容！');
      }else{
        ajax({
		   			type:'POST',
		   			url:'comment/addcomment',
		   			data:JSON.stringify(_this.comments),
					  contentType: "application/json;charset=UTF-8"
        }).then(function(res){
            //  console.log(res)
             _this.getComment();
             _this.comments.content="";
			        // console.log(_this.allUser)
		   		},function(err){
		   			// _this.$message.error('列表加载失败');
          })
      }
     
      
    },
    //分页获取评论
    getComment(pageCode,pagesize){
      const _this=this;
      _this.Parameters.fileid=_this.fileid;//当前文件id
      // console.log(_this.fileid)
       ajax({
		   			url:'comment/pageforComment',
		   			data:{fileid:_this.fileid,page:pageCode,size:pagesize},
					  // contentType: "application/json;charset=UTF-8"
		   		}).then(function(res){
             _this.total=res.result.total
             _this.allComment=res.result.total //评论条数
             _this.commentList=res.result.list;
            
             if(res.result.total==0){
               _this.commentShow=false;
             }else{
                _this.commentShow=true;
             }
            //  this.$emit('childByValue', _this.allComment)
			        // console.log(_this.allUser)
		   		},function(err){
		   			// _this.$message.error('列表加载失败');
		   		})
    },
    // //发表评论
    // comm(){
    //   console.log(111)
    // },
    //当前时间
    CurentTime()
    { 
      var now = new Date();
      var year = now.getFullYear();       //年
      var month = now.getMonth() + 1;     //月
      var day = now.getDate();            //日
      
      // var hh = now.getHours();            //时
      // var mm = now.getMinutes();          //分  
      var clock = year + "-";  
      if(month < 10)
          clock += "0";    
      clock += month + "-";      
      if(day < 10)
          clock += "0";           
      clock += day;
      // if(hh < 10)
      //     clock += "0";  
      // clock += hh + ":";
      // if (mm < 10) clock += '0'; 
      // clock += mm; 
      
      return(clock); 
    },
    //时间转化
		add0(m){
			return m<10?'0'+m:m;
		},
		format(shijianchuo)
		{
			var time = new Date(shijianchuo);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y+'-'+this.add0(m)+'-'+this.add0(d);
    },
     handleCurrentChange(val) {
      var _this=this;
      this.getComment(val, 10);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .comment .el-textarea .el-textarea__inner{resize:none;height: 76px}
  .text-r{text-align: right;}
  .comment .save{    background: #f3914a;color: #fff;padding: 10px 42px;clear: both;margin-top: 5px;}
  .comment .comment-all{color: #f3914a;padding-bottom: 8px}
  .comment-dec li{padding: 22px 10px 22px 0;border-bottom: 1px solid #d6d6d5}
  .comment-t{color: #a59fa5;margin-bottom: 10px;}
  .comment-t .username{color:#3c8be4;}
  .comment-t .dec-middle{padding: 0 14px;}
  .comment-none{font-size: 22px;color: #ccc;text-align: center;line-height: 30px;padding-top: 25px;}
</style>
