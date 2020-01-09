<template>
  <div class="wrapper"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="box-title">
              <h5>用户中心</h5>
          </div>
          <div class="sel-search">
            <el-form ref="form" label-width="120px" class="demo-form-inline" :inline="true">
                 
                <el-form-item label="姓名">
                    <el-input v-model="filterusername" placeholder="请输入内容"></el-input>
                </el-form-item> 
                <el-form-item>
                    <el-button type="primary" @click="filter()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" icon="el-icon-circle-plus-outline" @click="admin">添加用户</el-button> 
                    <!-- <el-button type="info" icon="el-icon-delete" @click="deleteRole()">删除用户</el-button> -->
                </el-form-item>
            </el-form>
          </div>

          <div class="table">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                 <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    align="center"
                    label="日期">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="email"
                    align="center"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="roleNameList"
                    align="center"
                    label="角色"
                    :formatter="formatter">
                    <!-- <template  slot-scope="scope" v-for="subItemin in roleNameList">
                        {{subItemin}}
                    </template> -->
                </el-table-column>
                <el-table-column
                    prop="phone"
                    align="center"
                    label="电话">
                </el-table-column>
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.status=='1'">正常</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.status=='0'">不使用</el-tag>
                    </template>>
               </el-table-column>
                
                <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    >
                    <template  slot-scope="scope">
                        <el-button @click.native="permissionByName(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="delect(scope.row)" type="text" size="small" class="deleat-a">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加用户 -->
            <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%">
                 <el-form ref="form" label-width="100px" class="box_select">
                    <el-form-item label="用户名" required>
                        <el-input v-model="username" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" required>
                        <el-input v-model="password" placeholder="请输入内容"></el-input>
                    </el-form-item> 
                    <el-form-item label="手机号" required>
                        <el-input v-model="phone" placeholder="请输入内容"></el-input>
                    </el-form-item> 
                    <el-form-item label="角色">
                        <el-select v-model="roleId"  clearable multiple filterable style="width:200px;" placeholder="选择或输入角色名称" @change="demand">
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.roleName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>  
                    <el-form-item label="管理员标识">
                        <el-select v-model="adminFlag"  clearable filterable style="width:200px;" placeholder="选择或输入角色标识" >
                            <el-option
                                v-for="item in roleLists"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="头像" >
                        <el-badge value="图片只支持jpg和png格式请正确添加" class="item">
                        <label for="idcard" class="idcard_bg"  v-if="avatar==''"  >
                        <!-- <span class="idcard_upload"></span> -->
                        </label>
                        <input  name="image" type="file" accept="image/*" style="display:none"  capture="camera"  @change="getFile1($event)"   id="idcard"/>
                        <div class="idcard_img"  v-if="avatar!=''" >
                        <div class="del" style="display:block">
                            <img  :src="avatar" alt="" class="img_icon" >
                            <div class="idcard_del" @click="del()"></div>
                        </div>
                        </div>
                        </el-badge>
                    </el-form-item>
                    <el-form-item>
                         <el-button @click="addUser" type="primary" size="small">确定</el-button>
                    </el-form-item> 
                 </el-form>
            </el-dialog>
            <!-- 编辑 -->
            <el-dialog title="编辑" :visible.sync="dialogTableVisible" width="50%">
               
                    <el-form ref="form" label-width="110px" style="padding-top:30px;">
                        <el-form-item label="姓名" required>
                            <el-input v-model="username" :disabled="true"></el-input>
                        </el-form-item> 
                        <el-form-item label="真实姓名" required>
                            <el-input v-model="realname" placeholder="请输入内容"></el-input>
                        </el-form-item> 
                        <el-form-item label="电话" required>
                            <el-input v-model="phone" :disabled="true"></el-input>
                        </el-form-item> 
                        <el-form-item label="邮箱" required>
                            <el-input v-model="email" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="权限选择" style="width:500px;">
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <el-checkbox style="margin:0px 20px 15px 0;" border v-for="city in cities" :label="city.title" :key="city.value">{{city.title}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>  
                        <el-form-item>
                            <el-button type="primary" class="confirm" @click="tableConfirm()"> 确认 </el-button>
                            <el-button type="info" class="cancel" @click="tableCancel()"> 取消 </el-button>
                        </el-form-item>

					</el-form>
                
            </el-dialog>
          </div>
          <!-- 分页 -->
          <div>
               <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="current"
                    :page-sizes="[10,20,100, 200, 300, 400]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
          </div>
      </div>
      
    </div>  
  </div>

</template>
<script>
import {user,role} from '../../assets/js/Interface'
export default {
  data() {
    return {
      tableData:[],
      input:"",
      roleList:[],
    //   管理员标识
      roleLists:[],
      dialogTableVisible:false,
      dialogFormVisible:false,
      dialogVisible:false,
      gridData: [{
          name: '供应商',
          address: ''
        }, {
          name: '采购商',
          address: ''
        }],
        realname:"",
        email:"",
        roleId:'',
        status:"1",
        username:"",
        imageUrl:"",
        img:'',
        avatar:"111",
        password:"",
        phone:"",
        roleNameList:[],
        checkedCities:[],
        cities:  [
            {title:'主管',value:'1'},
            {title:'管理员',value:'2'},
            {title:'供应商',value:'3'},
            {title:'后台管理人员',value:'4'},
            {title:'商家',value:'5'},
            {title:'角色123',value:'6'}, 
        ],
        current:1,
        pages:1,
        size:10, 
        total:0,
        data:{
            status:'',
            username:''
        },
        userDto:'',
        adminFlag:'',
        avatar:'',//头像
        password:'',//密码
        phone:'',//手机
        userRoleDtos:[
            {
                roleId:''
            }
        ],
        username:'',
        filterusername:'',//用户名
        form:{
        username:""
           
      },
        // 查询
        description:'',
        roleCode:'',
        roleName:''
    };
  },
  created() {
      this.select()
  },
  methods: {
    select(){
        let url = `${user.userPage}?pageNo=${this.current}&pageSize=${this.size}`;
        // this.data.username = `${this.input}`
        // let data = JSON.parse(this.form)
        let data = this.data
        this.axios.get(url).then(res=>{
            if(res.data.code==200){
                this.tableData = res.data.result.records;
                this.total = res.data.result.total;
                // this.current = res.data.result.current
                
            }else{
                this.$message.error(res.data.message);
                
            }
        }).catch(err=>{
            this.$message.error("服务器繁忙");
        })
        
    },
    formatter(row, column) {
        return row.roleNameList+"";
      },
    getFile1 (e) {
         console.log(2222)
          this.avatar = window.URL.createObjectURL(e.target.files[0])
          this.files = e.target.files[0]
    },
    del(item){

          if(item == 2){
            this.img="";
          }else{
            // this.pord.imgUrl=""
            this.avatar = ''
          }
    },
    //查询角色按钮  	
    filter(){
         let url = `${user.userPage}?pageNo=${this.current}&pageSize=${this.size}`;
         this.form.username = `${this.filterusername}`
         console.log(this.form.username);
         this.axios.get(url,{params:this.form}).then( res=> {
            if(res.data.code==200){
                this.tableData = res.data.result.records;
                this.total = res.data.result.total;
            }else{
                this.$message.error(res.data.message);
            }
        }).catch( err=>{
            this.$message.error("服务器繁忙");
        })
    },
    // 添加用户
    addUser(){
        let url =`${user.userAdd}`;
        console.log(this.roleId,555)
        let length = this.userRoleDtos.length
         this.roleId.forEach((index)=>{
            let roleIds = {
                    roleId:index
            };
            this.userRoleDtos[length] = roleIds
            console.log(this.userRoleDtos[length])
        })
        
        let data = {
            userDto :this.userDto,
            adminFlag: this.adminFlag,
            avatar :this.avatar,//头像
            email:this.email,
            id :this.id,
            password :this.password,//密码
            phone:this.phone,//手机
            realname:this.realname,
            status:this.status,
            userRoleDtos:this.userRoleDtos,
            username:this.username,//用户名
        }
        this.axios.post(url,data).then(res => {
            // console.log(res)
            this.dialogVisible =false
            // this.admin();
            this.select();
            this.$message.success(res.data.message);
        })
    },
    // 查询所有角色
    demand(){
        this.axios.get(`${role.roleList}`).then(res =>{
            console.log(res.data,56565)
            if(res.data.code==200){
                this.roleList = res.data.result;
            }
            
        })
    },
    // 管理员标识 /role/list
    admin(){
        this.dialogVisible=true;
        this.axios.get(`${user.adminFlags}`).then( res=> {
            if(res.data.code==200){
                this.roleLists = res.data.result;
            }
        })
        this.demand();
    },
    
    // 删除
    delect(item){
        console.log(item)
        let url = `${user.userDelete}?id=${item.id}`;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.axios.delete(url).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    this.$message.success(res.data.message);
                    this.select();
                }
            }).catch(err => {
                this.$message.error("服务器繁忙")
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    handleCheckedCitiesChange(value) {
        console.log(value,"value")
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        
    },
    // handleAvatarSuccess(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //     console.log(imageUrl,53333)
    // },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG和png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
        // return isLt2M;
    },
    //   保存
    tableCancel(){

    },
    tableConfirm(){
        this.dialogTableVisible = false;
    },
    
    // 编辑
    permissionByName(item){
        // console.log(item)
        this.username = item.username
        this.dialogTableVisible = true;
        this.realname = item.realname;
        this.phone = item.phone;
        this.email = item.email;
        // this.handleCheckedCitiesChange(item.roleNameList);
    },
      // 每页多少条
    handleSizeChange(size) {
        this.size = size;
        this.select()
        // console.log(`每页 ${val} 条`);
    },
    // 当前页
    handleCurrentChange(current) {
        this.current = current;
        this.select()
        // console.log(`当前页: ${val}`);
    }

  }
};
</script>
<style type="text/css" scoped>
    /* .main{
        text-align: right;
        padding:20px ;
    } */
    .table {
        width: 95%;
        min-width: 1100px;
        margin: 0 auto;
    }
    .deleat-a>>>span {
        color: red;
    }

    .idcard_bg{
    height: 150px ;
    width:200px ;
    position: relative;
    display:inline-block;

    }
.idcard_upload{
    background: url("../../assets/img/upload.png") center no-repeat;
    background-size: 100% 100%;
    height: 55px;
    width: 86px;
    display: inline-block;
    position: absolute;
    left: 50px;
    /*right: 0;*/
    top: 0;
    bottom: 0;
    margin: auto;
}

.idcard_img{
  height: 150px ;
  width:200px ;
  /*margin:10px auto 20px auto;*/
  display: inline-block;
  position: relative;
}
.img_icon{
  height: 150px ;
  width:200px ;
  max-width: 100%;  
}
.el-badge.item{
    border: 1px solid #ebebeb
}
.idcard_del{
  height:35px;
  width: 66px;
  background: #ddd;
  position: absolute;
  right: 0px;
  top: 0px;
  background: url("../../assets/img/real_btn_name_del.png") center no-repeat;
  background-size: 100% 100%;
  
}
.idcard_btn_box{
   padding:10px 18px;
}
.idcard_btn{
width:100%;
height:40px;
border-radius:8px;
text-align: center;
line-height: 40px;
color:#fff;
}
.el-input{
    width: 200px;
}
</style>
