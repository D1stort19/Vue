<script setup>
import { useFetch } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "@/store/user.js";

const router = useRouter();
const store = useUser();
const inputUserName = ref("");
const inputPassword = ref("");
const url = ref("/api/user/login");
const body = ref({
  username: inputUserName,
  password: inputPassword,
});
const { onFetchResponse, data, execute } = useFetch(url, {
  immediate: false,
})
  .post(body)
  .json();
onFetchResponse((response) => {
  console.log(data);

  if (data._value.code === 200) {
    ElMessage({
      message: "登录成功.",
      type: "success",
    });
    store.username = inputUserName;
    store.password = inputPassword;
    store.user_type = data._value.data.user_type;
    store.user_id = data._value.data.user_id;
    console.log(store.user_id);
    router.push("/list");
  } else {
    ElMessage.error(data._value.msg + ".");
  }
});
</script>

<template>
  <div style="position: fixed; margin: 0 auto; width: 100%">
    <div style="height: 100px"></div>
    <div class="login">
      <div class="body">
        <div style="height: 15px">登录</div>
        <el-divider />
        <el-input
          v-model="inputUserName"
          style="width: 100%"
          placeholder="账号"
        />
        <div style="height: 15px"></div>
        <el-input
          v-model="inputPassword"
          type="password"
          style="width: 100%"
          placeholder="密码"
          show-password
        />
        <div style="height: 15px"></div>
        <div style="display: flex; justify-content: flex-end">
          <el-button @click="execute" style="background: #39c5bb; color: white"
            >提交</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  top: 0px;
  height: 250px;
  margin: 0 auto;
  width: 400px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 6px 0 #ddd;
  position: relative;
}

.body {
  height: 200px;
  width: 340px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
