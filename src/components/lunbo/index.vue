<template>
  <el-card>
    <el-button
      type="primary"
      @click="$router.push('/lunboIndex/add')"
      icon="el-icon-circle-plus-outline"
      >添加</el-button
    >
    <el-divider></el-divider>
      <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="title" label="轮播图名称"  min-width="180"></el-table-column>
      <el-table-column prop="img" label="图片"  min-width="180">
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
import {lunList} from "../../request/lunbo"
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.LunList()
    },
    methods:{
      edit(id){
        this.$router.push("/lunboIndex/"+id)
      },
      del(id){
        this.$myConfirm(async ()=>{
          const res=await this.$http.post("/api/bannerdelete",{id});
          if(res.code==200){
            this.$success("删除成功")
            const indes=this.list.findIndex(item=>item.id==id)
            this.list.splice(indes,1)
          }else{
            this.$error("删除失败")
          }
        })
      },
        async LunList(){
            const res=await lunList()
            if(res){
                this.list=res
            }
        }
    }
};
</script>

<style>
</style>