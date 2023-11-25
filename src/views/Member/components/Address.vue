<template>
  <div style="padding: 30px;">
    <el-card class="box-card;" shadow="always" style="width: 100%">
      <template #header>
        <div class="card-header" style="text-align: left">
          <h4 data-v-bcb266e0="">我的地址</h4>
          <el-button class="button" type="primary" @click="addAddress">新增</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="username" label="收货人" width="180"/>
          <el-table-column prop="phone" label="联系电话" width="180"/>
          <el-table-column prop="address" label="地址"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" type="success" @click="handleDefault(scope.$index, scope.row)"
              >默认地址
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

  </div>
</template>

<script lang="ts" setup>
import {ElMessage} from 'element-plus'

const tableData = [
  {
    username: '陈',
    phone: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    username: '李',
    phone: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    username: '王',
    phone: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    username: '张',
    phone: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const addAddress = () => {
  ElMessage({
    message: '添加地址成功！',
    type: 'success',
  })
}
const handleEdit = (index, row) => {
  ElMessage({
    message: '修改地址成功！',
    type: 'success',
  })
}
const handleDelete = (index, row) => {
  ElMessage({
    message: '删除地址成功！',
    type: 'success',
  })
}
const handleDefault = (index, row) => {
  ElMessage({
    message: '设置默认地址成功！',
    type: 'success',
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
