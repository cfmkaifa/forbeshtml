<template>
  <div class="wrapper"  
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
     <div class="box">
       <div class="sel-search">
            <el-form ref="form" label-width="120px" class="demo-form-inline" :inline="true">
                <el-form-item>
                    <el-button type="success" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加分类</el-button> 
                    <!-- <el-button type="info" icon="el-icon-delete" @click="deleteRole()">删除用户</el-button> -->
                </el-form-item>
            </el-form>
          </div>
        <div class="add">
            <el-dialog :visible.sync="dialogVisible" title="添加分类" center>
                <el-form :model="ruleForm" ref="ruleForm" label-width="180px" class="demo-ruleForm">
                    <div class="layer">
                        <el-form-item label="名称(中文)：" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="分类中文名称"></el-input>
                        </el-form-item>
                        <el-form-item label="图片：">
                          <div class="dialog-img">
                              <el-upload
                              class="upload-demo"
                              :action="uploadAction"
                              :headers="uploadheaders"
                              :on-preview="handlePreview"
                              :on-remove="handleRemove"
                              list-type="picture">
                              <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                              </el-upload>
                          </div>
                        </el-form-item>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="typeAdd()">提交添加</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="table-main" >
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="imgPath"
                label="展示图片"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                align="center"
                label="图片尺寸">
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="code"
                align="center"
                label="编码">
              </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" @click="typeEadit(scope.row)">修改</el-button>
              <el-button type="danger" plain size="mini" @click="typeDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog :visible.sync="dialog" title="修改分类" center>
                <el-form :model="rules" ref="rules" label-width="180px" class="demo-rules">
                    <div class="layer">
                        <el-form-item label="名称(中文)：" prop="name">
                            <el-input v-model="rules.name" placeholder="分类中文名称"></el-input>
                        </el-form-item>
                        <el-form-item label="编码：" prop="num">
                            <el-input v-model="rules.code" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="图片：">
                          <div class="dialog-img">
                              <el-upload
                              class="upload-demo"
                              :action="uploadAction"
                              :headers="uploadheaders"
                              :on-success="handlePreview"
                              :on-remove="handleRemove"
                              :before-upload="handleUpload"
                              list-type="picture">
                              <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                              </el-upload>
                          </div>
                        </el-form-item>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="eadit()">提交</el-button>
                </span>
        </el-dialog>
      </div>
      <div>
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
import {newsType} from '../../assets/js/message'
    export default {
        data() {
            return {
                uploadAction: this.baseURL + `/systemcenter/sys/common/upload`,
                uploadheaders: { "X-Access-Token": sessionStorage.getItem("token") },
                dialogVisible: false,
                centerDialogVisible: false,
                ruleForm: {
                    name: '',
                    // num: '',
                    region: '',
                    Address: '',
                },
                rules: {
                    name:'',
                    code: '',
                    imgPath:'',
                },
                tableData: [],
                page:1,
                pageSize:10,
                total:0,
                currentPage:1,
                id:"",
                dialog:false,
                fileList: [],
                file:''
            };
        },
        created() {
          this.newsType()
        },
        methods: {
            newsType(){
              let url = `${newsType.typePage}?pageNo=${this.currentPage}&pageSize=${this.pageSize}`;
              this.axios.get(url).then(res=>{
                if(res.data.code==200){
                  this.tableData = res.data.result.records;
                  this.total = res.data.result.total;
                  this.currentPage = res.data.result.current
                }else{
                  this.$message.error(res.data.message);
                }
              }).catch(err=>{
                this.$message.error("服务器繁忙");
              })
            },
            // 添加分类
            typeAdd(){
              let url = `${newsType.typeAdd}`
              this.axios.post(url,this.ruleForm).then(res=>{
                if(res.data.code==200){
                  this.dialogVisible = false;
                  this.newsType();
                  this.ruleForm.name = '';
                }
              })
            },
            // 删除
            typeDelete(item){
              this.id = item.id
              let url = `${newsType.typeDelete}?id=${this.id}`
              this.axios.delete(url).then(res=>{
                if(res.data.code==200){
                  this.newsType()
                }
              })
            },
            // 改
            typeEadit(item){
              this.rules = item;
              this.dialog = true;
              
            },
            eadit(){
              let url = `${newsType.typeEdit}`
              this.axios.put(url,this.rules).then(res=>{
                if(res.data.code==200){
                  this.newsType();
                  this.dialog = false;
                }
                this.newsType();
              })
            },

            handleRemove(file) {
                console.log(file,888);
            },
            // handlePreview(file) {
            //     console.log(file,666);
            // },
            handleUpload(file) {
              console.log(file,5555)
             
            },
            handlePreview(res, file) {
              console.log(res,454545)
              if(res.code == 200){
                  // let array = [];
                  // let item = {
                  //   content: file.size,
                  //   path: file.name,
                  //   filePath: res.result.filePath,
                  //   cnName: res.result.cnName,
                  //   enName: res.result.enName,
                  //   suffix: res.result.suffix
                  // };
                  // array.push(item);
                  // this.ruleForm.attachs = array;
                  this.rules.imgPath = URL.createObjectURL(file.raw);
                  // this.rules.imgPath = res.result.filePath;
                  console.log( this.rules.imgPath ,454545)
              }else{
                this.$message.error(res.message);
              }
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            // 分页
            handleSizeChange(size){
                this.pageSize = size;
                this.newsType()
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.newsType()
            },
        }
    };
</script>
<style type="text/css" scoped>
    
    .demo-form-inline{
       width: 98%;
      text-align: right;
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