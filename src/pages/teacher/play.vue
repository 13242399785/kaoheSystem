<template>
	<div class="play">
		<hea :isshow=1></hea>
		<div class="play-wapper">
			<div class="auto">
				<div class="play-top">
					<router-link to="/home/teacher">文件列表</router-link> &gt; <span>视频播放</span>
				</div>
				<div class="play-video clearfix" >
				 	<video ref="viodeRef" id="video"
		               class="video-js vjs-default-skin vjs-big-play-centered"
		               controls
		               preload="auto"
									 autoplay
		               width="100%"
		               controlsList="nodownload"
		               height="auto"
		               :poster="nowVideo.url">
			          <!--type="application/x-mpegURL"-->
			          <source v-if="playControl" :src="playsrc">
			          <!-- <source src="../images/oceans.mp4"> -->
			          <p class="vjs-no-js">不支持播放</p>
		        	</video>
					
		        	<div class="play-text fr">
		        		<h3>{{nowVideo.teachingName}}</h3>
		        		<p class="clearfix play-detail">
		        			<span class="fl">{{nowVideo.createBy}}</span>
		        			<span class="fr">上传于：<span></span>{{format(nowVideo.createTime)}}</span>
		        			<br/>
		        		</p>
		        		<div class="play-des">
		        			<p class="goods-dec">产品简介：</p>
			        		<p class="play-des-j">
			        			{{nowVideo.remarks}}
			        		</p>
		        		</div>	
		        	</div>
					<div class="video-cotrol clearfix">
						<p class="fl">
							<span class="hot hot-t"><i class="el-icon-view"></i> {{play.click}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
							<span class="hot hot-b"><i class="el-icon-videoxiaoxi"></i> {{commentNum}}</span>
						</p>
						<span class="padding-r" @click="down"><i class="el-icon-videoxiazai"></i> 下载</span>&nbsp;&nbsp;&nbsp;&nbsp;
						<span  @click="upqr"><i class="el-icon-videofenxiang"></i> 在线分享</span>
					</div>
				</div>				
			</div>	
			
		</div>
		<!--QR-->
		<div class="qrCode" v-show="showqr">
			<p class="qrdowload" ><span>手机扫描可在线查看</span> <i class="el-icon-error fr" @click="qrHidden"></i></p>
	        <canvas id="canvas"></canvas>
			<p class="downqr" @click="downImg">下载二维码</p>
		</div> 
	</div>
</template>

<script>
	import hea from '@/components/headers/header'
	import server from '@/server/server.js'
	import qrcode from 'qrcode'
	// import comment from './comment/comment'
	export default{
		name:'handle',
		components:{
	    	hea,
	    },
	    data(){
	    	return {	
				id:'',				
				src:'http://'+server.ip+":"+server.port,	
				playsrc:'',//用异步地址不能播放
				pointerImg: 'http://'+server.ip+":"+server.port+this.$route.params.pointerImg,  
				play:{
					click:'',//点击数
					surl:'',
					filepic:'',
					description:'',
					name:'',
					inserttime:'',
					inseryby:'',
                },
                nowVideo:{
                    
                },
				commentNum:'',
                showqr:false,
                playControl:false
	    	}
		},
		mounted(){
			this.id=parseInt(this.$route.params.id)
		},
		created(){
			this.playShow();
		},
		methods:{
			//下载
			down(){
				// console.log(this.$route.params.type)
				var _this=this;
				var path=this.$route.params.src;
				var type=this.$route.params.type;
				_this.qrSrc="http://"+server.ip+":"+server.port+"/file/downloads/?path="+path+"&type="+type+""+"&filenames="+this.play.name;
				window.open(_this.qrSrc)
			},
			//二维码生成
			upqr(){
				var _this=this;
				var canvas = document.getElementById('canvas')
				var path=this.$route.params.src;
				var type=this.$route.params.type;

				//直接跳到视频的地址实现在线播放
				// _this.qrSrc='http://'+server.ip+":"+server.port+this.$route.params.src; 
				this.qrSrc="http://"+server.ip+":"+server.port+"/#/linkqr/"+this.$route.params.id;
				this.$router.push({name:'linkqr',params:{id:this.$route.params.id}})

				_this.showqr=true;
				// console.log(_this.qrSrc)
				qrcode.toCanvas(canvas, _this.qrSrc, function (error) {
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
			yanshi(){
				const _this=this;
				setTimeout(function(){
					return _this.play.src;
				},100)
			},
			//根据id获取信息
			playShow(){
                let that=this
                this.$api.Teaching.getSgTeaching(this.$route.params.id).then(res=>{
                    that.nowVideo=res.data.result
                    console.log(res.data)
                    that.playControl=true;
                    that.playsrc='http://192.168.5.147:8080/apis/'+that.nowVideo.url
                }).catch((error) => {
                    console.error(error);
                }) 
				// ajax({
				// 	url:'file/'+_this.$route.params.id,
				// }).then(function(res){
				// 	_this.play.click=res.result.click;
				// 	_this.play.surl=_this.src+res.result.path;
				// 	_this.play.filepic=_this.src+res.result.filepic;
				// 	_this.play.description=res.result.description;
				// 	_this.play.name=res.result.name;
				// 	_this.play.inserttime=res.result.inserttime;
				// 	_this.play.inseryby=res.result.inseryby;
				// 	// console.log(_this.play.surl)
				// })
			},
			// getsrc(){
			// 	return this.$route.params.src
			// },
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
			parentMethod(parm){
				this.commentNum=parm//评论数
			}
		} 
	}
</script>
	
<style scoped>

	.play{background: #434343;min-height: 100%;}
	.play-video{min-width: 1300px;}
	.play-comment{background: #fff;padding: 18px 0 90px 0}
	.play-control-c{width: 830px;}
	/*.play-wapper{background: #434343;}*/
	.play-top{font-size: 18px;color: #fff;border-bottom: 1px solid #fff;padding: 30px 0 14px 0;}
	.play-top a{color: #fff;}
	.play-video{background: #313131;padding: 30px;margin-top: 26px;}
	#video{width: 930px;height: auto;max-height:720px;}
	.play-text{color: #fff;font-size: 16px;width: 272px;}
	.play-text  h3{font-size: 20px;line-height: 36px;overflow: auto;}
	.play-text .play-detail{color:#7a7a7a;font-size: 12px;padding-top: 4px;}
	.play-des{
		padding-top: 40px;
		line-height: 20px;
		font-size: 14px;
	}
	.play-des .goods-dec{font-size: 16px;margin-bottom: 8px;}
	.play-des-j{text-align: justify;text-indent: 2em;}
	.video-cotrol{color: #fff;font-size: 14px;text-align: right;width: 930px;padding-top: 6px;}
</style>