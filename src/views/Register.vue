<script setup>
import { useFetch } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const inputUserName = ref("");
const inputName = ref("");
const inputPassword = ref("");
const inputUserType = ref("");
const url = ref("/api/user/reg");
const body = ref({
  username: inputUserName,
  name: inputName,
  password: inputPassword,
  user_type: inputUserType,
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
      message: "注册成功, 请登录.",
      type: "success",
    });
    router.push("/list");
  } else {
    ElMessage.error(data._value.msg + ".");
  }
});

const options = [
  {
    value: 1,
    label: "学生",
  },
  {
    value: 2,
    label: "管理员",
  },
];
</script>

<template>
  <div style="position: fixed; margin: 0 auto; width: 100%">
    <div style="height: 100px"></div>
    <div class="login">
      <div class="body">
        <div style="height: 15px">注册</div>
        <el-divider />
        <el-input
          v-model="inputUserName"
          style="width: 100%"
          placeholder="账号"
        />
        <div style="height: 15px"></div>
        <el-input v-model="inputName" style="width: 100%" placeholder="昵称" />
        <div style="height: 15px"></div>
        <el-input
          v-model="inputPassword"
          type="password"
          style="width: 100%"
          placeholder="密码"
          show-password
        />
        <div style="height: 15px"></div>
        <el-select
          v-model="inputUserType"
          placeholder="Select"
          style="width: 150px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
  height: 330px;
  margin: 0 auto;
  width: 400px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 6px 0 #ddd;
  position: relative;
}

.body {
  height: 280px;
  width: 340px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
