<script setup>
import { ref, reactive } from "vue";
import moment from "moment";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { useFetch } from "@vueuse/core";
import qs from "qs";
import { useUser } from "@/store/user.js";

const store = useUser();
let len = 0;

const tableData = reactive([]);
const { onFetchResponse, data, execute } = useFetch(
  "/api/student/report-post?" + qs.stringify({ user_id: store.user_id }),
  {
    immediate: true,
  },
)
  .get()
  .json();
onFetchResponse((response) => {
  console.log(data);
  len = data._value.data.report_list.length;
  for (var i = 0; i < data._value.data.report_list.length; i++) {
    tableData.unshift({
      post_id: data._value.data.report_list[i].post_id,
      content: data._value.data.report_list[i].content,
      reason: data._value.data.report_list[i].reason,
      status: data._value.data.report_list[i].status,
    });
  }
});
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
              <el-table :data="tableData" :show-overflow-tooltip="true">
                <el-table-column prop="post_id" label="ID" width="70" />
                <el-table-column prop="content" label="Content" width="260" />
                <el-table-column prop="reason" label="Reason" width="260" />
                <el-table-column label="Status">
                  <template #default="scope">
                    <el-icon v-if="scope.row.status == 0"
                      ><SemiSelect
                    /></el-icon>
                    <el-icon v-if="scope.row.status == 1"><Select /></el-icon>
                    <el-icon v-if="scope.row.status == 2"
                      ><CloseBold
                    /></el-icon>
                  </template>
                </el-table-column>
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
