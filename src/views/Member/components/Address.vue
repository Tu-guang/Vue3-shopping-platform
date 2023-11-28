<template>
  <div style="padding: 30px;">
    <el-card class="box-card;" shadow="always" style="width: 100%">
      <template #header>
        <div class="card-header" style="text-align: left">
          <h4 data-v-bcb266e0="">我的地址</h4>
          <el-button class="button" type="primary" @click="addAddress">新增</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="username" label="收货人" width="100"/>
          <el-table-column prop="phone" label="联系电话" width="180"/>
          <el-table-column prop="address" label="地址"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" :type="scope.row.is_default === 1?'primary' :''"
                         @click="handleDefault(scope.$index, scope.row)"
              >{{ scope.row.is_default == 1 ? '默认地址' : '设置默认地址' }}
              </el-button>
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >修改
              </el-button
              >
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <el-dialog v-model="dialogTableVisible" title="修改地址" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpdate">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog v-model="adddialogTableVisible" title="新增地址" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="adddialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAdd">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref, onMounted} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {addressListAPI, addressUpdateAPI, addressDelAPI, addressAddAPI, addressSetAPI} from '@/apis/address'

const dialogTableVisible = ref(false)
const adddialogTableVisible = ref(false)
let tableData = ref([])
let form = ref({
  username: "",
  phone: "",
  address: "",
})

const submitUpdate = () => {
  dialogTableVisible.value = false
  let updateObj = {
    username: form.value.username,
    id: form.value.id,
    phone: form.value.phone,
    address: form.value.address,
    is_default: form.value.is_default,
  }
  addressUpdateAPI(updateObj).then((res => {
    if (res.code === 200) {
      ElMessage({
        message: '更新地址成功！',
        type: 'success',
      })
      InitaddressListAPI()
    } else {

    }
  }))
  form.value = {}
}
const submitAdd = () => {
  adddialogTableVisible.value = false
  let addObj = {
    id: tableData.value.length + 1,
    username: form.value.username,
    phone: form.value.phone,
    address: form.value.address,
    is_default: 0,
  }
  addressAddAPI(addObj).then((res => {
    if (res.code === 200) {
      ElMessage({
        message: '添加地址成功！',
        type: 'success',
      })
      InitaddressListAPI()
    } else {

    }
  }))
  form.value = {}
}

onMounted(() => {
  InitaddressListAPI()
})

const InitaddressListAPI = () => {
  addressListAPI().then((res) => {
    console.log(res)
    tableData.value = res.result
    console.log(tableData)
  })
}

const addAddress = () => {
  adddialogTableVisible.value = true

}
const handleEdit = (index, row) => {
  dialogTableVisible.value = true
  form.value = {
    ...row
  }
}
const handleDelete = (index, row) => {
  ElMessageBox.confirm(
      '确认删除?',
      '删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        addressDelAPI(row.id).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            InitaddressListAPI()
          }
        })
      })
      .catch(() => {

      })
}
const handleDefault = (index, row) => {
  addressSetAPI(row.id).then((res) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '设置成功',
      })
      InitaddressListAPI()
    }
  })
}
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
