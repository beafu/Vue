<template>
  <el-card>
    <el-form
      label-width="120px"
      :model="formData"
      :rules="formRules"
      ref="addForm"
    >
      <!-- prop当前绑定数据的名称，填充的唯一标识 -->
      <el-form-item label="角色名称" prop="roleid">
       <el-select v-model="formData.roleid">
          <el-option value="" label="请选择"></el-option>
          <el-option v-for="item in roleList" :key="item.id" :value="item.id" 
          :label="item.rolename"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员名称" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入管理员名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="password">
        <el-input
          v-model="formData.password"
          show-password
          placeholder="请输入管理员密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即添加</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {getRoleList} from "../../request/role"
export default {
  data() {
    return {
      roleList:[],
      formData: {
        // 角色id
        roleid: "",
        // 登录账号
        username: "",
        // 登录密码
        password: "",
        // 状态
        status: 1,
      },
      formRules: {
        roleid:{required:true,message:"请选择",trigger:"blur"},
        username:{required:true,message:"请输入",trigger:"blur"},
        password:{required:false,message:"请输入",trigger:"blur"},
        status:{required:false,message:"请选择",trigger:"blur"},

      },
    };
  },
  created() {
      this.getRoleList()
  },
  mounted() {},
  methods: {
      submitForm(){
          this.$refs.addForm.validate(async valid=>{
              if(valid){
                  const res=await this.$http.post("/api/useradd",this.formData);
                  if(res.code==200){
                      this.$success("添加成功")
                      this.resetForm()
                  }else{
                      this.$error("添加失败");
                  }
              }else{
                  console.log("表单校验失败")
              }
          })
      },
      resetForm(){
          this.$refs.addForm.resetFields();
      },
       // 获取角色列表
      async getRoleList(){
          const res=await getRoleList();
          if(res){
              this.roleList=res
          }
      }
  },
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: 0 auto;
}
</style>
