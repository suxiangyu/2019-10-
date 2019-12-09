<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="myform">
    <el-form-item label="姓名" prop="name" style="width:200px">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="form.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" style="width:350px">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone" style="width:300px">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="部门" prop="departmentId">
      <el-select v-model="form.departmentId" placeholder="请选择部门">
        <el-option
          v-for="item in departmentList"
          :label="item.name"
          :value="item.id+''"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职务" prop="jobId">
      <el-select v-model="form.jobId" placeholder="请选择职务">
        <el-option v-for="item in jobList" :label="item.name" :value="item.id+''" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="自我介绍" prop="desc" style="width:400px">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { addUserList, updateUserList, getJobList } from "@/api/index.js";
import { maoState, mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        sex: "",
        email: "",
        phone: "",
        departmentId: "",
        jobId: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请填写性别", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        departmentId: [
          { required: true, message: "请输入部门", trigger: "blur" }
        ],
        jobId: [{ required: true, message: "请输入职务", trigger: "blur" }],
        desc: [{ required: true, message: "请输入自我介绍", trigger: "blur" }]
      }
    };
  },
  computed: {
    // departmentList() {
    //    return this.$store.state.departmentList;
    // },
    // jobList() {
    //   return this.$store.state.jobList;
    // }
    ...mapState(["departmentList", "jobList"])
  },
  created() {
    // this.$store.dispatch("changeJobList");  // 在这调用action中的方法  该方法调用接口  获取数据 成功后调用
    // mutation中的对应方法  然后把state中的数据修改
    // state中的数据修改之后  触发当前组件的视图更新
    let id = this.$route.query.id;
    let obj = this.$store.state.userList.filter(item => item.id == id)[0];
    console.log(obj);
    this.form = obj ? obj : this.form;
    // this.form.departmentId*=1;
    // this.form.jobId*=1;
    // 把两个ID统一转成数字
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(flag => {
        // flag 是true 代表刚才的验证规则都通过了
        console.log(flag);
        if (flag) {
          let id = this.$route.query.id;
          this.form.userId = id; // 后台要这个参数
          (id ? updateUserList : addUserList)(this.form).then(data => {
            if (data.code == 0) {
              // 新增成功
              this.$confirm((id ? "更新" : "添加") + "成功！", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              }).then(
                () => {
                  this.$router.push("/org/user");
                },
                () => {}
              );
            } else {
              this.$message.error("添加失败");
            }
          });
        }
      });
    }
  }
};
</script>