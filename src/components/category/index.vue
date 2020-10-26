<template>
 <el-card>
      <el-button
        @click="$router.push('/category/add')"
        type="primary"
        icon="el-icon-circle-plus-outline"
        >添加</el-button
      >
      <el-divider />
      <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="ID"  min-width="80"></el-table-column>
      <el-table-column prop="catename" label="分类名称"  min-width="180"></el-table-column>
      <el-table-column prop="img" label="分类图片"  min-width="180">
        <template slot-scope="scope">
         <el-image 
         :src="$imgBaUrl+scope.row.img" 
         :style="{width:'120px'}" 
         v-if="scope.row.img!=''"
         ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
         <template slot-scope="$scope">
         <el-tag type="success" v-if="$scope.row.status==1">正常</el-tag>
         <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
         <template slot-scope="$scope">
        <el-button @click="edit($scope.row.id)" circle icon="el-icon-edit" size="mini" type="success"></el-button>
        <el-button @click="del($scope.row.id)" circle icon="el-icon-delete" size="mini" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
 </el-card>
</template>

<script>
import {getCategoryList} from "../../request/category"
export default {
  data() {
    return {
      list:[],
    };
  },
  components: {},
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    edit(id){
      this.$router.push("/category/"+id)
    },
    del(id){
      this.$myConfirm(async ()=>{
        const res=await this.$http.post("/api/catedelete",{id})
        if(res.code==200){
          this.$success("删除成功")
          const index=this.list.findIndex(item=>item.id==id)
          this.list.splice(index,1)
        }else{
          this.$error("删除失败")
        }
      })
    },
    async getList(){
      const res=await getCategoryList()
      if(res){
        this.list=res
      }
    }
  },
};
</script>
<style scoped>
</style>
