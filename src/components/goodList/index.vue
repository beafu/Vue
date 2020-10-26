<template>
  <el-card>
    <el-button
      type="primary"
      @click="$router.push('/goods/add')"
      icon="el-icon-circle-plus-outline"
      >添加</el-button
    >
    <el-divider></el-divider>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="50"></el-table-column>
      <el-table-column prop="firstcatename" label="一级分类" min-width="100"> </el-table-column>
      <el-table-column prop="secondcatename" label="二级分类" min-width="100">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" min-width="120"> </el-table-column>
      <el-table-column prop="img" label="商品图片" min-width="120">
        <template v-slot="scope">
          <el-image :src="$imgBaUrl + scope.row.img"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="销售价格" min-width="120">
        <template v-slot="scope">
          <span style="color:red">￥{{scope.row.price}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="market_price" label="市场价格" min-width="120">
          <template v-slot="scope">
          <span style="color:red">￥{{scope.row.market_price}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" min-width="120">
         <!--  active-color: 激活状态的颜色
                    inactive-color: 未激活的颜色
                    active-value: 激活状态的值
                    inactive-value:未激活状态的值
          -->
        <template v-slot="scope">
          <el-tooltip :content="scope.row.isnew==1?'是':'否'" placement="top"></el-tooltip>
          <el-switch
           @change="undateState(scope.row,'isnew')"
            v-model="scope.row.isnew"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" min-width="120">
       <template v-slot="scope">
         <el-tooltip :content="scope.row.ishot==1?'是':'否'" placement="top"></el-tooltip>
          <el-switch
          @change="undateState(scope.row,'ishot')"
            v-model="scope.row.ishot"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="120">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template slot-scope="$scope">
          <el-button
            @click="edit($scope.row.id)"
            circle
            icon="el-icon-edit"
            size="mini"
            type="success"
          ></el-button>
          <el-button
            @click="del($scope.row.id)"
            circle
            icon="el-icon-delete"
            size="mini"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="size"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { getGoodslist,getTotal,updateInfo } from "../../request/goodslist";
export default {
  data() {
    return {
      list: [],
      page: 1,
      size: 5,
      total: 0,
    };
  },
  async created() {
    this.getgoodList();
    this.total=await getTotal()
  },
  mounted() {},
  methods: {
    async undateState(info, attr){
      let postDate={id:info.id};
      postDate[attr]=info[attr];
      const request=updateInfo(postDate);
      if(request){
        this.$success("更新成功")
      }else{
        this.$error("更新失败")
      }
    },
    edit(id) {
      this.$router.push("/goods/"+id)
    },
    del(id) {
      this.$myConfirm(async ()=>{
        const res=await this.$http.post("/api/goodsdelete",{id})
        if(res.code==200){
          const index=this.list.findIndex(item=>item.id==id);
          this.list.splice(index,1)
          this.$success("删除成功")
        }else{
          this.$error("删除失败")
        }
      })
    },
     // 监听size的更新
    handleSizeChange(size) {
       // 1-更新size
      this.size=size;
      // 2-重新请求商品列表
      this.getgoodList()
    },
    // 监听页码page的更新
    handleCurrentChange(page) {
      // 1-更新page
      this.page=page;
      // 2-重新请求商品列表
      this.getgoodList()
    },
    async getgoodList() {
      const res = await getGoodslist({ page: this.page, size: this.size });
      if (res) {
        this.list = res;
      }
    },
  },
};
</script>
<style scoped>
</style>
