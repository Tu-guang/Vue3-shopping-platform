<script setup>
import {orderDelAPI, orderListAPI, updateOrderListAPI} from '@/apis/myorder'
import {ref, onMounted} from 'vue'
import {ElMessageBox, ElMessage} from 'element-plus'

const dialogVisible = ref(false)


// tab列表
const tabTypes = [
  {name: "all", label: "全部"}
]
// 获取订单列表
const orderList = ref([])
const total = ref(0) //页面总数
const params = ref({ //这里设置为响应式数据是为了后面的修改
  orderState: 0,
  page: 1,
  pageSize: 2
})
let appraise_text = ref('')
const getOrderList = async () => {
  const res = await orderListAPI()
  orderList.value = res.result
  total.value = res.result.length //获取页面总数
}
onMounted(() => {
  getOrderList()
})

const OrderAppraise = () => {
  dialogVisible.value = false
  form.value.appraise_text = appraise_text.value
  updateOrderListAPI(form.value).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: '评价成功',
        type: 'success',
      })
      getOrderList()
    }
  })
}

//tab切换
const tabChange = (type) => {
  //console.log(type) //验证控制台输出被点击项（被激活状态）的下标值
  params.value.orderState = type //将orderState修改为当前的状态
  getOrderList() //重新发送请求，获取当前状态下的订单列表
}

//页数切换
const pageChange = (page) => {
  //console.log(page) //验证控制台输出被点击项的页数
  params.value.page = page //修改当前的页数
  getOrderList() //重新发送请求，获取当前页数下的订单列表
}

// 创建格式化函数
const fomartPayState = (payState) => {
  const stateMap = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '待评价',
    5: '已完成',
    6: '已取消'
  }
  return stateMap[payState] //使用中括号的写法取对象中的属性
}
const form = ref({})
const showAppraise = (row) => {
  form.value = {
    ...row
  }
  delete form.value._id
  dialogVisible.value = true
  appraise_text.value = row.appraise_text
}
const delOrder = (order) => {
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
        orderDelAPI(order.id).then((res) => {
          if (res.code === 200) {
            ElMessage({
              message: '删除成功',
              type: 'success',
            })
            getOrderList()
          }
        })
      })
      .catch(() => {
      })
}
</script>

<template>
  <div class="order-container">
    <el-tabs @tab-change="tabChange">
      <!-- tab切换 -->
      <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label"/>
      <div class="main-container">
        <div class="holder-container" v-if="orderList.length === 0">
          <el-empty description="暂无订单数据"/>
        </div>
        <div v-else>
          <!-- 订单列表 -->
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <div class="head">
              <span>下单时间：{{ order.createTime }}</span>
              <span>订单编号：{{ order.id }}</span>
              <!-- 未付款，倒计时时间还有 -->
              <span class="down-time" v-if="order.orderState === 1">
                <i class="iconfont icon-down-time"></i>
                <b>付款截止: {{ order.countdown }}</b>
              </span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li v-for="item in order.skus" :key="item.id">
                    <a class="image" href="javascript:;">
                      <img :src="item.image" alt=""/>
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">
                        {{ item.name }}
                      </p>
                    </div>
                    <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
                  </li>
                </ul>
              </div>
              <div class="column state">
                <p>{{ fomartPayState(order.orderState) }}</p>
                <p v-if="order.orderState === 3">
                  <a href="javascript:;" class="green">查看物流</a>
                </p>
                <p v-if="order.orderState === 4">
                  <a href="javascript:;" class="green">评价商品</a>
                </p>
              </div>
              <div class="column appraise">
                <p>
                  <el-button type="success" @click="showAppraise(order)">
                    {{ order.appraise_text != "" ? '查看评价' : '评价' }}
                  </el-button>
                </p>
              </div>
              <div class="column amount">
                <p class="red">¥{{ order.payMoney?.toFixed(2) }}</p>
                <p>（含运费：¥{{ order.postFee?.toFixed(2) }}）</p>
                <p>在线支付</p>
              </div>
              <div class="column action">
                <el-button v-if="order.orderState === 1" type="primary"
                           size="small">
                  立即付款
                </el-button>
                <el-button v-if="order.orderState === 3" type="primary" size="small">
                  确认收货
                </el-button>
                <p><a href="javascript:;">查看详情</a></p>
                <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                  <a href="javascript:">再次购买</a>
                </p>
                <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                  <a @click="delOrder(order)">删除订单</a>
                </p>
                <p v-if="[4, 5].includes(order.orderState)">
                  <a href="javascript:;">申请售后</a>
                </p>
                <p v-if="order.orderState === 1"><a href="javascript:;">取消订单</a></p>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <!--          <div class="pagination-container">-->
          <!--            <el-pagination :total="total" @current-change="pageChange" :page-size="params.pageSize" background-->
          <!--                           layout="prev, pager, next"/>-->
          <!--          </div>-->
        </div>
      </div>
    </el-tabs>

    <el-dialog
        v-model="dialogVisible"
        title="我的评价"
        width="30%"
    >
      <el-input
          v-model="appraise_text"
          :rows="2"
          type="textarea"
          placeholder="请输入评价"
      />
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="OrderAppraise" :disabled="appraise_text!==''">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>

</template>

<style scoped lang="scss">
.order-container {
  padding: 10px 20px;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 500px;
    height: 700px;
    overflow-x: auto;
    overflow-y: auto;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: $xtxColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
</style>
