<script setup>
import {footprintListAPI} from '@/apis/footprint'
import {ref, onMounted} from 'vue'
import FootprintItem from '@/views/Member/components/FootprintItem.vue';

const footprintList = ref([])
const getFootprintList = async () => {
  const res = await footprintListAPI()
  footprintList.value = res.result
  // footprintList.value = [
  //   {
  //     "id": 4023100,
  //     "name": "历史的棋局",
  //     "desc": "历史如棋谱，时代变了，那些历史的棋局还能教会我们什么? 刘邦开国后大杀功臣?",
  //     "price": "581.00",
  //     "picture": "https://cdn.weread.qq.com/weread/cover/51/cpplatform_1dg3xph2pagiwzkb1tauzy/t6_cpplatform_1dg3xph2pagiwzkb1tauzy1700796621.jpg",
  //     "orderNum": 992,
  //     "time": "2023-11-20 11:30:00"
  //   },
  //   {
  //     "id": 4026198,
  //     "name": "活着",
  //     "desc": "同名电影《活着》由张艺谋执导，葛优、巩俐两大影帝影后主演1994年该片在第47届戛纳电影节上斩获评委会大奖，最佳男演员奖同时还荣获了英国电影学院奖最佳外语片等重要奖项。",
  //     "price": "125.00",
  //     "picture": "https://wfqqreader-1252317822.image.myqcloud.com/cover/464/834464/t6_834464.jpg",
  //     "orderNum": 3071,
  //     "time": "2023-11-20 11:30:00"
  //   },
  //   {
  //     "id": 4026178,
  //     "name": "三国演义",
  //     "desc": "古典小说《三国演义》从汉灵帝黄巾起义写起，到西晋三国统一为止，描写了九十余年的重大历史事件及历史人物的活动，展示了三国兴亡的历史画卷，形象地再现了这一风云变幻的历史时代，生动地揭示了统治集团内部尔虞我诈、争权夺利的关系。",
  //     "price": "89.00",
  //     "picture": "https://cdn.weread.qq.com/weread/cover/20/yuewen_29855984/t6_yuewen_298559841676969263.jpg",
  //     "orderNum": 1300,
  //     "time": "2023-11-20 11:30:00"
  //   },
  //   {
  //     "id": 4026450,
  //     "name": "三体",
  //     "desc": "刘慈欣经典科幻代表作 每个人的书架上都该有套《三体》!关于宇宙最狂野的想象!就是它!征服世界的中国科幻神作!包揽九项世界顶级科幻大奖!出版16个语种，横扫30国读者!奥巴马雷军、马化腾、周鸿柿、潘石屹、扎克伯格.....强推!",
  //     "price": "89.00",
  //     "picture": "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg",
  //     "orderNum": 1350,
  //     "time": "2023-11-20 11:30:00"
  //   }
  // ]
}
onMounted(() => {
  getFootprintList()
})
const handleReflush = (item) => {
  console.log(item)
  footprintList.value = footprintList.value.filter(footprint => footprint.id !== item.id)
}
</script>

<template>
  <div class="home-overview">
    <div class="like-container">
      <div class="home-panel">
        <div class="header">
          <h4 data-v-bcb266e0="">我的足迹</h4>
        </div>
        <div v-if="footprintList.length === 0" style="width: 100%">
          <el-empty description="暂无数据"/>
        </div>
        <div v-else class="foots-list">
          <FootprintItem v-for="footprint in footprintList" :key="footprint.id" :footprint="footprint"
                         @reflush="handleReflush"/>
        </div>
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

  .foots-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>
