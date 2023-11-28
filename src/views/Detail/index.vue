<script setup>
import {onMounted, ref} from 'vue'
import {booksAPI} from '@/apis/books'
import {useRoute} from 'vue-router'
import {footprintAddAPI} from "@/apis/footprint";
import {favoritesAddAPI} from "@/apis/favorites"; //获取路由参数
const route = useRoute()
import {ElMessage} from 'element-plus'
import {orderAPI} from "@/apis/myorder";
//获取基础数据
const goods = ref({}) //接口中result是一个对象
const getGoods = async () => {
  const res = await booksAPI({id: route.params.id})
  goods.value = res.result
  delete goods.value._id
  var newVar = await footprintAddAPI(goods.value);
}
onMounted(() => getGoods())

//sku规格被操作时
let skuObj = {}
const skuChange = (sku) => {
  //console.log(sku) //输出结果是一个对象
  skuObj = sku
}

//count
const count = ref(1) //初始值为1
const countChange = (count) => {
}

const addFavorites = () => {
  favoritesAddAPI(goods.value).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: '收藏成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '收藏失败',
        type: 'error',
      })
    }
  })
}
const Order = () => {
  orderAPI(goods.value).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: '购买成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '购买失败',
        type: 'error',
      })
    }
  })
}


</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods.id">
      <!--面包屑-->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <el-image :src="goods.picture"></el-image>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name">{{ goods.name }}</p>
              <p class="g-desc">{{ goods.desc }} </p>
              <p class="g-price">
                <span>{{ goods.price }}</span>
                <span>{{ goods.price }}</span>
              </p>
              <!-- sku组件 -->
              <XtxSku :goods="goods" @change="skuChange"/>
              <!-- 数据组件 -->
              <el-input-number v-model="count" @change="countChange"/>
              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="Order">
                  下单
                </el-button>
                <el-button size="large" class="btn" type="success" @click="addFavorites">
                  加入收藏
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~ li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>
