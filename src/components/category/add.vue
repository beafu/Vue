<template>
  <el-card>
    <el-form label-width="120px" :model="cateInfo" :rules="rules" ref="addForm">
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
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 图片预览 -->
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
        <el-button type="primary" @click="submit">立即添加</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getCategoryList } from "../../request/category";
export default {
  data() {
    return {
      options: [],
      cateInfo: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        pid: { required: true, message: "请选择", trigger: "blur" },
        catename: { required: true, message: "请输入", trigger: "blur" },
        status: { required: true, message: "请选择", trigger: "blur" },
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  components: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    submit() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          // 创建FormData实例对象
          const fd = new FormData();
          for (let key in this.cateInfo) {
            fd.append(key, this.cateInfo[key]);
          }
          const res = await this.$http.post("/api/cateadd", fd);
          if (res.code == 200) {
            this.$success("添加成功");
            this.$router.push("/category");
          } else {
            this.$error("添加失败");
          }
        }
      });
    },
    reset() {
      this.$refs.addForm.resetFields();
    },
    async getList() {
      const res = await getCategoryList();
      if (res) {
        this.options = res;
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
    fileChange(file) {
      this.cateInfo.img = file.raw;
    },
    // 图片数量超出限制之后的回调
    limitTips() {
      this.$error("此处只能上传一张图片");
    },
  },
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: auto;
}
</style>
