<script setup>
import {reactive, ref, onMounted} from 'vue'
//elementPlus的提示框
import {ElMessage} from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
//用来调用router身上的方法
import {useRouter} from 'vue-router'
//Pinia
import {useUserStore} from '@/stores/user'
import {registerAPI} from "@/apis/user";

const userStore = useUserStore()

//表单校验
//1.准备表单对象
const form = ref({
  account: '',
  password: '',
  agree: true
})
//2.准备规则对象
const rules = {
  account: [
    {required: true, message: '用户名不能为空', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur'}
  ],
  agree: [
    {
      //自定义校验逻辑。勾选就通过，不勾选就不通过。使用validator方法
      validator: (rule, value, callback) => {
        //console.log(value) 验证是否勾选
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}
//3.获取form实例做统一验证，使用validate方法
const formRef = ref(null)
const router = useRouter()
const doRegister = () => {
  const {account, password} = form.value
  //调用实例方法，获取表单实例
  formRef.value.validate(async (valid) => {
    //valid:所有表单都通过校验，才为true
    //console.log(valid)
    //此处以valid作为判断条件
    if (valid) {
      let res = await registerAPI({account, password})
      if (res.code === 200) {
        //1.提示用户
        ElMessage({type: 'success', message: '注册成功'})
        login_or_register.value = !login_or_register.value
        form.value = {}
        activeName.value = "first"
      } else {
        ElMessage({type: 'error', message: res.msg})
      }
    }
  })
}
const doLogin = () => {
  const {account, password} = form.value
  //调用实例方法，获取表单实例
  formRef.value.validate(async (valid) => {
    //valid:所有表单都通过校验，才为true
    // console.log(valid)
    //此处以valid作为判断条件
    if (valid) {
      await userStore.getUserInfo({account, password})
      console.log()
      if (userStore.userInfo.token) {
        //1.提示用户
        ElMessage({type: 'success', message: '登录成功'})
        //2.跳转首页
        router.replace({path: '/'})
      } else {
        ElMessage({type: 'error', message: '账号或密码错误'})
      }
    }
  })
}
const login_or_register = ref(true)
const switch_login_or_register = () => {
  login_or_register.value = !login_or_register.value
  activeName.value = "first"
}
const activeName = ref('first')
const btnText = ref("发送验证码")
const disabled = ref(false)

const time = ref(60)
const countDown = ref(60)
const sendCode = () => {
  let timer = setInterval(() => {
    time.value--;
    btnText.value = `${time.value}s后重新发送`
    disabled.value = true
    if (time.value === 0) {
      disabled.value = false;
      btnText.value = '重新发送';
      time.value = countDown.value
      clearInterval(timer)
    }
  }, 1000)
}
onMounted(() => {
  time.value = countDown.value
})
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper" v-if="!login_or_register">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="padding: 20px">
          <el-tab-pane label="账户注册" name="first">
            <div class="account-box">
              <div class="form" style="margin-top: 30px">
                <el-form ref="formRef" :model="form" :rules="rules" label-position="right"
                         status-icon>
                  <el-form-item prop="account">
                    <el-input v-model="form.account" placeholder="账户"/>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="密码"/>
                  </el-form-item>
                  <el-form-item prop="agree" label-width="22px">
                    <el-checkbox v-model="form.agree" size="large">
                      我已同意隐私条款和服务条款
                    </el-checkbox>
                    <a style="padding: 10px" v-on:click="switch_login_or_register">去登录</a>
                  </el-form-item>
                  <el-button size="large" class="subBtn" @click="doRegister">点击注册</el-button>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="短信注册" name="second">
            <div class="account-box">
              <div class="form" style="margin-top: 30px">
                <el-form ref="formRef" :model="form" :rules="rules" label-position="right"
                         status-icon>
                  <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号" v-model="form.phone">
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-row :gutter="20">
                      <el-col :span="16">
                        <el-input placeholder="请输入验证码" v-model="form.code">
                        </el-input>
                      </el-col>
                      <el-col :span="5">
                        <el-button @click="sendCode" :disabled="disabled">{{ btnText }}</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item prop="agree" label-width="22px">
                    <el-checkbox v-model="form.agree" size="large">
                      我已同意隐私条款和服务条款
                    </el-checkbox>
                    <a style="padding: 10px" v-on:click="switch_login_or_register">去注册</a>
                  </el-form-item>
                  <el-button size="large" class="subBtn">点击登录</el-button>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="wrapper" v-if="login_or_register">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="padding: 20px">
          <el-tab-pane label="账户登录" name="first">
            <div class="account-box">
              <div class="form" style="margin-top: 30px">
                <el-form ref="formRef" :model="form" :rules="rules" label-position="right"
                         status-icon>
                  <el-form-item prop="account">
                    <el-input v-model="form.account" placeholder="账户">
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="密码"/>
                  </el-form-item>
                  <el-form-item prop="agree" label-width="22px">
                    <el-checkbox v-model="form.agree" size="large">
                      我已同意隐私条款和服务条款
                    </el-checkbox>
                    <a style="padding: 10px" v-on:click="switch_login_or_register">去注册</a>
                  </el-form-item>
                  <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="短信登录" name="second">
            <div class="account-box">
              <div class="form" style="margin-top: 30px">
                <el-form ref="formRef" :model="form" :rules="rules" label-position="right"
                         status-icon>
                  <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号" v-model="form.phone">
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-row :gutter="20">
                      <el-col :span="16">
                        <el-input placeholder="请输入验证码" v-model="form.code">
                        </el-input>
                      </el-col>
                      <el-col :span="5">
                        <el-button @click="sendCode" :disabled="disabled">{{ btnText }}</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item prop="agree" label-width="22px">
                    <el-checkbox v-model="form.agree" size="large">
                      我已同意隐私条款和服务条款
                    </el-checkbox>
                    <a style="padding: 10px" v-on:click="switch_login_or_register">去注册</a>
                  </el-form-item>
                  <el-button size="large" class="subBtn">点击登录</el-button>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  //background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 400px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
