<script setup>
import { Edit } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";
import { useFetch } from "@vueuse/core";

const url = ref("/api/student/post");
const router = useRouter();
let len = 0;

const tableData = reactive([]);
const { onFetchResponse, data, execute } = useFetch(url, {
  immediate: true,
})
  .get()
  .json();
onFetchResponse((response) => {
  len = data._value.data.post_list.length;
  for (var i = 0; i < data._value.data.post_list.length; i++) {
    tableData.unshift({
      time: moment(data._value.data.post_list[i].time).format("MM-DD HH:mm:ss"),
      user_id: data._value.data.post_list[i].user_id,
      content: data._value.data.post_list[i].content,
      post_id: data._value.data.post_list[i].id,
    });
  }
});

const edit = () => {
  router.push("/post");
};

const goToPage = (record) => {
  console.log(record.content);
  router.push({
    path: "/content",
    query: {
      time: record.time,
      userID: record.user_id,
      content: record.content,
      postID: record.post_id,
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
          <el-header style="text-align: right; font-size: 12px">
            <div class="toolbar">
              <el-button
                @click="edit()"
                style="
                  background: #2e7f78;
                  color: white;
                  background-color: #2e7f78;
                "
                type=""
                :icon="Edit"
                circle
              />
            </div>
          </el-header>

          <el-main>
            <el-scrollbar>
              <el-table
                @row-click="goToPage"
                :data="tableData"
                :show-overflow-tooltip="true"
              >
                <el-table-column prop="time" label="Date" width="140" />
                <el-table-column prop="user_id" label="Name" width="90" />
                <!--<el-table-column prop="post_id" label="PostID" width="90" />-->
                <el-table-column prop="content" label="Content" />
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
