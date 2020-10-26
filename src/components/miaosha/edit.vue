<template>
  <el-card>
    <el-form 
    label-width="120px"
    :model="formdate"
    ref="formdate"
    :rules="rules"
    >
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="formdate.title" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
       <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
      </el-form-item>
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="formdate.first_cateid" @change="firstChange">
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
        <el-select v-model="formdate.second_cateid"  @change="secondChange">
          <el-option value label="请选择"></el-option>
          <el-option
            v-for="item in secondList"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品" prop="goodsid">
        <el-select v-model="formdate.goodsid">
          <el-option value label="请选择"></el-option>
          <el-option
            v-for="item in name"
            :key="item.id"
            :value="item.id"
            :label="item.goodsname"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group  v-model="formdate.status">
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
import moment from "moment"
import axios from "../../common/http"
import {getMiaoList,getMiaoByid} from "../../request/miaosha"
import {getCategoryList} from "../../request/category"
import {getGoodslist} from "../../request/goodslist"
export default {
  data() {
    return {
      firatList: [],
      secondList: [],
      shopList: [],
      name:[],
      formdate:{
          id:this.$route.params.id,
          title:"",
          begintime:null,
          endtime:null,
          first_cateid:"",
          second_cateid:"",
          goodsid:"",
          status:1,
      },
      rules:{
        title: { required: true, message: "请选择", trigger: "blur" },
        first_cateid: { required: true, message: "请输入", trigger: "blur" },
        second_cateid: { required: true, message: "请选择", trigger: "blur" },
        goodsid: { required: true, message: "请选择", trigger: "blur" },
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "一天内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 );
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "三天内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2:[],
    };
  },
  created(){
      this.getList()
      this.getByid()
  },
  methods:{
      submit(){
          this.$refs.formdate.validate(async valid=>{
              if(valid){
                  this.formdate.begintime=new Date(this.value2[0]).getTime()
                  this.formdate.endtime=new Date(this.value2[1]).getTime()
                  const res=await this.$http.post("/api/seckedit",{...this.formdate,id:this.$route.params.id})
                  if(res.code==200){
                      this.$success("添加成功")
                      this.$router.push("/miaoIndex")
                  }else{
                      this.$error("添加失败")
                  }
              }
          })
      },
      resert(){
          this.$refs.formdate.resetFields();
          this.value2=[]
      },
      firstChange(id){
          // 通过一级分类的id查找对应索引
          const index=this.firatList.findIndex(item=>item.id==id)
          // 更新二级分类
          this.secondList=this.firatList[index].children
      },
      secondChange(data){
      const arr=[];
      this.shopList.forEach(el=>{
        if(el.second_cateid==data){
          arr.push({
            id:el.id,
            goodsname:el.goodsname
          })
        }
        this.name=arr;
      })
      console.log(this.name)
    },
      async getList(){
          const res=await axios.all([getCategoryList(),getGoodslist()])
          if(res){
              [this.firatList,this.shopList]=res
          }
      },
      async getByid(){
        const res=await getMiaoByid(this.formdate.id)
        if(res){
          this.formdate=res
          this.firstChange(this.formdate.first_cateid)
          this.secondChange(this.formdate.second_cateid)
          const ti=Number(this.formdate.begintime)
          const te=Number(this.formdate.endtime)
          const one=moment(ti).format("yyyy-MM-DD HH:mm:ss")
          const two=moment(te).format("yyyy-MM-DD HH:mm:ss")
          this.value2.push(one,two)
        }
      }
  }
};
</script>

<style scoped>
.el-form {
  width: 600px;
  margin: 0 auto;
}
</style>