<template>
    <div>
         <div class="allbox" ref="allbox">
             <div class="move  el-icon-d-arrow-right" move="move" ref="move" :style="{transform:`translateX(${moveLeft}px)`}"></div>
             托动滑块验证
             <div ref="bg" class="bg" :style="{width:width+'px'}">{{text}}</div>
         </div>
    </div>
</template>
<style>
.allbox{width:100%;border:1px solid #ddd;position: relative;height:30px;text-align: center;
        line-height: 30px;
        background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
        -webkit-animation: masked-animation 4s infinite linear;}
.move{width:30px;height:30px;cursor:move;transform: translateX(0px);line-height: 30px;text-align: center;background:#999;color:#ddd;float: left;-webkit-text-fill-color:#fff;}
.bg{width:0px;height:30px;background:#3a8ee6;position: absolute;top:0px;color:#fff;-webkit-text-fill-color:#fff;}
body{-moz-user-select: none; -webkit-user-select: none;}
@-webkit-keyframes masked-animation {
    0%  { background-position: 0 0;}
    100% { background-position: -100% 0;}
}
</style>
<script>
export default {
    data()
    {
      return{
           list:"",
           moveLeft:0, 
           width:0,
           text:"",
           off:true          
      }
    },
    props: ["cheakPass"],
    watch:{
        cheakPass(newData,oldData)
        {            
            if(newData==false)
            {
                 this.moveLeft=0;
                 this.width=0;
                 this.off=true;
                 this.text=""
            }           
        }
    },
    mounted () {
        this.$nextTick(() => {           
            let allboxWidth=this.$refs['allbox'].offsetWidth;
            let moveWidth=this.$refs['move'].offsetWidth;
            let largreWidth=allboxWidth-moveWidth;            
            let x0=0;
            let x1=0;
            let nowx;
            let dragoff=false
            document.onmousedown=(e)=>{          
            var oDragHandle=e? e.target:event.srcElement;           
            if(oDragHandle.getAttribute('move')=='move')
            {
                x0=e.pageX;             
                nowx=this.moveLeft
                dragoff=true
            }
            },
            document.onmousemove=(e)=>{	
                
                if(dragoff&&this.off)
                {
                    e=e||event;
                    x1= e.pageX;                   
                   this.moveLeft=nowx+(x1-x0);
                   this.width=this.moveLeft
                   if(this.moveLeft<0)
                    {
                        this.moveLeft=0
                        this.width=0;
                    }
                    else if(this.moveLeft>largreWidth)
                    {
                        this.moveLeft=largreWidth;
                        this.width=largreWidth;
                        this.text="验证通过"
                        this.off=false;
                        this.$emit("drag",true);
                    }                    
                } 
                document.onmouseup=(e)=>
                {		
                        dragoff=false;
                        if(this.off)
                        {
                            this.moveLeft=0;
                            this.width=0;
                            this.$emit("drag",false);
                        }
                }
            }   
          })        
    }
}
</script>
