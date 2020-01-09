<template>
  <div class="wrapper"  
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
     <div class="box">
         <el-form ref="form" label-width="120px" class="demo-form-inline" :inline="true">
                <!-- <el-form-item label="规格名称">
                    <el-input v-model="input" placeholder="请输入内容"></el-input> 
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()">查询</el-button>
                </el-form-item>  -->
                <el-form-item>
                    <el-button type="success" icon="el-icon-circle-plus-outline" @click="open">添加规格</el-button>
                    <el-button type="info" icon="el-icon-delete" @click="batchdelete()">删除规格</el-button>
                </el-form-item>
            </el-form>
        <div class="table-main" >
            <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                align="center"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                sortable
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                align="center"
                label="绑定分类">
              </el-table-column>
              <el-table-column
                prop="tag"
                align="center"
                label="可选项">
                
              </el-table-column>
              <el-table-column
                prop="date"
                label="排序"
                sortable
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="othertag"
                align="center"
                label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button  type="primary" plain size="mini">删除</el-button>
                        <el-button type="danger" plain size="mini">修改</el-button>
                        <!-- <el-button v-if="scope.row.status == '1'" type="success" plain size="mini">添加子类</el-button>
                        <el-button v-if="scope.row.status == '0'" type="warning" plain size="mini">参数设置</el-button> -->
                    </template>
              </el-table-column>
            </el-table>
      </div>
    </div>
  </div>
</div>

</template>
<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                centerDialogVisible: false,
                multipleSelection:[],
                primary: '已启用',
                success: '已禁用',
                ruleForm: {
                    name: '',
                    num: '',
                    region: '',
                    Address: '',
                },

                // fileList: [{name: 'food.jpeg', url: ''}, {name: 'food2.jpeg', url: ''}],
                tableData: [{
                    id: 1,
                    date: '1',
                    name: '测试数据',
                    address: '2',
                    tag:'8',
                    othertag:'',
                    status:1
                }, {
                    id: 2,
                    date: '2',
                    name: '测试数据',
                    address: '2',
                    status:1,
                    tag:'8',
                }, {
                    id: 3,
                    date: '3',
                    name: '测试数据',
                    address: '2 ',
                    status:1,
                    children: [{
                        id: '',
                        date: '',
                        name: '二级测试数据',
                        address: '2',
                        status:0
                    }, ]
                }, ],
            };
        },
        created() {
            
        },
        methods: {
            handleSelectionChange(val){
                this.multipleSelection = val
            },
            open() {
                
            },
            // 批量删除 	
            batchdelete(item) {
                 if (this.multipleSelection.length > 0) {
                        let arrtemp = [], parm, url;
                        this.multipleSelection.map((val) => {
                          arrtemp.push(val.id);
                        });
                        parm = arrtemp.join(",");
                //         url = `${role.deleteBatch}?ids=${parm}`;
                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',
                              {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                              }).then(() => {
                //                   this.axios.delete(url).then((res) => {
                //                     if (res.data.code == 200) {
                //                         this.role();
                //                         this.$message.success(res.data.message);
                //                     }
                //                 }).catch(err=>{
                //                     this.$message.error("服务器繁忙");
                //                 })
                                
                              }).catch(() => {
                                this.$message({
                                  type: 'info',
                                  message: '已取消删除'
                                });
                              });

                      }
                      else {
                        this.$message({
                          message: '至少选择一条数据!',
                          type: 'warning'
                        });
                      }
              
            },
        }
    };
</script>
<style type="text/css" scoped>
    .add {
        width: 98%;
        height: 43px;
        background-color: #F5FAFE;
        margin-top: 30px;
        display: flex;
        flex-direction: row-reverse;
    }
    .table-main {
        width: 98%;
        margin-top: 10px;
        text-align: center;
    }
    .layer {
        width: 580px;
        margin: 0 auto;
    }
    .dialog-img {
      display: flex;
    }
    .el-form-item__label {
      width: 101px !important;
    }
    .el-form-item__content {
      margin-left: 104px !important;
    }
    .dialog-img p {
      width: 87px;
      text-align: right;
    }
    .upload-demo {
      margin-left: 20px;
    }
    .has-gutter {
        background-color: #F5FAFE !important;
    }
    .el-table__body-wrapper {
        overflow: hidden;
        position: relative;
    }
</style>