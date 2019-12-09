<template>
  <div class="userBox">
    <div>
      <el-select :value="value" @change="selectChange" placeholder="请选择部门">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input
        style="width:300px;margin-left:20px"
        placeholder="请输入内容"
        v-model="input4"
        @change="search"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column label="性别" width="50">
        <template slot-scope="scope">
          <span>{{scope.row.sex==0?'男':'女'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" width="80"></el-table-column>
      <el-table-column prop="job" label="职务" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="phone" label="电话" width="150"></el-table-column>
      <el-table-column prop="desc" label="描述" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// @ is an alias to /src
import { delUserList } from "@/api/index.js";
export default {
  name: "XXX",
  data() {
    return {
      value: "",
      input4: ""
    };
  },
  created() {
    this.$store.dispatch("changeUserList");
  },
  computed: {
    options() {
      let ary = this.$store.state.departmentList;
      return [
        {
          id: 0,
          name: "全部"
        },
        ...ary
      ];
      // 这里之前有个bug  添加部门之后  刷新会出现多个部门  这样改就没了
    },
    tableData() {
      return this.$store.state.userList;
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    },
    handleEdit(index,row) {
       console.log(index, row);
      this.$router.push({
        path:'/org/adduser',
        query:{id:row.id}
      })
    },
     handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击了确认按钮
          // 调用api中的delDpList方法
          delUserList(row.id).then(data => {
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.$store.dispatch("changeUserList"); // 删除成功之后  更新一下数据  这是从后台拿的数据更
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    selectChange(val) {
      console.log(val);
      this.value = val;
      this.$store.dispatch("changeUserList", {
        departmentId: val,
        search: this.input4
      });
    },
    search() {
      this.$store.dispatch("changeUserList", {
        departmentId: this.value || 0,
        search: this.input4
      });
    }
  },
  components: {}
};
</script>
<style lang="less">
.userBox {
  text-align: right;
  padding: 20px;
  height: 100%;
  background: #fff;
  > div:nth-child(1) {
    padding-bottom: 20px;
  }
}
</style>
