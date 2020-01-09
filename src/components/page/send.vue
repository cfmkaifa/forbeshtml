<template>
  <div class="wrapper" v-loading="listLoading"  
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="box-title">
              <h5>平台消息推送</h5>
          </div>
          <div class="box-content">
             <el-form ref="form" label-width="160px" style="width:600px;">
                 <!-- <div class="news-search"> 选择相应的贴牌后，填写对应的推送标题和推送主题内容，点击发送将推送消息至贴牌APP的所有用户</div> -->
                 <el-form-item label="通知内容">
              <el-input type="textarea" v-model="content" placeholder="在这填写你要的通知内容"></el-input>
            </el-form-item>
              <el-form-item label="推送对象" >
                 <el-select  v-model="brandId"  multiple collapse-tags filterable clearable placeholder="请选择或输入推送对象" style="width:440px;" >
                <el-option
                  v-for="item in brandList"
                   :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select> 
               <!-- <el-button type="primary" plain size="mini" @click="brandidAll()">全选</el-button>
               <el-button type="danger" plain size="mini" @click="brandidDel()">取消全选</el-button> -->
              </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="confirm">发送</el-button>
              </el-form-item>
            </el-form>
  
             
          </div>
      </div>
   
      
    </div>  
  </div>

</template>
<script>
export default {
  data() {
    return {
      brandList: [],
      brandId: [],
      alert: "",
      content: "",
      end_time: "",

      listLoading: false
    };
  },
  created() {
  },
  methods: {
    getbrand() {
      //查询贴牌
      getBrand()
        .then(res => {
          console.log(res.data);
          if (res.data.resp_code == "000000") {
            this.brandList = res.data.result;
          } else {
            // this.$message.warning(res.data.resp_message);
            this.$message.error("服务器繁忙")
          }
        })
        .catch(err => {
          // console.log(err);
          this.$message.error("服务器繁忙");
        });
    },
    // brandidAll() {
    //   this.brandId = [];
    //   for (var i = 0; i < this.brandList.length; i++) {
    //     this.brandId.push(this.brandList[i].id);
    //   }
    //   console.log(this.brandId);
    // },
    // brandidDel() {
    //   this.brandId = [];
    // },
    GetDate(dates) {
        var dd = new Date();
          var n = dates || 0;
          dd.setDate(dd.getDate() + n);
          var y = dd.getFullYear();
          var m = dd.getMonth() + 1;
          var d = dd.getDate();
          m = m < 10 ? "0" + m: m;
          d = d < 10 ? "0" + d: d;
          this.end_time = y + "-" + m + "-" + d+ "  12:00:00";
          return  this.end_time;
    },
    confirm() {
      if (this.brandId.length == 0 || this.alert == "" || this.content == "") {
        this.$message.warning("必填项不能为空");
        return;
      }
      console.log(this.brandId);
      console.log(this.end_time)

      this.$alert("确定进行消息推送吗？选择确定将不可取消", "温馨提示", {
        confirmButtonText: "确定",
        callback: action => {
          console.log(action);
          if (action != "cancel") {
            massagePush(this.brandId.toString(), this.alert, this.content,this.end_time)
              .then(res => {
                console.log(res.data);
                if (res.data.resp_code == "000000") {
                  this.$message.success("消息推送", res.data.resp_message);
                } else {
                  this.$message.warning(res.data.resp_message);
                }
              })
              .catch(err => {
                // console.log(err);
                this.$message.error("服务器繁忙");
              });
          }
        }
      });
    }
  }
};
</script>
<style type="text/css" scoped>
</style>
