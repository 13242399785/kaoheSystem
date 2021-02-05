<template>
    <div class="linkqr">
        <!-- 下载扫描增加点击量 -->
        <div class="dow-go">
                <div class="dow-wapper">
                    <!-- <p class="dow-top">
                    温馨提示
                </p> -->
                <p class="dow-content">
                    是否跳转到地址？
                </p>
                <div class="dow-btn">
                    <button class="dow-cancel" @click="cancel">取消</button><button class="dow-confirm" @click="goDown">确定</button>
                </div>    
            </div>          
        </div>
    </div>
</template>
<script>
import server from '@/server/server.js'
import ajax from "@/server/ajax.js"
import control from "@/server/control.js"
export default {
    name:'linkqr',
    data(){
        return{
            name:'',
            src:'',
        }
    },
    methods:{
        //确定跳转
        goDown(){
            const _this=this;
            var ua = navigator.userAgent.toLowerCase();
            ajax({//查看次数累加
                type:'GET',
                url:'file/sumclick',
                data:{fileid:_this.$route.params.id},
                // contentType:"application/json;charset=UTF-8"
            }).then(function(res){
                // window.location.href=_this.src
            })
            ajax({
                url:'file/'+_this.$route.params.id,
            }).then(function(res){
                // console.log(res.result)
                _this.src="http://"+server.ip+":"+server.port+"/file/downloads/?path="+encodeURI(res.result.path)+"&type="+encodeURI(res.result.filetype)+"&filenames="+encodeURI(res.result.name)
                console.log()
                // window.location.href=_this.src
                if(res.result.filetype==".mp4"){
                    //视频直接跳转视频地址
                    window.location.href="http://"+control.ip+":"+control.port+res.result.path
                }else{
                    //别的文件跳转下载地址  
                    if(ua.match(/MicroMessenger/i)=="micromessenger"){//判断是否是微信端，微信浏览器对 window.close()不起效
                        window.location.replace(encodeURI(_this.src));    
                    }else{
                        window.location.replace(encodeURI(_this.src));
                        setTimeout(function(){
                            window.close(); //关闭当前窗口   
                        },1000)                  
                    }
                    // window.location.replace(_this.src);  
                    // window.close(); //关闭当前窗口
                    // window.location.href=_this.src
                }
            })
        },
        //取消跳转
        cancel(){
            // window.close(); 
            if(window.history.length>=2){//判断浏览器历史数
                window.history.back(-1)
            }else{//只有一层的就关闭浏览
                window.close(); 
                setTimeout(function(){
                    //这个关闭安卓系统的手机
                    document.addEventListener('WeixinJSBridgeReady', function(){ WeixinJSBridge.call('closeWindow'); }, false);
                    //这个关闭ios系统的手机
                    WeixinJSBridge.call('closeWindow');           
                }, 50)
            }
            // window.history.back(-1)   
            
        }
    },
    mounted(){ 
        const _this=this;
        var ua = navigator.userAgent.toLowerCase();
        // ajax({//查看次数累加
        //     type:'GET',
        //     url:'file/sumclick',
        //     data:{fileid:_this.$route.params.id},
        //     // contentType:"application/json;charset=UTF-8"
        // }).then(function(res){
        //     // window.location.href=_this.src
        // })
        // ajax({
        //     url:'file/'+_this.$route.params.id,
        // }).then(function(res){
        //     console.log(res.result)
        //     _this.src="http://"+server.ip+":"+server.port+"/file/downloads/?path="+res.result.path+"&type="+res.result.filetype+"&filenames="+res.result.name
        //     // window.location.href=_this.src
        //     if(res.result.filetype==".mp4"){
        //         //视频直接跳转视频地址
        //         window.location.href="http://"+server.ip+":"+server.port+res.result.path
        //     }else{
        //         //别的文件跳转下载地址  
        //         if(ua.match(/MicroMessenger/i)=="micromessenger"){//判断是否是微信端，微信浏览器对 window.close()不起效
        //            window.location.replace(_this.src);    
        //         }else{
        //             window.location.replace(_this.src);
        //             window.history.forward(-2);
        //             setTimeout(function(){
        //                window.close(); //关闭当前窗口   
        //             },1000)                  
        //         }
        //         // window.location.replace(_this.src);  
        //         // window.close(); //关闭当前窗口
        //         // window.location.href=_this.src
        //     }
        // })
    }
}
</script>
<style>
html{min-width: 250px;}
.linkqr{min-height: 100%;max-width: 800px;overflow: hidden;}
.dow-go{width: 100%;height: 100%;background: rgba(0,0,0,0.3);position: fixed;}
.dow-wapper{width: 86%;background: #fff;border:1px solid #ccc;border-radius: 8px;position: fixed;top:50%;left: 50%;transform: translate(-50%,-50%);overflow: hidden;}
.dow-top{text-align: center;border-bottom: 1px dashed #ccc;color: #333;}
.dow-content{color: #333;font-size: 1.6rem;text-align: center;padding: 28px 0;}
.dow-btn{font-size: 0;border-top: 1px solid #ccc;}
.dow-btn button{font-size: 1.6rem;padding: 14px 12px;background: #fff;width: 50%;text-align: center;}
.dow-confirm{border-left: 1px solid #ccc;color: #ff4343; }
.dow-cancel{color: #8c8c8c;}
</style>
