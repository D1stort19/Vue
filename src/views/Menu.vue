<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useUser } from "@/store/user.js";
const store = useUser();
console.log(store);

const login = () => {
  router.push("/login");
};
const register = () => {
  router.push("/register");
};
const home = () => {
  router.push("/list");
};
const admin = () => {
  router.push("/adminlist");
};
const report = () => {
  router.push("/reportlist");
};
</script>

<template>
  <div class="header">
    <div class="header-body">
      <el-menu
        :default-active="1"
        active-text-color="#39c5bb"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item @click="" index="0">
          <img style="width: 100px" src="@/assets/logo.webp" alt="logo" />
        </el-menu-item>
        <el-menu-item @click="home" index="1">主页</el-menu-item>
        <el-menu-item @click="report" index="2">举报</el-menu-item>
        <el-menu-item
          v-if="store.user_id != null && store.user_type == 2"
          @click="admin"
          index="3"
          >管理员</el-menu-item
        >
        <el-menu-item @click="register" index="4">注册</el-menu-item>
        <el-menu-item @click="login" index="5">登录</el-menu-item>
      </el-menu>
    </div>
  </div>
  <div class="list-body">
    <router-view />
  </div>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(3) {
  margin-right: auto;
}

.el-menu-demo {
  opacity: 0.75;
}

.header {
  top: 0px;
  position: fixed;
  height: 60px;
  width: 100%;
  background: white;
  box-shadow: 0 2px 6px 0 #ddd;
  z-index: 10;
}

.list-body {
  margin-top: 80px;
  position: relative;
}

.header-body {
  margin: 0 auto;
  width: 85%;
}
</style>
