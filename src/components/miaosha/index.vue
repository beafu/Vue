<template>
  <el-card>
      <el-button
      type="primary"
      @click="$router.push('/miaoIndex/add')"
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
      <el-table-column prop="title" label="活动名称"  min-width="180"></el-table-column>
      <el-table-column prop="begintime" label="开始时间"  min-width="180">
        <template v-slot="scope">
            {{ scope.row.begintime| datfmt}}
          </template>
      </el-table-column>
       <el-table-column prop="endtime" label="结束时间"  min-width="180">
        <template v-slot="scope">
            {{ scope.row.endtime| datfmt}}
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
import moment from "moment"
import {getMiaoList} from "../../request/miaosha"
export default {
    data(){
        return{
            list:[]
        }
    },
     filters:{
      datfmt(res){
          return moment(res).format("yyyy-MM-DD HH:mm:ss")
      }
  },
    created(){
        this.MiaoList()
    },
    methods:{
        edit(id){
            this.$router.push("/miaoIndex/"+id)
        },
        del(id){
            this.$myConfirm(async ()=>{
                const res=await this.$http.post("/api/seckdelete",{id})
                if(res.code==200){
                    const index=this.list.findIndex(item=>item.id==id)
                    this.list.splice(index,1);
                    return this.$success("删除成功")
                }else{
                    this.$error("删除失败")
                }
            })
        },
        async MiaoList(){
            const res=await getMiaoList()
            res.forEach(element => {
                element.begintime=Number(element.begintime)
                element.endtime=Number(element.endtime)
            });
            if(res){
                this.list=res
            }
        }
    }
}
</script>

<style>

</style>