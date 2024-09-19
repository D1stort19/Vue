<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useFetch } from "@vueuse/core";
import qs from "qs";
import { useUser } from "@/store/user.js";

const store = useUser();
const router = useRouter();
const route = useRoute();

let height = ref("");
let bodyHeight = reactive({
  height: "0px",
});
let contentBodyHeight = reactive({
  height: "0px",
});
const adminData = reactive({
  user_id: store.user_id,
  post_id: Number(route.query.post_id),
  approval: 0,
});

onMounted(() => {
  height = document.getElementById("myDIV").clientHeight + 250;
  bodyHeight.height = height + "px";
  contentBodyHeight.height = height - 80 + "px";
  console.log(bodyHeight);
});

const Enter = () => {
  adminData.approval = 1;
  execute();
  //router.push("/adminlist")
};

const Delete = () => {
  adminData.approval = 2;
  execute();
  //router.push("/adminlist")
};

const { onFetchResponse, data, execute } = useFetch("/api/admin/report", {
  immediate: false,
})
  .post(adminData)
  .json();

onFetchResponse((response) => {
  console.log(adminData);

  if (data._value.code === 200) {
    ElMessage({
      message: "已提交.",
      type: "success",
    });
    router.push("/list");
  } else {
    ElMessage.error(data._value.msg + ".");
  }
});
</script>

<template>
  <div style="margin: 0 auto; width: 100%">
    <div class="content" :style="bodyHeight">
      <div class="content-body" :style="contentBodyHeight">
        PostID：{{ $route.query.post_id }}
        <el-divider />
        <div style="height: auto" id="myDIV">
          内容：{{ $route.query.content }}
          <el-divider />
          原因：{{ $route.query.reason }}
        </div>
        <el-divider />

        <div style="display: flex; justify-content: flex-end">
          <el-button @click="Enter" style="background: #39c5bb; color: white"
            >通过</el-button
          >
          <el-button @click="Delete" type="danger">拒绝</el-button>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 100px"></div>
</template>

<style scoped>
.content {
  top: 10px;
  margin: 0 auto;
  width: 700px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 6px 0 #ddd;
  position: relative;
}

.content-body {
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
