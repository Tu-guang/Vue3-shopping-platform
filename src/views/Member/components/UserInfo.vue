<script setup>
import {reactive, ref, onMounted, unref} from 'vue'
import {ElMessage} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'

const ruleFormRef = ref(null);
import {userInfoAPI, updateUserInfoAPI} from '@/apis/user';

const loading = ref(false)
const formSize = ref('default')
let ruleForm = ref({})

// account: '10086',
//     username: '小明',
//     password: '123456',
//     phone: '10086',
//     avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
//     sex: '男',
//     mail: 'Hello@mail.com'


const rules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 2, max: 5, message: '请输入2到5位的用户名', trigger: 'blur'},
  ],
  account: [
    {required: true, message: '请输入账号', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 6, max: 15, message: '请输入6到15位的密码', trigger: 'blur'},
  ]
})

const submitForm = async () => {
  const formEl = unref(ruleFormRef)
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let upObj = {
        ...ruleForm.value
      }
      delete upObj._id
      updateUserInfoAPI(upObj).then((res) => {
        console.log(res)
        if (res.code === 200) {
          ElMessage({
            message: '提交成功',
            type: 'success',
          })
          InitUserInfo()
        }
      })
      console.log('提交成功!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = () => {
  const formEl = unref(ruleFormRef)
  if (!formEl) return
  formEl.resetFields()
}

const handleAvatarSuccess = (
    response,
    uploadFile
) => {
  console.log(response)
  if (response.code === 200) {
    ruleForm.value.avatar = response.url
  }
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const InitUserInfo = () => {
  loading.value = true
  userInfoAPI().then((res) => {
    console.log(res)
    // ruleForm.value = {}
    if (res.code === 200) {
      ruleForm.value = {
        ...res.result
      }
    }
    loading.value = false
  })
}
onMounted(() => {
  InitUserInfo()
})
</script>

<template>
  <div class="home-overview" v-loading="loading">
    <el-row justify="center">
      <el-col :span="8">
        <div style="margin-top: 10px">个人信息</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div style="margin-top: 30px">
          <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              label-width="120px"
              class="demo-ruleForm"
              :size="formSize"
              status-icon
          >
            <el-form-item label="账号" prop="account">
              <el-input v-model="ruleForm.account"/>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" type="password" show-password/>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone"/>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <el-row>
                <el-col>
                  <el-avatar shape="square" :size="150" fit="cover"
                             :src="ruleForm.avatar"/>
                </el-col>
                <el-col>
                  <el-upload
                      class="custom-upload"
                      action="http://localhost:8081/upload"
                      list-type="picture-card"
                      :on-remove="handleRemove"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                  >
                    <el-icon>
                      <Plus/>
                    </el-icon>
                  </el-upload>
                </el-col>
              </el-row>

            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <!--              <el-input v-model="ruleForm.sex"/>-->
              <el-select v-model="ruleForm.sex" clearable placeholder="请选择性别">
                <el-option
                    v-for="item in [
                      {
                        value: '0',
                        label: '男',
                      },
                      {
                        value: '1',
                        label: '女',
                      }]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
              <el-input v-model="ruleForm.mail"/>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                提交
              </el-button>
              <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>
