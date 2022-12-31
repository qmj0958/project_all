<template>

    <main>
        <div><el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <el-row class="demo-autocomplete text-center" justify="space-around">
                            <el-col :span="6">
                                <span>执行合约</span>
                            </el-col>
                            <el-col :span="6">

                                <h3 v-if="invokeResult">
                                    <el-alert title="合约执行成功" type="success" effect="dark">
                                    </el-alert>
                                    <el-alert :title="just_hash" type="success" effect="dark">
                                    </el-alert>
                                    <h3>{{ just_hash }}</h3>

                                </h3>
                            </el-col>
                        </el-row>

                    </div>
                </template>
                <el-form :label-position="labelPosition" label-width="100px" :model="invokeContractItems"
                    style="max-width: 460px">
                    <el-form-item label="hash">
                        <el-input v-model="invokeContractItems.hash" />
                    </el-form-item>

                    <el-form-item label="厂家">
                        <el-select v-model="invokeContractItems.factory" class="m-2" placeholder="Select">
                            <el-option v-for="item in factory_options" :key="item.value" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型">



                        <el-select v-model="invokeContractItems.style" class="m-2" placeholder="Select">
                            <el-option v-for="item in style_options" :key="item.value" :value="item.value" />
                        </el-select>

                    </el-form-item>

                    <el-form-item label="重量">
                        <el-input v-model="invokeContractItems.weight" maxlength="3" placeholder="请输入整数" show-word-limit
                            type="text" clearable />
                    </el-form-item>
                    <el-form-item label="标识">
                        <el-input v-model="invokeContractItems.logo" maxlength="10" placeholder="请输入" show-word-limit
                            type="text" clearable />
                    </el-form-item>
                    <el-form-item label="银含量">
                        <el-select v-model="invokeContractItems.silver_content" class="m-2" placeholder="Select">
                            <el-option v-for="item in silver_content_options" :key="item.value" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="质检证书ID">

                        <el-input v-model="invokeContractItems.cert_id" maxlength="15" placeholder="请输入" show-word-limit
                            type="text" clearable />


                    </el-form-item>
                    <el-form-item label="质检证书照片">
                        <!-- <el-input v-model="invokeContractItems.cert_img" /> -->
                        <!-- <form action="http://123.60.97.40/uploadcercertimg" method="post" enctype="multipart/form-data">
                            <input type="file" name="picture">
                            <input type="submit" value="上传一张图片">
                        </form> -->
                        <el-input v-model="invokeContractItems.cert_img" disabled />
                        <Certimg></Certimg>
                    </el-form-item>
                    <el-form-item label="产品核对图片">
                        <!-- <el-input v-model="invokeContractItems.check_img" /> -->
                        <el-input v-model="invokeContractItems.check_img" disabled />
                        <Checkimg></Checkimg>
                    </el-form-item>
                    <el-form-item label="生产厂家地址">
                        <el-input v-model="invokeContractItems.factory_add" />
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="invoke_contract" size="large">执行合约</el-button>
            </el-card>
        </div>
    </main>
</template>
<script setup lang='ts'>
import { onMounted, ref, reactive, computed } from 'vue'
import axios from 'axios'
//导入插入证书图片的组件
import Certimg from './invoke/Certimg.vue';
import Checkimg from './invoke/Checkimg.vue'
const labelPosition = ref('left')      //
let invokeResult = ref(false)      //


const invokeContractItems = reactive({
    hash: '',
    factory: '',
    style: '',
    weight: '',
    logo: '',
    silver_content: '',
    cert_id: '',
    cert_img: computed(() => 'cert_' + invokeContractItems.hash + '.jpg'),
    check_img: computed(() => 'check_' + invokeContractItems.hash + '_001.jpg,check_' + invokeContractItems.hash + '_002.jpg,check_' + invokeContractItems.hash + '_003.jpg'),
    factory_add: '',
})
// const invokeContractItems.cert_img = computed(() => {
//     return 'cert_' + invokeContractItems.hash + '.jpg'
// })
//厂家的选项
const factory_options = [
    {
        value: '百银'
    },
    {
        value: '亘古'
    },
    {
        value: '其它'
    }
]
//厂家的选项
const style_options = [
    {
        value: '手镯'
    },
    {
        value: '吊坠'
    },
    {
        value: '其它'
    }
]
//银含量选项
const silver_content_options = [
    {
        value: 'S999'
    },
    {
        value: 'S990'
    },
    {
        value: 'S920'
    },
    {
        value: '其它'
    }
]
// onMounted(() => {
//     refreshHash();

// })
// let dateNow = ref()
// const refreshHash = () => {
//     invokeContractItems.hash = Date.now().toString()
//     setTimeout(() => {
//         refreshHash()
//     }, 1000)

// }
//定义一个刚才插入的合约的那个hash，以便记录
let just_hash = ref("")
const invoke_contract = () => {
    // axios.post("/path/user/add", invokeContractItems)
    // axios.post("/path/json", invokeContractItems)
    axios.post("http://123.60.97.40/json", invokeContractItems)
        .then((res) => {
            console.log("$$$$$$$");
            console.log(invokeContractItems);
            console.log("$$$$$$$");
            console.log(res);
            console.log("$$$$$$$");
            //返回刚才插入的hash
            just_hash.value = res.data.hash
            //清空对象的值
            invokeContractItems.factory = ''
            invokeContractItems.style = ''
            invokeContractItems.weight = ''
            invokeContractItems.logo = ''
            invokeContractItems.silver_content = ''
            invokeContractItems.cert_id = ''
            invokeContractItems.cert_img = ''
            invokeContractItems.check_img = ''
            invokeContractItems.factory_add = ''

            invokeResult.value = true; //通过v-if判断是否显示成功标签
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>
<style scoped>

</style>