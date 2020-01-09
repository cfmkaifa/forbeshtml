<template>
  <div class="wrapper"  
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
     <div class="box">
        <div class="add">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加横幅(Banner)</el-button>
            <el-dialog :visible.sync="dialogVisible" title="添加分类" center>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div class="layer">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="分类中文名称"></el-input>
                        </el-form-item>
                        
                        <div class="dialog-img">
                          <p>图片：</p>
                          <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          list-type="picture">
                          <el-button size="small" type="primary">点击上传</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        </div>
                        <el-form-item label="链接：" prop="num" >
                            <el-input v-model="ruleForm.num" placeholder="链接跳转，如无请填写'#'" ></el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">提交添加</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="table-main" >
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="ID"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                align="center"
                label="图片">
              </el-table-column>
              <el-table-column
                prop="namechine"
                align="center"
                label="链接">
              </el-table-column>
              <el-table-column
                prop="tag"
                align="center"
                label="状态"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.tag === '已启用' ? 'primary' : 'success'"
                    disable-transitions>{{scope.row.tag}}</el-tag>
                </template>>
          </el-table-column>
          <el-table-column prop="address" align="center" label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button type="danger" plain size="mini">修改</el-button>
                    <el-button type="primary" plain size="mini">删除</el-button>
                    <el-button type="danger" plain size="mini">禁止</el-button>
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
                ruleForm: {
                    name: '',
                    num: '',
                    region: '',
                    Address: '',
                },
                rules: {
                    name: [{
                        required: true,
                        message: '名称不能为空',
                        trigger: 'blur'
                    }, ],
                    num: [{
                        required: true,
                        message: '链接不能为空',
                        trigger: 'blur'
                    }, ],
                },
                // fileList: [{name: 'food.jpeg', url: ''}, {name: 'food2.jpeg', url: ''}],
                tableData: [{
                        date: '1',
                        name: '首页banner',
                        address: '',
                        tag: '已启用',
                        namechine: '#',
                        nameinst: 'FUBU Notice',
                    }, 
                ]
            };
        },
        created() {},
        methods: {
            handleRemove(file, ) {
                console.log(file);
            },
            handlePreview(file) {
                console.log(file);
            },
            filterTag(value, row) {
                return row.tag === value;
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