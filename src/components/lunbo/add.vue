<template>
  <el-card>
    <el-form 
    label-width="120px"
    :model="formdate"
    :rules="rules"
    ref="formdate"
    >
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="formdate.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="轮播图图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="fileChange"
          :limit="1"
          :on-exceed="limitTips"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formdate.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即添加</el-button>
        <el-button @click="resert">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {lunList} from "../../request/lunbo"
export default {
  data() {
    return {
      list:[],
      formdate:{
        title:"",
        img:"",
        status:1
      },
      rules:{
        title: { required: true, message: "分类名称必须填写", trigger: "blur" },
      }, 
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    submit(){
      this.$refs.formdate.validate(async (valid)=>{
        if(valid){
          // 创建FormData实例对象
          const fd = new FormData();
          for (let key in this.formdate) {
            fd.append(key, this.formdate[key]);
          }
          const res=await this.$http.post("/api/banneradd",fd)
          if(res.code==200){
            this.$success("添加成功")
            this.$router.push("/lunboIndex")
          }else{
            this.$error("添加失败")
          }
        }
      })
    },
    resert(){
      this.$refs.formdate.resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取被选择文件的信息
    fileChange(file) {
      this.formdate.img = file.raw;
    },
    // 图片数量超出限制之后的回调
    limitTips() {
      this.$error("此处只能上传一张图片");
    },
    async lunboList(){
      const res=await lunList()
      if(res){
        this.list=res
      }
    }
  },
  created(){
    this.lunboList()
    
  },
};
</script>

<style scoped>
.el-form{
  width: 600px;
  margin: 0 auto;
}
</style>