﻿<script setup>
import { useFetch } from "@vueuse/core";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { useUser } from "@/store/user.js";

const store = useUser();
const router = useRouter();
const route = useRoute();

const form = reactive({
  name: "",
  desc: route.query.content,
});
const body = ref({
  user_id: store.user_id,
  post_id: Number(route.query.postID),
  content: "",
});
const { onFetchResponse, data, execute } = useFetch("/api/student/post", {
  immediate: false,
})
  .put(body)
  .json();

onFetchResponse((response) => {
  if (data._value.code === 200) {
    console.log(data);
    ElMessage({
      message: "已提交.",
      type: "success",
    });
    router.push("/list");
  } else {
    ElMessage.error(data._value.msg + ".");
  }
});

const onSubmit = () => {
  body._rawValue.content = form.desc;
  console.log(body);
  execute();
};
</script>

<template>
  <div style="position: fixed; margin: 0 auto; width: 100%">
    <div class="body">
      <div class="in-body">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
          <el-form-item label="标题">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="form.desc" type="textarea" rows="13" />
          </el-form-item>
          <el-form-item>
            <div style="width: 40px"></div>
            <el-button
              style="
                background: #39c5bb;
                color: white;
                position: absolute;
                right: 0%;
              "
              @click="onSubmit"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  top: 0px;
  margin: 0 auto;
  width: 700px;
  height: 500px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 6px 0 #ddd;
  position: relative;
}

.in-body {
  height: 400px;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
