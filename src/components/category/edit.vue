<template>
  <el-card>
    <el-form
      label-width="120px"
      :model="cateInfo"
      :rules="rules"
      ref="addForm"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select placeholder="请选择" v-model="cateInfo.pid">
           <el-option :value="0" label="顶级分类"></el-option>
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input
          v-model="cateInfo.catename"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类图片">
         <!-- 
          action: 指定上传图片的接口地址
          list-type: 指定展示样式
          on-preview: 预览的事件监听函数
          on-remove: 删除的事件监听函数
          on-change: 监听文件的改变
          limit:限制上传图片的数量
         -->
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="fileChange"
          :limit="1"
          :on-exceed="limitTips"
          :file-list="imgList"
         
        >
        <i  class="el-icon-plus"></i>
        <!-- 两种方法一种加file-list一种不加，而是给页面添加el-image 属性标签 -->
        <!-- 给图片一个存放的空间，进行判断，通过数组里的img，如果有，就让放在原型上的链接来进行图片地址拼接 -->
          <!-- <i class="el-icon-plus" v-if="cateInfo.img==''"></i>
          <el-image :src="$imgBaUrl+cateInfo.img" v-else></el-image> -->
        </el-upload>
         <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="cateInfo.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即更新</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getCategoryList,getCategoryById } from "../../request/category";
export default {
  data() {
    return {
      options: [],
      cateInfo: {
        id:this.$route.params.id,
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      imgList:[],
      rules: {
        pid: { required: true, message: "请选择", trigger: "blur" },
        catename: { required: true, message: "请输入", trigger: "blur" },
        status: { required: true, message: "请选择", trigger: "blur" },
      },
        dialogImageUrl: '',
        dialogVisible: false
    };
  },
  components: {},
  created() {
    this.getList();
    this.getListByid()
  },
  mounted() {},
  methods: {
    submit(){
        this.$refs.addForm.validate(async valid=>{
          if(valid){
             // 创建FormData实例对象
             const fd=new FormData();
             for(let key in this.cateInfo){
               fd.append(key,this.cateInfo[key])
             }
             //再把创建好的formData实例对象追加相对应的id
             fd.append("id",this.$route.params.id)
             const res=await this.$http.post("/api/cateedit",fd);
             if(res.code==200){
               this.$success("更新成功")
               this.$router.push("/category")
             }else{
               this.$error("更新失败")
             }
          }
        })

    },
    async getList() {
      const res = await getCategoryList();
      if (res) {
        this.options = res;
      }
    },
    async getListByid(){
      const res=await getCategoryById(this.cateInfo.id)
      if(res){
        this.cateInfo=res
        this.imgList=[{url:this.$imgBaUrl+res.img}]
      }
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 获取被选择文件的信息
       fileChange(file){
      this.cateInfo.img=file.raw
    },
     // 图片数量超出限制之后的回调
    limitTips(){
      this.$error('此处只能上传一张图片');
    }
  },
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: auto;
}
</style>
