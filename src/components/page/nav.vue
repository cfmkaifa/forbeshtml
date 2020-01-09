<template>
  <div class="wrapper"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="title1">
            <el-form ref="form" label-width="110px" class="demo-form-inline" :inline="true">
                    <el-form-item label="首页导航管理：" >
                         <el-select v-model="value" placeholder="首页导航管理" class="title1-select">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                    </el-form-item> 
                    <el-form-item label="全部产品：">
                        <el-select v-model="value" placeholder="首页导航管理" class="title1-select">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="种类：">
                        <el-select v-model="value" placeholder="种类" class="title1-select">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item>
                       <el-button type="success" icon="el-icon-circle-plus-outline" class="addbutton"  @click.native="addgrouping">添加</el-button>
                       <!-- <el-dropdown>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="addgrouping">分组</el-dropdown-item>
                                <el-dropdown-item @click.native="dialogFormVisible =true">名称</el-dropdown-item> 
                            </el-dropdown-menu>
                        </el-dropdown> -->
                    </el-form-item>
            </el-form>
            <!-- <el-dialog title="提示" :visible.sync="dialogFormVisible" center>
                <el-form :model="form" class="formregion">
                    <el-form-item label="请选择分组：" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请输入名称：" :label-width="formLabelWidth">
                         <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add()">确 定</el-button>
                </div>
            </el-dialog> -->
          </div>
          <div class="table">
              <el-table
                :data="tableData"
                border
                ref="multipleTable"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        align="center"
                        width="80">
                    </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    align="center">
                </el-table-column>
            <el-table-column align="center" label="操作">
            <template slot-scope="scope">
                <!-- <el-button  type="success" plain size="mini">禁用</el-button> -->
              <el-button type="primary" plain size="mini" @click="typeEadit(scope.row)">修改</el-button>
              <el-button type="danger" plain size="mini" @click="typeDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
            </el-table>
          </div>
          <el-dialog title="修改" :visible.sync="formVisible">
                <el-form :model="form" class="formregion">
                    <el-form-item label="请输入名称：" :label-width="formLabelWidth">
                         <el-input v-model="name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="formVisible = false">取 消</el-button>
                    <el-button type="primary" @click="eadit">确 定</el-button>
                </div>
            </el-dialog>
          <div class="pagination">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
              </el-pagination>
          </div>
      </div>
      
    </div>  
  </div>

</template>
<script>
import {navigation} from '../../assets/js/message'
export default {
  data() {
    return {
      options: [{
          value: '选项1',
          label: '测试数据一'
        }, {
          value: '选项2',
          label: '测试数据一'
        }, {
          value: '选项3',
          label: '测试数据一'
        }, {
          value: '选项4',
          label: '测试数据一'
        }, {
          value: '选项5',
          label: '测试数据一'
        }],
        value: '',
        input:'',
        // 表格
         tableData: [],
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        dialogFormVisible :false,
        pageSize:10,
        total:0,
        currentPage:1,
        // 修改
        formVisible:false,
        name:'',
        id:"",
        // 批量删除
        multipleSelection:[],
    };

  },
  created() {

  },
  components: {
    // 'editor': Editor
  },
  mounted(){
       // 页面加载的时候初始化组件
    this.navigation();
  },
  methods: {
      navigation(){
        let url = `${navigation.navPage}?pageNo=${this.currentPage}&pageSize=${this.pageSize}`;
        this.axios.get(url).then(res=>{
          if(res.data.code==200){
            this.tableData = res.data.result.records;
            this.total = res.data.result.total;
          }
        })
      },
    //   添加分组
      addgrouping(){
          let url = `${navigation.navAdd}`;
          // let data = {
          //   name: this.form.name
          // }
          this.$prompt('请输入名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            }).then(({value}) => {
                this.axios.post(url,{name:value}).then(res=>{
                  console.log(res,66);
                  if(res.data.code==200){
                    this.navigation();
                    this.$message.success(res.data.message);
                  }
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
        },
        // 添加名称
      addname(){
          
      },
      // 修改
      typeEadit(item){
        this.formVisible = true;
        this.name = item.name;
        this.id = item.id
      },
      eadit(){
        let url = `${navigation.navEdit}`;
        let data = {
          name: this.name,
          id: this.id,
        }
        this.axios.put(url,data).then(res=>{
          if(res.data.code==200){
              this.formVisible = false;
              this.navigation();
              this.$message.success(res.data.message);
          }
        })
      },
      // 删除
      typeDelete(item){
        let url = `${navigation.navDelete}?id=${item.id}`;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete(url).then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message);
                            this.navigation();
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
      // 分页
      handleSizeChange(size){
          this.pageSize = size;
          this.navigation()
      },
      handleCurrentChange(val){
          this.currentPage = val;
          this.navigation()
      },
      handleSelectionChange(val){
          this.multipleSelection = val
      }
  }
};
</script>
<style type="text/css" scoped>
    .title1 {
        margin-top: 15px;
    }
    .title1-select {
        width: 180px;
    }
    .dingdan {
      width: 180px;
    }
    /* .box_select {
      width: 180px;
      display: flex;
    } */
    .add {
        width: 100%;
        height: 43px;
        background-color: #F5FAFE;
        margin-top: 30px;
        display: flex;
        flex-direction: row-reverse;
    }
    .table {
        width: 100%;
        margin-top: 15px;
    }
    .pagination {
        width: 100%;
        margin-top: 15px;
        display: flex;
        /* flex-direction: row-reverse; */
    }
    .addbutton {
        width:108px;
        height:30px;
        background:#67C23A;
        border-radius:2px;
    }
    .el-dropdown-menu {
        width:108px;
        text-align: center;
        left: 1269px;
    }
    .popper__arrow {
         left: 90.5px;
    }
    /* .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
        background-color: #F0F9EB;
        color: #67C23A;
    } */
    .formregion>>>input {
        width: 180px;
    }
    .title1>>>.el-dialog {
        width: 500px;
    }
</style>
