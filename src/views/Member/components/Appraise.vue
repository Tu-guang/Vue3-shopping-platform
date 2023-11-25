<script setup>

import UserOrder from "@/views/Member/components/UserOrder.vue";
import AppraiseItem from "@/views/Member/components/AppraiseItem.vue";
import {getLikeListAPI} from '@/apis/user';
import {ref, onMounted} from 'vue';
import {useUserStore} from '@/stores/user';

const userStore = useUserStore()

const likeList = ref([])
const getLikeList = async () => {
  const res = await getLikeListAPI({limit: 4}) //限制猜你喜欢只展示四个图片
  likeList.value = res.result
}
onMounted(() => {
  getLikeList()
})
</script>

<template>
  <div class="home-overview">
    <div class="like-container">
      <div class="home-panel">
        <div class="header">
          <h4 data-v-bcb266e0="">我的评价</h4>
        </div>
<!--        <div class="goods-list">-->
<!--          <GoodsItem v-for="good in likeList" :key="good.id" :goods="good"/>-->
<!--        </div>-->
        <AppraiseItem></AppraiseItem>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-overview {
  height: 132px;
  display: flex;

  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;

    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }

  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &:first-child {
      border-right: 1px solid #f4f4f4;
    }

    a {
      color: white;
      font-size: 16px;
      text-align: center;

      .iconfont {
        font-size: 32px;
      }

      p {
        line-height: 32px;
      }
    }
  }
}

.like-container {
  margin-top: 20px;
  border-radius: 4px;
  background-color: #fff;
}

.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;

  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h4 {
      font-size: 22px;
      font-weight: 400;
    }

  }

  .goods-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>
