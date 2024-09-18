<script setup>
    import { useFetch } from '@vueuse/core'
    import { computed, reactive, ref } from 'vue'
    import userData from '@/api/global_variable.js'
    import { ElMessage } from 'element-plus'
    import { useRouter, useRoute } from 'vue-router';
    const router = useRouter()

    const form = reactive({
        name: '',
        desc: '',
    })
    const body = ref({
        content: '',
        user_id: userData.user_id,
    })
    const { onFetchResponse, data, execute } = useFetch('/api/student/post', {
        immediate: false,
    }).post(body).json();

    onFetchResponse((response) => {
        console.log(data)

        if (data._value.code === 200) {
            ElMessage({
                message: '发布成功.',
                type: 'success',
            })
            router.push("/list")

        }
        else {
            ElMessage.error(data._value.msg + '.')
        }
    })

    const onSubmit = () => {
        body._rawValue.content = form.desc
        console.log(body._rawValue.content)
        execute()
    }
</script>

<template>
    <div style=" position: fixed; margin: 0 auto; width: 100%; ">
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
                        <div style="width:40px"></div>
                        <el-button style=" background: #39c5bb; color: white " @click="onSubmit">Submit</el-button>
                        <el-button style="position: absolute; right: 0%;">Cancel</el-button>

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
