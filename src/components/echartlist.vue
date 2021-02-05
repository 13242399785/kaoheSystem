<template>
	<div class="echarlist">
		<hea :isshow=1></hea>
		<div class="echarlist-wapper">
			<div class="auto">
				<div class="play-top border-b">
					<router-link to="/vmanagement">文件列表</router-link> &gt; <span>查看分析</span>
				</div>
				<div class="echarlists clearfix" id="myechart" style="width:100%;height:500px;">				 	
					
				</div>
				<div class="moreL">最多查看分析图形表</div>
			</div>	
		</div>

	</div>
</template>

<script>
	import server from '@/server/server.js'
	import ajax from "@/server/ajax.js";
	// import {goback} from "@/js/goback.js";
	import hea from './header'
	import qrcode from 'qrcode';
	import navlist from './nav'
	import comment from './comment/comment'
	import Vue from 'vue'
	const echarts=require('echarts')
	// import echarts from 'echarts'
	Vue.prototype.$echarts = echarts;
	export default{
		name:'echarlist',
		data(){
			return {
				listOptions:[],
				resultList:[],
				source:['product', '查看次数', '评论次数'],
				sources:[],
			}
		},
		components:{
	    	hea,
	    	navlist,
	    	comment
		},
		mounted(){
			this.echartShow();
			// goback();
		},
		methods:{
			echartShow(){
				const _this=this;	
				//最多查看接口
				ajax({
					url:'file/selectByClick',
					data:{page:1,size:10}
				}).then(function(res){
					// console.log(res.result.list)
					for(let i=0;i<res.result.list.length;i++){
						_this.listOptions.push(res.result.list[i].name,res.result.list[i].click,res.result.list[i].comment)	
					}
					for(var i=0;i<_this.listOptions.length;i+=3){
						_this.resultList.push(_this.listOptions.slice(i,i+3));//分割三个为一个数组
					}
					_this.resultList.unshift(_this.source)//插入第一条
					// console.log(_this.resultList)
					// _this.sources=_this.source.push(_this.resultList)
					// console.log(_this.sources)
				})

				var myChart=this.$echarts.init(document.getElementById('myechart'))
				setTimeout(function(){
					myChart.setOption({
						legend: {},
						tooltip: {},
						dataset: {
							source:_this.resultList
						},
						color: ['#f1904b', '#B5C334'],
						xAxis: {type: 'category',
							axisLabel: {  
								interval:0,  
								rotate:"10" 
							},
						},
						yAxis: {	
						},
						
						series: [
							{type: 'bar'},
							{type: 'bar'},
						]
					})
				},100)
					
				}
			}
	}
</script>
	
<style scoped>
	.echarlist{min-height: 100%;}
	.echarlists{padding-top: 50px;}
	.moreL{text-align: center;font-size: 26px;font-weight: bold}
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
</style>