<template>
	<div class="play">
		<hea :isshow=1></hea>
		<div class="play-wapper">
			<div class="auto">
				<div class="play-top">
					<router-link to="/videolist">文件列表</router-link> &gt; <span>视频播放</span>
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
		               :poster="play.filepic">
			          <!--type="application/x-mpegURL"-->
			          <source :src="playsrc">
			          <!-- <source src="../images/oceans.mp4"> -->
			          <p class="vjs-no-js">不支持播放</p>
		        	</video>
		        	<div class="play-text fr">
		        		<h3>{{play.name}}</h3>
		        		<p class="clearfix play-detail">
		        			<span class="fl">{{play.inseryby}}</span>
		        			<span class="fr">上传于：<span></span>{{format(play.inserttime)}}</span>
		        			<br/>
		        		</p>
		        		<div class="play-des">
		        			<p @click="playShow()">产品简介：</p>
			        		<p class="play-des-j">
			        			{{play.description}}
			        		</p>
		        		</div>	
		        	</div>
				</div>				
			</div>	
			<!-- 评论 -->
			<div class="play-comment">
				<div class="auto">
					<div class="play-control-c">
						<comment v-on:childMethod="parentMethod" :fileid=parseInt(this.$route.params.id)></comment>
					</div>	
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//在线播放
	import hea from './header'
	import server from '@/server/server.js'
	import ajax from "@/server/ajax.js"
	import navlist from './nav'
	import comment from './comment/comment'
	export default{
		name:'handle',
		components:{
	    	hea,
	    	navlist,
	    	comment
	    },
	    data(){
	    	return {	
					id:'',				
					src:'http://'+server.ip+":"+server.port,	
					playsrc:'http://'+server.ip+":"+server.port+this.$route.params.src,//用异步地址不能播放
					pointerImg: 'http://'+server.ip+":"+server.port+this.$route.params.pointerImg,  
					play:{
						click:'',//点击数
						surl:'',
						filepic:'',
						description:'',
						name:'',
						inserttime:'',
						inseryby:'',
					}
	    	}
			},
			mounted(){
				this.id=parseInt(this.$route.params.id)
			},
			created(){
				this.playShow();
			},
	    methods:{
				yanshi(){
					const _this=this;
					setTimeout(function(){
						return _this.play.src;
					},100)
				},
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
						// console.log(_this.play.surl)
					})
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
		line-height: 24px;
	}
	.play-des-j{text-align: justify;text-indent: 2em;}
</style>