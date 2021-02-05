<template>
	<div class="filedetail">
		<hea :isshow=1></hea>
		<div class="file-wapper">
			<div class="auto">
				<div class="play-top border-b">
					<router-link to="/videolist">文件列表</router-link> &gt; <span>文件详情</span>
				</div>
				<div class="file clearfix" >	
					<p class="file-name">{{play.name}}</p>			 	
					<div class="file-text">
						<div class="file-img">
							<img :src="typesrc()">
						</div>
						<p class="file-b">
							<span class="padding-r" @click="down"><i class="el-icon-videoxiazai"></i> 下载</span>
							<span  @click="upqr"><i class="el-icon-videofenxiang"></i> 分享</span>
						</p>
						<span class="hot hot-t"><i class="el-icon-view"></i> {{play.click}}</span>
						<span class="hot hot-b"><i class="el-icon-videoxiaoxi"></i> {{commentNum}}</span>
					</div>
					<comment v-on:childMethod="parentMethod" :fileid=parseInt(this.$route.params.id)></comment>
				</div>

			</div>	
		</div>
		<!--QR-->
		<div class="qrCode" v-show="showqr">
			<p class="qrdowload" ><span>手机扫描下载查看</span> <i class="el-icon-error fr" @click="qrHidden"></i></p>
	        <canvas id="canvas"></canvas>
			<p class="downqr" @click="downImg">下载二维码</p>
		</div> 
	</div>
</template>

<script>
	import server from '@/server/server.js'
	import ajax from "@/server/ajax.js"
	import control from "@/server/control.js"
	import hea from './header'
	import qrcode from 'qrcode';
	import navlist from './nav'
	import comment from './comment/comment'
	export default{
		name:'filedetail',
		components:{
	    	hea,
	    	navlist,
	    	comment
	    },
	    data(){
	    	return {
				showqr:false,
				commentNum:'',
				downqr:'',
				play:{
					click:'',//点击数
					surl:'',
					filepic:'',
					description:'',
					name:'',
					inserttime:'',
					inseryby:'',
				},
				downimgname:''
	    		// src:'http://192.168.5.169:8080'+this.$route.params.src
	    	}
			},
			created(){
				this.playShow();
			},
	    methods:{
				//根据id获取信息
				playShow(){
					const _this=this;
					ajax({
						url:'file/'+_this.$route.params.id,
					}).then(function(res){
						_this.play.click=res.result.click;
						_this.play.surl=_this.src+res.result.path;
						_this.play.filepic=_this.src+res.result.filepic;
						_this.play.description=res.result.description;
						_this.play.name=res.result.name;
						_this.play.inserttime=res.result.inserttime;
						_this.play.inseryby=res.result.inseryby;
						// console.log(_this.play.name)
						// console.log(_this.play.surl)
					})
				},
				//评论数
				parentMethod(parm){
					// console.log(parm)
					this.commentNum=parm//评论数
					// console.log(parm) 
				},
	    	getsrc(){
	    		return this.$route.params.src
	    	},
	    	typesrc(){
	    		if(this.$route.params.type=='.doc'){
						return require("../images/file_05.png")
					}else if(this.$route.params.type=='.xs'){
						return require("../images/file_07.png")
					}else if(this.$route.params.type=='.pptx'){
						return require("../images/file_09.png")
					}else{
						return require("../images/file_11.png")
				}
			},
			//下载
			down(){
				var _this=this;
				var path=this.$route.params.src;
				var type=this.$route.params.type;
				var name=encodeURI(this.play.name)
				_this.qrSrc="http://"+server.ip+":"+server.port+"/file/downloads/?path="+path+"&type="+type+"&filenames="+this.play.name;
				window.open(encodeURI(_this.qrSrc))
			},
			//二维码生成
			upqr(){
				var _this=this;
				var canvas = document.getElementById('canvas')
				var path=this.$route.params.src;
				var type=this.$route.params.type;
				
				// 修改
				// var qrSrc="/file/downloads/?path="+path+"&type="+type;
				this.qrSrc="http://"+control.ip+":"+control.port+"/#/linkqr/"+this.$route.params.id; 
				this.$router.push({name:'linkqr',params:{id:this.$route.params.id}})

				
				// _this.qrSrc="http://"+server.ip+":"+server.port+"/file/downloads/?path="+path+"&type="+type+""
				// console.log(this.qrSrc)
				_this.showqr=true;
				qrcode.toCanvas(canvas, this.qrSrc, function (error) {
		           if (error) console.error(error)
		           // console.log('qrcode success!');
				})
				this.downqr=canvas.toDataURL("image/png");
				this.downimgname=this.play.name;
			},
			//下载二维码
			downImg(){
				var alink = document.createElement("a");
				alink.href = this.downqr;//图片地址
				alink.download = this.downimgname;//图片名
				alink.click();
				// console.log(this.downqr)
			},
			qrHidden(){//二维码隐藏
				this.showqr=false;
			},
			

		} 
	}
</script>
	
<style scoped>
	.filedetail{min-height: 100%;}
	/*.play-wapper{background: #434343;}*/
	.play-top{font-size: 18px;padding: 30px 0 14px 0;color: #333;}
	.play-top a{color: #333;}
	.file{margin: 76px auto;max-width: 832px;}
	.file-text{width: 174px;margin: auto;position: relative;margin-bottom: 62px;}
	.file-img img{width: 100%;}
	.padding-r{padding-right: 24px;}
	.file-b{text-align: center;color: #353434;margin-top: 10px;}
	.hot{position: absolute;right: -58px;top: 0;color: #dadada}
	.hot-b{top:36px;}
	.file-name{text-align: center;color: #333;padding: 2px 0 8px 0;}
</style>