<template>
  <div class="add">
    <el-card>
      <el-form
        label-width="120px"
        :model="formData"
        :rules="formRules"
        ref="addForm"
      >
        <!-- prop当前绑定数据的名称，填充的唯一标识 -->
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级" prop="pid" v-if="formData.type == 2">
          <el-select v-model="formData.pid" placeholder="请选择">
            <el-option value="" label="请选择"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="请输入标题名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标" v-if="formData.type == 1">
          <el-input
            v-model="formData.icon"
            placeholder="请输入标题图标"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" v-if="formData.type == 2">
          <el-input
            v-model="formData.url"
            placeholder="请输入菜单地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">修改添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//导入获取菜单列表的方法
import { getMenuList,getMenuById} from "../../request/menu";
export default {
  name: "add",
  data() {
    return {
      //上级菜单列表
      menuList: [],
      //和表单数据双向绑定
      formData: {
        id:this.$route.params.id,
        pid: "",
        type: 1,
        title: "",
        icon: "",
        url: "",
        status: 1,
      },
      //表单校验规则
      formRules: {
        type: { required: true, message: "请选择类型", trigger: "blur" },
        title: { required: true, message: "请输入菜单名称", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  methods: {
    submitForm() {
      // ref前面一定要定义，之后调用在this中找到$refs
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          // console.log('表单校验成功');
          const res = await this.$http.post("/api/menuedit", {...this.formData,id:this.$route.params.id});
          if (res.code == 200) {
            return this.$success("更新成功")
          }
          //  重置表单
          this.$refs.addForm.resetFields();
        } else {
          console.log("表单校验失败");
        }
      });
    },
    resetForm() {
        this.$refs.addForm.resetFields();
      }
  },
  created() {
    //生命周期调用方法中调用所定义的函数方法
    getMenuList().then((res) => {
      this.menuList = res;
    });
    getMenuById(this.formData.id).then(res=>{
      this.formData=res
    });
  },
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: 0 auto;
}
</style>
