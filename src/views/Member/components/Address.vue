<template>
  <div style="padding: 30px;">
    <el-card class="box-card;" shadow="always" style="width: 100%">
      <template #header>
        <div class="card-header" style="text-align: left">
          <h4 data-v-bcb266e0="">我的地址</h4>
          <el-button class="button" type="text" @click="addAddress">新增</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="username" label="收货人" width="180" />
          <el-table-column prop="phone" label="联系电话" width="180" />
          <el-table-column prop="address" label="地址" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
              >
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>

  </div>
</template>

<script lang="ts" setup>
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
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
