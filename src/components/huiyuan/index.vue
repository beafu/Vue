<template>
  <el-card>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="uid" label="用戶ID" min-width="300"></el-table-column>
      <el-table-column prop="nickname" label="昵称" min-width="100"></el-table-column>
      <el-table-column prop="phone" label="手机号" min-width="180">
      </el-table-column>
      <el-table-column prop="addtime" label="注册日期" min-width="250">
          <template v-slot="scope">
            {{ scope.row.addtime| datfmt}}
          </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="$scope">
          <!-- scope.row: 代表的是列表数据的每一行{} -->
          <el-button
            @click="edit($scope.row.id)"
            circle
            icon="el-icon-edit"
            size="mini"
            type="success"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import moment from "moment"
import { huiList } from "../../request/huiyuan";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.hyList();
  },
  filters:{
      datfmt(res){
          return moment(res).format("YYYY-MM-DD HH:mm:ss")
      }
  },
  methods: {
    async hyList() {
      const res = await huiList();
      res.forEach(element => {
          element.addtime=Number(element.addtime)
      });
      if (res) {
        this.list = res;
        console.log(this.list)
      }
    },
  },
};
</script>

<style>
</style>