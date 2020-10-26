<template>
  <div class="login">
    <div class="login-box">
      <h3 class="name">小U商城后台管理</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- prop用来和表单规则校验关联的属性 -->
        <el-form-item prop="username" >
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="请输入用户名"
          >
            <template slot="prepend">
                  <i class="el-icon-user-solid"></i>
              </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            show-password
            autocomplete="off"
            placeholder="请输入密码"
          >
           <template slot="prepend">
                  <i class="el-icon-s-promotion"></i>
              </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 和表单进行数据绑定
      ruleForm: {
        username: "",
        password: "",
      },
      //  表单元素校验规则
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //   alert("submit!");
        console.log(this.$axios)
        this.$http.post('/api/userlogin',this.ruleForm).then(res=>{
            console.log(res);
            if(res.code==200){
              this.$success("登录成功")
              sessionStorage.setItem('userInfo',JSON.stringify(res.list));
              this.$router.push('/');
            }else{
             this.$error("登录失败")
            }
        })

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.login {
  height: 100vh;
  background: url("../assets/img/loginbg.jpeg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 300px;
  background: white;
  border-radius: 5px;
  padding: 30px;
}
.name {
  text-align: center;
}
.btn{
  width: 100%;
}
</style>
