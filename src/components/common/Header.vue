<template>
    <div class="header" v-if="screenoff">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">福布后台管理</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" v-if="fullbtn" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
                <div class="user-avator"><img src="../../assets/img/Worker.png"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}<i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item   command="changPassword">更改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
                  <el-dialog title="修改密码" :visible.sync="userFormVisible">
                    <el-form
                    :model="userForm"
                    :rules="userRules"
                    ref="userForm"
                    label-width="100px"
                    class="demo-userForm"
                    >
                    <el-form-item label="原密码" prop="password">
                        <el-input v-model="userForm.password" placeholder="请输入原密码" show-password></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newWassword">
                        <el-input v-model="userForm.newWassword" placeholder="请输入新密码" show-password></el-input>
                    </el-form-item>

                    <el-form-item label="重复新密码" prop="repeatPassword">
                        <el-input v-model="userForm.repeatPassword" placeholder="请重复输入新密码" show-password></el-input>
                    </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="ChangePassword('userForm')">确 定</el-button>
                    </div>
                </el-dialog>
        </div>


    </div>
</template>
<script>
    import {screen} from "../../assets/js/Interface"
    import bus from '../common/bus';
    import { mapState, mapMutations } from "vuex";
    export default {
        data() {
            return {
                collapse: false,
                userFormVisible: false,
                fullscreen: false,
                screenoff:true,
                name: 'linxin',
                message: 2,
                fullbtn:false,
                userForm: {
                    password: "",
                    newWassword: "",
                    repeatPassword: "",
                },
                userRules: {
                    password: [{ required: true, message: "输入不能为空", trigger: "blur" }],
                    newWassword: [{ required: true, message: "输入不能为空", trigger: "blur" }],
                    repeatPassword: [{ required: true, message: "选择不能为空", trigger: "blur" }]
                },
            }
        },      
        computed:{
            ...mapState(["loginoff","token","useinfo"]),
            username(){        
                let  info=this.useinfo
                // let  username=typeof this.useinfo=='object'?this.useinfo.realname:JSON.parse(this.useinfo).realname;                
                // return username
            }
        },
        props: ['screen'],
        watch:{
           screen:function(newdata,old)
                  {                   
                    this.screenoff=newdata;
                    this.fullscreen=!newdata;
                    screen(this.screenoff)                   
                  },
            $route(newdata)
            {
                let routes=newdata.path.replace('/home/','')
                this.fullbtn=routes=="index"?true:false;
            }      
        },
        methods:{           
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){     
                    localStorage.getItem("token","");
                    window.sessionStorage.clear();
                    localStorage.clear();
                    this.$router.push({ path: '/login' });          
                    // this.axios.post("/sys/logout").then(res=>{
                    //     window.sessionStorage.clear();                        
                    //     window.localStorage.clear();
                       
                    //     if(res.data.code==200){
                    //         this.$router.push({
                    //             path:'/login'});
                    //     }
                    //     // window.location.reload();
                    // })
                }
                else if(command=='changPassword')
                {
                    
                    this.userFormVisible= true;
                    this.userForm = {};
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            ChangePassword(userForm) {
                    if(this.userForm.repeatPassword !== this.userForm.newWassword ){
                         this.$message.error('两次输入的密码不一致');  
                         return; 
                    }
                    // this.$refs[userForm].validate(valid => {
                    //     if (valid) {
                    //         this.axios.put('/sys/user/chang-password',this.userForm).then(res => {
                    //         if (res.data.code == 200) {
                    //             this.$message.success(res.data.message);
                    //             this.userFormVisible= false;
                    //         } else {
                    //             this.$message.error(res.data.message);
                    //         }
                    //         });
                    //     }
                    // });
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                        this.$emit("screen",true)
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                        this.$emit("screen",true)
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                        this.$emit("screen",true)
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                        this.$emit("screen",true)
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                         this.$emit("screen",false)
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                        this.$emit("screen",false)
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                        this.$emit("screen",false)
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                        this.$emit("screen",false)
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){           
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
              
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 18px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:500px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
