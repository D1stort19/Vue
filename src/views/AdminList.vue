<script setup>
import { Edit } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useFetch } from "@vueuse/core";
import qs from "qs";

const router = useRouter();
let len = 0;

const tableData = reactive([]);
const { onFetchResponse, data, execute } = useFetch(
  "/api/admin/report?" + qs.stringify({ user_id: 1 }),
  {
    immediate: true,
  },
)
  .get()
  .json();
onFetchResponse((response) => {
  len = data._value.data.report_list.length;
  for (var i = 0; i < data._value.data.report_list.length; i++) {
    tableData.unshift({
      username: data._value.data.report_list[i].username,
      post_id: data._value.data.report_list[i].post_id,
      reason: data._value.data.report_list[i].reason,
      content: data._value.data.report_list[i].content,
    });
  }
});

const goToPage = (record) => {
  console.log(record.content);
  router.push({
    path: "/adminlist/report",
    query: {
      post_id: record.post_id,
      reason: record.reason,
      content: record.content,
    },
  });
};
</script>

<template>
  <div style="height: 15px"></div>
  <div style="position: fixed; margin: 0 auto; width: 100%">
    <div class="list">
      <el-container
        class="layout-container-demo"
        style="height: 700px; border-radius: 4px"
      >
        <el-container>
          <el-header style="text-align: right; font-size: 12px"> </el-header>

          <el-main>
            <el-scrollbar>
              <el-table
                @row-click="goToPage"
                :data="tableData"
                :show-overflow-tooltip="true"
              >
                <el-table-column prop="post_id" label="PostID" width="90" />
                <el-table-column prop="username" label="Name" width="100" />
                <el-table-column prop="content" label="Content" width="250" />
                <el-table-column prop="reason" label="Reason" />
              </el-table>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.el-tooltip__popper {
  font-size: 14px;
  max-width: 40%;
}

.list {
  top: 0px;
  margin: 0 auto;
  width: 700px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 6px 0 #ddd;
  position: relative;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: #39c5bb;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.el-button {
  --el-button-border-color: #2e7f78;
}

.content {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
