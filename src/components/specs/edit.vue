<template>
  <el-card>
    <el-form
      label-width="120px"
      :model="listInfor"
      :rules="rules"
      ref="listInfor"
    >
      <el-form-item label="属性名" prop="specsname">
        <el-input
          placeholder="请输入属性名"
          v-model="listInfor.specsname"
        ></el-input>
      </el-form-item>
      <el-form-item label="属性值" prop="attrs">
        <div class="el-div" v-for="(item, index) in arrList" :key="index">
          <el-input placeholder="请输入属性值" v-model="item.value"></el-input>
          <el-button type="success" class="btn" v-if="index == 0" @click="add"
            >添加属性</el-button
          >
          <el-button type="danger" v-else @click="delArr(index)"
            >移除属性</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="listInfor.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {getspecById} from "../../request/specs"
export default {
  data() {
    //自定义表单校验规则
    var valArr = (rule, value, callback) => {
      this.arrList.forEach((element) => {
        if (element.value == "") {
          callback(new Error("请输入属性值！"));
        }
      });
      //无论成功与否，都应该调用callback
      callback();
    };
    return {
      arrList: [{ value: "" }],
      listInfor: {
        id:this.$route.params.id,
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: { required: true, message: "请输入属性名", trigger: "blur" },
        //自定义的表单校验规则
        attrs: { validator: valArr, trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  components: {},
  created() {
    this.getByid()
  },
  mounted() {},
  methods: {
    add() {
      if (this.arrList.length >= 5) {
        return false;
      }
      this.arrList.push({ value: "" });
    },
    delArr(index) {
      this.arrList.splice(index, 1);
    },
    submit() {
      this.$refs.listInfor.validate(async valid=>{
        this.listInfor.attrs=this.arrList.map(item=>item.value).join(",");
        if(valid){
          const res=await this.$http.post("/api/specsedit",{...this.listInfor,id:this.$route.params.id})
          if(res.code==200){
            this.$success("更新成功")
            this.$router.push("/specs")
          }else{
            this.$error("更新失败")
          }
        }
      })
    },
    async getByid(){
      const res=await getspecById(this.listInfor.id)
      if(res){
        this.listInfor=res[0];
        this.arrList=res[0].attrs.map(item=>({value:item}))
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
.el-div {
  width: 400px;
  display: flex;
  margin: 5px 0;
}
.btn {
  margin-left: 50px;
}
</style>
