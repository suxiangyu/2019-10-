<template>
  <el-aside width="200px" style="background:#545c64;overflow:hidden">
    <div class="asideBox">
      <el-row class="tac">
        <el-col>
          <!-- :router='true' -->
          <el-menu default-active="2" class="el-menu-vertical-demo" background-color="transparent">
            <!-- v-if="power.indexOf(item[0].meta.power)!=-1" 跟低下权限校验用途一样 -->
            <el-submenu
              class="mycolor"
              v-for="(item,index) in menuList"
              :index="index+''"
              :key="index"
            >
              <template slot="title">
                <i :class="item[0].meta.icon"></i>
                <span>{{item[0].meta.rootTil}}</span>
              </template>
              <!-- :route='{path:v.path}' -->
              <router-link tag="span" v-for="(v,i) in item" :to="v.path" :key="index+'-'+i">
                <el-menu-item :index="index+'-'+i">{{v.meta.til}}</el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </el-aside>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  props: ["ary"],
  data() {
    return {
      menuList: [],
      power: localStorage.getItem("power")
    };
  },
  created() {
    this.menuInit();
  },
  methods: {
    menuInit() {
      //   console.log(ary);
      let t = [this.ary[0]]; // 把6项拆成3项
      this.ary.reduce((prev, cur) => {
        if (prev.meta.type == cur.meta.type) {
          t.push(cur);
        } else {
          this.menuList.push(t);
          t = [cur];
        }
        return cur;
      });
      this.menuList.push(t);
      // 权限校验
      this.menuList = this.menuList.filter(item => {
        if (!this.power) return false; // 若不存在power 则数组为空即可
        return this.power.includes(item[0].meta.power);
      });
      console.log(this.menuList);
      // 权限校验之后  设置默认的跳转路径
      let url = this.menuList[0] && this.menuList[0][0].path
      let ary = this.$route.path.split('/');
      if(ary.length>2&&ary.pop().length>0){
        // 说明路径是在二级路径下  这时啥也不用做
        // ary.length>2 说明至少有两个 /   例:/qqq/q  split拆了后是['' 'qqq' 'q'] 所以可以用length判断
        // ary.pop().length>0 说明最后一项的长度不是0 也就是说第二个/后边有内容 也就是当前是二级路径
      }else{
        this.$router.push(url)
      }
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
// scoped 当前元素组件类名才起作用 对儿子 孙子不起作用
.mycolor {
  span,
  li {
    color: #fff;
  }
}
.router-link-active {
  .el-menu-item {
    color: rgb(9, 248, 228);
  }
}
.asideBox {
  height: 100%;
  width: 110%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>