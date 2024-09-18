<script setup>
    import { onMounted, reactive, ref } from "vue";
    import { useRouter, useRoute } from 'vue-router';
    import { ElMessage } from 'element-plus'
    import { useFetch } from '@vueuse/core'
    import userData from '@/api/global_variable.js'
    import qs from 'qs'

    const router = useRouter()
    const route = useRoute()

    const init = ref('')
    let height = ref('');
    let bodyHeight = reactive({
        height: "0px",
    });
    let contentBodyHeight = reactive({
        height: "0px",
    });
    onMounted(() => {
        height = document.getElementById("myDIV").clientHeight + 250;
        bodyHeight.height = height + 'px'
        contentBodyHeight.height = height - 80 + 'px'
        console.log(bodyHeight)
    })

    const Edit = () => {
        router.push({ path: '/edit', query: { userID: route.query.userID, content: route.query.content, postID: route.query.postID } })
    }

    const Report = () => {
        router.push({ path: '/report', query: { userID: route.query.userID, postID: route.query.postID } })
    }

    const delData = {
        user_id: Number(route.query.userID),
        post_id: Number(route.query.postID),
    }
    const { onFetchResponse, data, execute } = useFetch('/api/student/post?' + qs.stringify(delData),
        {
            immediate: false,
        }).delete().json();

    onFetchResponse((response) => {
        if (data._value.code === 200) {
            ElMessage({
                message: '已删除.',
                type: 'success',
            })
            router.push("/list")
        }
        else {
            ElMessage.error(data._value.msg + '.')
        }
    })
    const Delete = () => {
        if (userData.user_id == delData.user_id)
            execute()
    }
</script>

<template>
    <div style=" margin: 0 auto; width: 100%; ">
        <div class="content" :style="bodyHeight">
            <div class="content-body" :style="contentBodyHeight">
                {{$route.query.time}}
                <el-divider />
                <div style="height:auto;" ref="init" id="myDIV">
                    {{$route.query.content}}
                </div>
                <el-divider />
                <div style="display: flex; justify-content: flex-end;">
                    <el-button v-if="userData.user_id==delData.user_id" @click="Edit" style="background:#39c5bb;color:white">修改</el-button>
                    <el-button v-if="userData.user_id==delData.user_id" @click="Delete" type="danger">删除</el-button>
                    <el-button v-if="userData.user_id!=null" @click="Report" type="warning">举报</el-button>
                </div>
            </div>
        </div>
    </div>
    <div style="height:100px"></div>
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
