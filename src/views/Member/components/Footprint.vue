<script setup>
import {getLikeListAPI} from '@/apis/user'
import {ref, onMounted} from 'vue'
import FootprintItem from '@/views/Member/components/FootprintItem.vue';

const likeList = ref([])
const getLikeList = async () => {
  // const res = await getLikeListAPI({limit: 4}) //限制猜你喜欢只展示四个图片
  likeList.value = [
    {
      "id": "4023100",
      "name": "办公家用Mini健身磁控车",
      "desc": "原创设计，小巧精致，安装便捷，收纳方便",
      "price": "581.00",
      "picture": "https://yanxuan-item.nosdn.127.net/8250d307ea586c1a1d1430023d6f0ce6.jpg",
      "orderNum": 992,
      "time":"2023-11-20 11:30:00"
    },
    {
      "id": "4026198",
      "name": "经典格子元素，男童加绒格子衬衫",
      "desc": "经典格子元素，翻盖小贴袋装饰",
      "price": "125.00",
      "picture": "https://yanxuan-item.nosdn.127.net/084f82c43a71bbc4d280fbb09a47a028.jpg",
      "orderNum": 3071,
      "time":"2023-11-20 11:30:00"
    },
    {
      "id": "4026178",
      "name": "经典格子元素，男童格子纯棉衬衫",
      "desc": "经典格子元素，侧边小贴袋装饰，5色可选",
      "price": "89.00",
      "picture": "https://yanxuan-item.nosdn.127.net/22cba953b8239943c6db9cd0715bc2d2.jpg",
      "orderNum": 1300,
      "time":"2023-11-20 11:30:00"
    },
    {
      "id": "4026450",
      "name": "趣味小恐龙绣花，男童灯芯绒衬衫",
      "desc": "趣味小恐龙绣花，满版老虎印花，5色可选",
      "price": "89.00",
      "picture": "https://yanxuan-item.nosdn.127.net/e68d406a58622a8d850de442aacfcf2e.jpg",
      "orderNum": 1350,
      "time":"2023-11-20 11:30:00"
    }
  ]
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
          <h4 data-v-bcb266e0="">我的足迹</h4>
        </div>
        <div class="foots-list">
          <FootprintItem v-for="good in likeList" :key="good.id" :goods="good"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
//.home-overview {
//  height: 132px;
//  display: flex;
//
//  .user-meta {
//    flex: 1;
//    display: flex;
//    align-items: center;
//
//    .avatar {
//      width: 85px;
//      height: 85px;
//      border-radius: 50%;
//      overflow: hidden;
//      margin-left: 60px;
//
//      img {
//        width: 100%;
//        height: 100%;
//      }
//    }
//
//    h4 {
//      padding-left: 26px;
//      font-size: 18px;
//      font-weight: normal;
//      color: white;
//    }
//  }
//
//  .item {
//    flex: 1;
//    display: flex;
//    align-items: center;
//    justify-content: space-around;
//
//    &:first-child {
//      border-right: 1px solid #f4f4f4;
//    }
//
//    a {
//      color: white;
//      font-size: 16px;
//      text-align: center;
//
//      .iconfont {
//        font-size: 32px;
//      }
//
//      p {
//        line-height: 32px;
//      }
//    }
//  }
//}

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

  .foots-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>
