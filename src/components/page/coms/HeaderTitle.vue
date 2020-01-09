<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="pageHeader">
          <i :class="Icon"></i>
          <span>{{Title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
import { roleManage } from "../../../assets/js/btncode";
export default {
  props: {
    Title: String,
    Icon: String
  },
};
</script>