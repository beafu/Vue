<template>
  <div class="index">
    <el-card>
      <el-button
        @click="$router.push('/role/add')"
        type="primary"
        icon="el-icon-circle-plus-outline"
        >添加</el-button
      >
      <el-divider />
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" min-width="80">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称"  min-width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态"  min-width="180">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作"  min-width="180">
          <template v-slot="scope">
            <el-button @click="edit(scope.row.id)" type="success" size="mini" icon="el-icon-edit" circle></el-button>
             <el-button icon="el-icon-view" circle size="mini" type="warning" ></el-button>
            <el-button @click="del(scope.row.id)" type="danger" size="mini" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getRoleList} from "../../request/role"
export default {
  name: "index",
  data() {
    return {
      list: [],
    };
  },
  components: {},
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    edit(id){
      this.$router.push("/role/"+id)
    },
    del(id){
      this.$myConfirm(async ()=>{
        const res=await this.$http.post("/api/roledelete",{id});
        if(res.code==200){
          // 1-成功提示
          this.$success("删除成功")
          // 2-移除页面上被删除的数据
          // 根据id查找索引
          const index=this.list.findIndex(item=>item.id==id);
          // 删除数组元素
          this.list.splice(index,1)
        }
      })
    },
    async getList(){
      const  res=await getRoleList();
      // console.log(res)
      if(res){
        // 更新数据
        this.list=res
      }
    }
  },
};
</script>
<style scoped>
</style>
