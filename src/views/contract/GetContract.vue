<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>合约查询</span>
            </div>
        </template>
        <el-form label-width="120px">
            <el-form-item label="查询的hash值">
                <el-input v-model="gethash" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getContract">查询</el-button>
            </el-form-item>
        </el-form>




        <el-descriptions title="合约查询结果" :column="elDescriptionsColumn" border>
            <el-descriptions-item label="hash" label-align="right" align="center" width="150px">
                <el-tag size="large">{{ contract.hash }}</el-tag></el-descriptions-item>
            <el-descriptions-item label="厂家" label-align="right" align="center"><el-tag size="large">{{
        contract.factory
}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="类型" label-align="right" align="center"><el-tag size="large">{{
        contract.style
}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="重量" label-align="right" align="center"><el-tag size="large">{{
        contract.weight
}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="标识" label-align="right" align="center"><el-tag size="large">{{
        contract.logo
}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="银含量" label-align="right" align="center"><el-tag size="large">{{
        contract.silver_content
}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="质检证书ID" label-align="right" align="center"><el-tag size="large">{{
        contract.cert_id
}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="质检证书照片" label-align="right" align="center"><el-tag size="large">{{
        contract.cert_img
}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="产品核对图片" label-align="right" align="center"><el-tag size="large">{{
        contract.check_img
}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="生产厂家地址" label-align="right" align="center"><el-tag size="large">{{
        contract.factory_add
}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="存证时间" label-align="right" align="center"><el-tag size="large">{{
        contract.time
                    }}</el-tag></el-descriptions-item>

        </el-descriptions>
    </el-card>


</template>
<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

//上面描述列表的一行的item数量
let elDescriptionsColumn = ref(1)
onMounted(() => {
    // getContract(); //提取产品目录
    // console.log(`the component is now mounted.`)
})
const contract = reactive({
    hash: '',
    factory: '',
    style: '',
    weight: '',
    logo: '',
    silver_content: '',
    cert_id: '',
    cert_img: '',
    check_img: '',
    factory_add: '',
    time: ''
})
let gethash = ref('')
//取出对应库存的图片
const getContract = () => {

    // axios.get('/path/contact/d5224d3b7c1f435f911a6d2a1dc6c963')
    axios.get('http://123.60.97.40/salestockcontact/' + gethash.value)
        .then(function (response) {
            console.log(response);
            let { data } = response; //结构后台返回来的对象数据:{count,next,previous,results}
            console.log(data);
            contract.hash = data.hash;
            contract.factory = data.factory;
            contract.style = data.style;
            contract.weight = data.weight;
            contract.logo = data.logo;
            contract.silver_content = data.silver_content;
            contract.cert_id = data.cert_id;
            contract.cert_img = data.cert_img;
            contract.check_img = data.check_img;
            contract.factory_add = data.factory_add;
            contract.time = data.time;
            // console.log(response.data);
            console.log(contract);
        })
        .catch(function (error) {
            console.log(error);
        });
};
</script>
<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
  