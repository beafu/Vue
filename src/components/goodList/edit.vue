<template>
  <el-card>
    <el-form
      label-width="120px"
      :model="formDate"
      :rules="rules"
      ref="formDate"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <div class="jiben">
            <el-form-item label="一级分类" prop="first_cateid">
              <el-select v-model="formDate.first_cateid" @change="firstChange">
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="item in firatList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.catename"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="second_cateid">
              <el-select v-model="formDate.second_cateid">
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="item in secondList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.catename"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsname">
              <el-input
                placeholder="请输入商品名称"
                v-model="formDate.goodsname"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input
                placeholder="请输入商品价格"
                v-model="formDate.price"
              ></el-input>
            </el-form-item>
            <el-form-item label="市场价格" prop="market_price">
              <el-input
                placeholder="请输入市场价格"
                v-model="formDate.market_price"
              ></el-input>
            </el-form-item>

            <el-form-item label="商品图片" prop="img">
              <el-upload
                action="#"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :auto-upload="false"
                :limit="1"
                :on-exceed="limitTips"
                :on-change="fileChange"
                :file-list="imgList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
            <el-form-item label="商品规格" prop="specsid">
              <el-select v-model="formDate.specsid" @change="specsChange">
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="item in specsidList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.specsname"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="规格属性值" prop="specsattr">
              <el-select v-model="formDate.specsattr" multiple>
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="(item, index) in specsAttr"
                  :key="index"
                  :value="item"
                  :label="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否新品" prop="isnew">
              <el-radio-group v-model="formDate.isnew">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否热卖" prop="ishot">
              <el-radio-group v-model="formDate.ishot">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="formDate.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-tab-pane>

        <el-tab-pane label="详细描述" name="second">
          <el-form-item label-width="0" prop="description">
            <vue-wangeditor
              id="editor"
              ref="editor"
              width="100%"
              style="height: 500px"
              v-model="formDate.description"
            ></vue-wangeditor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" @click="submit">立即添加</el-button>
        <el-button @click="resert">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import vueWangeditor from "vue-wangeditor";
import axios from "../../common/http";
import { getCategoryList } from "../../request/category";
import { getspecList } from "../../request/specs";
import { getGoodsByid } from "../../request/goodslist";
export default {
  data() {
    //自定义校验规则
    const val = (rule, value, callback) => {
      const html = this.$refs.editor.getHtml();
      if (html.trim() == "<p><br></p>") {
        return callback(new Error("请输入商品介绍"));
      }
      callback();
    };
    return {
      // 一级分类
      firatList: [],
      // 二级分类
      secondList: [],
      //  规格列表
      specsidList: [],
      // 规格属性值
      specsAttr: [],
      dialogImageUrl: "",
      dialogVisible: false,
      imgList:[],
      formDate: {
        id:this.$route.params.id,
        first_cateid: "", //一级分类id
        second_cateid: "", // 二级分类id
        goodsname: "", // 商品名称
        price: "", // 商品价格
        market_price: "", // 市场价格
        img: "", // 商品图片
        description: "", // 商品描述
        specsid: "", // 规格id
        specsattr: [], // 规格属性值
        isnew: "", // 是否新品
        ishot: "", // 是否热卖
        status: "", // 状态
      },
      activeName: "first",
      rules: {
        first_cateid: { required: true, message: "请选择", trigger: "blur" },
        second_cateid: { required: true, message: "请输入", trigger: "blur" },
        goodsname: { required: true, message: "请选择", trigger: "blur" },
        price: { required: true, message: "请选择", trigger: "blur" },
        market_price: { required: true, message: "请选择", trigger: "blur" },
        specsid: { required: true, message: "请选择", trigger: "blur" },
        specsattr: { required: true, message: "请选择", trigger: "blur" },
        description: { validator: val, trigger: "blur" },
      },
    };
  },
  components: {
    vueWangeditor,
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    submit() {
      this.$refs.formDate.validate(async (valid) => {
        if (valid) {
          const fd = new FormData();
          for (let key in this.formDate) {
            fd.append(key, this.formDate[key]);
          }
          fd.append("id",this.$route.params.id)
          fd.append("description", this.$refs.editor.getHtml());
          const res = await this.$http.post("/api/goodsedit", fd);
          if (res.code == 200) {
            this.$success("更新成功");
            this.$router.push("/goods");
          } else {
            this.$error("更新失败");
          }
        } 
      });
    },
    resert() {
      this.$refs.formDate.resetFields();
    },
    limitTips() {
      this.$error("此次最多只能上传一张图片");
    },
    fileChange(file) {
      this.formDate.img = file.raw;
    },
    // 监听一级分类的更新
    firstChange(id) {
      // 通过一级分类的id查找对应索引
      const index = this.firatList.findIndex((item) => item.id == id);
      // 更新二级分类
      this.secondList = this.firatList[index].children;
    },
    // 监听规格的更新
    specsChange(id,isReset=true) {
      const index = this.specsidList.findIndex((item) => item.id == id);
      //更新规格属性值的数组
      this.specsAttr = this.specsidList[index].attrs;
      //清空已经选择规格的属性
       if (isReset) {
        this.formDate.specsattr = [];
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async getList() {
      const res = await axios.all([
          getCategoryList(), 
          getspecList(),
          getGoodsByid(this.formDate.id)
          ]);
      if (res) {
        // 更新分类数组
        // 更新规格数组
        [this.firatList, this.specsidList,this.formDate] = res;
        // 商品图片列表
        this.imgList=[{url:this.$imgBaUrl+this.formDate.img}];
        // 获取二级分类
        this.firstChange(this.formDate.first_cateid);
         // 获取规格列表
        this.specsChange(this.formDate.specsid,false);
        // 获取规格属性值 '白色,黑色'=>['白色','黑色']
        this.formDate.specsattr=this.formDate.specsattr.split(",");
        // console.log(this.formDate.specsid)
        // 手动设置富文本编辑器的内容
        this.$refs.editor.setHtml(this.formDate.description)
      }
    },
  },
};
</script>
<style scoped>
.jiben {
  width: 600px;
  margin: 0 auto;
}
</style>
