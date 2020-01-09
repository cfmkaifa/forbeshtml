<template>
    <div class="wrapper">
        <v-head @screen="screen" :screen="off"></v-head>
        <v-sidebar :screen="off"></v-sidebar>
        <div  class="content-box" :class="{'content-collapse':collapse}">
            <v-tags :screen="off"></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <!-- <keep-alive :include="tagsList"> -->
                        <router-view @screen="screen" :screen="off"></router-view>
                    <!-- </keep-alive> -->
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                off:true
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        mounted () {         
        },
        methods:{
          screen(val)
          {      
             this.off=val;
            // this.collapse=!this.off;             
             this.off?document.querySelector(".content-box").style.left="250px":document.querySelector(".content-box").style.left="0px";
             this.off?document.querySelector(".content-box").style.top="70px":document.querySelector(".content-box").style.top="0px";
             
          }
        },
        watch:{
          collapse()
          {             
              this.collapse&&this.off?document.querySelector(".content-box").style.left="65px":document.querySelector(".content-box").style.left="250px"
          }
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
