<template>
  <div>
    <el-dialog
      :title="Config.TitleConfigure+Config.Title"
      :visible.sync="FormVis"
      :before-close="Close"
    >
      <el-form
        :model="ruleForm"
        :ref="Config.ruleFormName"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="item.Colspan" v-for="(item,index) in FtableData" v-bind:key="index">
            <el-form-item :label="item.Title" :prop="item.Prop" v-show="item.IsDisplay">
              <el-input
                v-if="item.Type=='input'"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请输入'+item.Title"
                :disabled="Config.ExamineShow.indexOf(item.Prop) > -1?false:true"
              >
                <template slot="append" v-if="item.Unit">{{item.Unit}}</template>
              </el-input>

              <el-input
                v-if="item.Type=='text'"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请输入'+item.Title"
                type="textarea"
                :rows="item.Rows"
                :disabled="Config.ExamineShow.indexOf(item.Prop) > -1?false:true"
              ></el-input>

              <el-input
                v-else-if="item.Type=='number'" 
                type="number"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请输入'+item.Title"
                :disabled="Config.ExamineShow.indexOf(item.Prop) > -1?false:true"
              >
                <template slot="append" v-if="item.Unit">{{item.Unit}}</template>
              </el-input>

              <el-select
                v-else-if="item.Type=='selectsearch'"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请选择'+item.Title"
                filterable
                remote
                value-key="id"
                :disabled="Config.ExamineShow.indexOf(item.Prop) < 0 ?true:Config.ExamineManShow.indexOf(item.Prop)>-1?true:false"
                @change="currentSel($event,item.Prop,item.LowerProp)"
                :prop="ruleForm[item.Prop]"
              >
                <el-option :label="'无'" value v-if="!item.IsMust"></el-option>
                <template v-for="(cm) in item.selectArr">
                  <el-option :key="cm.id" :label="cm[item.sName]" :value="cm.id">{{Config.ExamineManShow.indexOf(item.Prop)}}</el-option>
                </template>
              </el-select>

              <el-select
                v-else-if="item.Type=='select'"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请选择'+item.Title"
                value-key="id"
                :disabled="Config.ExamineShow.indexOf(item.Prop) > -1?false:true"
                @change="currentSel($event,item.Prop,item.LowerProp)"
                :prop="ruleForm[item.Prop]"
              >
                <el-option :label="'无'" value v-if="!item.IsMust"></el-option>
                <template v-for="(cm) in item.selectArr">
                  <el-option :key="cm.id" :label="cm[item.sName]" :value="cm.id"></el-option>
                </template>
                <div class="selectJob" v-if="item.total>9">
                  <el-row>
                    <el-button class="text" @click-shop="prevePage">上一页</el-button>
                    <el-button class="text" @click-shop="nextPage">下一页</el-button>
                  </el-row>
                </div>
              </el-select>

              <el-input-number 
                v-else-if="item.Type=='surplus'"
                v-model="ruleForm[item.Prop]"
                controls-position="right"
                :disabled="Config.ExamineShow.indexOf(item.Prop) > -1?false:true"
               >
               </el-input-number>

              <el-date-picker
                v-model="ruleForm[item.Prop]"
                type="date"
                @change="changData($event,item.Prop)"
                :placeholder="'请选择'+item.Title"
                v-else-if="item.Type=='date'"
              ></el-date-picker>

              <el-date-picker
                v-model="ruleForm[item.Prop]"
                type="datetime"
                @change="changDataTime($event,item.Prop)"
                :placeholder="'请选择'+item.Title"
                v-else-if="item.Type=='datetime'"
                disabled 
              ></el-date-picker>

              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :action="uploadAction"
                :headers="uploadheaders"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept="image/jpeg, image/gif, image/png, image/bmp"
                v-else-if="item.Type=='img'"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <el-transfer
                v-else-if="item.Type=='transfer'"
                v-model="trvalue[item.Prop]"
                :data="transData[item.Prop]"
                :titles="['未选中', '已选中']"
                @change="handleChange($event,item.Prop,arguments)"
              ></el-transfer>

              <el-radio-group
                v-model="ruleForm[item.Prop]"
                v-else-if="item.Type=='radio'"
                :disabled="Config.ExamineShow.indexOf(item.Prop) > -1?false:true"
                @change="checkboxSel($event,item.Prop,arguments)"
              >
                <el-radio-button
                  v-for="(re) in item.radioArr"
                  :label="re.code"
                  :key="re.code"
                >{{re.name}}</el-radio-button>
              </el-radio-group>

              <quill-editor
                v-else-if="item.Type=='quill'"
                ref="myTextmaterialRequested"
                v-model="ruleForm.materialRequested"
                :options="editorOption2"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer center" v-if='Config.ExamineShow'>
        <el-button type="danger"  @click="Submission(Config.ruleFormName,'2',Config.Submission)">审批不通过</el-button>
        <el-button type="warning" @click="GoOnSubmission('0')">继续审核</el-button>
        <el-button type="success" @click="Submission(Config.ruleFormName,'1',Config.Submission)">审批通过</el-button>
      </div>
      <div slot="footer" class="dialog-footer center" v-else>
        <el-button  type="danger" @click="Submission(Config.ruleFormName,'2',Config.Submission)">审批不通过</el-button>
        <el-button type="success" @click="Submission(Config.ruleFormName,'1',Config.Submission)">审批通过</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="继续审核"
      :visible.sync="FormVisCn"
      :before-close="CloseCn"
    >
    <el-form
        ref="cnForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-row>
            <el-col :span="item.Colspan" v-for="(item,index) in FtableData" v-bind:key="index">
              <el-form-item :label="'待'+item.Title" :prop="item.Prop" v-show="Config.ExamineManShow.indexOf(item.Prop)>-1?true:false">
                      <el-input
                        v-if="item.Type=='text'"
                        v-model="cnForm[item.Prop]"
                        :placeholder="'请输入'+item.Title"
                        type="textarea"
                        :rows="item.Rows"
                      ></el-input>

                     <el-select
                      v-else-if="item.Type=='selectsearch'"
                      v-model="cnForm[item.Prop]"
                      :placeholder="'请选择'+item.Title"
                      filterable
                      remote
                      value-key="id"
                      @change="currentSel($event,item.Prop,item.LowerProp)"
                      :prop="cnForm[item.Prop]"
                    >
                      <el-option :label="'无'" value v-if="!item.IsMust"></el-option>
                      <template v-for="(cm) in item.selectArr">
                        <el-option :key="cm.id" :label="cm.name?cm.name:cm.realname" :value="cm.id"></el-option>
                      </template>
                    </el-select>

                    <el-select
                        v-else-if="item.Type=='select'"
                        v-model="cnForm[item.Prop]"
                        :placeholder="'请选择'+item.Title"
                        filterable
                        remote
                        value-key="id"
                        @change="currentSel($event,item.Prop,item.LowerProp)"
                        :prop="cnForm[item.Prop]"
                      >
                        <el-option :label="'无'" value v-if="!item.IsMust"></el-option>
                        <template v-for="(cm) in item.selectArr">
                          <el-option :key="cm.id" :label="cm.name?cm.name:cm.realname" :value="cm.id"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="CloseCn">取 消</el-button>
          <el-button type="primary" @click="Submission(Config.ruleFormName,Examinestate,Config.Submission)">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    Config: Object,
    tableData: Array,
    FormVis: Boolean,
    FromDetails: Object,
    Parm: Object,
    Value: Array
  },
  data() {
    return {
      FtableData: this.tableData,
      state: {},
      date: {},
      FormVisCn:false,
      loading: false,
      Updata: false,
      tabValue: this.Value,
      cnForm:{},
      ruleForm: this.FromDetails,
      Examinestate:'',
      trvalue: {},
      cities: [],
      transData: {},
      transDataformObj: {},
      imageUrl: "",
      uploadAction: "",
      uploadheaders: { "X-Access-Token": sessionStorage.getItem("token") },
    };
  },
  methods: {
    generateData(Prop, datas, obj, formObj , UncheckedObj) {
      if (datas) {
        let data = [];
        let cities = [];
        let pinyin = [];
        datas.forEach((item, index, array) => {
          cities.push(item[obj.Sna]);
          pinyin.push(item[obj.Sid]);
        });
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            id: pinyin[index],
            disabled: true,
          });
          
        });
        this.transData[Prop] = data;
        this.transDataformObj[Prop] = formObj;
      }
    },
    rload() {
      // let TsURL = this.getUrl(this.Config.Url, "pagelist");
      // this.loading = true;
      // this.axios.get(TsURL, { params: this.Parm }).then(res => {
      //   if (res.data.code == 0) {
      //     this.loading = false;
      //     let { result } = res.data;
      //     this.tabValue = result.records;
      //     this.Parm.total = result.total;
      //     this.loading = false;
      //     this.$emit("FromUpdate", result.records);
      //   }
      // });
    },
    Close() {
      this.$emit("FormClose", false);
    },
    CloseCn() {
      this.FormVisCn = false;
    },
    //select
    currentSel(val, selVal, LowerProp) {
      this.ruleForm = Object.assign({}, this.ruleForm, { [selVal]: val });
      if (LowerProp) {
        if (LowerProp.type == "select") {
          //关联查询
          this.$emit(LowerProp.val + "Celect", val);
        }
      }
    },
    changData(val, selVal) {
      this.ruleForm[selVal] = val;
    },
    changDataTime(val, selVal) {
      this.ruleForm[selVal] = this.getDates(val);
    },
    //radio
    checkboxSel(val, selVal) {
      this.ruleForm = Object.assign({}, this.ruleForm, { [selVal]: val });
    },
    handleChange(value, selVal, movedKeys) {
      let arr = [];
      let rightTransData = [];
      let leftTransData = [];
      if (movedKeys[1] === "right") {
        if (value) {
          for (let i = 0; i < value.length; i++) {
            this.transData[selVal].forEach((item, index, array) => {
              if (item.key == value[i]) {
                rightTransData.push(item);
              }
            });
          }
          if (rightTransData) {
            for (let i = 0; i < rightTransData.length; i++) {
              let arrobj = {
                [this.transDataformObj[selVal].id]:rightTransData[i].id
              };
              arr.push(arrobj);
            }
          }
        }
      }
      if (movedKeys[1] === "left") {
        if (value) {
          for (let i = 0; i < value.length; i++) {
            this.transData[selVal].forEach((item, index, array) => {
              if (item.key == value[i]) {
                leftTransData.push(item);
              }
            });
          }
          if (leftTransData) {
            for (let i = 0; i < leftTransData.length; i++) {
              let arrobj = {
                [this.transDataformObj[selVal].id]:leftTransData[i].id
              };
              arr.push(arrobj);
            }
          }
        }
      }
      // console.log(arr);
      this.ruleForm[selVal] = arr;
    },
    prevePage() {},
    nextPage() {},
    GoOnSubmission(val) {
        this.FormVisCn = true;
        this.Examinestate = val;
    },
    Submission(formName,Sid,State) {
      this.$confirm('此操作将改变审核状态, 是否继续?', '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ruleForm = Object.assign(this.ruleForm, this.cnForm);
                this.FormVisCn = false;
                this.ruleForm[State] = Sid;
                if(this.ruleForm['auditOpinion'] == undefined){this.ruleForm['auditOpinion']=''}
                this.$refs[formName].validate(valid => {
                  if (valid) {
                    this.changestate(this.Config.Url,State,this.Config.ExamineShow);
                  }
                });
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消'
                });
        });
    },
    //审核数据
    changestate(url,State,arr) {
      // let TsURL = this.getUrl(url, "changestate");
      // if(arr){
      //    let data = [];
      //    let datastr = '?';
      //    for(let a=0;a<arr.length;a++){
      //       data[arr[a]] = this.ruleForm[arr[a]];
      //    }
      //    data['id'] = this.ruleForm.id;
      //    data[State] = this.ruleForm[State];
      //    for(var key in data){
      //      datastr = datastr+key+'='+data[key]+'&';
      //    }
      //    TsURL = TsURL + datastr;  
      // }else{
      //    TsURL = TsURL + '?id='+this.ruleForm.id+'&'+State+'='+this.ruleForm[State];
      // }
      // this.axios.put(TsURL,{}).then(res => {
      //   if (res.data.code == 0) {
      //     this.$message.success(res.data.message);
      //     if(this.Config.ExamineSubmit && this.ruleForm[State] == 1){
      //       this.$emit("ExamineSubmit",this.ruleForm);
      //     }
      //     this.rload();
      //     this.$emit("FormClose", false);
      //   } else {
      //     this.$message.error(res.data.message);
      //   }
      // });
    },
    handleAvatarSuccess(res, file) {
      let array = [];
      let item = {
        content: file.size,
        path: file.name,
        filePath: res.result.filePath,
        cnName: res.result.cnName,
        enName: res.result.enName,
        suffix: res.result.suffix
      };
      array.push(item);
      this.ruleForm.attachs = array;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt5M;
    }
  }
};
</script>
<style>
.el-transfer-panel {
  width: 40%;
}
.el-transfer-panel__item {
  display: block;
}
.selectJob {
  text-align: center;
  height: 25px;
  position: fixed;
  /* margin-top: -89px; */
  width: 212px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  border: 1px solid #e4e7ed;
  border-top: 0;
}
.selectJob .span {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.selectJob .text {
  height: 25px;
  line-height: 5px;
  font-weight: bold;
  cursor: pointer;
}
</style>