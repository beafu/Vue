<template>
  <el-card>
    <el-button
      type="primary"
      @click="$router.push('/admin/add')"
      icon="el-icon-circle-plus-outline"
      >添加</el-button
    >
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="180"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="error" v-else>禁用</el-tag>
        </template>
      </el-table-column>
       <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="edit(scope.row.uid)" type="success" size="mini" circle icon="el-icon-edit"></el-button>
          <el-button @click="del(scope.row.uid)" type="danger" size="mini" circle icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @current-change="pageChange" :page-size="size" background layout="prev, pager, next" :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import { getAdminList, getAdminCount } from "../../request/admin";
export default {
  // 组件中的data为什么要使用一个函数return {}?
  // 组件会被多次调用,
  // {} 是一种引用数据类型,
  data() {
    return {
      // 页码
      page: 1,
      // 每页显示的数据条数
      size: 2,
      // 数据总条数
      total: 1000,
       // 列表数组
      list: [],
    };
  },
  created() {
      this.queryList();
      this.getCount();
  },
  mounted() {},
  methods: {
      edit(uid){
          this.$router.push("/admin/"+uid)
      },
      del(uid){
        this.$myConfirm(async ()=>{
          const res=await this.$http.post("/api/userdelete",{uid});
          if(res.code==200){
            const index=this.list.findIndex(item=>item.uid==uid);
            this.list.splice(index,1);
            return this.$success("删除成功")
          }
          this.$error("删除列表")
        })
      },
      // 获取管理员列表
      async queryList(){
          const list=await getAdminList({page:this.page,size:this.size});
          //更新列表数据
          if(list){
              this.list=list
          }
      },
       // 获取数据总条数
      async getCount(){
          const total=await getAdminCount();
          this.total= total[0].total
      },
      // 页码更新回调函数
      pageChange(page){
         // 1-更新页码
          this.page=page;
          // 2-重新请求列表数据
          this.queryList();
      }
  },
};
</script>
<style scoped>
</style>
